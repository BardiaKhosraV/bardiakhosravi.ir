
(function () {
  "use strict";
  var S = JSON.parse(document.getElementById("shData").textContent).sections;
  var FAMOUS = [[1, 13], [2, 7], [2, 3], [1, 0], [3, 3], [131, 8], [557, 65], [52, 108], [13, 71], [24, 1]];

  /* Corrected standard Persian orthography for all titles */
  var TITLE_FIX = {
    "کیومرث": "کیومرث",
    "طهمورث": "طهمورث",
    "زو طهماسب": "زو طهماسب",
    "گرشاسب": "گرشاسب",
    "کی‌کاووس": "کی‌کاووس",
    "هفت‌خوان رستم": "هفت‌خوان رستم",
    "داستان بیژن با منیژه": "داستان بیژن و منیژه",
    "داستان دوازده رخ": "داستان دوازده رخ",
    "پادشاهی لهراسب": "پادشاهی لهراسب",
    "پادشاهی گشتاسب": "پادشاهی گشتاسب",
    "هفت‌خوان اسفندیار": "هفت‌خوان اسفندیار",
    "پادشاهی همای چهرآزاد": "پادشاهی همای چهرآزاد",
    "پادشاهی یزدگرد بزه‌گر": "پادشاهی یزدگرد بزه‌گر",
    "پادشاهی قباد مشهور به شیرویه": "پادشاهی قباد مشهور به شیرویه",
    "پادشاهی اردشیر شیرویه": "پادشاهی اردشیر شیرویه",
    "پادشاهی آزرمی‌دخت": "پادشاهی آزرمی‌دخت"
  };
  function dispTitle(t) { return TITLE_FIX[t] || t; }

  var META = {
    "آغاز کتاب": "ستایش خرد، آفرینش جهان و راز ساخته شدن شاهنامه",
    "کیومرث": "نخستین شاه جهان، در کوه و با جامهٔ پلنگ",
    "هوشنگ": "جرقهٔ سنگ و کشف آتش",
    "طهمورث": "شاهی که دیوان را به بند کشید",
    "جمشید": "اوج شکوه، و غروری که همه‌چیز را از او گرفت",
    "ضحاک": "دو مار بر شانه‌ها و آغاز سیاه‌ترین روزگار",
    "فریدون": "کاوهٔ آهنگر درفش برمی‌افرازد",
    "منوچهر": "کین‌خواهی و آغاز عصر پهلوانان",
    "زال و رودابه": "پسری سپیدموی، سیمرغ و عشقی که همه مخالفش بودند",
    "نوذر": "شاهی ناتوان و سر برآوردن افراسیاب",
    "افراسیاب": "بزرگ‌ترین دشمن ایران پا به میدان می‌گذارد",
    "زو طهماسب": "روزگاری کوتاه میان دو توفان",
    "گرشاسب": "پادشاهی کوتاه در سال‌های سخت",
    "کیقباد": "از البرز تا تخت؛ آغاز دودمان کیانی",
    "کی‌کاووس": "هوس آسمان، مازندران و دیو سپید",
    "هفت‌خوان رستم": "هفت آزمون: شیر، بیابان، اژدها، جادو و دیو سپید",
    "رستم و سهراب": "تراژدی پدر و پسری که هرگز یکدیگر را نشناختند",
    "سیاوش": "پاکی که از آتش گذشت",
    "پادشاهی کیخسرو": "بازگشت شاهزادهٔ ناپیدا و انتقام خون سیاوش",
    "داستان کاموس کشانی": "نبرد با پهلوانی که کوه را جابه‌جا می‌کرد",
    "داستان خاقان چین": "رویارویی کیخسرو با خاقان چین",
    "داستان اکوان دیو": "رستم و دیوی که گورخر شد",
    "داستان بیژن با منیژه": "عشق، چاه و بند؛ و رستمی که باید برسد",
    "داستان دوازده رخ": "نبرد دوازده پهلوان ایران و توران",
    "جنگ بزرگ کیخسرو با افراسیاب": "آخرین و بزرگ‌ترین رویارویی دو شاه",
    "پادشاهی لهراسب": "شاهی بی‌شکوه و روزگار گذار",
    "پادشاهی گشتاسب": "ظهور زرتشت و دین تازه",
    "هفت‌خوان اسفندیار": "هفت خوان روئین‌تنی که رستم نداشت",
    "داستان رستم و اسفندیار": "روئین‌تن در برابر جهان‌پهلوان",
    "داستان رستم و شغاد": "خیانت برادر و چاهی پر از نیزه",
    "پادشاهی بهمن اسفندیار": "کین‌خواهی بهمن برای پدر",
    "پادشاهی همای چهرآزاد": "بانویی که تاج بر سر گذاشت",
    "پادشاهی داراب": "کودکی در صندوق بر آب",
    "پادشاهی دارای داراب": "آخرین شاه کیانی و ورود اسکندر",
    "پادشاهی اسکندر": "جهانگشایی که تا ظلمات رفت",
    "پادشاهی اشکانیان": "روزگاری کم‌گفته میان دو شاهنشاهی",
    "داستان هفتواد و سرگذشت کرم": "کرمی که سرنوشت یک شهر شد",
    "پادشاهی ساسانیان": "اردشیر و بنیاد شاهنشاهی تازه",
    "پادشاهی یزدگرد بزه‌گر": "شاهی سخت‌گیر و پایانی عجیب",
    "پادشاهی بهرام گور": "شکارچی، عاشق و شاهی سرزنده",
    "پادشاهی یزدگرد پسر بهرام گور": "جانشین بهرام",
    "پادشاهی پیروز": "شاهی که در جنگ راه گم کرد",
    "پادشاهی بلاش": "پادشاهی کوتاه و آرام",
    "پادشاهی قباد": "مزدک، شورش و آشفتگی",
    "پادشاهی انوشیروان": "عدل، بزرگمهر و بازی شطرنج",
    "پادشاهی هرمزد": "شاهی در سایهٔ بهرام چوبین",
    "پادشاهی خسرو پرویز": "شکوه، شیرین و فروپاشی تدریجی",
    "داستان خسرو و شیرین": "عشق شاه و شیرین",
    "پادشاهی قباد مشهور به شیرویه": "شاهی که پدر را به زندان انداخت",
    "پادشاهی اردشیر شیرویه": "کودک‌شاهی در روزگار آشفته",
    "پادشاهی پوراندخت": "ملکهٔ دادگر",
    "پادشاهی آزرمی‌دخت": "آخرین بانوی ساسانی",
    "پادشاهی یزدگرد": "غروب شاهنشاهی؛ پایان شاهنامه"
  };

  var IMGS = {"banner": "/shahnameh-assets/images/banner.webp", "zahhak": {"m": "/shahnameh-assets/images/zahhak-m.webp", "h": "/shahnameh-assets/images/zahhak-h.webp"}, "zal": {"m": "/shahnameh-assets/images/zal-m.webp", "h": "/shahnameh-assets/images/zal-h.webp"}, "sohrab": {"m": "/shahnameh-assets/images/sohrab-m.webp", "h": "/shahnameh-assets/images/sohrab-h.webp"}, "fereydun": {"m": "/shahnameh-assets/images/fereydun-m.webp", "h": "/shahnameh-assets/images/fereydun-h.webp"}, "dragon": {"m": "/shahnameh-assets/images/dragon-m.webp", "h": "/shahnameh-assets/images/dragon-h.webp"}, "siyavash": {"m": "/shahnameh-assets/images/siyavash-m.webp", "h": "/shahnameh-assets/images/siyavash-h.webp"}, "keyumars": {"m": "/shahnameh-assets/images/keyumars-m.webp", "h": "/shahnameh-assets/images/keyumars-h.webp"}, "jamshid": {"m": "/shahnameh-assets/images/jamshid-m.webp", "h": "/shahnameh-assets/images/jamshid-h.webp"}, "garden": {"m": "/shahnameh-assets/images/garden-m.webp", "h": "/shahnameh-assets/images/garden-h.webp"}, "battle": {"m": "/shahnameh-assets/images/battle-m.webp", "h": "/shahnameh-assets/images/battle-h.webp"}, "wisdom": {"m": "/shahnameh-assets/images/wisdom-m.webp", "h": "/shahnameh-assets/images/wisdom-h.webp"}, "hunt": {"m": "/shahnameh-assets/images/hunt-m.webp", "h": "/shahnameh-assets/images/hunt-h.webp"}, "kaykavus": {"m": "/shahnameh-assets/images/kaykavus-m.webp", "h": "/shahnameh-assets/images/kaykavus-h.webp"}, "akvan": {"m": "/shahnameh-assets/images/akvan-m.webp", "h": "/shahnameh-assets/images/akvan-h.webp"}, "esfandiyar": {"m": "/shahnameh-assets/images/esfandiyar-m.webp", "h": "/shahnameh-assets/images/esfandiyar-h.webp"}, "bijan": {"m": "/shahnameh-assets/images/bijan-m.webp", "h": "/shahnameh-assets/images/bijan-h.webp"}, "kaykhosrow": {"m": "/shahnameh-assets/images/kaykhosrow-m.webp", "h": "/shahnameh-assets/images/kaykhosrow-h.webp"}, "bahram": {"m": "/shahnameh-assets/images/bahram-m.webp", "h": "/shahnameh-assets/images/bahram-h.webp"}, "eskandar": {"m": "/shahnameh-assets/images/eskandar-m.webp", "h": "/shahnameh-assets/images/eskandar-h.webp"}, "hushang": {"m": "/shahnameh-assets/images/hushang-m.webp", "h": "/shahnameh-assets/images/hushang-h.webp"}, "khosrow": {"m": "/shahnameh-assets/images/khosrow-m.webp", "h": "/shahnameh-assets/images/khosrow-h.webp"}, "anushirvan": {"m": "/shahnameh-assets/images/anushirvan-m.webp", "h": "/shahnameh-assets/images/anushirvan-h.webp"}, "davazdah": {"m": "/shahnameh-assets/images/davazdah-m.webp", "h": "/shahnameh-assets/images/davazdah-h.webp"}, "shaghad": {"m": "/shahnameh-assets/images/shaghad-m.webp", "h": "/shahnameh-assets/images/shaghad-h.webp"}};
  var ART_MAP = {
  "ضحاک": "zahhak",
  "زال و رودابه": "zal",
  "رستم و سهراب": "sohrab",
  "فریدون": "fereydun",
  "هفت‌خوان رستم": "dragon",
  "طهمورث": "hushang",
  "کی‌کاووس": "kaykavus",
  "داستان اکوان دیو": "akvan",
  "هفت‌خوان اسفندیار": "esfandiyar",
  "سیاوش": "siyavash",
  "هوشنگ": "hushang",
  "پادشاهی گشتاسب": "siyavash",
  "کیومرث": "keyumars",
  "کیقباد": "keyumars",
  "پادشاهی پیروز": "keyumars",
  "جمشید": "jamshid",
  "نوذر": "jamshid",
  "پادشاهی همای چهرآزاد": "jamshid",
  "پادشاهی ساسانیان": "jamshid",
  "پادشاهی خسرو پرویز": "khosrow",
  "پادشاهی پوراندخت": "khosrow",
  "پادشاهی آزرمی‌دخت": "khosrow",
  "پادشاهی یزدگرد": "jamshid",
  "داستان بیژن با منیژه": "bijan",
  "داستان خسرو و شیرین": "khosrow",
  "منوچهر": "battle",
  "افراسیاب": "battle",
  "پادشاهی کیخسرو": "kaykhosrow",
  "داستان کاموس کشانی": "davazdah",
  "داستان خاقان چین": "davazdah",
  "داستان دوازده رخ": "davazdah",
  "جنگ بزرگ کیخسرو با افراسیاب": "kaykhosrow",
  "داستان رستم و اسفندیار": "esfandiyar",
  "پادشاهی بهمن اسفندیار": "esfandiyar",
  "پادشاهی هرمزد": "anushirvan",
  "آغاز کتاب": "wisdom",
  "زو طهماسب": "wisdom",
  "گرشاسب": "wisdom",
  "پادشاهی لهراسب": "wisdom",
  "پادشاهی دارای داراب": "eskandar",
  "پادشاهی اشکانیان": "wisdom",
  "پادشاهی قباد": "anushirvan",
  "پادشاهی بلاش": "wisdom",
  "پادشاهی انوشیروان": "anushirvan",
  "پادشاهی یزدگرد پسر بهرام گور": "bahram",
  "پادشاهی قباد مشهور به شیرویه": "wisdom",
  "پادشاهی اردشیر شیرویه": "wisdom",
  "پادشاهی بهرام گور": "bahram",
  "پادشاهی اسکندر": "eskandar",
  "پادشاهی داراب": "eskandar",
  "داستان هفتواد و سرگذشت کرم": "hunt",
  "پادشاهی یزدگرد بزه‌گر": "hunt",
  "داستان رستم و شغاد": "shaghad"
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
    lines: "M5 6h14 M5 10h14 M5 14h14 M5 18h9",
    share: "M12 3v12 M7 8l5-5 5 5 M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",
    download: "M12 3v12 M7 10l5 5 5-5 M5 19h14",
    x: "M6 6l12 12 M18 6L6 18"
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
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
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
  var timer = null, speed = 6000, playing = false, perPage = store.get("sm-per", 1);
  if (perPage !== 1 && perPage !== 2 && perPage !== 3) perPage = 1;

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
  var smTrigger = null;
  function getFocusable(el) {
    var sel = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.filter.call(el.querySelectorAll(sel), function (node) {
      if (node.getClientRects && !node.getClientRects().length) return false;
      var st = window.getComputedStyle ? window.getComputedStyle(node) : null;
      return !st || (st.visibility !== "hidden" && st.display !== "none");
    });
  }
  function activateDialog() {
    if (!root.classList.contains("on")) {
      var active = document.activeElement;
      smTrigger = (active && active !== document.body && !root.contains(active)) ? active : null;
      root.classList.add("on");
      document.body.classList.add("sm-lock");
      root.setAttribute("aria-hidden", "false");
      try { root.focus({ preventScroll: true }); } catch (e) { root.focus(); }
    }
  }
  function deactivateDialog() {
    var wasOpen = root.classList.contains("on");
    root.classList.remove("on");
    document.body.classList.remove("sm-lock");
    root.setAttribute("aria-hidden", "true");
    if (wasOpen) {
      var target = (smTrigger && document.contains(smTrigger)) ? smTrigger : (document.getElementById("smBtn") || document.getElementById("startBtn"));
      smTrigger = null;
      if (target && typeof target.focus === "function") {
        try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
      }
    }
  }
  function open(v, fromHash) {
    activateDialog();
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
    deactivateDialog();
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
      '<div class="sm-ctl"><button data-a="prev" aria-label="بیت قبلی">' + ic("back") + '</button><button id="smFav" data-a="fav" aria-label="نشان‌گذاری">' + ic("heart") + '</button><button id="smShare" data-a="share" aria-label="اشتراک‌گذاری بیت">' + ic("share") + '</button><button class="main" id="smPlay" data-a="play" aria-label="پخش خودکار">' + icFill("play") + '</button><button class="per" id="smPer" data-a="per" aria-label="تعداد بیت در صفحه"></button><button class="spd" id="smSpd" data-a="spd" aria-label="سرعت"></button><button data-a="next" aria-label="بیت بعدی">' + ic("next") + '</button></div>' +
      '<div class="sm-hint t-meta" id="smH"></div></div>';
    var st = $("smSt"), x0 = null, swiped = false;
    st.addEventListener("touchstart", function (ev) { x0 = ev.touches[0].clientX; swiped = false; }, { passive: true });
    st.addEventListener("touchend", function (ev) {
      if (x0 == null) return; var dx = ev.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) { swiped = true; ev.preventDefault(); go(dx > 0 ? 1 : -1); }
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
      var endBi = Math.min(len, state.bi + perPage);
      if (perPage === 1) {
        var b = sc.b[state.bi];
        node.className = "sm-v " + (dir < 0 ? "prev" : "next");
        node.innerHTML = '<span class="a">' + esc(b[0]) + '</span><span class="o">' + SVG_SHAMSA + '</span><span class="b">' + esc(b[1] || "") + '</span>';
      } else {
        node.className = "sm-v multi multi-" + perPage + " " + (dir < 0 ? "prev" : "next");
        var pairsHtml = "";
        for (var pIdx = state.bi; pIdx < endBi; pIdx++) {
          var bp = sc.b[pIdx];
          pairsHtml += '<div class="sm-pair"><span class="a">' + esc(bp[0]) + '</span><span class="o">' + SVG_SHAMSA + '</span><span class="b">' + esc(bp[1] || "") + '</span></div>';
        }
        node.innerHTML = pairsHtml;
      }
    }
    st.appendChild(node);
    sync(len, si);
  }

  function sync(len, si) {
    var p = $("smP"); if (p) p.style.width = Math.round(state.bi / len * 100) + "%";
    var h = $("smH");
    if (h) {
      if (state.bi >= len) h.textContent = "";
      else if (perPage === 1 || state.bi + 1 >= len) h.textContent = "بیت " + fa(state.bi + 1) + " از " + fa(len) + " — ضربه بزنید یا بکشید";
      else h.textContent = "بیت " + fa(state.bi + 1) + " تا " + fa(Math.min(len, state.bi + perPage)) + " از " + fa(len) + " — ضربه بزنید یا بکشید";
    }
    var f = $("smFav");
    if (f) { var on = bm().some(function (m) { return m.s === si && m.b === state.bi; }); f.classList.toggle("on", on); f.innerHTML = on ? icFill("heart") : ic("heart"); f.style.visibility = state.bi >= len ? "hidden" : ""; }
    var sh = $("smShare"); if (sh) sh.style.visibility = state.bi >= len ? "hidden" : "";
    var pl = $("smPlay"); if (pl) pl.innerHTML = playing ? ic("pause") : icFill("play");
    var sp = $("smSpd"); if (sp) sp.textContent = speed < 5000 ? "تند" : speed < 8000 ? "متوسط" : "آرام";
    var pr = $("smPer"); if (pr) pr.textContent = fa(perPage) + " بیت";
  }

  function go(d) {
    var e = EP[state.ei], si = e.sc[state.k], len = S[si].b.length;
    var step = d * perPage;
    var nb = Math.max(0, Math.min(len, state.bi + step));
    if (nb === state.bi) return;
    state.bi = nb;
    var reached = Math.min(len, nb + (nb < len ? perPage - 1 : 0));
    if (reached > (far[si] || 0)) { far[si] = reached; store.set("sm-far", far); touch(); }
    last = { si: si, bi: nb, ei: state.ei, k: state.k }; store.set("sm-last", last);
    showCouplet(d);
    syncHistory("replace");
    if (playing) schedule();
  }
  function schedule() { clearInterval(timer); timer = setInterval(function () { go(1); }, speed); }
  function playAt(ei, k, bi, fromHash) {
    stop();
    state.ei = ei; state.k = k; state.bi = bi; state.v = "reader";
    activateDialog();
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
    activateDialog();
    render();
    root.scrollTop = 0;
    if (!fromHash) syncHistory("push");
  }


  /* ---- Spotify-Inspired Lyrics Sharing (Focus Mode) ---- */
  var SHARE_ASSETS = {
    cornerGold: "/shahnameh-assets/images/tazhib-corner.png",
    cornerBronze: "/shahnameh-assets/images/tazhib-corner-bronze.png",
    shamsa: "/shahnameh-assets/images/tazhib-shamsa.png",
    shamsaBronze: "/shahnameh-assets/images/tazhib-shamsa-bronze.png",
    paper: "/shahnameh-assets/images/manuscript-paper.webp"
  };
  var SHARE_THEMES = [
    {
      key: "turquoise",
      name: "فیروزه‌ای لاجوردی",
      stops: ["#135D69", "#0E4350", "#082732"],
      ink: "#F7F1E3",
      muted: "rgba(247, 241, 227, .74)",
      accent: "#D9BC6A",
      frame: "rgba(217, 188, 106, .30)",
      divider: "rgba(247, 241, 227, .16)",
      verseDiv: "rgba(247, 241, 227, .07)",
      corner: "cornerGold"
    },
    {
      key: "plum",
      name: "عنابی و آلویی",
      stops: ["#5C1F30", "#3E1422", "#240A13"],
      ink: "#F7F1E3",
      muted: "rgba(247, 241, 227, .74)",
      accent: "#D9BC6A",
      frame: "rgba(217, 188, 106, .30)",
      divider: "rgba(247, 241, 227, .16)",
      verseDiv: "rgba(247, 241, 227, .07)",
      corner: "cornerGold"
    },
    {
      key: "green",
      name: "سبز زمردی",
      stops: ["#155644", "#0E3D31", "#07241D"],
      ink: "#F7F1E3",
      muted: "rgba(247, 241, 227, .74)",
      accent: "#D9BC6A",
      frame: "rgba(217, 188, 106, .30)",
      divider: "rgba(247, 241, 227, .16)",
      verseDiv: "rgba(247, 241, 227, .07)",
      corner: "cornerGold"
    },
    {
      key: "gold",
      name: "طلای کهن",
      stops: ["#D4B35E", "#C9A23F", "#A68029"],
      ink: "#161006",
      muted: "rgba(22, 16, 6, .74)",
      accent: "#463109",
      frame: "rgba(70, 49, 9, .32)",
      divider: "rgba(22, 16, 6, .18)",
      verseDiv: "rgba(22, 16, 6, .08)",
      corner: "cornerBronze"
    },
    {
      key: "blue",
      name: "لاجوردی عمیق",
      stops: ["#1B355C", "#122442", "#091429"],
      ink: "#F7F1E3",
      muted: "rgba(247, 241, 227, .74)",
      accent: "#D9BC6A",
      frame: "rgba(217, 188, 106, .30)",
      divider: "rgba(247, 241, 227, .16)",
      verseDiv: "rgba(247, 241, 227, .07)",
      corner: "cornerGold"
    }
  ];
  var SHARE_MAX = 4;
  var shareState = {
    open: false,
    theme: store.get("sm-share-theme", "turquoise"),
    format: store.get("sm-share-format", "card"),
    selected: [],
    busy: false
  };
  function getShareTheme() {
    for (var i = 0; i < SHARE_THEMES.length; i++) {
      if (SHARE_THEMES[i].key === shareState.theme) return SHARE_THEMES[i];
    }
    return SHARE_THEMES[0];
  }
  function shareContext() {
    var e = EP[state.ei];
    if (!e) return null;
    var si = e.sc[state.k], sc = S[si];
    if (!sc || !sc.b.length) return null;
    return { e: e, si: si, sc: sc, im: imgOf(e) };
  }
  function shareCardHTML(ctx) {
    var th = getShareTheme();
    var grad = "linear-gradient(162deg, " + th.stops[0] + " 0%, " + th.stops[1] + " 54%, " + th.stops[2] + " 100%)";
    var cornerSrc = SHARE_ASSETS[th.corner] || SHARE_ASSETS.cornerGold;
    var shamsaSrc = th.key === "gold" ? SHARE_ASSETS.shamsaBronze : SHARE_ASSETS.shamsa;
    var isStory = shareState.format === "story";
    var versesHtml = shareState.selected.map(function (idx) {
      var b = ctx.sc.b[idx];
      if (!b) return "";
      return '<div class="sh-couplet">' +
        '<span class="sh-h1">' + esc(b[0]) + '</span>' +
        (b[1] ? '<span class="sh-h2">' + esc(b[1]) + '</span>' : '') +
      '</div>';
    }).join("");
    var cardHtml = '<div class="sh-card' + (isStory ? ' is-story' : '') + '" id="smShareCard" style="background:' + grad + ';color:' + th.ink + ';--sh-ink:' + th.ink + ';--sh-mut:' + th.muted + ';--sh-acc:' + th.accent + ';--sh-frame:' + th.frame + ';--sh-div:' + th.divider + ';--sh-vdiv:' + th.verseDiv + '">' +
      '<span class="sh-paper" aria-hidden="true"></span>' +
      '<span class="sh-frame" aria-hidden="true"></span>' +
      '<img class="sh-cor tl" alt="" src="' + cornerSrc + '" aria-hidden="true">' +
      '<img class="sh-cor tr" alt="" src="' + cornerSrc + '" aria-hidden="true">' +
      '<img class="sh-cor bl" alt="" src="' + cornerSrc + '" aria-hidden="true">' +
      '<img class="sh-cor br" alt="" src="' + cornerSrc + '" aria-hidden="true">' +
      '<div class="sh-head">' +
        '<span class="sh-cover-mat"><img class="sh-cover" alt="' + esc(ctx.sc.t) + '" src="' + ctx.im.m + '"></span>' +
        '<div class="sh-meta">' +
          '<b class="sh-title">' + esc(ctx.sc.t) + '</b>' +
          '<span class="sh-sub">فردوسی · شاهنامه</span>' +
        '</div>' +
      '</div>' +
      '<div class="sh-verses sh-count-' + shareState.selected.length + '">' + versesHtml + '</div>' +
      '<div class="sh-foot">' +
        '<img class="sh-emblem-img" alt="" src="' + shamsaSrc + '" aria-hidden="true">' +
        '<span class="sh-url" dir="ltr">bardiakhosravi.ir/shahnameh</span>' +
      '</div>' +
    '</div>';
    if (!isStory) return cardHtml;
    var stageBg = "radial-gradient(circle at 50% 42%, " + th.stops[0] + "55, " + th.stops[2] + " 68%, #090806 100%)";
    return '<div class="sh-story-stage" style="background:' + stageBg + '">' + cardHtml + '</div>';
  }
  function updateSharePreview() {
    var ctx = shareContext();
    if (!ctx) return;
    var wrap = $("smShareCardWrap");
    if (wrap) wrap.innerHTML = shareCardHTML(ctx);
    var cnt = $("smShareCount");
    if (cnt) cnt.textContent = fa(shareState.selected.length) + " از " + fa(SHARE_MAX) + " بیت انتخاب‌شده";
    var fm = $("smShareFormats");
    if (fm) {
      Array.prototype.forEach.call(fm.children, function (btn) {
        var on = btn.dataset.shFmt === shareState.format;
        btn.classList.toggle("on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    var sw = $("smShareSwatches");
    if (sw) {
      Array.prototype.forEach.call(sw.children, function (btn) {
        var on = btn.dataset.shTheme === shareState.theme;
        btn.classList.toggle("on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    var list = $("smShareList");
    if (list) {
      Array.prototype.forEach.call(list.children, function (btn) {
        var idx = +btn.dataset.shVerse;
        var on = shareState.selected.indexOf(idx) >= 0;
        btn.classList.toggle("on", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
  }
  function openShareSheet() {
    var ctx = shareContext();
    if (!ctx || state.bi >= ctx.sc.b.length) return;
    stop();
    var pl = $("smPlay"); if (pl) pl.innerHTML = icFill("play");
    shareState.open = true;
    shareState.selected = [];
    var endBi = Math.min(ctx.sc.b.length, state.bi + perPage);
    for (var i = state.bi; i < endBi && shareState.selected.length < SHARE_MAX; i++) {
      shareState.selected.push(i);
    }
    if (!shareState.selected.length) shareState.selected.push(state.bi);

    var old = $("smShareOverlay");
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var swatchesHtml = SHARE_THEMES.map(function (th) {
      var on = th.key === shareState.theme;
      var bg = "linear-gradient(145deg, " + th.stops[0] + ", " + th.stops[2] + ")";
      return '<button type="button" class="sh-swatch' + (on ? " on" : "") + '" data-sh-theme="' + th.key + '" title="' + th.name + '" aria-label="تم رنگی ' + th.name + '" aria-pressed="' + (on ? "true" : "false") + '" style="background:' + bg + '"></button>';
    }).join("");

    var winStart = Math.max(0, state.bi - 8);
    var winEnd = Math.min(ctx.sc.b.length, state.bi + 16);
    var pickerHtml = "";
    for (var vi = winStart; vi < winEnd; vi++) {
      var b = ctx.sc.b[vi];
      var isSel = shareState.selected.indexOf(vi) >= 0;
      pickerHtml += '<button type="button" class="sh-vitem' + (isSel ? " on" : "") + '" data-sh-verse="' + vi + '" aria-pressed="' + (isSel ? "true" : "false") + '">' +
        '<span class="sh-vnum">' + fa(vi + 1) + '</span>' +
        '<span class="sh-vtxt"><span>' + esc(b[0]) + '</span>' + (b[1] ? '<span>' + esc(b[1]) + '</span>' : '') + '</span>' +
      '</button>';
    }

    var ov = document.createElement("div");
    ov.id = "smShareOverlay";
    ov.className = "sh-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "اشتراک‌گذاری بیت");
    ov.setAttribute("tabindex", "-1");
    ov.innerHTML =
      '<div class="sh-sheet">' +
        '<div class="sh-top">' +
          '<b>اشتراک‌گذاری بیت</b>' +
          '<button type="button" class="sm-x sh-close" data-a="sh-close" aria-label="بستن">' + ic("x") + '</button>' +
        '</div>' +
        '<div class="sh-preview-wrap" id="smShareCardWrap">' + shareCardHTML(ctx) + '</div>' +
        '<div class="sh-controls-row">' +
          '<div class="sh-formats" id="smShareFormats" role="group" aria-label="قالب خروجی">' +
            '<button type="button" class="sh-fmt' + (shareState.format === "card" ? " on" : "") + '" data-sh-fmt="card" aria-pressed="' + (shareState.format === "card" ? "true" : "false") + '">کارت</button>' +
            '<button type="button" class="sh-fmt' + (shareState.format === "story" ? " on" : "") + '" data-sh-fmt="story" aria-pressed="' + (shareState.format === "story" ? "true" : "false") + '">استوری ۹:۱۶</button>' +
          '</div>' +
        '<div class="sh-swatches" id="smShareSwatches" role="group" aria-label="رنگ کارت">' + swatchesHtml + '</div></div>' +
        '<div class="sh-picker-head"><span>انتخاب ابیات (تا ۴ بیت)</span><span id="smShareCount">' + fa(shareState.selected.length) + ' از ' + fa(SHARE_MAX) + ' بیت انتخاب‌شده</span></div>' +
        '<div class="sh-picker" id="smShareList">' + pickerHtml + '</div>' +
        '<div class="sh-status" id="smShareStatus" aria-live="polite"></div>' +
        '<div class="sh-actions">' +
          '<button type="button" class="sh-btn-primary" id="smShareNative" data-a="sh-native">' + ic("share") + '<span>اشتراک‌گذاری</span></button>' +
          '<button type="button" class="sh-btn-sec" id="smShareDl" data-a="sh-download">' + ic("download") + '<span>ذخیرهٔ تصویر (PNG)</span></button>' +
        '</div>' +
      '</div>';

    ov.addEventListener("click", function (ev) {
      if (ev.target === ov) closeShareSheet();
    });
    root.appendChild(ov);
    var activeItem = ov.querySelector(".sh-vitem.on");
    if (activeItem && activeItem.scrollIntoView) {
      try { activeItem.scrollIntoView({ block: "nearest" }); } catch (e) {}
    }
    try { ov.focus({ preventScroll: true }); } catch (e) { ov.focus(); }
  }
  function closeShareSheet() {
    shareState.open = false;
    shareState.busy = false;
    var ov = $("smShareOverlay");
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    var btn = $("smShare");
    if (btn && typeof btn.focus === "function") {
      try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); }
    }
  }
  function setShareStatus(msg) {
    var el = $("smShareStatus");
    if (el) el.textContent = msg || "";
  }
  function toggleShareVerse(idx) {
    var pos = shareState.selected.indexOf(idx);
    if (pos >= 0) {
      if (shareState.selected.length <= 1) {
        setShareStatus("حداقل یک بیت باید انتخاب بماند.");
        return;
      }
      shareState.selected.splice(pos, 1);
    } else {
      if (shareState.selected.length >= SHARE_MAX) {
        setShareStatus("حداکثر ۴ بیت هم‌زمان قابل انتخاب است.");
        return;
      }
      shareState.selected.push(idx);
      shareState.selected.sort(function (a, b) { return a - b; });
    }
    setShareStatus("");
    updateSharePreview();
  }
  function drawRoundedRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }
  function wrapPersianLines(c, text, maxW) {
    var words = String(text || "").trim().split(/\s+/);
    var lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var test = cur ? cur + " " + words[i] : words[i];
      if (c.measureText(test).width <= maxW || !cur) {
        cur = test;
      } else {
        lines.push(cur);
        cur = words[i];
      }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  function loadImageAsset(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = src;
    });
  }
  function renderShareCanvas() {
    var ctxData = shareContext();
    if (!ctxData) return Promise.reject(new Error("No active verse"));
    var th = getShareTheme();
    var isStory = shareState.format === "story";
    var cornerSrc = SHARE_ASSETS[th.corner] || SHARE_ASSETS.cornerGold;
    var shamsaSrc = th.key === "gold" ? SHARE_ASSETS.shamsaBronze : SHARE_ASSETS.shamsa;
    var fontsReady = (document.fonts && document.fonts.ready)
      ? Promise.all([
          document.fonts.load('400 44px "Gulzar"').catch(function () {}),
          document.fonts.load('700 32px "Vazirmatn"').catch(function () {}),
          document.fonts.load('500 22px "Vazirmatn"').catch(function () {}),
          document.fonts.ready
        ])
      : Promise.resolve();
    return Promise.all([
      fontsReady,
      loadImageAsset(ctxData.im.h || ctxData.im.m),
      loadImageAsset(cornerSrc),
      loadImageAsset(SHARE_ASSETS.paper),
      loadImageAsset(shamsaSrc)
    ]).then(function (res) {
      var coverImg = res[1], cornerImg = res[2], paperImg = res[3], shamsaImg = res[4];
      var W = 760;
      var PAD = 64;
      var INNER_W = W - PAD * 2;
      var count = shareState.selected.length;
      var verseSize = count === 1 ? 46 : (count === 2 ? 41 : (count === 3 ? 36 : 32));
      var lineH = Math.round(verseSize * 1.94);
      var coupletGap = count <= 2 ? 34 : 24;
      var verseFont = '400 ' + verseSize + 'px "Gulzar", "IranNastaliq", "Noto Nastaliq Urdu", "Amiri", serif';
      var titleFont = '700 30px "Vazirmatn", system-ui, sans-serif';
      var subFont = '500 21px "Vazirmatn", system-ui, sans-serif';
      var urlFont = '500 18px "Vazirmatn", system-ui, sans-serif';

      var meas = document.createElement("canvas").getContext("2d");
      meas.font = verseFont;
      var blocks = shareState.selected.map(function (idx) {
        var b = ctxData.sc.b[idx] || ["", ""];
        return {
          h1: wrapPersianLines(meas, b[0], INNER_W),
          h2: b[1] ? wrapPersianLines(meas, b[1], INNER_W) : []
        };
      });

      var totalLines = 0;
      blocks.forEach(function (bl) { totalLines += bl.h1.length + bl.h2.length; });
      var versesH = totalLines * lineH + Math.max(0, blocks.length - 1) * coupletGap;
      var covSize = 156;
      var HEADER_H = 166;
      var FOOTER_H = 62;
      var TOP_GAP = 48;
      var BOT_GAP = 46;
      var H = PAD + HEADER_H + TOP_GAP + versesH + BOT_GAP + FOOTER_H + PAD;

      var CW = isStory ? 1080 : (W + 96);
      var CH = isStory ? 1920 : (H + 112);
      var OX = Math.round((CW - W) / 2);
      var OY = isStory ? Math.round((CH - H) / 2) : 36;

      var canvas = document.createElement("canvas");
      canvas.width = CW;
      canvas.height = CH;
      var c = canvas.getContext("2d");
      c.clearRect(0, 0, CW, CH);

      if (isStory) {
        // Full 9:16 ambient Persian heritage backdrop
        var bgGrad = c.createLinearGradient(0, 0, CW * 0.3, CH);
        bgGrad.addColorStop(0, th.stops[2]);
        bgGrad.addColorStop(0.55, "#0F0D0A");
        bgGrad.addColorStop(1, "#070605");
        c.fillStyle = bgGrad;
        c.fillRect(0, 0, CW, CH);

        var halo = c.createRadialGradient(CW * 0.5, CH * 0.46, 60, CW * 0.5, CH * 0.48, CW * 0.85);
        halo.addColorStop(0, th.stops[0] + "88");
        halo.addColorStop(0.55, th.stops[1] + "33");
        halo.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = halo;
        c.fillRect(0, 0, CW, CH);

        if (paperImg) {
          c.save();
          c.globalAlpha = 0.06;
          c.globalCompositeOperation = "soft-light";
          var bgPat = c.createPattern(paperImg, "repeat");
          if (bgPat) { c.fillStyle = bgPat; c.fillRect(0, 0, CW, CH); }
          c.restore();
        }
      }

      // Apple/Spotify-style 2-tier elevation drop shadow behind the floating card
      c.save();
      c.shadowColor = isStory ? "rgba(0,0,0,0.62)" : "rgba(0,0,0,0.46)";
      c.shadowBlur = 44;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 20;
      drawRoundedRect(c, OX, OY, W, H, 36);
      c.fillStyle = th.stops[1];
      c.fill();
      c.restore();

      c.save();
      c.shadowColor = "rgba(0,0,0,0.28)";
      c.shadowBlur = 12;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 4;
      drawRoundedRect(c, OX, OY, W, H, 36);
      c.fillStyle = th.stops[1];
      c.fill();
      c.restore();

      // Translate into card coordinate space (0..W, 0..H)
      c.save();
      c.translate(OX, OY);
      drawRoundedRect(c, 0, 0, W, H, 36);
      c.clip();

      // 1. Matte organic mineral-pigment gradient
      var grad = c.createLinearGradient(0, 0, W * 0.25, H);
      grad.addColorStop(0, th.stops[0]);
      grad.addColorStop(0.54, th.stops[1]);
      grad.addColorStop(1, th.stops[2]);
      c.fillStyle = grad;
      c.fillRect(0, 0, W, H);

      var vig = c.createRadialGradient(W * 0.5, H * 0.36, W * 0.14, W * 0.5, H * 0.5, W * 0.92);
      vig.addColorStop(0, "rgba(255,255,255,0.03)");
      vig.addColorStop(1, "rgba(0,0,0,0.18)");
      c.fillStyle = vig;
      c.fillRect(0, 0, W, H);

      if (paperImg) {
        c.save();
        c.globalAlpha = 0.11;
        c.globalCompositeOperation = "soft-light";
        var pat = c.createPattern(paperImg, "repeat");
        if (pat) { c.fillStyle = pat; c.fillRect(0, 0, W, H); }
        c.restore();
      }

      // 2. Thin Tazhib hairline frame + 4 curved Tazhib corners
      var inset = 22;
      c.strokeStyle = th.frame;
      c.lineWidth = 1.3;
      drawRoundedRect(c, inset, inset, W - inset * 2, H - inset * 2, 22);
      c.stroke();

      if (cornerImg) {
        var cSize = 52;
        var cPad = 22;
        var corners = [
          [cPad, cPad, 1, 1],
          [W - cPad, cPad, -1, 1],
          [cPad, H - cPad, 1, -1],
          [W - cPad, H - cPad, -1, -1]
        ];
        c.save();
        drawRoundedRect(c, inset, inset, W - inset * 2, H - inset * 2, 22);
        c.clip();
        c.globalAlpha = th.key === "gold" ? 0.56 : 0.72;
        corners.forEach(function (pt) {
          c.save();
          c.translate(pt[0], pt[1]);
          c.scale(pt[2], pt[3]);
          c.drawImage(cornerImg, 0, 0, cSize, cSize);
          c.restore();
        });
        c.restore();
      }

      // 3. Top RTL Header: Miniature-framed cover (156px) + optically centered Scene Title & "فردوسی · شاهنامه"
      var covX = W - PAD - covSize;
      var covY = PAD;
      c.save();
      c.fillStyle = "rgba(0,0,0,0.22)";
      drawRoundedRect(c, covX - 5, covY - 5, covSize + 10, covSize + 10, 18);
      c.fill();
      c.strokeStyle = th.accent;
      c.globalAlpha = 0.65;
      c.lineWidth = 1.6;
      drawRoundedRect(c, covX - 5, covY - 5, covSize + 10, covSize + 10, 18);
      c.stroke();
      c.restore();

      c.save();
      drawRoundedRect(c, covX, covY, covSize, covSize, 14);
      c.clip();
      if (coverImg) {
        var iw = coverImg.naturalWidth || coverImg.width, ih = coverImg.naturalHeight || coverImg.height;
        var scR = Math.max(covSize / iw, covSize / ih);
        var dw = iw * scR, dh = ih * scR;
        c.drawImage(coverImg, covX + (covSize - dw) / 2, covY + (covSize - dh) / 2, dw, dh);
      } else {
        c.fillStyle = th.divider;
        c.fillRect(covX, covY, covSize, covSize);
      }
      c.restore();

      c.direction = "rtl";
      c.textAlign = "right";
      c.textBaseline = "middle";
      var textX = covX - 26;
      var maxTitleW = textX - PAD;
      c.font = titleFont;
      c.fillStyle = th.ink;
      var titleText = ctxData.sc.t;
      while (titleText.length > 4 && c.measureText(titleText).width > maxTitleW) {
        titleText = titleText.slice(0, -2) + "…";
      }
      c.fillText(titleText, textX, covY + 58);

      c.font = subFont;
      c.fillStyle = th.muted;
      c.fillText("فردوسی · شاهنامه", textX, covY + 100);

      // 4. Poetic Verses
      c.font = verseFont;
      c.fillStyle = th.ink;
      c.textAlign = "right";
      c.textBaseline = "alphabetic";
      var curY = PAD + HEADER_H + TOP_GAP + Math.round(verseSize * 1.15);
      blocks.forEach(function (bl, bi) {
        bl.h1.forEach(function (line) {
          c.fillText(line, W - PAD, curY);
          curY += lineH;
        });
        bl.h2.forEach(function (line) {
          c.fillText(line, W - PAD, curY);
          curY += lineH;
        });
        if (bi < blocks.length - 1) {
          c.strokeStyle = th.verseDiv;
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(PAD, curY - lineH * 0.45);
          c.lineTo(W - PAD, curY - lineH * 0.45);
          c.stroke();
          curY += coupletGap;
        }
      });

      // 5. Minimalist Footer
      var footY = H - PAD - 6;
      c.strokeStyle = th.divider;
      c.lineWidth = 1.1;
      c.beginPath();
      c.moveTo(PAD, footY - 36);
      c.lineTo(W - PAD, footY - 36);
      c.stroke();

      if (shamsaImg) {
        c.save();
        c.globalAlpha = 0.9;
        c.drawImage(shamsaImg, W - PAD - 28, footY - 17, 28, 28);
        c.restore();
      }

      c.direction = "ltr";
      c.textAlign = "left";
      c.textBaseline = "middle";
      c.font = urlFont;
      c.fillStyle = th.muted;
      c.fillText("bardiakhosravi.ir/shahnameh", PAD, footY - 3);

      // 6. Apple-style directional 1.5px specular edge rim light (makes card pop forward)
      var rim = c.createLinearGradient(0, 0, 0, H);
      rim.addColorStop(0, th.key === "gold" ? "rgba(255,249,224,0.62)" : "rgba(255,255,255,0.34)");
      rim.addColorStop(0.28, "rgba(255,255,255,0.10)");
      rim.addColorStop(1, "rgba(0,0,0,0.28)");
      c.strokeStyle = rim;
      c.lineWidth = 2;
      drawRoundedRect(c, 1, 1, W - 2, H - 2, 35);
      c.stroke();

      c.restore();
      return canvas;
    });
  }
  function triggerBlobDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      if (a.parentNode) a.parentNode.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  }
  function exportSharePng(mode) {
    if (shareState.busy) return;
    var ctxData = shareContext();
    if (!ctxData) return;
    shareState.busy = true;
    setShareStatus("در حال ساخت تصویر باکیفیت…");
    var fname = "shahnameh-" + (ART_MAP[ctxData.e.t] || "verse") + "-" + (shareState.selected[0] + 1) + (shareState.format === "story" ? "-story" : "") + ".png";
    renderShareCanvas().then(function (canvas) {
      return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        }, "image/png");
      });
    }).then(function (blob) {
      var shareText = shareState.selected.map(function (i) {
        var b = ctxData.sc.b[i];
        return b ? (b[0] + (b[1] ? "\n" + b[1] : "")) : "";
      }).join("\n\n") + "\n\n— " + ctxData.sc.t + " · فردوسی، شاهنامه";

      if (mode === "native" && typeof navigator !== "undefined" && navigator.share) {
        var file = null;
        try { file = new File([blob], fname, { type: "image/png" }); } catch (e) {}
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          return navigator.share({
            files: [file],
            title: ctxData.sc.t + " — فردوسی · شاهنامه",
            text: shareText
          }).then(function () {
            setShareStatus("با موفقیت به اشتراک گذاشته شد.");
          }).catch(function (err) {
            if (err && err.name === "AbortError") {
              setShareStatus("");
            } else {
              triggerBlobDownload(blob, fname);
              setShareStatus("اشتراک‌گذاری مستقیم در دسترس نبود؛ تصویر دانلود شد.");
            }
          });
        }
      }
      triggerBlobDownload(blob, fname);
      setShareStatus(mode === "native" ? "مرورگر از اشتراک مستقیم فایل پشتیبانی نمی‌کند؛ تصویر ذخیره شد." : "تصویر با موفقیت ذخیره شد.");
    }).catch(function () {
      setShareStatus("ساخت تصویر با خطا مواجه شد؛ لطفاً دوباره تلاش کنید.");
    }).then(function () {
      shareState.busy = false;
    });
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
    else if (d.a === "share") openShareSheet();
    else if (d.a === "sh-close") closeShareSheet();
    else if (d.a === "sh-download") exportSharePng("download");
    else if (d.a === "sh-native") exportSharePng("native");
    else if (d.shFmt) { shareState.format = d.shFmt; store.set("sm-share-format", d.shFmt); updateSharePreview(); }
    else if (d.shTheme) { shareState.theme = d.shTheme; store.set("sm-share-theme", d.shTheme); updateSharePreview(); }
    else if (d.shVerse != null) toggleShareVerse(+d.shVerse);
    else if (d.a === "per") { perPage = perPage >= 3 ? 1 : perPage + 1; store.set("sm-per", perPage); showCouplet(1); }
    else if (d.a === "spd") { speed = speed >= 8000 ? 3500 : speed < 5000 ? 6000 : 9000; if (playing) schedule(); var s0 = EP[state.ei].sc[state.k]; sync(S[s0].b.length, s0); }
    else if (d.a === "play") { playing = !playing; if (playing) schedule(); else stop(); var s1 = EP[state.ei].sc[state.k]; sync(S[s1].b.length, s1); }
  });
  document.addEventListener("keydown", function (ev) {
    if (!root.classList.contains("on")) return;
    var shOv = shareState.open ? $("smShareOverlay") : null;
    if (ev.key === "Tab") {
      var trapEl = shOv || root;
      var focusables = getFocusable(trapEl);
      if (!focusables.length) { ev.preventDefault(); trapEl.focus(); return; }
      var first = focusables[0], lastEl = focusables[focusables.length - 1], cur = document.activeElement;
      if (ev.shiftKey) {
        if (cur === first || cur === trapEl || !trapEl.contains(cur)) { ev.preventDefault(); lastEl.focus(); }
      } else {
        if (cur === lastEl || !trapEl.contains(cur)) { ev.preventDefault(); first.focus(); }
      }
      return;
    }
    if (shOv) {
      if (ev.key === "Escape") { ev.preventDefault(); closeShareSheet(); }
      return;
    }
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

  /* ---- Fix Full-Text Sidebar TOC Accordion, Mobile Drawer Close & Frozen Topbar ---- */
  (function fixFullTextUI() {
    var tocEl = document.getElementById("toc");
    var topbarEl = document.querySelector(".topbar");
    var coverEl = document.getElementById("cover");

    /* Keep topbar reliably frozen whenever user scrolls past cover */
    if (topbarEl && coverEl) {
      function syncTopbar() {
        var r = coverEl.getBoundingClientRect();
        topbarEl.classList.toggle("show", r.bottom <= 80);
      }
      syncTopbar();
      window.addEventListener("scroll", syncTopbar, { passive: true });
      window.addEventListener("resize", syncTopbar, { passive: true });
    }

    /* Fix TOC chapter expand/collapse: tapping ANYWHERE on .toc-ch toggles open/close cleanly */
    if (tocEl) {
      var h4 = tocEl.querySelector("h4");
      if (h4 && !h4.querySelector(".toc-close-btn")) {
        var closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "toc-close-btn";
        closeBtn.textContent = "بستن ×";
        closeBtn.addEventListener("click", function () { tocEl.classList.remove("open"); });
        h4.appendChild(closeBtn);
      }

      tocEl.addEventListener("click", function (ev) {
        var ch = ev.target.closest(".toc-ch");
        if (ch) {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          var g = ch.closest(".toc-group");
          if (g) g.classList.toggle("open");
          return;
        }
        var kid = ev.target.closest(".toc-kid");
        if (kid && window.innerWidth <= 980) {
          setTimeout(function () { tocEl.classList.remove("open"); }, 80);
        }
      }, true);
    }
  })();

})();
