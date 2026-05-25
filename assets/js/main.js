/* ============================================
   博客主交互脚本
   ============================================ */

(function() {
  'use strict';

  // ---------- 自动高亮当前导航 ----------
  function highlightNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
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

        // 切换激活态
        tagButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 筛选项目
        items.forEach(item => {
          const tags = (item.dataset.tags || '').split(',').map(t => t.trim());
          if (tag === 'all' || tags.includes(tag)) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });

        // 更新计数
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

  // ---------- 阅读时间估算 ----------
  function estimateReadingTime() {
    const article = document.querySelector('[data-reading-time]');
    if (!article) return;
    const text = article.innerText || '';
    const words = text.trim().split(/\s+/).length;
    const cnChars = (text.match(/[一-龥]/g) || []).length;
    const minutes = Math.max(1, Math.round((words + cnChars) / 300));
    const target = document.getElementById('reading-time');
    if (target) target.textContent = minutes + ' min read';
  }

  // ---------- 启动 ----------
  document.addEventListener('DOMContentLoaded', () => {
    highlightNav();
    setupTagFilter();
    setupSearch();
    setupTypewriter();
    estimateReadingTime();
  });

})();
