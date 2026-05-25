/* ============================================
   博客主交互脚本
   ============================================ */

(function() {
  'use strict';

  // ---------- i18n 语言切换 ----------
  function getStoredLang() {
    try {
      return localStorage.getItem('site-lang') || 'zh';
    } catch (e) { return 'zh'; }
  }

  function setStoredLang(lang) {
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }

  function applyLang(lang) {
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh';
  }

  function setupLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = document.documentElement.lang || 'zh';
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
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!toggle || !sidebar) return;

    function open() {
      sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-shown');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-shown');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

  // ---------- 搜索 ----------
  function setupSearch() {
    const input = document.getElementById('search-input');
    const items = document.querySelectorAll('[data-search]');
    if (!input || !items.length) return;
    input.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      let visible = 0;
      items.forEach(item => {
        const text = (item.dataset.search || '').toLowerCase();
        if (!q || text.includes(q)) { item.classList.remove('is-hidden'); visible++; }
        else item.classList.add('is-hidden');
      });
      const counter = document.getElementById('search-result-count');
      if (counter) counter.textContent = visible;
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
      // 防止重复注入
      if (block.querySelector('.code-copy-btn')) return;
      // 如果是 pre 但被 .highlight 包裹，跳过 pre（避免重复）
      if (block.tagName === 'PRE' && block.closest('.highlight')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', '复制代码 / Copy code');
      btn.innerHTML = '<span class="i18n i18n-zh">复制</span><span class="i18n i18n-en">Copy</span>';

      // 确保容器是 position: relative
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

  // ---------- 文章分享按钮 ----------
  function setupShare() {
    const container = document.getElementById('post-share');
    if (!container) return;

    const url = location.href;
    const title = document.title;

    // Twitter / X
    const twitterBtn = container.querySelector('[data-share="twitter"]');
    if (twitterBtn) {
      const text = encodeURIComponent(title);
      const u = encodeURIComponent(url);
      twitterBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${u}`;
    }

    // Email
    const emailBtn = container.querySelector('[data-share="email"]');
    if (emailBtn) {
      const subject = encodeURIComponent(title);
      const body = encodeURIComponent(`${title}\n${url}`);
      emailBtn.href = `mailto:?subject=${subject}&body=${body}`;
    }

    // Copy Link
    const copyBtn = container.querySelector('[data-share="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(url);
          copyBtn.classList.add('is-copied');
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<span class="i18n i18n-zh">已复制链接 ✓</span><span class="i18n i18n-en">Link copied ✓</span>';
          setTimeout(() => {
            copyBtn.classList.remove('is-copied');
            copyBtn.innerHTML = originalHTML;
          }, 1500);
        } catch (err) {}
      });
    }

    // Web Share API (mobile native share sheet)
    const nativeBtn = container.querySelector('[data-share="native"]');
    if (nativeBtn) {
      if (navigator.share) {
        nativeBtn.style.display = '';
        nativeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          navigator.share({ title: title, url: url }).catch(() => {});
        });
      } else {
        nativeBtn.style.display = 'none';
      }
    }
  }

  // ---------- 启动 ----------
  // 在 DOMContentLoaded 之前应用语言（防止闪烁）
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
  });

})();
