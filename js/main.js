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

  /* ---------- меню кафе (правьте здесь: блюда, описания, цены) ---------- */
  var MENU_CATS = [
    { id: "all", ru: "Все", kk: "Барлығы" },
    { id: "porridge", ru: "Каши и блинчики", kk: "Ботқа мен құймақ" },
    { id: "breakfast", ru: "Завтраки", kk: "Таңғы ас" },
    { id: "soup", ru: "Первые блюда", kk: "Сорпалар" },
    { id: "set", ru: "Блюда за 1290", kk: "1290 теңгелік тағамдар" },
    { id: "hot", ru: "Горячие блюда", kk: "Ыстық тағамдар" },
    { id: "pizza", ru: "Пицца", kk: "Пицца" },
    { id: "burger", ru: "Бургер и хачапури", kk: "Бургер мен хачапури" },
    { id: "salad", ru: "Салаты", kk: "Салаттар" },
    { id: "snack", ru: "Закуски", kk: "Тіскебасар" },
    { id: "side", ru: "Гарниры", kk: "Гарнир" }
  ];
  /* c — категория, p — цена в тенге, img — файл из assets/img/menu (можно не указывать) */
  var MENU = [
    { c: "porridge", p: 1090, img: "rice-porridge.jpg", ru: ["Рисовая каша с курагой", "Нежная рисовая каша на молоке со сливочным маслом и сладкой курагой."], kk: ["Өрік қағы қосылған күріш ботқасы", "Сүтке піскен, сары май мен тәтті өрік қағы қосылған жұмсақ күріш ботқасы."] },
    { c: "porridge", p: 1090, img: "oat-porridge.jpg", ru: ["Овсяная каша", "Классическая овсянка на молоке со сливочным маслом."], kk: ["Сұлы ботқасы", "Сүтке піскен, сары май қосылған классикалық сұлы ботқасы."] },
    { c: "porridge", p: 1090, ru: ["Манная каша", "Воздушная манная каша на молоке со сливочным маслом."], kk: ["Ұнтақ жарма ботқасы", "Сүтке піскен, сары май қосылған үлпілдек ұнтақ жарма ботқасы."] },
    { c: "breakfast", p: 1880, ru: ["Восточный завтрак", "Яичница-глазунья, сытные говяжьи сосиски, свежие помидоры, брынза и хрустящие тосты."], kk: ["Шығыс таңғы асы", "Қуырылған жұмыртқа, сиыр етінен жасалған шұжықшалар, жас қызанақ, брынза және қытырлақ тост."] },
    { c: "breakfast", p: 1880, img: "scottish.jpg", ru: ["Шотландский завтрак", "Глазунья, обжаренные колбаски, белая фасоль в томатном соусе и румяные тосты."], kk: ["Шотланд таңғы асы", "Қуырылған жұмыртқа, қуырылған шұжықшалар, қызанақ тұздығындағы ақ бұршақ және қызарған тост."] },
    { c: "breakfast", p: 1880, ru: ["Американский завтрак", "Яичница, куриный рулет и обжаренные картофельные дольки."], kk: ["Америка таңғы асы", "Қуырылған жұмыртқа, тауық рулеті және қуырылған картоп тілімдері."] },
    { c: "breakfast", p: 1880, ru: ["Деревенский завтрак", "Яичница, жареные картофельные дольки с луком, сочные мясные колбаски."], kk: ["Ауыл таңғы асы", "Қуырылған жұмыртқа, пияз қосып қуырылған картоп тілімдері, шырынды ет шұжықшалары."] },
    { c: "porridge", p: 1290, ru: ["Блинчики с Нутеллой и ягодами"], kk: ["Нутелла мен жидек қосылған құймақ"] },

    { c: "burger", p: 3050, ru: ["Хачапури"], kk: ["Хачапури"] },
    { c: "burger", p: 2890, img: "burger.jpg", ru: ["Бургер (фри, соус)", "Говяжьи котлеты, хрустящие фри."], kk: ["Бургер (фри, тұздық)", "Сиыр етінен котлет, қытырлақ фри."] },
    { c: "pizza", p: 2690, ru: ["Маргарита", "Тонкое тесто, фирменный томатный соус, сыр моцарелла и свежие помидоры."], kk: ["Маргарита", "Жұқа қамыр, фирмалық қызанақ тұздығы, моцарелла және жас қызанақ."] },
    { c: "pizza", p: 3050, img: "pizza-4-seasons.jpg", ru: ["4 сезона", "Четыре вкуса: грибы, куриное филе, говяжья ветчина и помидоры под сыром моцарелла."], kk: ["4 маусым", "Төрт дәм: саңырауқ, тауық филесі, сиыр ветчинасы және моцарелла астындағы қызанақ."] },
    { c: "pizza", p: 3050, img: "pizza-pepperoni.jpg", ru: ["Пепперони", "Томатный соус, тягучая моцарелла и пикантная говяжья колбаса пепперони."], kk: ["Пепперони", "Қызанақ тұздығы, созылмалы моцарелла және сиыр етінен жасалған ащы пепперони шұжығы."] },
    { c: "pizza", p: 3050, img: "pizza-cheese.jpg", ru: ["Сырный ассорти"], kk: ["Ірімшік ассортиі"] },
    { c: "hot", p: 3050, ru: ["Курица с грибами"], kk: ["Тауық пен саңырауқ"] },

    { c: "hot", p: 2690, ru: ["Колбаски на гриле", "Куриные, говяжьи, бараньи, конина."], kk: ["Грильдегі шұжықшалар", "Тауық, сиыр, қой, жылқы еті."] },
    { c: "hot", p: 3690, ru: ["Форель с овощами"], kk: ["Көкөніс қосылған форель"] },
    { c: "hot", p: 2990, ru: ["Казан кебаб (баранина)", "Томленая баранина с обжаренным молодым картофелем и ароматными восточными специями."], kk: ["Қазан кебаб (қой еті)", "Қуырылған жас картоп пен хош иісті шығыс дәмдеуіштері қосылған бұқтырылған қой еті."] },
    { c: "hot", p: 2990, img: "kazan-kebab.jpg", ru: ["Казан кебаб (говядина)", "Сочные кусочки говядины с обжаренным золотистым картофелем и луком."], kk: ["Қазан кебаб (сиыр еті)", "Алтын түсті қуырылған картоп пен пияз қосылған шырынды сиыр еті."] },
    { c: "hot", p: 2990, ru: ["Картофель с мясом по-деревенски"], kk: ["Ауылша ет қосылған картоп"] },
    { c: "hot", p: 3190, ru: ["Тай куырдак"], kk: ["Тай қуырдақ"] },

    { c: "salad", p: 1990, ru: ["Малибу", "Куриное филе, сладкая кукуруза, сыр, свежие помидоры и огурцы с легкой заправкой."], kk: ["Малибу", "Тауық филесі, тәтті жүгері, ірімшік, жас қызанақ пен қияр, жеңіл тұздық."] },
    { c: "salad", p: 2190, img: "eggplant.jpg", ru: ["Хрустящие баклажаны", "Обжаренные до хруста баклажаны, свежие помидоры, кинза и фирменный кисло-сладкий соус."], kk: ["Қытырлақ баялды", "Қытырлағанша қуырылған баялды, жас қызанақ, кинза және фирмалық қышқыл-тәтті тұздық."] },
    { c: "salad", p: 2090, img: "caesar.jpg", ru: ["Цезарь с курицей"], kk: ["Тауық еті қосылған «Цезарь»"] },
    { c: "salad", p: 1590, ru: ["Ачичук", "Освежающий салат к горячему из тонко нарезанных помидоров, сладкого лука и базилика."], kk: ["Ачичук", "Жұқа туралған қызанақ, тәтті пияз және базиликтен жасалған сергітетін салат."] },
    { c: "salad", p: 1990, img: "greek.jpg", ru: ["Греческий"], kk: ["Грек салаты"] },
    { c: "salad", p: 1890, ru: ["Оливье"], kk: ["Оливье"] },

    { c: "set", p: 1290, img: "chicken-mushroom.jpg", ru: ["Курица с грибами", "Сочное куриное филе и шампиньоны в нежном сливочном соусе. Гарнир: рассыпчатый белый рис."], kk: ["Саңырауқ қосылған тауық", "Нәзік кілегей тұздығындағы шырынды тауық филесі мен шампиньон. Гарнир: үгілмелі ақ күріш."] },
    { c: "set", p: 1290, ru: ["Курица терияки", "Кусочки куриного филе, обжаренные в традиционном сладко-соленом соусе терияки с кунжутом. Гарнир: ароматный отварной рис."], kk: ["Терияки тауығы", "Күнжіт қосылған тәтті-тұзды терияки тұздығында қуырылған тауық филесі. Гарнир: хош иісті күріш."] },
    { c: "set", p: 1290, ru: ["Судак с рисом", "Филе судака (запеченное) с легким лимонно-масляным соусом. Гарнир: белый рис со свежей зеленью."], kk: ["Күріш қосылған көксерке", "Жеңіл лимон-май тұздығы қосылған пісірілген көксерке филесі. Гарнир: аскөк қосылған ақ күріш."] },
    { c: "set", p: 1290, ru: ["Манты с тыквой", "Тонкое тесто, начинка из мясного фарша и сочной сладкой тыквы."], kk: ["Асқабақ қосылған мәнті", "Жұқа қамыр, ет фаршы мен шырынды тәтті асқабақ."] },
    { c: "set", p: 1290, img: "manty-beef.jpg", ru: ["Манты с говядиной", "Тонкое домашнее тесто, начинка из фарша (говядина) с луком и специями."], kk: ["Сиыр еті қосылған мәнті", "Жұқа үй қамыры, пияз бен дәмдеуіш қосылған сиыр етінің фаршы."] },
    { c: "set", p: 1290, ru: ["Бифштекс"], kk: ["Бифштекс"] },
    { c: "set", p: 1290, ru: ["Гуляш с пюре", "Нежные кусочки говядины, тушенные в густом томатно-овощном соусе. Гарнир: воздушное картофельное пюре."], kk: ["Езбе қосылған гуляш", "Қою қызанақ-көкөніс тұздығында бұқтырылған жұмсақ сиыр еті. Гарнир: үлпілдек картоп езбесі."] },
    { c: "set", p: 1290, img: "bolognese.jpg", ru: ["Паста Болоньезе"], kk: ["Болоньезе пастасы"] },
    { c: "set", p: 1290, ru: ["Паста Альфредо"], kk: ["Альфредо пастасы"] },
    { c: "set", p: 1290, ru: ["Тефтели в томатном соусе"], kk: ["Қызанақ тұздығындағы тефтели"] },

    { c: "soup", p: 1290, img: "chicken-soup.jpg", ru: ["Куриный суп"], kk: ["Тауық сорпасы"] },
    { c: "soup", p: 1290, ru: ["Пельмени по-домашнему"], kk: ["Үй тұшпарасы"] },
    { c: "soup", p: 1290, ru: ["Тефтели по-домашнему"], kk: ["Үй тефтелиі"] },
    { c: "soup", p: 1290, img: "solyanka.jpg", ru: ["Солянка"], kk: ["Солянка"] },
    { c: "soup", p: 1290, img: "pumpkin-soup.jpg", ru: ["Тыквенный суп"], kk: ["Асқабақ көжесі"] },
    { c: "soup", p: 1290, img: "lentil-soup.jpg", ru: ["Чечевичный суп"], kk: ["Жасымық көжесі"] },
    { c: "soup", p: 1290, img: "ramen-beef.jpg", ru: ["Рамен с говядиной"], kk: ["Сиыр еті қосылған рамен"] },
    { c: "soup", p: 1290, img: "ramen-chicken.jpg", ru: ["Рамен с курицей"], kk: ["Тауық еті қосылған рамен"] },

    { c: "snack", p: 1990, ru: ["Крылышки (8 шт)"], kk: ["Қанатшалар (8 дана)"] },
    { c: "snack", p: 1890, img: "nuggets.jpg", ru: ["Наггетсы (8 шт)"], kk: ["Наггетс (8 дана)"] },
    { c: "side", p: 790, img: "fries.jpg", ru: ["Фри"], kk: ["Фри"] },
    { c: "side", p: 790, ru: ["Дольки"], kk: ["Картоп тілімдері"] },
    { c: "side", p: 790, ru: ["Рис"], kk: ["Күріш"] }
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
    renderShelf(); renderFilters(); renderCatalog(false); renderDishFilters(); renderDishes();
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

  /* ---------- меню кафе ---------- */
  var dishes = $("#dishes"), dishFilters = $("#dish-filters"), dishCat = "all";
  try { var dh = location.hash.replace("#", ""); if (MENU_CATS.some(function (c) { return c.id === dh; })) dishCat = dh; } catch (e) {}
  function price(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸"; }
  function dishHTML(d, i) {
    var t = d[lang];
    return '<li class="dish' + (d.img ? "" : " dish--text") + '" style="--d:' + (Math.min(i, 8) * 0.04).toFixed(2) + 's">' +
      (d.img ? '<span class="dish__img"><img src="assets/img/menu/' + d.img + '" alt="" loading="lazy"></span>' : "") +
      '<span class="dish__body"><span class="dish__name">' + esc(t[0]) + "</span>" +
      (t[1] ? '<span class="dish__desc">' + esc(t[1]) + "</span>" : "") +
      '<b class="dish__price">' + price(d.p) + "</b></span></li>";
  }
  function renderDishFilters() {
    if (!dishFilters) return;
    dishFilters.innerHTML = MENU_CATS.map(function (c) {
      return '<button class="chip" type="button" data-cat="' + c.id + '" aria-pressed="' + (c.id === dishCat) + '">' + c[lang] + "</button>";
    }).join("");
  }
  function renderDishes() {
    if (!dishes) return;
    dishes.innerHTML = MENU_CATS.filter(function (c) { return c.id !== "all" && (dishCat === "all" || c.id === dishCat); }).map(function (c) {
      var list = MENU.filter(function (d) { return d.c === c.id; });
      return '<section class="dishes__group"><h2 class="dishes__title">' + c[lang] + '</h2><ul class="dishes__list">' + list.map(dishHTML).join("") + "</ul></section>";
    }).join("");
  }
  if (dishFilters) dishFilters.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    dishCat = b.dataset.cat; renderDishFilters(); renderDishes();
    try { history.replaceState(null, "", dishCat === "all" ? location.pathname : "#" + dishCat); } catch (err) {}
    var top = dishes.getBoundingClientRect().top + window.scrollY - 150;
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
