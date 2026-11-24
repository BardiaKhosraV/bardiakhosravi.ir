(function () {
  var fallbackArticles = [
    {
      id: 'persian-couplets',
      number: '01',
      badge: '01 / LITERATURE',
      category: 'Persian Literature',
      format: 'Editorial Guide · Persian',
      title: 'Fifty Timeless Persian Couplets',
      subtitle: 'From everyday proverbs to famous misreadings',
      description:
        'A curated editorial guide to 50 widely quoted Persian couplets by Saadi, Saeb, Hafez, Rumi, and Ferdowsi — featuring proverb-share data and commonly misread verses.',
      url: '/articles/persian-couplets/'
    },
    {
      id: 'shahnameh',
      number: '02',
      badge: '02 / CLASSICS',
      category: 'Classical Texts',
      format: 'Illustrated Edition · Persian',
      title: 'Shahnameh of Ferdowsi',
      subtitle: 'Story-by-story illustrated & full-text web edition',
      description:
        'An interactive edition of Hakim Abolqasem Ferdowsi\u2019s Shahnameh with Safavid miniature artwork, guided story mode, full-text reader, and reading progress tracking.',
      url: '/shahnameh/'
    }
  ];

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // 1. Populate the static #articles grid synchronously before first paint
  function renderArticleCards() {
    var grid = document.getElementById('bk-articles-grid');
    if (!grid || grid.children.length > 0) return;

    var articles =
      Array.isArray(window.SITE_ARTICLES) && window.SITE_ARTICLES.length
        ? window.SITE_ARTICLES.slice(0, 4)
        : fallbackArticles;

    grid.innerHTML = articles
      .map(function (item) {
        return (
          '<a class="bk-article-card" href="' + escapeHtml(item.url) + '">' +
            '<div>' +
              '<div class="bk-card-top">' +
                '<span class="bk-card-badge">' + escapeHtml(item.badge) + '</span>' +
                '<span class="bk-card-cat">' + escapeHtml(item.category) + '</span>' +
              '</div>' +
              '<h3 class="bk-card-title">' + escapeHtml(item.title) + '</h3>' +
              (item.subtitle ? '<p class="bk-card-subtitle">' + escapeHtml(item.subtitle) + '</p>' : '') +
              '<p class="bk-card-desc">' + escapeHtml(item.description) + '</p>' +
            '</div>' +
            '<div class="bk-card-footer">' +
              '<span class="bk-card-cta">' +
                '<span>Read article</span>' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>' +
              '</span>' +
              '<span class="bk-card-meta">' + escapeHtml(item.format || 'HTML') + '</span>' +
            '</div>' +
          '</a>'
        );
      })
      .join('');
  }

  // 2. Configure hero video: poster, non-blocking preload, and prefers-reduced-motion pause/resume
  function configureHeroVideo(video) {
    if (!video || video.dataset.bkConfigured) return;
    video.dataset.bkConfigured = '1';
    video.setAttribute('poster', '/hero-poster.webp');

    var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    function applyMotionPreference() {
      if (mq && mq.matches) {
        video.setAttribute('preload', 'none');
        video.removeAttribute('autoplay');
        video.pause();
      } else {
        video.setAttribute('preload', 'metadata');
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {});
        }
      }
    }

    applyMotionPreference();
    if (mq) {
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', applyMotionPreference);
      } else if (typeof mq.addListener === 'function') {
        mq.addListener(applyMotionPreference);
      }
    }
  }

  // 3. Add consistent "Articles" nav item once React mounts the header
  function mountArticlesNav(nav) {
    if (!nav || nav.querySelector('[data-bk-nav="articles"]')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-bk-nav', 'articles');
    btn.textContent = 'Articles';
    btn.style.color = 'rgba(225, 224, 204, 0.8)';
    btn.className =
      'text-[10px] sm:text-xs md:text-sm font-normal tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap focus:outline-none';
    btn.addEventListener('mouseenter', function () {
      btn.style.color = '#E1E0CC';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.color = 'rgba(225, 224, 204, 0.8)';
    });
    btn.addEventListener('click', function () {
      var target = document.getElementById('articles');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
    var lastBtn = nav.lastElementChild;
    if (lastBtn) {
      nav.insertBefore(btn, lastBtn);
    } else {
      nav.appendChild(btn);
    }
  }

  // 4. Clean Connect modal on user interaction (no persistent MutationObserver)
  function enhanceConnectModal() {
    var forms = document.querySelectorAll('#root .bg-\\[\\#121212\\] form');
    forms.forEach(function (form) {
      var modal = form.closest('.bg-\\[\\#121212\\]');
      if (!modal) return;
      if (!modal.querySelector('.bk-connect-note')) {
        var note = document.createElement('p');
        note.className = 'bk-connect-note';
        note.textContent = 'Direct email or LinkedIn is the best way to reach me.';
        form.parentNode.insertBefore(note, form);
      }
      form.remove();
    });
  }

  // 5. One-shot post-mount integration (places pre-built #articles before footer, configures hero video & nav, then stops)
  var attempts = 0;
  function integrateAfterReactMount() {
    var footer = document.querySelector('#root footer');
    var nav = document.querySelector('#root header nav');
    var video = document.querySelector('#hero video');
    var articlesSection = document.getElementById('articles');

    if (video) configureHeroVideo(video);
    if (nav) mountArticlesNav(nav);
    if (footer && articlesSection && articlesSection.parentNode !== footer.parentNode) {
      footer.parentNode.insertBefore(articlesSection, footer);
    }

    if (footer && nav && video) {
      // Support legacy /#writings hash links cleanly
      if (window.location.hash === '#writings' && articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'auto' });
      }
      return;
    }

    if (attempts++ < 60) {
      window.requestAnimationFrame(integrateAfterReactMount);
    }
  }

  renderArticleCards();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', integrateAfterReactMount, { once: true });
  } else {
    integrateAfterReactMount();
  }

  // Clean up dead contact form only when user interacts (clicks Connect / Contact / Inquire)
  document.addEventListener('click', function () {
    window.requestAnimationFrame(enhanceConnectModal);
  });
})();
