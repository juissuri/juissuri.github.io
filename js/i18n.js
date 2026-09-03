/**
 * JUI PORTFOLIO — I18N
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
      hero_scroll: "SCROLL DOWN",
      about_title: "ABOUT ME",
      about_bio: "3D Environment Artist with a passion for cinematic aesthetics and large-scale world-building. Specializing in asset creation, UV mapping, PBR texturing, lighting, and scene composition. Always open to new horizons and a wide range of projects.",
      about_age_label: "AGE",
      about_location_label: "LOCATION",
      about_location_value: "Germany",
      about_languages_label: "LANGUAGES",
      projects_title: "PROJECT FILES",
      file_meta_01: "Desert Outpost — 2026",
      file_meta_02: "Interior — 2026",
      file_meta_03: "Environment — 2026",
      details_btn: "DETAILS",
      details_engine_label: "ENGINE",
      details_tools_label: "TOOLS",
      details_year_label: "YEAR",
      details_status_label: "STATUS",
      details_status_published: "Published",
      details_status_awaiting: "Awaiting Publication",
      details_desc_01: "A sun-scorched desert environment built around large-scale terrain silhouettes, layered dune formations, and a cinematic play of heat, shadow, and distant haze. Procedural Gaea terrain + hand-authored vegetation.",
      details_desc_02: "Awaiting publication — full breakdown soon. Interior study focused on material fidelity and grounded storytelling through props.",
      details_desc_03: "Awaiting publication — full breakdown soon. Large-scale mountain environment exploring scale, atmosphere, and distant haze.",
      open_visual: "OPEN VISUAL →",
      all_details: "all project creation details",
      skills_title: "SKILLS",
      skills_header: "% PERCENTAGE OF SKILLS UTILISATION %",
      exp_title: "EXPERIENCE",
      exp_role: "INDEPENDENT 3D ENVIRONMENT ARTIST",
      exp_desc: "Full-cycle production of personal real-time environments. Managed all stages of development from initial blockout and hard-surface asset creation to PBR texturing, lighting, and final scene composition in Unreal Engine 5.",
      contact_quote_text: "“My goal isn't just to show beautiful visuals, but to build a world players can truly believe in, where they can find a piece of themselves”",
      contact_cta: "Let's Contact",
      footer_copyright: "© 2026 Lytvin Daria. All rights reserved. Designed and developed by the creator.",
      footer_note: "All projects featured in this portfolio represent non-commercial experience.",
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
      hero_scroll: "NACH UNTEN SCROLLEN",
      about_title: "ÜBER MICH",
      about_bio: "3D Environment Artist mit Leidenschaft für filmische Ästhetik und großflächiges Worldbuilding. Spezialisiert auf Asset-Erstellung, UV-Mapping, PBR-Texturing, Lighting und Szenenkomposition. Offen für neue Horizonte und vielfältige Projekte.",
      about_age_label: "ALTER",
      about_location_label: "STANDORT",
      about_location_value: "Deutschland",
      about_languages_label: "SPRACHEN",
      projects_title: "PROJEKTDATEIEN",
      file_meta_01: "Wüstenaußenposten — 2026",
      file_meta_02: "Innenraum — 2026",
      file_meta_03: "Umgebung — 2026",
      details_btn: "DETAILS",
      details_engine_label: "ENGINE",
      details_tools_label: "TOOLS",
      details_year_label: "JAHR",
      details_status_label: "STATUS",
      details_status_published: "Veröffentlicht",
      details_status_awaiting: "Veröffentlichung ausstehend",
      details_desc_01: "Eine sonnenverbrannte Wüstenumgebung mit großflächigen Terrain-Silhouetten, geschichteten Dünenformationen und filmischem Spiel aus Hitze, Schatten und fernem Dunst. Prozedurales Gaea-Terrain + handgefertigte Vegetation.",
      details_desc_02: "Veröffentlichung ausstehend — vollständiges Breakdown folgt in Kürze. Innenraum-Studie mit Fokus auf Materialtreue und erzählerischen Props.",
      details_desc_03: "Veröffentlichung ausstehend — vollständiges Breakdown folgt in Kürze. Großflächige Bergumgebung, die Maßstab, Atmosphäre und fernen Dunst erforscht.",
      open_visual: "VISUAL ÖFFNEN →",
      all_details: "alle Projektdetails",
      skills_title: "FÄHIGKEITEN",
      skills_header: "% FÄHIGKEITEN IN PROZENT %",
      exp_title: "ERFAHRUNG",
      exp_role: "UNABHÄNGIGE 3D ENVIRONMENT ARTIST",
      exp_desc: "Eigenständige Produktion von Echtzeit-Umgebungen. Alle Phasen von Blockout und Hard-Surface-Assets bis hin zu PBR-Texturing, Lighting und finaler Szenenkomposition in Unreal Engine 5.",
      contact_quote_text: "„Mein Ziel ist es nicht nur, schöne Bilder zu zeigen, sondern eine Welt zu erschaffen, an die Spieler wirklich glauben können und in der sie ein Stück von sich selbst finden“",
      contact_cta: "Kontakt aufnehmen",
      footer_copyright: "© 2026 Lytvin Daria. Alle Rechte vorbehalten. Design und Entwicklung von der Autorin.",
      footer_note: "Alle Projekte in diesem Portfolio sind nicht-kommerzielle Arbeiten.",
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
      hero_scroll: "ЛИСТАЙ ВНИЗ",
      about_title: "ОБО МНЕ",
      about_bio: "3D-художник по окружению с любовью к кинематографичной эстетике и масштабным мирам. Специализируюсь на создании ассетов, UV-развёртке, PBR-текстурировании, освещении и композиции сцен. Открыта к новым горизонтам и разноплановым проектам.",
      about_age_label: "ВОЗРАСТ",
      about_location_label: "ЛОКАЦИЯ",
      about_location_value: "Германия",
      about_languages_label: "ЯЗЫКИ",
      projects_title: "ФАЙЛЫ ПРОЕКТОВ",
      file_meta_01: "Пустынный аванпост — 2026",
      file_meta_02: "Интерьер — 2026",
      file_meta_03: "Окружение — 2026",
      details_btn: "ДЕТАЛИ",
      details_engine_label: "ДВИЖОК",
      details_tools_label: "ИНСТРУМЕНТЫ",
      details_year_label: "ГОД",
      details_status_label: "СТАТУС",
      details_status_published: "Опубликовано",
      details_status_awaiting: "Скоро публикация",
      details_desc_01: "Выжженная солнцем пустынная сцена с масштабными силуэтами рельефа, слоистыми дюнами и кинематографичной игрой жары, тени и дымки. Процедурный рельеф Gaea + ручная растительность.",
      details_desc_02: "Скоро публикация — полный разбор скоро. Интерьерное исследование с фокусом на материалы и сторителлинг через пропсы.",
      details_desc_03: "Скоро публикация — полный разбор скоро. Горная среда с акцентом на масштаб, атмосферу и дальнюю дымку.",
      open_visual: "ОТКРЫТЬ ВИЗУАЛ →",
      all_details: "все детали создания проекта",
      skills_title: "НАВЫКИ",
      skills_header: "% ПРОЦЕНТ ВЛАДЕНИЯ НАВЫКАМИ %",
      exp_title: "ОПЫТ",
      exp_role: "НЕЗАВИСИМЫЙ 3D-ХУДОЖНИК ПО ОКРУЖЕНИЮ",
      exp_desc: "Полный цикл создания окружений реального времени. Все этапы — от блок-аута и ассетов до PBR-текстурирования, освещения и финальной композиции сцены в Unreal Engine 5.",
      contact_quote_text: "«Моя цель — не просто показать красивые визуалы, а построить мир, в который игроки смогут по-настоящему поверить и найти в нём частичку себя»",
      contact_cta: "Связаться",
      footer_copyright: "© 2026 Лытвин Дарья. Все права защищены. Дизайн и разработка — автор.",
      footer_note: "Все проекты в этом портфолио — некоммерческий опыт.",
      modal_name_label: "ИМЯ:",
      modal_age_label: "ВОЗРАСТ:",
      modal_location_label: "ЛОКАЦИЯ:",
      modal_location_value: "Германия",
      modal_languages_label: "Языки:",
      modal_languages_text: "Русский (родной), Украинский (родной), Английский (средний), Немецкий (A1–B2)",
      modal_bio_label: "Биография:",
      modal_bio_text: "Я создаю 3D-миры. Кинематографичная эстетика — моя страсть, но я легко адаптируюсь к разным стилям и сеттингам. Открыта к новым горизонтам и разноплановым проектам."
    },
    uk: {
      nav_projects: "ПРОЄКТИ",
      nav_experience: "ДОСВІД",
      nav_contact: "КОНТАКТИ",
      nav_about: "Про мене",
      hero_subheader: "КОМП'ЮТЕРНА ГРАФІКА",
      hero_scroll: "ГОРТАЙ ВНИЗ",
      about_title: "ПРО МЕНЕ",
      about_bio: "3D-художниця з оточення з любов'ю до кінематографічної естетики та масштабних світів. Спеціалізуюся на створенні асетів, UV-розгортці, PBR-текстуруванні, освітленні та композиції сцен. Відкрита до нових горизонтів і різнопланових проєктів.",
      about_age_label: "ВІК",
      about_location_label: "ЛОКАЦІЯ",
      about_location_value: "Німеччина",
      about_languages_label: "МОВИ",
      projects_title: "ФАЙЛИ ПРОЄКТІВ",
      file_meta_01: "Пустельний аванпост — 2026",
      file_meta_02: "Інтер'єр — 2026",
      file_meta_03: "Оточення — 2026",
      details_btn: "ДЕТАЛІ",
      details_engine_label: "РУШІЙ",
      details_tools_label: "ІНСТРУМЕНТИ",
      details_year_label: "РІК",
      details_status_label: "СТАТУС",
      details_status_published: "Опубліковано",
      details_status_awaiting: "Скоро публікація",
      details_desc_01: "Виснажена сонцем пустельна сцена з масштабними силуетами рельєфу, шаруватими дюнами та кінематографічною грою спеки, тіні та серпанку. Процедурний рельєф Gaea + ручна рослинність.",
      details_desc_02: "Скоро публікація — повний розбір незабаром. Інтер'єрне дослідження з фокусом на матеріали та сторітелінг через пропси.",
      details_desc_03: "Скоро публікація — повний розбір незабаром. Гірське середовище з акцентом на масштаб, атмосферу та далекий серпанок.",
      open_visual: "ВІДКРИТИ ВІЗУАЛ →",
      all_details: "всі деталі створення проєкту",
      skills_title: "НАВИЧКИ",
      skills_header: "% ВІДСОТОК ВОЛОДІННЯ НАВИЧКАМИ %",
      exp_title: "ДОСВІД",
      exp_role: "НЕЗАЛЕЖНА 3D-ХУДОЖНИЦЯ З ОТОЧЕННЯ",
      exp_desc: "Повний цикл створення оточень реального часу. Всі етапи — від блок-ауту та асетів до PBR-текстурування, освітлення та фінальної композиції сцени в Unreal Engine 5.",
      contact_quote_text: "«Моя мета — не просто показати красиві візуали, а побудувати світ, у який гравці зможуть по-справжньому повірити та знайти в ньому частинку себе»",
      contact_cta: "Зв'язатися",
      footer_copyright: "© 2026 Литвин Дар'я. Всі права захищені. Дизайн і розробка — авторка.",
      footer_note: "Всі проєкти в цьому портфоліо — некомерційний досвід.",
      modal_name_label: "ІМ'Я:",
      modal_age_label: "ВІК:",
      modal_location_label: "ЛОКАЦІЯ:",
      modal_location_value: "Німеччина",
      modal_languages_label: "Мови:",
      modal_languages_text: "Російська (рідна), Українська (рідна), Англійська (середня), Німецька (A1–B2)",
      modal_bio_label: "Біографія:",
      modal_bio_text: "Я створюю 3D-світи. Кінематографічна естетика — моя пристрасть, але я легко адаптуюся до різних стилів і сетингів. Відкрита до нових горизонтів і різнопланових проєктів."
    }
  };

  const STORAGE_KEY = 'jui_lang';
  let current = localStorage.getItem(STORAGE_KEY) || 'en';

  function apply(lang){
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
    });
    localStorage.setItem(STORAGE_KEY, lang);
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
