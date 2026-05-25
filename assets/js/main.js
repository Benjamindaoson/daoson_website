/* ============================================
   博客主交互脚本
   ============================================ */

(function() {
  'use strict';

  // ---------- 自动高亮当前导航 ----------
  function highlightNav() {
    let path = location.pathname.replace(/\/$/, '');
    const segments = path.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || '';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/\/$/, '');
      const linkLast = href.split('/').filter(Boolean).pop() || '';
      if (linkLast === last || (last === '' && (href === '' || href === '/' || linkLast === 'home'))) {
        link.classList.add('active');
      }
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
          if (tag === 'all' || tags.includes(tag)) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
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
        if (!q || text.includes(q)) {
          item.classList.remove('is-hidden');
          visible++;
        } else {
          item.classList.add('is-hidden');
        }
      });
      const counter = document.getElementById('search-result-count');
      if (counter) counter.textContent = visible;
    });
  }

  // ---------- 终端打字机效果 ----------
  function setupTypewriter() {
    const targets = document.querySelectorAll('[data-typewriter]');
    targets.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      let i = 0;
      const speed = parseInt(el.dataset.speed || '40', 10);
      const tick = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
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

  // ---------- 自动生成 TOC ----------
  function slugify(text) {
    return (text || '')
      .toLowerCase()
      .replace(/[^\w一-鿿]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50);
  }

  function buildTOC() {
    const container = document.getElementById('post-toc');
    const content = document.querySelector('.post-content');
    if (!container || !content) return;

    const headings = content.querySelectorAll('h2, h3');
    if (headings.length < 3) return;

    const fragment = document.createDocumentFragment();

    const head = document.createElement('div');
    head.className = 'toc-head';
    head.innerHTML = '<span class="mono small subtle">CONTENTS · ' + headings.length + ' 节</span>'
                  + '<button class="toc-toggle mono small" type="button" aria-expanded="true">收起 ▴</button>';
    fragment.appendChild(head);

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

    fragment.appendChild(list);
    container.appendChild(fragment);
    container.hidden = false;

    // 折叠/展开
    const toggle = head.querySelector('.toc-toggle');
    toggle.addEventListener('click', () => {
      const collapsed = container.classList.toggle('is-collapsed');
      toggle.textContent = collapsed ? '展开 ▾' : '收起 ▴';
      toggle.setAttribute('aria-expanded', String(!collapsed));
    });

    // 滚动高亮当前章节
    if ('IntersectionObserver' in window) {
      const links = list.querySelectorAll('a');
      const linkById = {};
      links.forEach(a => { linkById[a.getAttribute('href').slice(1)] = a; });

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const link = linkById[e.target.id];
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

  // ---------- 启动 ----------
  document.addEventListener('DOMContentLoaded', () => {
    highlightNav();
    setupTagFilter();
    setupSearch();
    setupTypewriter();
    estimateReadingTime();
    buildTOC();
  });

})();
