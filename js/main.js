/* Bal Qamyr — логика сайта: язык, меню, анимации, каталог */
(function () {
  "use strict";

  var INSTAGRAM = "https://www.instagram.com/_bal_coffee/";
  var root = document.documentElement;
  var body = document.body;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- товары (правьте здесь: названия, описания, составы) ---------- */
  var CATS = [
    { id: "all", ru: "Все", kk: "Барлығы" },
    { id: "frozen", ru: "Полуфабрикаты", kk: "Жартылай фабрикаттар" },
    { id: "dough", ru: "Тесто", kk: "Қамыр" },
    { id: "tea", ru: "К чаю", kk: "Шайға" },
    { id: "bakery", ru: "Пекарня и кофейня", kk: "Наубайхана мен кофехана" }
  ];

  var PRODUCTS = [
    { id: "manty", cat: "frozen", img: "manty.jpg", pos: "12% 50%", weight: "500 г", top: true,
      ru: { name: "Манты", desc: "С тыквой, картофелем или мраморной говядиной",
        text: "Три начинки на выбор: тыква с говядиной, картофель с говядиной и мраморная говядина. Лепим вручную, вам остается поставить мантоварку." },
      kk: { name: "Мәнті", desc: "Асқабақ, картоп немесе мәрмәр сиыр етімен",
        text: "Үш түрлі салма: асқабақ пен сиыр еті, картоп пен сиыр еті және мәрмәр сиыр еті. Қолмен түйеміз — сізге тек қасқанға салу қалады." } },
    { id: "beef", cat: "frozen", img: "beef.jpg", pos: "12% 50%", weight: "500 г", top: true,
      ru: { name: "Котлеты говяжьи", desc: "Мякоть говядины, лук, чеснок",
        text: "Домашние котлеты из мякоти говядины. Обжарьте с двух сторон и доведите под крышкой.",
        comp: "Говядина (мякоть), лук репчатый свежий, хлеб пшеничный (мука пшеничная, вода, дрожжи), вода питьевая, жир говяжий, яйцо куриное, чеснок, соль, перец черный.",
        allergens: "глютен, яйцо" },
      kk: { name: "Сиыр етінен котлет", desc: "Сиыр етінің жұмсағы, пияз, сарымсақ",
        text: "Сиыр етінің жұмсағынан жасалған үй котлеті. Екі жағын қуырып, қақпақ астында пісіріңіз.",
        comp: "Сиыр етінің жұмсағы, жас басты пияз, бидай наны (бидай ұны, су, ашытқы), ауыз су, сиыр майы, тауық жұмыртқасы, сарымсақ, тұз, қара бұрыш.",
        allergens: "глютен, жұмыртқа" } },
    { id: "chicken", cat: "frozen", img: "chicken.jpg", pos: "12% 50%", weight: "500 г",
      ru: { name: "Котлеты куриные", desc: "Куриное филе и сливочное масло для сочности",
        text: "Нежные котлеты из куриного филе. Сливочное масло внутри делает их сочными.",
        comp: "Филе куриное, лук репчатый свежий, сухари панировочные (мука пшеничная, вода, дрожжи, соль), яйцо куриное, масло сливочное (для сочности), чеснок, соль, перец черный.",
        allergens: "глютен, яйцо, лактоза" },
      kk: { name: "Тауық етінен котлет", desc: "Тауық филесі мен шырынды ететін сары май",
        text: "Тауық филесінен жасалған жұмсақ котлет. Ішіндегі сары май оны шырынды етеді.",
        comp: "Тауық филесі, жас басты пияз, нан үгіндісі (бидай ұны, су, ашытқы, тұз), тауық жұмыртқасы, сары май (шырынды болуы үшін), сарымсақ, тұз, қара бұрыш.",
        allergens: "глютен, жұмыртқа, лактоза" } },
    { id: "tefteli", cat: "frozen", img: "tefteli.jpg", pos: "12% 50%", weight: "500 г",
      ru: { name: "Тефтели", desc: "К пюре, рису или в томатный соус",
        text: "Тушите в томатном или сливочном соусе — ужин готов за двадцать минут." },
      kk: { name: "Тефтели", desc: "Езбеге, күрішке немесе қызанақ тұздығына",
        text: "Қызанақ немесе кілегей тұздығында бұқтырыңыз — кешкі ас жиырма минутта дайын." } },
    { id: "frikadelki", cat: "frozen", img: "frikadelki.jpg", pos: "12% 50%", weight: "500 г", top: true,
      ru: { name: "Фрикадельки", desc: "Куриное филе, лук и ничего лишнего",
        text: "Для супа и для детского стола: в составе только филе, лук, яйцо, вода и соль.",
        comp: "Филе куриное, лук репчатый свежий, вода питьевая, яйцо куриное пищевое, соль поваренная." },
      kk: { name: "Фрикаделька", desc: "Тауық филесі, пияз — артық ештеңе жоқ",
        text: "Сорпаға да, балалар дастарқанына да: құрамында тек филе, пияз, жұмыртқа, су және тұз.",
        comp: "Тауық филесі, жас басты пияз, ауыз су, тауық жұмыртқасы, ас тұзы." } },
    { id: "syrniki", cat: "frozen", img: "syrniki.jpg", pos: "50% 50%", top: true,
      ru: { name: "Сырники", desc: "Из творога, готовы за несколько минут",
        text: "Завтрак без хлопот: обжарьте на сковороде и подайте со сметаной или нашей ягодной заготовкой.",
        comp: "Творог, мука пшеничная в/с (или крупа манная), яйцо куриное, сахар, соль поваренная или ванильный сахар.",
        allergens: "лактоза, яйцо, глютен" },
      kk: { name: "Сырник", desc: "Сүзбеден жасалған, бірнеше минутта дайын",
        text: "Әуресіз таңғы ас: табада қуырып, қаймақпен немесе біздің жидек дайындамасымен ұсыныңыз.",
        comp: "Сүзбе, жоғары сұрыпты бидай ұны (немесе ұнтақ жармасы), тауық жұмыртқасы, қант, ас тұзы немесе ванильді қант.",
        allergens: "лактоза, жұмыртқа, глютен" } },
    { id: "quiche", cat: "frozen", img: "quiche.jpg", pos: "50% 55%", top: true,
      ru: { name: "Киш с семгой", desc: "Готов к выпечке, просто поставьте в духовку",
        text: "Фирменный киш с семгой: полуфабрикат по классической технологии, сделанный вручную. Из морозилки сразу в духовку." },
      kk: { name: "Албырт балық қосылған киш", desc: "Пісіруге дайын — тек пешке қойыңыз",
        text: "Албырт балық қосылған фирмалық киш: классикалық технологиямен қолдан жасалған жартылай фабрикат. Мұздатқыштан бірден пешке." } },
    { id: "kespe", cat: "dough", img: "kespe.jpg", pos: "50% 60%",
      ru: { name: "Bal Kespe", desc: "Домашняя лапша для супа и кеспе",
        text: "Тонко нарезанная домашняя лапша. Опустите в кипящий бульон на несколько минут." },
      kk: { name: "Bal Kespe", desc: "Сорпаға арналған үй кеспесі",
        text: "Жіңішке кесілген үй кеспесі. Қайнап тұрған сорпаға бірнеше минутқа салыңыз." } },
    { id: "zhaima", cat: "dough", img: "zhaima.jpg", pos: "50% 30%", top: true,
      ru: { name: "Zhaima Hanym", desc: "Жайма — тесто для бешбармака",
        text: "Раскатанное и нарезанное тесто для бешбармака. Экономит час у плиты перед приходом гостей." },
      kk: { name: "Zhaima Hanym", desc: "Жайма — бешбармаққа арналған қамыр",
        text: "Жайылып, кесілген бешбармақ қамыры. Қонақ келер алдында бір сағат уақытыңызды үнемдейді." } },
    { id: "qatparly", cat: "dough", img: "qatparly.jpg", pos: "50% 55%",
      ru: { name: "Qatparly", desc: "Слоеное тесто",
        text: "Қатпарлы — слоеное тесто для самсы, пирогов и домашней выпечки." },
      kk: { name: "Qatparly", desc: "Қатпарлы қамыр",
        text: "Самсаға, бәлішке және үй тоқаштарына арналған қатпарлы қамыр." } },
    { id: "lagman", cat: "dough", img: "lagman.jpg", pos: "12% 50%", weight: "500 г",
      ru: { name: "Тесто для лагмана", desc: "Тянутая лапша, остается сварить",
        text: "Готовая лапша для лагмана. Сварите, добавьте подливу — и к столу." },
      kk: { name: "Лағман қамыры", desc: "Созылған кеспе, тек пісіру қалады",
        text: "Лағманға арналған дайын кеспе. Пісіріп, сай құйыңыз — дастарқанға дайын." } },
    { id: "jam-strawberry", cat: "tea", img: "jam-strawberry.jpg", pos: "50% 50%",
      ru: { name: "Клубничный рай", desc: "Заготовка к чаю из клубники",
        text: "Ягодная заготовка: ложка в горячий чай или на сырники." },
      kk: { name: "Құлпынай жұмағы", desc: "Шайға арналған құлпынай дайындамасы",
        text: "Жидек дайындамасы: бір қасығын ыстық шайға немесе сырникке қосыңыз." } },
    { id: "jam-raspberry", cat: "tea", img: "jam-raspberry.jpg", pos: "50% 50%",
      ru: { name: "Малиновый рай", desc: "Заготовка к чаю из малины",
        text: "Малиновое пюре для чая. Особенно кстати в астанинскую зиму." },
      kk: { name: "Таңқурай жұмағы", desc: "Шайға арналған таңқурай дайындамасы",
        text: "Шайға арналған таңқурай езбесі. Астананың қысында тіпті орынды." } },
    { id: "jam-blackberry", cat: "tea", img: "jam-blackberry.jpg", pos: "50% 50%",
      ru: { name: "Ежевичный рай", desc: "Заготовка к чаю из ежевики",
        text: "Ежевичная заготовка с легкой кислинкой — к черному и зеленому чаю." },
      kk: { name: "Қожақат жұмағы", desc: "Шайға арналған қожақат дайындамасы",
        text: "Сәл қышқылтым қожақат дайындамасы — қара және көк шайға." } },
    { id: "bakery", cat: "bakery", img: "bakery.jpg", pos: "50% 50%",
      ru: { name: "Свежая выпечка", desc: "Круассаны, ватрушки, рогалики",
        text: "Печем каждый день: круассаны, ватрушки с творогом, рогалики. Что на витрине сегодня — спросите у нас в Instagram." },
      kk: { name: "Жаңа піскен тоқаштар", desc: "Круассан, ватрушка, рогалик",
        text: "Күн сайын пісіреміз: круассан, сүзбе қосылған ватрушка, рогалик. Бүгін сөреде не барын Instagram-да сұраңыз." } },
    { id: "table", cat: "bakery", img: "table.jpg", pos: "50% 50%",
      ru: { name: "Завтраки и обеды", desc: "Таңғы ас и түскі ас в кофейне",
        text: "Приходите на завтрак или обед: горячая выпечка, домашние блюда и кофе." },
      kk: { name: "Таңғы және түскі ас", desc: "Кофеханадағы таңғы ас пен түскі ас",
        text: "Таңғы немесе түскі асқа келіңіз: ыстық тоқаш, үй тағамдары және кофе." } },
    { id: "coffee", cat: "bakery", img: "coffee.jpg", pos: "50% 40%",
      ru: { name: "Кофе и десерты", desc: "Авторские напитки, торты и трайфлы",
        text: "Кофе со взбитыми сливками и карамелью, торты и трайфлы на витрине." },
      kk: { name: "Кофе мен десерттер", desc: "Авторлық сусындар, торттар мен трайфлдар",
        text: "Көпіртілген кілегей мен карамель қосылған кофе, сөредегі торттар мен трайфлдар." } }
  ];

  var UI = {
    ru: { more: "Подробнее", comp: "Состав", allergens: "Аллергены", shelf: "Срок хранения — 90 дней",
      marks: ["Ручная лепка", "Натуральный продукт", "Без ГМО"], ask: "Спросить в Instagram", close: "Закрыть" },
    kk: { more: "Толығырақ", comp: "Құрамы", allergens: "Аллергендер", shelf: "Сақтау мерзімі — 90 күн",
      marks: ["Қолмен түйілген", "Табиғи өнім", "ГМО-сыз"], ask: "Instagram-да сұрау", close: "Жабу" }
  };

  /* ---------- язык ---------- */
  var lang = "ru";
  try { lang = localStorage.getItem("bq-lang") || "ru"; } catch (e) {}
  if (lang !== "kk") lang = "ru";

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem("bq-lang", lang); } catch (e) {}
    root.lang = lang;
    $$("[data-kk]").forEach(function (el) {
      if (el.dataset.ru === undefined) el.dataset.ru = el.innerHTML;
      el.innerHTML = lang === "kk" ? el.dataset.kk : el.dataset.ru;
    });
    var t = root.dataset["title" + (lang === "kk" ? "Kk" : "Ru")];
    if (t) document.title = t;
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    renderShelf(); renderFilters(); renderCatalog(false);
  }
  $$(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); });
  });

  /* ---------- карточка товара ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function cardHTML(p, i) {
    var t = p[lang];
    return '<button class="card" type="button" data-id="' + p.id + '" data-cat="' + p.cat + '" style="--d:' + (i * 0.05).toFixed(2) + 's">' +
      '<span class="card__img"><img src="assets/img/' + p.img + '" alt="' + esc(t.name) + '" loading="lazy" style="--pos:' + p.pos + '"></span>' +
      '<span class="card__body"><span class="card__name">' + esc(t.name) + '</span><span class="card__desc">' + esc(t.desc) + '</span>' +
      '<span class="card__meta">' + (p.weight ? "<b>" + p.weight + "</b>" : "<span></span>") + "<i>" + UI[lang].more + "</i></span></span></button>";
  }

  /* ---------- полка на главной ---------- */
  var rail = $("#shelf");
  function renderShelf() {
    if (!rail) return;
    rail.innerHTML = PRODUCTS.filter(function (p) { return p.top; }).map(cardHTML).join("");
  }
  if (rail) {
    var down = false, moved = 0, startX = 0, startLeft = 0;
    rail.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; moved = 0; startX = e.clientX; startLeft = rail.scrollLeft; });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx));
      if (moved > 6) { rail.classList.add("is-drag"); rail.scrollLeft = startLeft - dx; }
    });
    window.addEventListener("pointerup", function () { down = false; setTimeout(function () { rail.classList.remove("is-drag"); }, 0); });
    rail.addEventListener("click", function (e) { if (moved > 6) { e.stopPropagation(); e.preventDefault(); moved = 0; } }, true);
  }

  /* ---------- каталог и фильтры ---------- */
  var grid = $("#catalog"), filters = $("#filters"), current = "all";
  try { var h = location.hash.replace("#", ""); if (CATS.some(function (c) { return c.id === h; })) current = h; } catch (e) {}
  function renderFilters() {
    if (!filters) return;
    filters.innerHTML = CATS.map(function (c) {
      return '<button class="chip" type="button" data-cat="' + c.id + '" aria-pressed="' + (c.id === current) + '">' + c[lang] + "</button>";
    }).join("");
  }
  function renderCatalog(animate) {
    if (!grid) return;
    var list = PRODUCTS.filter(function (p) { return current === "all" || p.cat === current; });
    grid.innerHTML = list.map(cardHTML).join("");
    if (animate !== false) $$(".card", grid).forEach(function (c) { c.classList.add("pop"); });
  }
  if (filters) filters.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    current = b.dataset.cat; renderFilters(); renderCatalog(true);
    try { history.replaceState(null, "", current === "all" ? location.pathname : "#" + current); } catch (err) {}
    var top = grid.getBoundingClientRect().top + window.scrollY - 150;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: "smooth" });
  });

  /* ---------- окно товара ---------- */
  var sheet = $("#sheet"), lastFocus = null;
  function openSheet(id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0]; if (!p || !sheet) return;
    var t = p[lang], u = UI[lang], frozen = p.cat === "frozen" || p.cat === "dough";
    var tags = (p.weight ? ["<span>" + p.weight + "</span>"] : []).concat(frozen ? u.marks.map(function (m) { return "<span>" + m + "</span>"; }) : []);
    $(".sheet__img", sheet).innerHTML = '<img src="assets/img/' + p.img + '" alt="' + esc(t.name) + '">';
    $(".sheet__body", sheet).innerHTML = '<h2 id="sheet-title">' + esc(t.name) + "</h2>" +
      (tags.length ? '<div class="sheet__tags">' + tags.join("") + "</div>" : "") +
      "<p>" + esc(t.text) + "</p><dl>" +
      (t.comp ? "<dt>" + u.comp + "</dt><dd>" + esc(t.comp) + "</dd>" : "") +
      (t.allergens ? "<dt>" + u.allergens + "</dt><dd>" + esc(t.allergens) + "</dd>" : "") +
      (p.cat === "frozen" ? "<dt>" + u.shelf + "</dt>" : "") + "</dl>" +
      '<a class="btn btn--orange" href="' + INSTAGRAM + '" target="_blank" rel="noopener">' + u.ask + "</a>";
    $(".sheet__close", sheet).setAttribute("aria-label", u.close);
    lastFocus = document.activeElement;
    sheet.classList.add("is-open"); body.classList.add("is-locked");
    $(".sheet__box", sheet).scrollTop = 0;
    $(".sheet__close", sheet).focus();
  }
  function closeSheet() {
    if (!sheet || !sheet.classList.contains("is-open")) return;
    sheet.classList.remove("is-open"); body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".card[data-id]"); if (c) { openSheet(c.dataset.id); return; }
    if (e.target.closest("[data-close]")) closeSheet();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeSheet(); toggleMenu(false); } });

  /* ---------- шапка и меню ---------- */
  var header = $(".header"), burger = $(".burger"), menu = $(".menu"), lastY = 0;
  function toggleMenu(open) {
    if (!menu) return;
    menu.classList.toggle("is-open", open); burger.setAttribute("aria-expanded", String(open));
    body.classList.toggle("is-locked", open);
  }
  if (burger) burger.addEventListener("click", function () { toggleMenu(!menu.classList.contains("is-open")); });
  $$(".menu a").forEach(function (a) { a.addEventListener("click", function () { toggleMenu(false); }); });

  var hero = $(".hero, .page-head"), ticking = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-solid", y > 30);
    var hide = y > lastY && y > 260 && !(menu && menu.classList.contains("is-open"));
    header.classList.toggle("is-hidden", hide);
    var f = $(".filters"); if (f) f.style.top = hide ? "0px" : "var(--header-h)";
    if (hero && y < window.innerHeight * 1.2) hero.style.setProperty("--sy", y + "px");
    lastY = y; ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- появление при прокрутке ---------- */
  var targets = $$(".rv, .wipe");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else { targets.forEach(function (t) { t.classList.add("is-in"); }); }

  /* ---------- старт ---------- */
  applyLang(lang);
  onScroll();
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  var loader = $(".loader");
  function ready() { if (loader) loader.classList.add("is-done"); body.classList.add("is-ready"); }
  if (loader) { setTimeout(ready, 1250); } else { ready(); }
})();
