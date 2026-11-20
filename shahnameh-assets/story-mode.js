
(function () {
  "use strict";
  var S = JSON.parse(document.getElementById("shData").textContent).sections;
  var FAMOUS = [[1, 13], [2, 7], [2, 3], [1, 0], [3, 3], [131, 8], [557, 65], [52, 108], [13, 71], [24, 1]];

  /* Corrected standard Persian orthography for all titles */
  var TITLE_FIX = {
    "کیومرس": "کیومرث",
    "تهمورس": "طهمورث",
    "زوتهماسپ": "زو طهماسب",
    "گرشاسپ": "گرشاسب",
    "کی کاووس": "کی‌کاووس",
    "هفتخوان رستم": "هفت‌خوان رستم",
    "داستان بیژن با منیژه": "داستان بیژن و منیژه",
    "داستان دورازده رخ": "داستان دوازده رخ",
    "پادشاهی لهراسپ": "پادشاهی لهراسب",
    "پادشاهی گشتاسپ": "پادشاهی گشتاسب",
    "هفتخوان اسفندیار": "هفت‌خوان اسفندیار",
    "پادشاهی همای چهر آزاد": "پادشاهی همای چهرآزاد",
    "پادشاهی یزدگرد بزه": "پادشاهی یزدگرد بزه‌گر",
    "پادشاهی قباد مشهور بشیرویه": "پادشاهی قباد مشهور به شیرویه",
    "پادشاهی اردشیر شیروی": "پادشاهی اردشیر شیرویه",
    "پادشاهی آزرم دخت": "پادشاهی آزرمی‌دخت"
  };
  function dispTitle(t) { return TITLE_FIX[t] || t; }

  var META = {
    "آغاز کتاب": "ستایش خرد، آفرینش جهان و راز ساخته شدن شاهنامه",
    "کیومرس": "نخستین شاه جهان، در کوه و با جامهٔ پلنگ",
    "هوشنگ": "جرقهٔ سنگ و کشف آتش",
    "تهمورس": "شاهی که دیوان را به بند کشید",
    "جمشید": "اوج شکوه، و غروری که همه‌چیز را از او گرفت",
    "ضحاک": "دو مار بر شانه‌ها و آغاز سیاه‌ترین روزگار",
    "فریدون": "کاوهٔ آهنگر درفش برمی‌افرازد",
    "منوچهر": "کین‌خواهی و آغاز عصر پهلوانان",
    "زال و رودابه": "پسری سپیدموی، سیمرغ و عشقی که همه مخالفش بودند",
    "نوذر": "شاهی ناتوان و سر برآوردن افراسیاب",
    "افراسیاب": "بزرگ‌ترین دشمن ایران پا به میدان می‌گذارد",
    "زوتهماسپ": "روزگاری کوتاه میان دو توفان",
    "گرشاسپ": "پادشاهی کوتاه در سال‌های سخت",
    "کیقباد": "از البرز تا تخت؛ آغاز دودمان کیانی",
    "کی کاووس": "هوس آسمان، مازندران و دیو سپید",
    "هفتخوان رستم": "هفت آزمون: شیر، بیابان، اژدها، جادو و دیو سپید",
    "رستم و سهراب": "تراژدی پدر و پسری که هرگز یکدیگر را نشناختند",
    "سیاوش": "پاکی که از آتش گذشت",
    "پادشاهی کیخسرو": "بازگشت شاهزادهٔ ناپیدا و انتقام خون سیاوش",
    "داستان کاموس کشانی": "نبرد با پهلوانی که کوه را جابه‌جا می‌کرد",
    "داستان خاقان چین": "رویارویی کیخسرو با خاقان چین",
    "داستان اکوان دیو": "رستم و دیوی که گورخر شد",
    "داستان بیژن با منیژه": "عشق، چاه و بند؛ و رستمی که باید برسد",
    "داستان دورازده رخ": "نبرد دوازده پهلوان ایران و توران",
    "جنگ بزرگ کیخسرو با افراسیاب": "آخرین و بزرگ‌ترین رویارویی دو شاه",
    "پادشاهی لهراسپ": "شاهی بی‌شکوه و روزگار گذار",
    "پادشاهی گشتاسپ": "ظهور زرتشت و دین تازه",
    "هفتخوان اسفندیار": "هفت خوان روئین‌تنی که رستم نداشت",
    "داستان رستم و اسفندیار": "روئین‌تن در برابر جهان‌پهلوان",
    "داستان رستم و شغاد": "خیانت برادر و چاهی پر از نیزه",
    "پادشاهی بهمن اسفندیار": "کین‌خواهی بهمن برای پدر",
    "پادشاهی همای چهر آزاد": "بانویی که تاج بر سر گذاشت",
    "پادشاهی داراب": "کودکی در صندوق بر آب",
    "پادشاهی دارای داراب": "آخرین شاه کیانی و ورود اسکندر",
    "پادشاهی اسکندر": "جهانگشایی که تا ظلمات رفت",
    "پادشاهی اشکانیان": "روزگاری کم‌گفته میان دو شاهنشاهی",
    "داستان هفتواد و سرگذشت کرم": "کرمی که سرنوشت یک شهر شد",
    "پادشاهی ساسانیان": "اردشیر و بنیاد شاهنشاهی تازه",
    "پادشاهی یزدگرد بزه": "شاهی سخت‌گیر و پایانی عجیب",
    "پادشاهی بهرام گور": "شکارچی، عاشق و شاهی سرزنده",
    "پادشاهی یزدگرد پسر بهرام گور": "جانشین بهرام",
    "پادشاهی پیروز": "شاهی که در جنگ راه گم کرد",
    "پادشاهی بلاش": "پادشاهی کوتاه و آرام",
    "پادشاهی قباد": "مزدک، شورش و آشفتگی",
    "پادشاهی انوشیروان": "عدل، بزرگمهر و بازی شطرنج",
    "پادشاهی هرمزد": "شاهی در سایهٔ بهرام چوبین",
    "پادشاهی خسرو پرویز": "شکوه، شیرین و فروپاشی تدریجی",
    "داستان خسرو و شیرین": "عشق شاه و شیرین",
    "پادشاهی قباد مشهور بشیرویه": "شاهی که پدر را به زندان انداخت",
    "پادشاهی اردشیر شیروی": "کودک‌شاهی در روزگار آشفته",
    "پادشاهی پوراندخت": "ملکهٔ دادگر",
    "پادشاهی آزرم دخت": "آخرین بانوی ساسانی",
    "پادشاهی یزدگرد": "غروب شاهنشاهی؛ پایان شاهنامه"
  };

  var IMGS = {"banner": "shahnameh-assets/images/banner.webp", "zahhak": {"m": "shahnameh-assets/images/zahhak-m.webp", "h": "shahnameh-assets/images/zahhak-h.webp"}, "zal": {"m": "shahnameh-assets/images/zal-m.webp", "h": "shahnameh-assets/images/zal-h.webp"}, "sohrab": {"m": "shahnameh-assets/images/sohrab-m.webp", "h": "shahnameh-assets/images/sohrab-h.webp"}, "fereydun": {"m": "shahnameh-assets/images/fereydun-m.webp", "h": "shahnameh-assets/images/fereydun-h.webp"}, "dragon": {"m": "shahnameh-assets/images/dragon-m.webp", "h": "shahnameh-assets/images/dragon-h.webp"}, "siyavash": {"m": "shahnameh-assets/images/siyavash-m.webp", "h": "shahnameh-assets/images/siyavash-h.webp"}, "keyumars": {"m": "shahnameh-assets/images/keyumars-m.webp", "h": "shahnameh-assets/images/keyumars-h.webp"}, "jamshid": {"m": "shahnameh-assets/images/jamshid-m.webp", "h": "shahnameh-assets/images/jamshid-h.webp"}, "garden": {"m": "shahnameh-assets/images/garden-m.webp", "h": "shahnameh-assets/images/garden-h.webp"}, "battle": {"m": "shahnameh-assets/images/battle-m.webp", "h": "shahnameh-assets/images/battle-h.webp"}, "wisdom": {"m": "shahnameh-assets/images/wisdom-m.webp", "h": "shahnameh-assets/images/wisdom-h.webp"}, "hunt": {"m": "shahnameh-assets/images/hunt-m.webp", "h": "shahnameh-assets/images/hunt-h.webp"}};
  var ART_MAP = {
    "ضحاک": "zahhak",
    "زال و رودابه": "zal",
    "رستم و سهراب": "sohrab",
    "فریدون": "fereydun",
    "هفتخوان رستم": "dragon",
    "تهمورس": "dragon",
    "کی کاووس": "dragon",
    "داستان اکوان دیو": "dragon",
    "هفتخوان اسفندیار": "dragon",
    "سیاوش": "siyavash",
    "هوشنگ": "siyavash",
    "پادشاهی گشتاسپ": "siyavash",
    "کیومرس": "keyumars",
    "کیقباد": "keyumars",
    "پادشاهی پیروز": "keyumars",
    "جمشید": "jamshid",
    "نوذر": "jamshid",
    "پادشاهی همای چهر آزاد": "jamshid",
    "پادشاهی ساسانیان": "jamshid",
    "پادشاهی خسرو پرویز": "jamshid",
    "پادشاهی پوراندخت": "jamshid",
    "پادشاهی آزرم دخت": "jamshid",
    "پادشاهی یزدگرد": "jamshid",
    "داستان بیژن با منیژه": "garden",
    "داستان خسرو و شیرین": "garden",
    "منوچهر": "battle",
    "افراسیاب": "battle",
    "پادشاهی کیخسرو": "battle",
    "داستان کاموس کشانی": "battle",
    "داستان خاقان چین": "battle",
    "داستان دورازده رخ": "battle",
    "جنگ بزرگ کیخسرو با افراسیاب": "battle",
    "داستان رستم و اسفندیار": "battle",
    "پادشاهی بهمن اسفندیار": "battle",
    "پادشاهی هرمزد": "battle",
    "آغاز کتاب": "wisdom",
    "زوتهماسپ": "wisdom",
    "گرشاسپ": "wisdom",
    "پادشاهی لهراسپ": "wisdom",
    "پادشاهی دارای داراب": "wisdom",
    "پادشاهی اشکانیان": "wisdom",
    "پادشاهی قباد": "wisdom",
    "پادشاهی بلاش": "wisdom",
    "پادشاهی انوشیروان": "wisdom",
    "پادشاهی یزدگرد پسر بهرام گور": "wisdom",
    "پادشاهی قباد مشهور بشیرویه": "wisdom",
    "پادشاهی اردشیر شیروی": "wisdom",
    "پادشاهی بهرام گور": "hunt",
    "پادشاهی اسکندر": "hunt",
    "پادشاهی داراب": "hunt",
    "داستان هفتواد و سرگذشت کرم": "hunt",
    "پادشاهی یزدگرد بزه": "hunt",
    "داستان رستم و شغاد": "hunt"
  };

  var ICONS = {
    feather: "M20 4c-8 0-14 5-14 12l-2 4 4-2c7 0 12-6 12-14z M8 16l8-8",
    heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
    check: "M5 12l5 5 9-10",
    next: "M15 6l-6 6 6 6",
    back: "M9 6l6 6-6 6",
    pause: "M8 5v14 M16 5v14",
    play: "M8 5v14l11-7z",
    home: "M4 11l8-7 8 7v9H4z M10 20v-6h4v6",
    bookmark: "M7 4h10v17l-5-4-5 4z",
    openbook: "M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z M12 6v14",
    lines: "M5 6h14 M5 10h14 M5 14h14 M5 18h9"
  };

  var SVG_ESLIMI = '<svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">' +
    '<path d="M44 4 H14 Q4 4 4 14 V44" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M38 10 H18 Q10 10 10 18 V38" fill="none" stroke="currentColor" stroke-width="1" opacity=".65"/>' +
    '<circle cx="17" cy="17" r="2.2" fill="currentColor"/>' +
    '</svg>';

  var SVG_SHAMSA = '<svg class="shamsa-ic" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 2 L14.5 7.5 L20.5 6.8 L16.6 11.5 L21.8 14.8 L15.8 15.6 L15.2 21.5 L12 17 L8.8 21.5 L8.2 15.6 L2.2 14.8 L7.4 11.5 L3.5 6.8 L9.5 7.5 Z" fill="currentColor"/>' +
    '<circle cx="12" cy="12" r="2.6" fill="#fbf7ec"/>' +
    '</svg>';

  function cornersHTML() {
    return ["a", "b", "c", "d"].map(function (c) {
      return '<span class="eslimi-k ' + c + '">' + SVG_ESLIMI + '</span>';
    }).join("");
  }
  function ic(n, extra) { return '<svg class="i' + (extra ? " " + extra : "") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[n] + '"/></svg>'; }
  function icFill(n) { return ic(n, "f"); }

  var ERA = ["اسطوره‌ای", "پهلوانی", "تاریخی"];
  var RANKS = [[0, "نوآموز"], [100, "پیک"], [500, "سوار"], [1500, "پهلوان"], [4000, "جهان‌پهلوان"], [10000, "دانای توس"], [25000, "هم‌سخن فردوسی"]];
  var PICKS = [
    ["رستم و سهراب", "تراژدی"],
    ["سیاوش", "آزمون آتش"],
    ["زال و رودابه", "عاشقانه"],
    ["فریدون", "قیام کاوه"]
  ];

  function fa(n) { return Number(n).toLocaleString("fa-IR"); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  var EP = [];
  S.forEach(function (s, i) {
    if (s.l === 1) EP.push({ i: i, t: s.t, dt: dispTitle(s.t), sc: [], n: 0, era: i < 48 ? 0 : (i < 445 ? 1 : 2) });
    else if (EP.length && s.b.length) { var e = EP[EP.length - 1]; e.sc.push(i); e.n += s.b.length; }
  });
  EP = EP.filter(function (e) { return e.sc.length; });

  function imgOf(e) {
    var key = ART_MAP[e.t];
    if (key && IMGS[key]) return IMGS[key];
    return e.era === 0 ? IMGS.keyumars : (e.era === 1 ? IMGS.battle : IMGS.wisdom);
  }
  function archThumb(e) {
    var im = imgOf(e);
    return '<span class="arch-thumb"><img alt="" loading="lazy" src="' + im.m + '"></span>';
  }

  var far = store.get("sm-far", {});
  var last = store.get("sm-last", null);
  var streak = store.get("sm-streak", { d: "", n: 0 });
  function bm() { return store.get("sh-bm", []); }
  function day(off) { var d = new Date(); d.setDate(d.getDate() + (off || 0)); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function touch() {
    if (streak.d === day()) return;
    streak = { d: day(), n: streak.d === day(-1) ? streak.n + 1 : 1 };
    store.set("sm-streak", streak);
  }
  function totalRead() { var t = 0; for (var k in far) t += far[k]; return t; }
  function isDone(si) { return (far[si] || 0) >= S[si].b.length; }
  function epProg(e) { var d = 0; e.sc.forEach(function (si) { d += Math.min(far[si] || 0, S[si].b.length); }); return d / e.n; }
  function rank(n) { var r = RANKS[0][1]; RANKS.forEach(function (x) { if (n >= x[0]) r = x[1]; }); return r; }
  function epOf(si) { return EP.findIndex(function (e) { return e.sc.indexOf(si) >= 0; }); }

  var root = document.getElementById("sm");
  var state = { v: "home", era: -1, ei: 0, k: 0, bi: 0 };
  var timer = null, speed = 6000, playing = false;

  function $(id) { return document.getElementById(id); }
  var syncingHash = false;
  function hashForState() {
    if (!root.classList.contains("on")) return "";
    if (state.v === "reader") return "#read/" + state.ei + "/" + state.k + "/" + state.bi;
    if (state.v === "ep") return "#ep/" + state.ei;
    if (state.v === "bm") return "#bookmarks";
    return "#story";
  }
  function syncHistory(mode) {
    if (syncingHash) return;
    var h = hashForState();
    var target = h || (location.pathname + location.search);
    if (location.hash === h) return;
    try {
      if (mode === "replace") history.replaceState(null, "", target);
      else history.pushState(null, "", target);
    } catch (e) {
      if (h) location.hash = h;
    }
  }
  function saveReadingPos() {
    if (state.v === "reader" && EP[state.ei]) {
      var si = EP[state.ei].sc[state.k];
      if (si != null) {
        last = { si: si, bi: state.bi, ei: state.ei, k: state.k };
        store.set("sm-last", last);
        updateCoverResume();
      }
    }
  }
  function open(v, fromHash) {
    root.classList.add("on");
    document.body.classList.add("sm-lock");
    state.v = v || "home";
    render();
    root.scrollTop = 0;
    if (!fromHash) syncHistory("push");
  }
  function openEpByTitle(title) {
    var idx = EP.findIndex(function (e) { return e.t === title; });
    if (idx >= 0) { state.ei = idx; open("ep"); } else { open("home"); }
  }
  function close(fromHash) {
    saveReadingPos();
    stop();
    root.classList.remove("on");
    document.body.classList.remove("sm-lock");
    updateCoverResume();
    if (!fromHash) syncHistory("push");
  }
  function stop() { playing = false; clearInterval(timer); timer = null; }
  function render() { if (state.v === "home") home(); else if (state.v === "bm") bookmarks(); else if (state.v === "ep") episode(); else readerShell(); }
  function nav(active) {
    function b(k, i, t) { return '<button data-nav="' + k + '" class="' + (active === k ? "on" : "") + '">' + ic(i) + '<span>' + t + '</span></button>'; }
    return '<nav class="sm-nav">' + b("home", "home", "قسمت‌ها") + b("bm", "bookmark", "نشان‌ها") + b("full", "lines", "متن کامل") + '</nav>';
  }
  function sec(title, extra) { return '<div class="sm-sec">' + SVG_SHAMSA + '<h2>' + title + '</h2>' + (extra ? '<span class="cnt">' + extra + '</span>' : '') + '</div>'; }

  function epCard(ei) {
    var e = EP[ei], hook = META[e.t] || "", p = epProg(e);
    return '<button class="sm-ep" data-ep="' + ei + '">' +
      archThumb(e) +
      '<span class="ep-body"><b>' + esc(e.dt) + '</b>' +
      (hook ? '<p>' + esc(hook) + '</p>' : '') +
      '<span class="ep-foot"><span class="era-tag era-' + e.era + '">' + ERA[e.era] + '</span>' +
      '<span>' + fa(e.sc.length) + ' صحنه</span><span>حدود ' + fa(Math.max(1, Math.round(e.n / 10))) + ' دقیقه</span></span></span>' +
      (p >= 1 ? '<span class="ok">' + ic("check") + '</span>' : '') +
      '<span class="bar"><i style="width:' + Math.round(p * 100) + '%"></i></span></button>';
  }
  function listHTML() {
    var h = "";
    EP.forEach(function (e, i) { if (state.era < 0 || e.era === state.era) h += epCard(i); });
    return h;
  }

  function home() {
    var n = totalRead();
    var h = '<div class="sm-wrap view"><div class="sm-top"><span class="sm-brand">' + ic("feather") + ' فردوسی طوسی</span>' +
      '<button class="sm-x" data-nav="full">' + ic("lines") + ' جلد و متن کامل</button></div>';
    h += '<div class="sm-head-center"><h1 class="t-display sm-title-h">شاهنامه، قسمت‌به‌قسمت</h1><p class="sm-sub">حماسهٔ فردوسی با نگارگری سنتی ایرانی</p></div>';
    h += '<div class="sm-ledger"><div><b>' + rank(n) + '</b><span>رتبهٔ شما</span></div>' +
      '<div><b>' + fa(streak.n || 0) + '</b><span>روز پیاپی</span></div>' +
      '<div><b>' + fa(n) + '</b><span>بیت خوانده‌شده</span></div></div>';
    h += '<div class="sm-banner"><div class="sm-banner-art"><img alt="نگارگری شاهنامهٔ فردوسی" src="' + IMGS.banner + '"></div>' +
      '<div class="sm-banner-cap"><b>داستان‌های کهن ایران‌زمین</b><span>۵۳ داستان، ۶۸۰ صحنه</span></div></div>';
    var ei = last && S[last.si] ? epOf(last.si) : -1;
    if (ei >= 0) {
      h += '<button class="sm-cont" data-resume="1">' + archThumb(EP[ei]) + '<span><b>ادامهٔ خواندن</b><small>' + esc(EP[ei].dt) + ' — ' + esc(S[last.si].t) + '</small></span><span class="sm-go">ادامه ' + ic("next") + '</span></button>';
    }
    h += sec("از کجا شروع کنم؟") + '<div class="sm-picks">';
    PICKS.forEach(function (p) {
      var i = EP.findIndex(function (e) { return e.t === p[0]; });
      if (i >= 0) {
        var im = imgOf(EP[i]);
        h += '<button class="sm-pick" data-ep="' + i + '"><span class="pick-arch"><img alt="' + esc(EP[i].dt) + '" src="' + im.m + '"></span>' +
          '<b>' + esc(EP[i].dt) + '</b><span class="pick-sub">' + p[1] + '</span></button>';
      }
    });
    h += '</div>';
    var f = FAMOUS[Math.floor(Date.now() / 864e5) % FAMOUS.length], b = S[f[0]].b[f[1]];
    h += sec("بیت امروز", "حکیم ابوالقاسم فردوسی") + '<div class="sm-daily taz">' + cornersHTML() +
      '<span class="v1">' + esc(b[0]) + '</span><span class="v-sep">' + SVG_SHAMSA + '</span><span class="v2">' + esc(b[1]) + '</span>' +
      '<div class="src">' + esc(S[f[0]].t) + '</div></div>';
    h += sec("قسمت‌ها", fa(EP.length) + " داستان") + '<div class="sm-chips" id="smChips">';
    ["همه"].concat(ERA).forEach(function (x, i) { h += '<button class="sm-chip' + (state.era === i - 1 ? ' on' : '') + '" data-era="' + (i - 1) + '">' + x + '</button>'; });
    h += '</div><div class="sm-list" id="smList">' + listHTML() + '</div></div>' + nav("home");
    root.innerHTML = h;
  }

  function bookmarks() {
    var l = bm().filter(function (m) { return S[m.s] && S[m.s].b[m.b]; });
    var h = '<div class="sm-wrap view"><div class="sm-top"><span class="sm-brand">' + ic("bookmark") + ' نشان‌ها</span></div>' +
      '<div class="sm-head-center"><h1 class="t-display sm-title-h">بیت‌های نشان‌شده</h1></div>';
    if (!l.length) {
      h += '<div class="sm-empty taz" style="margin-top:1rem">' + cornersHTML() + '<p class="t-body" style="margin:0">هنوز بیتی نشان نکرده‌اید.<br>هنگام خواندن، روی قلب بزنید تا اینجا بماند.</p></div>';
    } else {
      h += '<div class="sm-list" style="margin-top:1rem">';
      l.slice().reverse().forEach(function (m) {
        var b = S[m.s].b[m.b];
        h += '<button class="sm-bm taz" data-bm="' + m.s + ':' + m.b + '"><span class="v1">' + esc(b[0]) + '</span><span class="v2">' + esc(b[1] || "") + '</span><small>' + esc(S[m.s].t) + '</small></button>';
      });
      h += '</div>';
    }
    root.innerHTML = h + '</div>' + nav("bm");
  }

  function episode() {
    var e = EP[state.ei], hook = META[e.t] || "", p = epProg(e), im = imgOf(e);
    var next = e.sc.findIndex(function (si) { return !isDone(si); }); if (next < 0) next = 0;
    var h = '<div class="sm-wrap view" style="padding-bottom:3.2rem"><div class="sm-top"><button class="sm-x" data-a="home">' + ic("back") + ' قسمت‌ها</button>' +
      '<span class="era-tag era-' + e.era + '" style="font-size:.82rem">' + ERA[e.era] + '</span></div>';
    h += '<div class="sm-hero taz">' + cornersHTML() +
      '<div class="arch"><img alt="' + esc(e.dt) + '" src="' + im.h + '"></div>' +
      '<h2 class="t-display">' + esc(e.dt) + '</h2><p class="t-body">' + esc(hook) + '</p>' +
      '<div class="t-meta" style="margin-bottom:1.1rem">' + fa(e.sc.length) + ' صحنه &nbsp;—&nbsp; ' + fa(e.n) + ' بیت &nbsp;—&nbsp; ' + fa(Math.round(p * 100)) + '٪ خوانده‌شده</div>' +
      '<button class="sm-cta" data-play="' + next + '">' + icFill("play") + (p > 0 ? 'ادامهٔ داستان' : 'شروع داستان') + '</button></div>';
    h += sec("نقشهٔ صحنه‌ها", fa(e.sc.length) + " صحنه") + '<div class="sm-scs">';
    e.sc.forEach(function (si, k) {
      var done = isDone(si);
      var scLen = S[si].b.length;
      var scPct = Math.min(100, Math.round((far[si] || 0) / Math.max(1, scLen) * 100));
      h += '<button class="sm-sc' + (done ? ' done' : '') + '" data-play="' + k + '">' +
        '<span class="sm-sc-art"><img alt="" loading="lazy" src="' + im.m + '"><span class="n">' + (done ? ic("check") : fa(k + 1)) + '</span></span>' +
        '<span class="sc-txt"><span class="sc-title">' + esc(S[si].t) + '</span>' +
        '<span class="sc-meta">' + fa(scLen) + ' بیت' + (scPct > 0 && !done ? ' (' + fa(scPct) + '٪)' : (done ? ' — خوانده‌شده' : '')) + '</span></span>' +
        '<span class="sc-bar"><i style="width:' + scPct + '%"></i></span></button>';
    });
    root.innerHTML = h + '</div></div>';
  }

  function readerShell() {
    var e = EP[state.ei], si = e.sc[state.k], sc = S[si];
    root.innerHTML = '<div class="sm-rd view"><div class="top"><button class="sm-x" data-a="ep">' + ic("back") + '</button><b>' + esc(e.dt) + '</b><span>صحنهٔ ' + fa(state.k + 1) + ' از ' + fa(e.sc.length) + '</span></div>' +
      '<div class="sm-prog"><i id="smP"></i></div><div class="sm-scene">' + esc(sc.t) + '</div>' +
      '<div class="sm-stage" id="smSt">' + cornersHTML() + '</div>' +
      '<div class="sm-ctl"><button data-a="prev" aria-label="بیت قبلی">' + ic("back") + '</button><button id="smFav" data-a="fav" aria-label="نشان‌گذاری">' + ic("heart") + '</button><button class="main" id="smPlay" data-a="play" aria-label="پخش خودکار">' + icFill("play") + '</button><button class="spd" id="smSpd" data-a="spd" aria-label="سرعت"></button><button data-a="next" aria-label="بیت بعدی">' + ic("next") + '</button></div>' +
      '<div class="sm-hint t-meta" id="smH"></div></div>';
    var st = $("smSt"), x0 = null, swiped = false;
    st.addEventListener("touchstart", function (ev) { x0 = ev.touches[0].clientX; swiped = false; }, { passive: true });
    st.addEventListener("touchend", function (ev) {
      if (x0 == null) return; var dx = ev.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { swiped = true; ev.preventDefault(); go(dx < 0 ? 1 : -1); }
    });
    st.addEventListener("click", function (ev) { if (swiped || ev.target.closest("button")) return; if (state.bi < S[EP[state.ei].sc[state.k]].b.length) go(1); });
    showCouplet(1);
  }

  function showCouplet(dir) {
    var e = EP[state.ei], si = e.sc[state.k], sc = S[si], len = sc.b.length, st = $("smSt");
    if (!st) return;
    Array.prototype.slice.call(st.children).forEach(function (o) {
      if (o.classList.contains("eslimi-k") || o.dataset.rm) return;
      o.dataset.rm = "1"; o.classList.add("out");
      setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 220);
    });
    var node = document.createElement("div");
    if (state.bi >= len) {
      stop();
      var hasNext = state.k + 1 < e.sc.length;
      node.className = "sm-end";
      node.innerHTML = '<h3 class="t-display">' + (hasNext ? 'این صحنه تمام شد' : 'این قسمت تمام شد') + '</h3><div class="t-meta">' + fa(len) + ' بیت خواندید — مجموع: ' + fa(totalRead()) + ' بیت — رتبه: ' + rank(totalRead()) + '</div><div class="row">' +
        (hasNext ? '<button class="sm-cta" data-play="' + (state.k + 1) + '">صحنهٔ بعد: ' + esc(S[e.sc[state.k + 1]].t) + '</button>' : '<button class="sm-cta" data-a="home">انتخاب قسمت بعدی</button>') +
        '<button class="sm-ghost" data-a="ep">نقشهٔ صحنه‌ها</button></div>';
    } else {
      var b = sc.b[state.bi];
      node.className = "sm-v " + (dir < 0 ? "prev" : "next");
      node.innerHTML = '<span class="a">' + esc(b[0]) + '</span><span class="o">' + SVG_SHAMSA + '</span><span class="b">' + esc(b[1] || "") + '</span>';
    }
    st.appendChild(node);
    sync(len, si);
  }

  function sync(len, si) {
    var p = $("smP"); if (p) p.style.width = Math.round(state.bi / len * 100) + "%";
    var h = $("smH"); if (h) h.textContent = state.bi >= len ? "" : "بیت " + fa(state.bi + 1) + " از " + fa(len) + " — ضربه بزنید یا بکشید";
    var f = $("smFav");
    if (f) { var on = bm().some(function (m) { return m.s === si && m.b === state.bi; }); f.classList.toggle("on", on); f.innerHTML = on ? icFill("heart") : ic("heart"); f.style.visibility = state.bi >= len ? "hidden" : ""; }
    var pl = $("smPlay"); if (pl) pl.innerHTML = playing ? ic("pause") : icFill("play");
    var sp = $("smSpd"); if (sp) sp.textContent = speed < 5000 ? "تند" : speed < 8000 ? "متوسط" : "آرام";
  }

  function go(d) {
    var e = EP[state.ei], si = e.sc[state.k], len = S[si].b.length;
    var nb = Math.max(0, Math.min(len, state.bi + d));
    if (nb === state.bi) return;
    state.bi = nb;
    if (nb > (far[si] || 0)) { far[si] = nb; store.set("sm-far", far); touch(); }
    last = { si: si, bi: nb, ei: state.ei, k: state.k }; store.set("sm-last", last);
    showCouplet(d);
    syncHistory("replace");
    if (playing) schedule();
  }
  function schedule() { clearInterval(timer); timer = setInterval(function () { go(1); }, speed); }
  function playAt(ei, k, bi, fromHash) {
    stop();
    state.ei = ei; state.k = k; state.bi = bi; state.v = "reader";
    if (!root.classList.contains("on")) {
      root.classList.add("on");
      document.body.classList.add("sm-lock");
    }
    var si = EP[ei].sc[k];
    last = { si: si, bi: bi, ei: ei, k: k };
    store.set("sm-last", last);
    readerShell();
    root.scrollTop = 0;
    if (!fromHash) syncHistory("push");
  }
  function play(k) {
    var si = EP[state.ei].sc[k];
    var bi = (last && last.si === si && last.bi < S[si].b.length) ? last.bi : (isDone(si) ? 0 : Math.min(far[si] || 0, S[si].b.length - 1));
    playAt(state.ei, k, bi);
  }
  function fav() {
    var si = EP[state.ei].sc[state.k], l = bm(), i = l.findIndex(function (m) { return m.s === si && m.b === state.bi; });
    if (i >= 0) l.splice(i, 1); else l.push({ s: si, b: state.bi });
    store.set("sh-bm", l); sync(S[si].b.length, si);
  }
  function showView(v, fromHash) {
    saveReadingPos();
    stop();
    state.v = v;
    if (!root.classList.contains("on")) {
      root.classList.add("on");
      document.body.classList.add("sm-lock");
    }
    render();
    root.scrollTop = 0;
    if (!fromHash) syncHistory("push");
  }

  root.addEventListener("click", function (ev) {
    var t = ev.target.closest("button"); if (!t) return;
    var d = t.dataset;
    if (d.nav) { if (d.nav === "full") close(); else showView(d.nav); }
    else if (d.ep != null) { state.ei = +d.ep; showView("ep"); }
    else if (d.era != null) {
      state.era = +d.era;
      Array.prototype.forEach.call($("smChips").children, function (c) { c.classList.toggle("on", +c.dataset.era === state.era); });
      $("smList").innerHTML = listHTML();
    }
    else if (d.play != null) play(+d.play);
    else if (d.resume) { var ei = epOf(last.si); state.ei = ei; play(EP[ei].sc.indexOf(last.si)); }
    else if (d.bm) {
      var p = d.bm.split(":"), si = +p[0], ei2 = epOf(si);
      if (ei2 >= 0) playAt(ei2, EP[ei2].sc.indexOf(si), +p[1]);
    }
    else if (d.a === "home") showView("home");
    else if (d.a === "ep") showView("ep");
    else if (d.a === "next") go(1);
    else if (d.a === "prev") go(-1);
    else if (d.a === "fav") fav();
    else if (d.a === "spd") { speed = speed >= 8000 ? 3500 : speed < 5000 ? 6000 : 9000; if (playing) schedule(); var s0 = EP[state.ei].sc[state.k]; sync(S[s0].b.length, s0); }
    else if (d.a === "play") { playing = !playing; if (playing) schedule(); else stop(); var s1 = EP[state.ei].sc[state.k]; sync(S[s1].b.length, s1); }
  });
  document.addEventListener("keydown", function (ev) {
    if (!root.classList.contains("on")) return;
    if (ev.key === "Escape") { if (state.v === "reader") showView("ep"); else if (state.v === "ep" || state.v === "bm") showView("home"); else close(); return; }
    if (state.v !== "reader") return;
    if (ev.key === "ArrowLeft" || ev.key === " ") { ev.preventDefault(); go(1); }
    if (ev.key === "ArrowRight") go(-1);
  });

  /* ---- Enhance Main Shahnameh Home Cover ---- */
  var cover = document.getElementById("cover");
  var coverInner = cover ? cover.querySelector(".cover-inner") : null;
  if (cover && coverInner) {
    ["tr", "tl", "br", "bl"].forEach(function (pos) {
      var sp = document.createElement("span");
      sp.className = "cover-corner " + pos;
      sp.innerHTML = SVG_ESLIMI;
      cover.appendChild(sp);
    });

    var plate = document.createElement("div");
    plate.className = "cover-plate";
    plate.innerHTML = '<div class="cover-plate-inner"><img alt="نگارگری شاهنامهٔ فردوسی" src="' + IMGS.banner + '"></div>';
    var h1 = coverInner.querySelector("h1");
    if (h1) coverInner.insertBefore(plate, h1);

    var strip = document.createElement("div");
    strip.className = "cover-miniature-strip";
    [["رستم و سهراب", "رستم و سهراب"], ["سیاوش", "آزمون آتش سیاوش"], ["زال و رودابه", "زال و رودابه"], ["فریدون", "فریدون و کاوه"]].forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cover-mini-pill";
      var key = ART_MAP[item[0]] || "jamshid";
      btn.innerHTML = '<img alt="" src="' + IMGS[key].m + '"><span>' + item[1] + '</span>';
      btn.addEventListener("click", function () { openEpByTitle(item[0]); });
      strip.appendChild(btn);
    });
    var stats = coverInner.querySelector(".cover-stats");
    if (stats) coverInner.insertBefore(strip, stats);

    function syncCoverNav() {
      var r = cover.getBoundingClientRect();
      document.body.classList.toggle("on-cover", r.bottom > 120);
    }
    syncCoverNav();
    window.addEventListener("scroll", syncCoverNav, { passive: true });
  }

  /* entry points */
  var tb = document.querySelector(".topbar"), nb = document.getElementById("nightBtn");
  var b1 = document.createElement("button"); b1.id = "smBtn"; b1.className = "iconbtn"; b1.title = "حالت داستان"; b1.setAttribute("aria-label", "حالت داستان"); b1.innerHTML = ic("openbook");
  b1.firstChild.style.cssText = "width:1.25rem;height:1.25rem";
  if (tb && nb) tb.insertBefore(b1, nb);
  b1.addEventListener("click", function () { open("home"); });
  var acts = document.querySelector(".cover-actions"), sb = document.getElementById("startBtn");
  if (acts) {
    var b2 = document.createElement("button"); b2.className = "btn sm-main"; b2.innerHTML = ic("openbook") + " ورود به حالت داستان";
    b2.addEventListener("click", function () { open("home"); });
    acts.insertBefore(b2, acts.firstChild);
    if (sb) { sb.textContent = "متن کامل"; sb.className = "btn ghost"; }
  }

  /* ---- Cover Resume Button & Hash/History State Restoration ---- */
  var coverResumeBtn = null;
  function updateCoverResume() {
    if (!coverInner) return;
    var ei = last && S[last.si] ? epOf(last.si) : -1;
    if (ei < 0) {
      if (coverResumeBtn) coverResumeBtn.style.display = "none";
      return;
    }
    if (!coverResumeBtn) {
      coverResumeBtn = document.createElement("button");
      coverResumeBtn.type = "button";
      coverResumeBtn.className = "cover-resume";
      coverResumeBtn.addEventListener("click", function () {
        var eiNow = last && S[last.si] ? epOf(last.si) : -1;
        if (eiNow >= 0) {
          var kNow = EP[eiNow].sc.indexOf(last.si);
          if (kNow >= 0) {
            var biNow = Math.min(last.bi || 0, Math.max(0, S[last.si].b.length - 1));
            playAt(eiNow, kNow, biNow);
          }
        }
      });
      var actsEl = coverInner.querySelector(".cover-actions");
      if (actsEl) coverInner.insertBefore(coverResumeBtn, actsEl);
    }
    var scObj = S[last.si];
    var biNum = Math.min((last.bi || 0) + 1, scObj.b.length);
    coverResumeBtn.style.display = "inline-flex";
    coverResumeBtn.innerHTML = ic("openbook") +
      '<span>ادامه از آخرین بیت: <b>' + esc(EP[ei].dt) + '</b> <small>(' + esc(scObj.t) + ' — بیت ' + fa(biNum) + ')</small></span>';
  }
  updateCoverResume();

  function applyHash() {
    var h = location.hash || "";
    syncingHash = true;
    try {
      if (h.indexOf("#read/") === 0) {
        var p = h.slice(6).split("/");
        var ei = parseInt(p[0], 10), k = parseInt(p[1], 10), bi = parseInt(p[2] || "0", 10);
        if (!isNaN(ei) && EP[ei] && !isNaN(k) && EP[ei].sc[k] != null) {
          var maxBi = S[EP[ei].sc[k]].b.length;
          playAt(ei, k, Math.max(0, Math.min(isNaN(bi) ? 0 : bi, maxBi)), true);
          return;
        }
      } else if (h.indexOf("#ep/") === 0) {
        var ei2 = parseInt(h.slice(4), 10);
        if (!isNaN(ei2) && EP[ei2]) {
          state.ei = ei2;
          open("ep", true);
          return;
        }
      } else if (h === "#bookmarks") {
        open("bm", true);
        return;
      } else if (h === "#story") {
        open("home", true);
        return;
      }
      if (root.classList.contains("on")) close(true);
    } finally {
      syncingHash = false;
    }
  }

  window.addEventListener("popstate", applyHash);
  window.addEventListener("hashchange", applyHash);
  window.addEventListener("pagehide", saveReadingPos);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") saveReadingPos();
  });

  /* Restore exact route on load if URL has a hash */
  if (location.hash) applyHash();
})();
