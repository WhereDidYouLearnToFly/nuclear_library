document.addEventListener('DOMContentLoaded', function () {
  const path   = location.pathname;
  const params = new URLSearchParams(location.search);

  // ── Language detection ────────────────────────────────────────────────────
  // Blog pages live under /en/ /fr/ /ru/ /ua/
  // Tool pages live at /table/ /powerplants/ /detonations/ and use ?lang=
  const pathLangMatch = path.match(/^\/(en|fr|ru|ua)\//);
  const LANG     = pathLangMatch ? pathLangMatch[1] : (params.get('lang') || 'en');
  const isBlogPage = !!pathLangMatch;

  // ── Translations (nav-level text only) ───────────────────────────────────
  const TR = {
    en: {
      home: 'HOME', articles: 'ARTICLES', about: 'ABOUT',
      interactive: 'INTERACTIVE //',
      table: 'NUCLIDE TABLE', plants: 'POWER PLANT MAP',
      detonations: 'DETONATIONS MAP', incidents: 'INCIDENTS MAP', experiments: 'EXPERIMENTS',
      footer: 'NUCLEAR PHYSICS EDUCATIONAL TERMINAL',
      about_link: 'ABOUT',
    },
    fr: {
      home: 'ACCUEIL', articles: 'ARTICLES', about: 'À PROPOS',
      interactive: 'INTERACTIF //',
      table: 'TABLE DES NUCLÉIDES', plants: 'CARTE CENTRALES',
      detonations: 'CARTE DÉTONATIONS', incidents: 'CARTE INCIDENTS', experiments: 'EXPÉRIENCES',
      footer: 'TERMINAL ÉDUCATIF DE PHYSIQUE NUCLÉAIRE',
      about_link: 'À PROPOS',
    },
    ru: {
      home: 'ГЛАВНАЯ', articles: 'СТАТЬИ', about: 'О ПРОЕКТЕ',
      interactive: 'ИНТЕРАКТИВНО //',
      table: 'ТАБЛИЦА НУКЛИДОВ', plants: 'КАРТА РЕАКТОРОВ',
      detonations: 'КАРТА ДЕТОНАЦИЙ', incidents: 'КАРТА ИНЦИДЕНТОВ', experiments: 'ЭКСПЕРИМЕНТЫ',
      footer: 'ОБРАЗОВАТЕЛЬНЫЙ ТЕРМИНАЛ ЯДЕРНОЙ ФИЗИКИ',
      about_link: 'О ПРОЕКТЕ',
    },
    ua: {
      home: 'ГОЛОВНА', articles: 'СТАТТІ', about: 'ПРО ПРОЄКТ',
      interactive: 'ІНТЕРАКТИВНО //',
      table: 'ТАБЛИЦЯ НУКЛІДІВ', plants: 'КАРТА РЕАКТОРІВ',
      detonations: 'КАРТА ДЕТОНАЦІЙ', incidents: 'КАРТА ІНЦИДЕНТІВ', experiments: 'ЕКСПЕРИМЕНТИ',
      footer: 'ОСВІТНІЙ ТЕРМІНАЛ ЯДЕРНОЇ ФІЗИКИ',
      about_link: 'ПРО ПРОЄКТ',
    },
  };
  const tr = TR[LANG] || TR.en;

  // ── Active page detection ─────────────────────────────────────────────────
  const active =
    path.includes('/table/')        ? 'table'       :
    path.includes('/powerplants/')  ? 'plants'      :
    path.includes('/detonations/')  ? 'detonations' :
    path.includes('/incidents/')    ? 'incidents'   :
    path.includes('/experiments')   ? 'experiments' :
    path.includes('/articles/')     ? 'articles'    :
    path.includes('/about')         ? 'about'       : 'home';

  // ── Link helpers ──────────────────────────────────────────────────────────
  // Language switcher: blog pages swap the lang prefix; tool pages swap ?lang=
  function langHref(lang) {
    if (isBlogPage) {
      return path.replace(/^\/(en|fr|ru|ua)\//, '/' + lang + '/');
    }
    const u = new URL(location.href);
    if (lang === 'en') u.searchParams.delete('lang');
    else u.searchParams.set('lang', lang);
    return u.pathname + (u.search || '');
  }

  // Tool links carry the current language so the tool opens pre-translated
  function toolHref(toolPath) {
    const suffix = LANG !== 'en' ? '?lang=' + LANG : '';
    return toolPath + suffix;
  }

  function a(page, href, label) {
    const cls = active === page ? ' class="active"' : '';
    return `<a href="${href}"${cls} data-page="${page}">${label}</a>`;
  }

  // ── Lang switcher HTML ────────────────────────────────────────────────────
  const langSwitcher = ['en', 'fr', 'ua', 'ru'].map(lang => {
    const cls = lang === LANG ? ' class="active"' : '';
    return `<a href="${langHref(lang)}"${cls}>${lang.toUpperCase()}</a>`;
  }).join('');

  // ── Header ────────────────────────────────────────────────────────────────
  const headerHTML = `
<header>
  <div class="header-top">
    <a class="site-title" href="/${LANG}/index.html"><span class="bracket">[</span>ISOTOPEDIA<span class="bracket">]</span></a>
    <div class="lang-switcher">${langSwitcher}</div>
  </div>
  <nav>
    ${a('home',        '/' + LANG + '/index.html',          tr.home)}
    ${a('about',       '/' + LANG + '/about.html',          tr.about)}
  </nav>
  <nav class="nav-tools">
    ${a('table',       toolHref('/table/index.html'),        tr.table)}
    ${a('plants',      toolHref('/powerplants/index.html'),  tr.plants)}
    ${a('detonations', toolHref('/detonations/index.html'),  tr.detonations)}
    ${a('incidents',   toolHref('/incidents/index.html'),    tr.incidents)}
    ${a('experiments', '/' + LANG + '/experiments.html',      tr.experiments)}
  </nav>
</header>`;

  // ── Footer ────────────────────────────────────────────────────────────────
  const footerHTML = `
<footer>
  <span>ISOTOPEDIA // ${tr.footer}</span>
  <div class="visit-counter" id="visit-counter" style="display:none">
    <span class="vc-icon">&#9762;</span>
    <span class="vc-num" id="vc-num">000000</span>
  </div>
  <span><a href="/${LANG}/about.html">${tr.about_link}</a></span>
</footer>`;

  // ── Inject ────────────────────────────────────────────────────────────────
  document.documentElement.lang = LANG === 'ua' ? 'uk' : LANG;

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.outerHTML = headerHTML;
  if (footerEl) footerEl.outerHTML = footerHTML;

  // ── GoatCounter tracking ──────────────────────────────────────────────────
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

  var gc = document.createElement('script');
  gc.async = true;
  gc.setAttribute('data-goatcounter', 'https://isotopedia-ca.goatcounter.com/count');
  gc.src = '//gc.zgo.at/count.js';
  document.head.appendChild(gc);

  // ── Visitor counter (same-origin PHP, no CORS) ────────────────────────────
  fetch('/counter.php')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var el  = document.getElementById('vc-num');
      var box = document.getElementById('visit-counter');
      if (!el || !box) return;
      box.style.display = 'flex';
      var target = d.count || 0;
      var start  = Date.now();
      var dur    = 1000;
      (function tick() {
        var p = Math.min((Date.now() - start) / dur, 1);
        var v = Math.round((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = String(v).padStart(6, '0');
        if (p < 1) requestAnimationFrame(tick);
      })();
    })
    .catch(function() {});
});
