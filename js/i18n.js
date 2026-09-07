/**
 * JUI PORTFOLIO, I18N
 * EN (default), DE, RU, UK
 * Switcher on glass pill bar
 */
(function(){
  const DICT = {
    en: {
      nav_projects: "PROJECTS",
      nav_experience: "EXPERIENCE",
      nav_contact: "CONTACT",
      nav_about: "About me",
      hero_subheader: "COMPUTER GENERATED IMAGERY",
      about_title: "ABOUT ME",
      about_bio: "3D Environment Artist with a passion for cinematic aesthetics and large-scale world-building. Specializing in asset creation, UV mapping, PBR texturing, lighting, and scene composition. Always open to new horizons and a wide range of projects.",
      about_age_label: "AGE",
      about_location_label: "LOCATION",
      about_location_value: "Germany",
      about_languages_label: "LANGUAGES",
      projects_title: "PROJECT FILES",
      file_meta_02: "Interior, 2026",
      file_meta_03: "Environment, 2026",
      details_btn: "DETAILS",
      details_engine_label: "ENGINE",
      details_tools_label: "TOOLS",
      details_year_label: "YEAR",
      details_desc_01: "A sun-scorched desert environment built around large-scale terrain silhouettes, layered dune formations, and a cinematic play of heat, shadow, and distant haze. Procedural Gaea terrain + hand-authored vegetation.",
      details_desc_02: "Awaiting publication, full breakdown soon. Interior study focused on material fidelity and grounded storytelling through props.",
      details_desc_03: "Awaiting publication, full breakdown soon. Large-scale mountain environment exploring scale, atmosphere, and distant haze.",
      open_visual: "OPEN VISUAL →",
      all_details: "View project details",
      bd_pending: "Project breakdown coming soon.",
      proj_name_wip: "COMING SOON",
      file_meta_wip: "In Production, 2026",
      details_desc_wip: "New environment in production, full reveal soon.",
      skills_title: "SKILLS",
      skills_header: "SKILLS UTILISATION",
      exp_title: "EXPERIENCE",
      exp_role: "INDEPENDENT 3D ENVIRONMENT ARTIST",
      exp_desc: "Full-cycle production of personal real-time environments. Managed all stages of development from initial blockout and hard-surface asset creation to PBR texturing, lighting, and final scene composition in Unreal Engine 5.",
      contact_quote_text: "“My goal isn't just to show beautiful visuals, but to build a world players can truly believe in, where they can find a piece of themselves”",
      contact_cta: "Let's Contact",
      footer_copyright: "© 2026 Lytvin Daria. All rights reserved. Designed and developed by the creator.",
      bd_kicker: "PROCESS",
      bd_assets: "Assets.",
      bd_t1: "Reference.",
      bd_d1: "The project starts with gathering references, real-world desert outposts, terrain silhouettes, material samples and lighting moods. Boards are organized by Main Focus, Landscape, Render, Light, Atmosphere, Assets Detail, Texture and Organic elements to define the visual direction before modeling begins.",
      bd_t2: "UV Unwrapping.",
      bd_d2: "Once the model is finalized, it is unwrapped into clean, distortion-free UVs. A proper UV layout is what allows textures to sit perfectly on every surface later in the pipeline.",
      bd_t3: "Texturing.",
      bd_d3: "Materials are authored layer by layer, color, roughness and surface detail are built up gradually until every asset reads naturally under the scene lighting.",
      bd_t4: "Scene Setup.",
      bd_d4: "All assets are imported into Unreal Engine, where the scene comes together, placement, lighting setup, post-process volumes and camera work define the mood of the environment.",
      bd_t5: "Engine Work.",
      bd_d5: "Further refinement inside Unreal Engine: shaders, foliage, particles and lighting are iterated step by step until the atmosphere matches the original vision.",
      bd_t6: "Final Render.",
      bd_d6: "The final stage, camera settings, exposure and post-processing come together to produce the finished rendered image of the environment.",
      bd_footer: "Copyright © 2026 Lytvin Daria. All rights reserved.",
      modal_name_label: "NAME:",
      modal_age_label: "AGE:",
      modal_location_label: "LOCATION:",
      modal_location_value: "Germany",
      modal_languages_label: "Languages:",
      modal_languages_text: "Russian (native), Ukrainian (native), English (intermediate), German (A1–B2)",
      modal_bio_label: "Biography:",
      modal_bio_text: "I create 3D worlds. Cinematic aesthetics are my passion, but I can also easily adapt to a variety of artistic styles and settings. I’m always open to new horizons and a wide range of projects."
    },
    de: {
      nav_projects: "PROJEKTE",
      nav_experience: "ERFAHRUNG",
      nav_contact: "KONTAKT",
      nav_about: "Über mich",
      hero_subheader: "COMPUTERGENERIERTE BILDER",
      about_title: "ÜBER MICH",
      about_bio: "3D Environment Artist mit Leidenschaft für filmische Ästhetik und großflächiges Worldbuilding. Spezialisiert auf Asset-Erstellung, UV-Mapping, PBR-Texturing, Lighting und Szenenkomposition. Offen für neue Horizonte und vielfältige Projekte.",
      about_age_label: "ALTER",
      about_location_label: "STANDORT",
      about_location_value: "Deutschland",
      about_languages_label: "SPRACHEN",
      projects_title: "PROJEKTDATEIEN",
      file_meta_02: "Innenraum, 2026",
      file_meta_03: "Umgebung, 2026",
      details_btn: "DETAILS",
      details_engine_label: "ENGINE",
      details_tools_label: "TOOLS",
      details_year_label: "JAHR",
      details_desc_01: "Eine sonnenverbrannte Wüstenumgebung mit großflächigen Terrain-Silhouetten, geschichteten Dünenformationen und filmischem Spiel aus Hitze, Schatten und fernem Dunst. Prozedurales Gaea-Terrain + handgefertigte Vegetation.",
      details_desc_02: "Veröffentlichung ausstehend, vollständiges Breakdown folgt in Kürze. Innenraum-Studie mit Fokus auf Materialtreue und erzählerischen Props.",
      details_desc_03: "Veröffentlichung ausstehend, vollständiges Breakdown folgt in Kürze. Großflächige Bergumgebung, die Maßstab, Atmosphäre und fernen Dunst erforscht.",
      open_visual: "VISUAL ÖFFNEN →",
      all_details: "Projektdetails ansehen",
      bd_pending: "Die Projektdokumentation folgt in Kürze.",
      proj_name_wip: "DEMNÄCHST",
      file_meta_wip: "In Produktion, 2026",
      details_desc_wip: "Neue Umgebung in Produktion, Enthüllung folgt in Kürze.",
      skills_title: "FÄHIGKEITEN",
      skills_header: "FÄHIGKEITEN",
      exp_title: "ERFAHRUNG",
      exp_role: "UNABHÄNGIGE 3D ENVIRONMENT ARTIST",
      exp_desc: "Eigenständige Produktion von Echtzeit-Umgebungen. Alle Phasen von Blockout und Hard-Surface-Assets bis hin zu PBR-Texturing, Lighting und finaler Szenenkomposition in Unreal Engine 5.",
      contact_quote_text: "„Mein Ziel ist es nicht nur, schöne Bilder zu zeigen, sondern eine Welt zu erschaffen, an die Spieler wirklich glauben können und in der sie ein Stück von sich selbst finden“",
      contact_cta: "Kontakt aufnehmen",
      footer_copyright: "© 2026 Lytvin Daria. Alle Rechte vorbehalten. Design und Entwicklung von der Autorin.",
      bd_kicker: "PROZESS",
      bd_assets: "Assets.",
      bd_t1: "Referenz.",
      bd_d1: "Jedes Projekt beginnt mit Referenzen, reale Wüstenaußenposten, Terrain-Silhouetten, Materialproben und Lichtstimmungen. Boards sind nach Main Focus, Landschaft, Render, Licht, Atmosphäre, Asset-Details, Texturen und organischen Elementen organisiert und legen die visuelle Richtung vor dem Modeling fest.",
      bd_t2: "UV-Unwrapping.",
      bd_d2: "Nach dem Modeling wird jedes Asset sauber und verzerrungsfrei unwrapped. Ein gutes UV-Layout sorgt dafür, dass Texturen später perfekt auf jeder Oberfläche sitzen.",
      bd_t3: "Texturierung.",
      bd_d3: "Materialien entstehen Schicht für Schicht, Farbe, Roughness und Oberflächendetails werden aufgebaut, bis jedes Asset im Szenenlicht natürlich wirkt.",
      bd_t4: "Szenenaufbau.",
      bd_d4: "Alle Assets werden in die Unreal Engine importiert, wo die Szene entsteht, Placement, Licht-Setup, Post-Process-Volumes und Kameraarbeit bestimmen die Stimmung der Umgebung.",
      bd_t5: "Engine-Arbeit.",
      bd_d5: "Weitere Verfeinerung in der Unreal Engine: Shader, Vegetation, Partikel und Licht werden Schritt für Schritt iteriert, bis die Atmosphäre der ursprünglichen Vision entspricht.",
      bd_t6: "Finales Rendering.",
      bd_d6: "Die letzte Stufe, Kameraeinstellungen, Belichtung und Post-Processing fügen sich zum fertigen gerenderten Bild der Umgebung zusammen.",
      bd_footer: "Copyright © 2026 Lytvin Daria. Alle Rechte vorbehalten.",
      modal_name_label: "NAME:",
      modal_age_label: "ALTER:",
      modal_location_label: "STANDORT:",
      modal_location_value: "Deutschland",
      modal_languages_label: "Sprachen:",
      modal_languages_text: "Russisch (Muttersprache), Ukrainisch (Muttersprache), Englisch (fortgeschritten), Deutsch (A1–B2)",
      modal_bio_label: "Biografie:",
      modal_bio_text: "Ich erschaffe 3D-Welten. Filmische Ästhetik ist meine Leidenschaft, aber ich passe mich leicht an verschiedene Stile und Settings an. Offen für neue Horizonte und vielfältige Projekte."
    },
    ru: {
      nav_projects: "ПРОЕКТЫ",
      nav_experience: "ОПЫТ",
      nav_contact: "КОНТАКТЫ",
      nav_about: "Обо мне",
      hero_subheader: "КОМПЬЮТЕРНАЯ ГРАФИКА",
      about_title: "ОБО МНЕ",
      about_bio: "3D-художник по окружению с любовью к кинематографичной эстетике и масштабным мирам. Специализируюсь на создании ассетов, UV-развёртке, PBR-текстурировании, освещении и композиции сцен. Открыта к новым горизонтам и разноплановым проектам.",
      about_age_label: "ВОЗРАСТ",
      about_location_label: "ЛОКАЦИЯ",
      about_location_value: "Германия",
      about_languages_label: "ЯЗЫКИ",
      projects_title: "ФАЙЛЫ ПРОЕКТОВ",
      file_meta_02: "Интерьер, 2026",
      file_meta_03: "Окружение, 2026",
      details_btn: "ДЕТАЛИ",
      details_engine_label: "ДВИЖОК",
      details_tools_label: "ИНСТРУМЕНТЫ",
      details_year_label: "ГОД",
      details_desc_01: "Выжженная солнцем пустынная сцена с масштабными силуэтами рельефа, слоистыми дюнами и кинематографичной игрой жары, тени и дымки. Процедурный рельеф Gaea + ручная растительность.",
      details_desc_02: "Скоро публикация, полный разбор скоро. Интерьерное исследование с фокусом на материалы и сторителлинг через пропсы.",
      details_desc_03: "Скоро публикация, полный разбор скоро. Горная среда с акцентом на масштаб, атмосферу и дальнюю дымку.",
      open_visual: "ОТКРЫТЬ ВИЗУАЛ →",
      all_details: "Посмотреть детали проекта",
      bd_pending: "Подробный разбор проекта скоро появится.",
      proj_name_wip: "СКОРО",
      file_meta_wip: "В производстве, 2026",
      details_desc_wip: "Новое окружение в производстве, скоро покажу.",
      skills_title: "НАВЫКИ",
      skills_header: "ВЛАДЕНИЕ НАВЫКАМИ",
      exp_title: "ОПЫТ",
      exp_role: "НЕЗАВИСИМЫЙ 3D-ХУДОЖНИК ПО ОКРУЖЕНИЮ",
      exp_desc: "Полный цикл создания окружений реального времени. Все этапы, от блок-аута и ассетов до PBR-текстурирования, освещения и финальной композиции сцены в Unreal Engine 5.",
      contact_quote_text: "«Моя цель: не просто показать красивые визуалы, а построить мир, в который игроки смогут по-настоящему поверить и найти в нём частичку себя»",
      contact_cta: "Связаться",
      footer_copyright: "© 2026 Лытвин Дарья. Все права защищены. Дизайн и разработка: автор.",
      bd_kicker: "ПРОЦЕСС",
      bd_assets: "Ассеты.",
      bd_t1: "Референсы.",
      bd_d1: "Проект начинается со сбора референсов, реальные пустынные аванпосты, силуэты рельефа, образцы материалов и световые настроения. Борды организованы по блокам: главный фокус, ландшафт, рендер, свет, атмосфера, детали ассетов, текстуры и органика, так задаётся визуальное направление до начала моделирования.",
      bd_t2: "UV-развёртка.",
      bd_d2: "После моделирования каждый ассет разворачивается в чистые UV без искажений. Грамотная развёртка позволяет добиться того, благодаря чему текстуры позже идеально ложатся на каждую поверхность.",
      bd_t3: "Текстурирование.",
      bd_d3: "Материалы создаются послойно, цвет, шероховатость и детали поверхности наращиваются постепенно, пока каждый ассет не станет естественно читаться в свете сцены.",
      bd_t4: "Сборка сцены.",
      bd_d4: "Все ассеты импортируются в Unreal Engine, где сцена собирается воедино, расстановка, настройка света, post-process volumes и работа камеры задают настроение окружения.",
      bd_t5: "Работа в движке.",
      bd_d5: "Дальнейшая доводка в Unreal Engine: шейдеры, растительность, частицы и свет итерируются шаг за шагом, пока атмосфера не совпадёт с изначальным видением.",
      bd_t6: "Финальный рендер.",
      bd_d6: "Финал, настройки камеры, экспозиция и постобработка соединяются в готовое отрендеренное изображение окружения.",
      bd_footer: "© 2026 Лытвин Дарья. Все права защищены.",
      modal_name_label: "ИМЯ:",
      modal_age_label: "ВОЗРАСТ:",
      modal_location_label: "ЛОКАЦИЯ:",
      modal_location_value: "Германия",
      modal_languages_label: "Языки:",
      modal_languages_text: "Русский (родной), Украинский (родной), Английский (средний), Немецкий (A1–B2)",
      modal_bio_label: "Биография:",
      modal_bio_text: "Я создаю 3D-миры. Кинематографичная эстетика, моя страсть, но я легко адаптируюсь к разным стилям и сеттингам. Открыта к новым горизонтам и разноплановым проектам."
    },
    uk: {
      nav_projects: "ПРОЄКТИ",
      nav_experience: "ДОСВІД",
      nav_contact: "КОНТАКТИ",
      nav_about: "Про мене",
      hero_subheader: "КОМП'ЮТЕРНА ГРАФІКА",
      about_title: "ПРО МЕНЕ",
      about_bio: "3D-художниця з оточення з любов'ю до кінематографічної естетики та масштабних світів. Спеціалізуюся на створенні асетів, UV-розгортці, PBR-текстуруванні, освітленні та композиції сцен. Відкрита до нових горизонтів і різнопланових проєктів.",
      about_age_label: "ВІК",
      about_location_label: "ЛОКАЦІЯ",
      about_location_value: "Німеччина",
      about_languages_label: "МОВИ",
      projects_title: "ФАЙЛИ ПРОЄКТІВ",
      file_meta_02: "Інтер'єр, 2026",
      file_meta_03: "Оточення, 2026",
      details_btn: "ДЕТАЛІ",
      details_engine_label: "РУШІЙ",
      details_tools_label: "ІНСТРУМЕНТИ",
      details_year_label: "РІК",
      details_desc_01: "Виснажена сонцем пустельна сцена з масштабними силуетами рельєфу, шаруватими дюнами та кінематографічною грою спеки, тіні та серпанку. Процедурний рельєф Gaea + ручна рослинність.",
      details_desc_02: "Скоро публікація, повний розбір незабаром. Інтер'єрне дослідження з фокусом на матеріали та сторітелінг через пропси.",
      details_desc_03: "Скоро публікація, повний розбір незабаром. Гірське середовище з акцентом на масштаб, атмосферу та далекий серпанок.",
      open_visual: "ВІДКРИТИ ВІЗУАЛ →",
      all_details: "Переглянути деталі проєкту",
      bd_pending: "Детальний розбір проєкту незабаром з’явиться.",
      proj_name_wip: "СКОРО",
      file_meta_wip: "У виробництві, 2026",
      details_desc_wip: "Нове оточення у виробництві, скоро покажу.",
      skills_title: "НАВИЧКИ",
      skills_header: "ВОЛОДІННЯ НАВИЧКАМИ",
      exp_title: "ДОСВІД",
      exp_role: "НЕЗАЛЕЖНА 3D-ХУДОЖНИЦЯ З ОТОЧЕННЯ",
      exp_desc: "Повний цикл створення оточень реального часу. Всі етапи, від блок-ауту та асетів до PBR-текстурування, освітлення та фінальної композиції сцени в Unreal Engine 5.",
      contact_quote_text: "«Моя мета: не просто показати красиві візуали, а побудувати світ, у який гравці зможуть по-справжньому повірити та знайти в ньому частинку себе»",
      contact_cta: "Зв'язатися",
      footer_copyright: "© 2026 Литвин Дар'я. Всі права захищені. Дизайн і розробка, авторка.",
      bd_kicker: "ПРОЦЕС",
      bd_assets: "Асети.",
      bd_t1: "Референси.",
      bd_d1: "Проєкт починається зі збору референсів, реальні пустельні аванпости, силуети рельєфу, зразки матеріалів і світлові настрої. Борди організовано за блоками: головний фокус, ландшафт, рендер, світло, атмосфера, деталі асетів, текстури й органіка, так задається візуальний напрям до початку моделювання.",
      bd_t2: "UV-розгортка.",
      bd_d2: "Після моделювання кожен асет розгортається в чисті UV без спотворень. Грамотна розгортка, те, завдяки чому текстури згодом ідеально лягають на кожну поверхню.",
      bd_t3: "Текстурування.",
      bd_d3: "Матеріали створюються пошарово, колір, шорсткість і деталі поверхні нарощуються поступово, доки кожен асет не стане природно читатися у світлі сцени.",
      bd_t4: "Збірка сцени.",
      bd_d4: "Усі асети імпортуються в Unreal Engine, де сцена збирається докупи, розстановка, налаштування світла, post-process volumes і робота камери задають настрій оточення.",
      bd_t5: "Робота в рушії.",
      bd_d5: "Подальше доведення в Unreal Engine: шейдери, рослинність, частинки та світло ітеруються крок за кроком, доки атмосфера не збіжиться з початковим баченням.",
      bd_t6: "Фінальний рендер.",
      bd_d6: "Фінал, налаштування камери, експозиція та постобробка з'єднуються в готове відрендерене зображення оточення.",
      bd_footer: "© 2026 Литвин Дар'я. Всі права захищені.",
      modal_name_label: "ІМ'Я:",
      modal_age_label: "ВІК:",
      modal_location_label: "ЛОКАЦІЯ:",
      modal_location_value: "Німеччина",
      modal_languages_label: "Мови:",
      modal_languages_text: "Російська (рідна), Українська (рідна), Англійська (середня), Німецька (A1–B2)",
      modal_bio_label: "Біографія:",
      modal_bio_text: "Я створюю 3D-світи. Кінематографічна естетика, моя пристрасть, але я легко адаптуюся до різних стилів і сетингів. Відкрита до нових горизонтів і різнопланових проєктів."
    }
  };

  const STORAGE_KEY = 'jui_lang';
  let current = 'en';
  try { current = localStorage.getItem(STORAGE_KEY) || 'en'; } catch {}

  function apply(lang){
    if(!Object.prototype.hasOwnProperty.call(DICT, lang)) lang = 'en';
    const dict = DICT[lang] || DICT.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if(dict[k] != null){
        // preserve arrow etc if value contains →
        el.textContent = dict[k];
      }
    });
    // update typing effect source if exists
    if(window.__updateTypingText){
      window.__updateTypingText(dict.nav_about || DICT.en.nav_about);
    }
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    current = lang;
  }

  function init(){
    // set initial
    if(!DICT[current]) current = 'en';
    apply(current);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => apply(btn.dataset.lang));
    });
  }

  window.JUI_I18N = { apply, DICT, get current(){ return current; } };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
