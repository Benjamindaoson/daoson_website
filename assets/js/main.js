/* ============================================
   博客主交互脚本
   ============================================ */

(function() {
  'use strict';

  // ---------- i18n 语言切换 ----------
  function normalizeLang(lang) {
    return String(lang || '').toLowerCase().startsWith('en') ? 'en' : 'zh';
  }

  function getCurrentLang() {
    return normalizeLang(document.documentElement.dataset.uiLang || document.documentElement.lang || 'zh');
  }

  function getPageLang() {
    return normalizeLang(document.documentElement.dataset.pageLang || document.documentElement.lang || 'zh');
  }

  function getStoredLang() {
    try { return localStorage.getItem('site-lang') || getCurrentLang(); }
    catch (e) { return getCurrentLang(); }
  }

  function setStoredLang(lang) {
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }

  function applyLang(lang) {
    const l = normalizeLang(lang);
    document.documentElement.dataset.uiLang = l;
    document.documentElement.lang = getPageLang();

    document.querySelectorAll('.i18n-zh, .i18n-en').forEach(el => {
      const shouldShow = el.classList.contains('i18n-' + l);
      el.style.setProperty('display', shouldShow ? 'inline' : 'none', 'important');
    });
    document.querySelectorAll('.share-set-zh, .share-set-en').forEach(el => {
      const shouldShow = el.classList.contains('share-set-' + l);
      el.style.setProperty('display', shouldShow ? 'flex' : 'none', 'important');
    });

    // 处理 input/textarea placeholder（不能用 CSS）
    document.querySelectorAll('[data-placeholder-zh], [data-placeholder-en]').forEach(el => {
      const txt = el.getAttribute('data-placeholder-' + l);
      if (txt) el.setAttribute('placeholder', txt);
    });

    // 真双语：按 data-post-lang 过滤所有文章/笔记列表项
    // 当前语言匹配 → 显示；不匹配 → 隐藏（用 .lang-hidden 类，搜索过滤可叠加）
    filterListsByLang(l);

    // 更新各种列表的可见计数（首页、tags 页等）
    updateVisibleCounts();

    // 通知空态显示器
    refreshEmptyStates(l);
  }

  function filterListsByLang(lang) {
    document.querySelectorAll('[data-post-lang]').forEach(el => {
      const postLang = el.getAttribute('data-post-lang');
      if (postLang === lang) {
        el.classList.remove('lang-hidden');
      } else {
        el.classList.add('lang-hidden');
      }
    });
  }

  function updateVisibleCounts() {
    // 首页文章计数（已存在的搜索/筛选用 .is-hidden）
    const searchCounts = document.querySelectorAll('[data-search-result-count]');
    if (searchCounts.length) {
      const list = document.getElementById('post-list');
      if (list) {
        const visible = list.querySelectorAll(
          '.post-card-wrap:not(.lang-hidden):not(.is-hidden)'
        ).length;
        searchCounts.forEach(count => { count.textContent = visible; });
      }
    }
    // tags 页计数
    const tagCount = document.getElementById('tag-result-count');
    if (tagCount) {
      const visible = document.querySelectorAll(
        '.post-list .post-card-wrap:not(.lang-hidden):not(.is-hidden)'
      ).length;
      tagCount.textContent = visible;
    }
  }

  function refreshEmptyStates(lang) {
    // 给当前页可能存在的"空态"占位区添加/移除显示
    document.querySelectorAll('[data-empty-when-lang]').forEach(el => {
      const targetLang = el.getAttribute('data-empty-when-lang');
      const listSelector = el.getAttribute('data-empty-for-list');
      if (!listSelector) return;
      const list = document.querySelector(listSelector);
      if (!list) return;
      const hasVisible = list.querySelector('[data-post-lang="' + lang + '"]') !== null;
      el.hidden = !(targetLang === lang && !hasVisible);
    });
  }

  function setupLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = getCurrentLang();
      const next = current === 'zh' ? 'en' : 'zh';
      applyLang(next);
      setStoredLang(next);
    });
  }

  // ---------- 高亮当前导航 ----------
  function highlightNav() {
    let path = location.pathname.replace(/\/$/, '');
    const segments = path.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || '';

    const navLinks = document.querySelectorAll('.sidebar-nav-link, .nav-links a');
    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/\/$/, '');
      const linkLast = href.split('/').filter(Boolean).pop() || '';
      const dataNav = link.dataset.nav || '';
      if (last === '' || last === segments[0] && segments.length === 1 && last.includes('.html') === false) {
        if (linkLast === '' || linkLast === 'home' || dataNav === 'home' || href === '/' || href === '') {
          if (last === '' && (href === '/' || href === '' || linkLast === '' || dataNav === 'home')) {
            link.classList.add('active');
            return;
          }
        }
      }
      if (linkLast === last || dataNav === last) {
        link.classList.add('active');
      }
    });

    if (last === '' || last === 'index.html') {
      const home = document.querySelector('[data-nav="home"]');
      if (home) home.classList.add('active');
    }
  }

  // ---------- 移动端侧边栏切换 ----------
  function setupSidebarToggle() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.site-sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!toggle || !sidebar || !sidebarContent) return;

    function syncSidebarA11y() {
      const shouldHide = window.innerWidth < 900 && !sidebar.classList.contains('is-open');
      sidebarContent.setAttribute('aria-hidden', String(shouldHide));
    }
    syncSidebarA11y();

    function open() {
      sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-shown');
      toggle.setAttribute('aria-expanded', 'true');
      sidebarContent.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-shown');
      toggle.setAttribute('aria-expanded', 'false');
      syncSidebarA11y();
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      if (sidebar.classList.contains('is-open')) close();
      else open();
    });
    if (backdrop) backdrop.addEventListener('click', close);

    sidebar.querySelectorAll('.sidebar-nav-link, .sidebar-post-list a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 900) close();
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
    });
    window.addEventListener('resize', syncSidebarA11y);
  }

  // ---------- 标签筛选 ----------
  function setupTagFilter() {
    const tagButtons = document.querySelectorAll('[data-tag-filter]');
    const items = document.querySelectorAll('[data-tags]');
    if (!tagButtons.length || !items.length) return;

    tagButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const tag = btn.dataset.tagFilter;
        tagButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        items.forEach(item => {
          const tags = (item.dataset.tags || '').split(',').map(t => t.trim());
          if (tag === 'all' || tags.includes(tag)) item.classList.remove('is-hidden');
          else item.classList.add('is-hidden');
        });
        const counter = document.getElementById('tag-result-count');
        if (counter) {
          const visible = document.querySelectorAll('[data-tags]:not(.is-hidden)').length;
          counter.textContent = visible;
        }
      });
    });
  }

  // ---------- 全局搜索：Pagefind ----------
  function setupPagefind() {
    const modal = document.getElementById('pagefind-modal');
    const mount = document.getElementById('pagefind-search');
    if (!modal || !mount) return;

    let inited = false;
    let unavailableShown = false;
    let previousFocus = null;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function open() {
      if (!modal.hidden) {
        const input = modal.querySelector('.pagefind-ui__search-input');
        if (input) input.focus();
        else modal.querySelector('[data-pagefind-close]')?.focus();
        return;
      }
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (!inited && window.PagefindUI) {
        new window.PagefindUI({
          element: '#pagefind-search',
          showImages: false,
          showSubResults: true,
          excerptLength: 25,
          resetStyles: false,
          translations: (getCurrentLang() === 'en') ? {
            placeholder: 'Search posts, notes, TILs...',
            zero_results: 'No results for "[SEARCH_TERM]"'
          } : {
            placeholder: '搜索博客 / 笔记 / TIL...',
            zero_results: '没有匹配 "[SEARCH_TERM]" 的内容'
          }
        });
        inited = true;
      } else if (!inited && !window.PagefindUI && !unavailableShown) {
        const isEn = getCurrentLang() === 'en';
        mount.innerHTML = '<div class="pagefind-unavailable" role="status">'
          + '<span class="mono small subtle">// pagefind index unavailable</span>'
          + '<p>' + (isEn
            ? 'Search is not available in this local preview because the Pagefind index has not been generated yet.'
            : '当前本地预览尚未生成 Pagefind 搜索索引，因此全站搜索暂不可用。') + '</p>'
          + '<p class="mono small subtle">' + (isEn
            ? 'Run: bundle exec jekyll build && npx --yes pagefind@latest --site _site --output-subdir pagefind'
            : '请运行：bundle exec jekyll build && npx --yes pagefind@latest --site _site --output-subdir pagefind') + '</p>'
          + '</div>';
        unavailableShown = true;
      }
      // Focus input after UI mounts
      setTimeout(() => {
        const input = modal.querySelector('.pagefind-ui__search-input');
        if (input) input.focus();
        else modal.querySelector('[data-pagefind-close]')?.focus();
      }, 100);
    }

    function close() {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
      previousFocus = null;
    }

    // 关闭按钮 / 背景点击
    modal.querySelectorAll('[data-pagefind-close]').forEach(el => {
      el.addEventListener('click', close);
    });

    // 键盘快捷键
    document.addEventListener('keydown', e => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) { e.preventDefault(); open(); return; }
      if (e.key === 'Escape' && !modal.hidden) close();
      if (e.key === 'Tab' && !modal.hidden) {
        const focusables = Array.from(modal.querySelectorAll(focusableSelector))
          .filter(el => el.offsetParent !== null || el === document.activeElement);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === '/' && !modal.hidden === false) {
        // 仅当不在输入框时，斜杠也能打开搜索
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault();
          open();
        }
      }
    });

    // 暴露给侧边栏触发按钮
    document.querySelectorAll('[data-open-search]').forEach(btn => {
      btn.addEventListener('click', e => { e.preventDefault(); open(); });
    });
  }

  // ---------- Sidenotes（Tufte 风边注） ----------
  // 把 kramdown 渲染的标准脚注 [^1] 在桌面端搬到右侧空白边距
  function setupSidenotes() {
    const article = document.querySelector('.post-content');
    if (!article) return;

    // kramdown 产物：
    //   inline marker → <sup id="fnref:1"><a href="#fn:1" class="footnote">1</a></sup>
    //   底部 footnotes → <div class="footnotes"><ol><li id="fn:1"><p>...<a class="reversefootnote">↩</a></p></li></ol></div>
    const markers = article.querySelectorAll('sup[id^="fnref"]');
    const footnotesDiv = article.querySelector('.footnotes');
    if (!markers.length || !footnotesDiv) return;

    markers.forEach((marker, idx) => {
      // 从 marker 的 a.footnote 找到对应的 #fn:N
      const link = marker.querySelector('a.footnote, a[href^="#fn"]');
      if (!link) return;
      const targetId = link.getAttribute('href').replace('#', '');
      const fnLi = footnotesDiv.querySelector('#' + CSS.escape(targetId));
      if (!fnLi) return;

      // 抽取脚注正文（去掉那个回跳箭头）
      const clone = fnLi.cloneNode(true);
      const back = clone.querySelector('.reversefootnote');
      if (back) back.remove();

      // 构造 sidenote 元素
      const note = document.createElement('span');
      note.className = 'sidenote';
      note.innerHTML =
        '<span class="sidenote-number">' + (idx + 1) + '.</span>' +
        clone.innerHTML.trim();

      // 插到 marker 后面（marker 本身保留作为 anchor）
      marker.insertAdjacentElement('afterend', note);

      // 移动端：点击 marker 切换 sidenote 展开
      marker.addEventListener('click', e => {
        if (window.innerWidth >= 1100) return; // 桌面端不拦截，让原跳转行为生效
        e.preventDefault();
        note.classList.toggle('is-expanded');
      });
    });
  }

  // ---------- 搜索（语言敏感） ----------
  function setupSearch() {
    const input = document.getElementById('search-input');
    const items = document.querySelectorAll('[data-search]');
    if (!input || !items.length) return;
    input.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      const currentLang = getCurrentLang();
      let visible = 0;
      items.forEach(item => {
        const text = (item.dataset.search || '').toLowerCase();
        const itemLang = item.getAttribute('data-post-lang') || 'zh';
        const matchSearch = !q || text.includes(q);
        const matchLang   = itemLang === currentLang;
        if (matchSearch) { item.classList.remove('is-hidden'); }
        else { item.classList.add('is-hidden'); }
        // 同时受语言过滤影响（已由 filterListsByLang 设置 .lang-hidden）
        if (matchSearch && matchLang) visible++;
      });
      document.querySelectorAll('[data-search-result-count]').forEach(counter => {
        counter.textContent = visible;
      });
    });
  }

  // ---------- 打字机 ----------
  function setupTypewriter() {
    document.querySelectorAll('[data-typewriter]').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      let i = 0;
      const speed = parseInt(el.dataset.speed || '40', 10);
      const tick = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i++);
          setTimeout(tick, speed);
        }
      };
      tick();
    });
  }

  // ---------- 阅读时长精校 ----------
  function estimateReadingTime() {
    const article = document.querySelector('[data-reading-time]');
    if (!article) return;
    const text = article.innerText || '';
    const words = text.trim().split(/\s+/).length;
    const cnChars = (text.match(/[一-鿿]/g) || []).length;
    const minutes = Math.max(1, Math.round((words + cnChars) / 300));
    const target = document.getElementById('reading-time');
    if (target) target.textContent = '~ ' + minutes + ' min read';
  }

  // ---------- TOC ----------
  function slugify(text) {
    return (text || '').toLowerCase()
      .replace(/[^\w一-鿿]+/g, '-')
      .replace(/^-+|-+$/g, '').slice(0, 50);
  }

  function buildTOC() {
    const container = document.getElementById('post-toc');
    const content = document.querySelector('.post-content');
    if (!container || !content) return;
    const headings = content.querySelectorAll('h2, h3');
    if (headings.length < 3) return;

    const frag = document.createDocumentFragment();
    const head = document.createElement('div');
    head.className = 'toc-head';
    head.innerHTML = '<span class="mono small subtle">CONTENTS · ' + headings.length + ' 节</span>'
                  + '<button class="toc-toggle mono small" type="button" aria-expanded="true">收起 ▴</button>';
    frag.appendChild(head);

    const list = document.createElement('ol');
    list.className = 'toc-list';
    const usedIds = new Set();
    headings.forEach((h, i) => {
      let id = h.id;
      if (!id || usedIds.has(id)) {
        id = slugify(h.textContent) || ('section-' + (i + 1));
        let unique = id, n = 2;
        while (usedIds.has(unique)) { unique = id + '-' + n++; }
        id = unique;
        h.id = id;
      }
      usedIds.add(id);
      const li = document.createElement('li');
      li.className = 'toc-' + h.tagName.toLowerCase();
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    frag.appendChild(list);
    container.appendChild(frag);
    container.hidden = false;

    head.querySelector('.toc-toggle').addEventListener('click', e => {
      const btn = e.currentTarget;
      const collapsed = container.classList.toggle('is-collapsed');
      btn.textContent = collapsed ? '展开 ▾' : '收起 ▴';
      btn.setAttribute('aria-expanded', String(!collapsed));
    });

    if ('IntersectionObserver' in window) {
      const links = list.querySelectorAll('a');
      const byId = {};
      links.forEach(a => { byId[a.getAttribute('href').slice(1)] = a; });
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const link = byId[e.target.id];
          if (!link) return;
          if (e.isIntersecting) {
            links.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      }, { rootMargin: '-15% 0px -70% 0px' });
      headings.forEach(h => obs.observe(h));
    }
  }

  // ---------- 代码块复制按钮 ----------
  function setupCodeCopy() {
    const blocks = document.querySelectorAll('.highlight, .post-content pre');
    blocks.forEach(block => {
      if (block.querySelector('.code-copy-btn')) return;
      if (block.tagName === 'PRE' && block.closest('.highlight')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', '复制代码 / Copy code');
      btn.innerHTML = '<span class="i18n i18n-zh">复制</span><span class="i18n i18n-en">Copy</span>';

      const cs = window.getComputedStyle(block);
      if (cs.position === 'static') block.style.position = 'relative';

      block.appendChild(btn);

      btn.addEventListener('click', async () => {
        const codeEl = block.querySelector('code') || block;
        const text = codeEl.innerText || codeEl.textContent || '';
        try {
          await navigator.clipboard.writeText(text);
          btn.classList.add('is-copied');
          btn.innerHTML = '<span class="i18n i18n-zh">已复制 ✓</span><span class="i18n i18n-en">Copied ✓</span>';
          setTimeout(() => {
            btn.classList.remove('is-copied');
            btn.innerHTML = '<span class="i18n i18n-zh">复制</span><span class="i18n i18n-en">Copy</span>';
          }, 1500);
        } catch (e) {
          btn.textContent = 'Error';
          setTimeout(() => {
            btn.innerHTML = '<span class="i18n i18n-zh">复制</span><span class="i18n i18n-en">Copy</span>';
          }, 1500);
        }
      });
    });
  }

  // ---------- 文章分享按钮（中英文双套）----------
  function setupShare() {
    const container = document.getElementById('post-share');
    if (!container) return;

    const url = location.href;
    const u = encodeURIComponent(url);
    const titleRaw = document.title;
    const title = encodeURIComponent(titleRaw);

    // ===== 中文平台 =====
    // 微博：唯一有真实分享 URL 的
    const weiboBtn = container.querySelector('[data-share="weibo"]');
    if (weiboBtn) {
      weiboBtn.href = `https://service.weibo.com/share/share.php?url=${u}&title=${title}`;
    }

    // 其他平台都是"复制 + 去对应 App 粘贴"模式
    const copyToPlatform = (selector, platformName) => {
      const btn = container.querySelector(selector);
      if (!btn) return;
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(url);
          btn.classList.add('is-copied');
          const orig = btn.innerHTML;
          btn.innerHTML = `<span>已复制，去${platformName}粘贴 ✓</span>`;
          setTimeout(() => {
            btn.classList.remove('is-copied');
            btn.innerHTML = orig;
          }, 2000);
        } catch (err) {}
      });
    };
    copyToPlatform('[data-share="xhs"]',    '小红书');
    copyToPlatform('[data-share="wechat"]', '微信');
    copyToPlatform('[data-share="mp"]',     '公众号');
    copyToPlatform('[data-share="zhihu"]',  '知乎');
    copyToPlatform('[data-share="juejin"]', '掘金');
    copyToPlatform('[data-share="csdn"]',   'CSDN');

    // ===== 英文平台 =====
    const twitterBtn = container.querySelector('[data-share="twitter"]');
    if (twitterBtn) {
      twitterBtn.href = `https://twitter.com/intent/tweet?text=${title}&url=${u}`;
    }
    const linkedinBtn = container.querySelector('[data-share="linkedin"]');
    if (linkedinBtn) {
      linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    }
    const redditBtn = container.querySelector('[data-share="reddit"]');
    if (redditBtn) {
      redditBtn.href = `https://reddit.com/submit?url=${u}&title=${title}`;
    }

    // ===== 通用 =====
    // Email（两套都有）
    container.querySelectorAll('[data-share="email"]').forEach(btn => {
      const subject = title;
      const body = encodeURIComponent(`${titleRaw}\n${url}`);
      btn.href = `mailto:?subject=${subject}&body=${body}`;
    });

    // Copy link（两套都有）
    container.querySelectorAll('[data-share="copy"]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(url);
          btn.classList.add('is-copied');
          const orig = btn.innerHTML;
          const isZh = getCurrentLang() !== 'en';
          btn.innerHTML = isZh ? '<span>已复制 ✓</span>' : '<span>Copied ✓</span>';
          setTimeout(() => {
            btn.classList.remove('is-copied');
            btn.innerHTML = orig;
          }, 1500);
        } catch (err) {}
      });
    });

    // Native share (mobile)
    container.querySelectorAll('[data-share="native"]').forEach(btn => {
      if (navigator.share) {
        btn.style.display = '';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          navigator.share({ title: titleRaw, url: url }).catch(() => {});
        });
      } else {
        btn.style.display = 'none';
      }
    });
  }

  // ---------- 启动 ----------
  applyLang(getStoredLang());

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(getStoredLang());
    setupLangToggle();
    highlightNav();
    setupSidebarToggle();
    setupTagFilter();
    setupSearch();
    setupTypewriter();
    estimateReadingTime();
    buildTOC();
    setupCodeCopy();
    setupShare();
    setupSidenotes();
    setupPagefind();
  });

})();
