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
      project_back: "← BACK",
      project_next: "NEXT PROJECT →",
      project_home: "HOME",
      hero_subheader: "COMPUTER GENERATED IMAGERY",
      about_title: "ABOUT ME",
      about_bio: "3D Environment Artist with a passion for cinematic aesthetics and large-scale world-building. Specializing in asset creation, UV mapping, PBR texturing, lighting, and scene composition. Always open to new horizons and a wide range of projects.",
      about_age_label: "AGE",
      about_location_label: "LOCATION",
      about_location_value: "Germany",
      about_languages_label: "LANGUAGES",
      projects_title: "PROJECT",
      projects_subtitle: "Environments built in Unreal Engine 5, from desert outposts to mountain ranges.",
      file_meta_02: "Interior, 2026",
      file_meta_03: "Environment, 2026",
      details_btn: "PROJECT DETAILS",
      breakdown_tab: "PROJECT DETAILS", breakdown_overview: "PRODUCTION OVERVIEW",
      details_engine_label: "ENGINE",
      details_tools_label: "TOOLS",
      details_year_label: "YEAR",
      stats_role_label: "ROLE", stats_target_label: "TARGET", stats_scope_label: "FOCUS", stats_status_label: "STATUS",
      stats_role_solo: "SOLO PROJECT", stats_target_realtime: "REAL-TIME", stats_status_live: "PUBLISHED", stats_status_wip: "IN PRODUCTION",
      stats_scope_01: "ENVIRONMENT · LIGHTING", stats_scope_02: "INTERIOR · PROPS", stats_scope_03: "TERRAIN · ATMOSPHERE", stats_scope_wip: "NOT DISCLOSED",
      details_desc_01: "Gibson Ridge is a cinematic desert outpost whose atmosphere is shaped by isolation and life far from civilization.",
      details_desc_02: "Awaiting publication, full breakdown soon. Interior study focused on material fidelity and grounded storytelling through props.",
      details_desc_03: "Awaiting publication, full breakdown soon. Large-scale mountain environment exploring scale, atmosphere, and distant haze.",
      open_visual: "GALLERY",
      all_details: "OPEN PROJECT DETAILS",
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
      music_label: "MUSIC",
      music_state_on: "ON",
      music_state_off: "OFF",
      footer_copyright: "© 2026 Lytvin Daria. All rights reserved. Designed and developed by the creator.",
      bd_kicker: "PROCESS",
      asset_ac: "Air conditioner", asset_project: "PROJECT", asset_material: "MATERIAL",
      bd_assets: "Assets.",
      bd_tech_title: "Technical Breakdown.",
      bd_tech_intro: "The environment was built as a connected real-time pipeline: procedural terrain establishes the large forms, authored assets add story and scale, and Unreal Engine brings the scene together through materials, foliage, lighting and atmosphere.",
      bd_pipe_1t: "Terrain foundation", bd_pipe_1d: "Large silhouettes and erosion patterns are developed procedurally before export.",
      bd_pipe_2t: "Asset production", bd_pipe_2d: "Hero and supporting assets are modeled, unwrapped and prepared for the scene.",
      bd_pipe_3t: "Material pass", bd_pipe_3d: "Surface response is shaped through color, roughness, normal detail and variation.",
      bd_pipe_4t: "Real-time assembly", bd_pipe_4d: "Composition, foliage, lighting and atmosphere are balanced in the final environment.",
      bd_scene_caption: "Scene setup · environment structure", bd_assembly_caption: "Assembly pass · scale and composition",
      bd_fact_terrain: "Terrain", bd_fact_assembly: "Assembly", bd_fact_material: "Materials", bd_fact_engine: "Engine",
      bd_t1: "Reference.",
      bd_d1: "The project starts with gathering references, real-world desert outposts, terrain silhouettes, material samples and lighting moods. Boards are organized by Main Focus, Landscape, Render, Light, Atmosphere, Assets Detail, Texture and Organic elements to define the visual direction before modeling begins.",
      bd_t2: "UV Unwrapping.",
      bd_d2: "Once the model is finalized, it is unwrapped into clean, distortion-free UVs. A proper UV layout is what allows textures to sit perfectly on every surface later in the pipeline.",
      bd_t3: "Texturing.",
      bd_d3: "Materials are authored layer by layer, color, roughness and surface detail are built up gradually until every asset reads naturally under the scene lighting.",
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
      project_back: "← ZURÜCK",
      project_next: "NÄCHSTES PROJEKT →",
      project_home: "STARTSEITE",
      hero_subheader: "COMPUTERGENERIERTE BILDER",
      about_title: "ÜBER MICH",
      about_bio: "3D Environment Artist mit Leidenschaft für filmische Ästhetik und großflächiges Worldbuilding. Spezialisiert auf Asset-Erstellung, UV-Mapping, PBR-Texturing, Lighting und Szenenkomposition. Offen für neue Horizonte und vielfältige Projekte.",
      about_age_label: "ALTER",
      about_location_label: "STANDORT",
      about_location_value: "Deutschland",
      about_languages_label: "SPRACHEN",
      projects_title: "PROJEKT",
      projects_subtitle: "Umgebungen aus Unreal Engine 5, von Wüstenaußenposten bis zu Bergwelten.",
      file_meta_02: "Innenraum, 2026",
      file_meta_03: "Umgebung, 2026",
      details_btn: "PROJECT DETAILS",
      breakdown_tab: "PROJECT DETAILS", breakdown_overview: "PRODUKTIONSÜBERSICHT",
      details_engine_label: "ENGINE",
      details_tools_label: "TOOLS",
      details_year_label: "JAHR",
      stats_role_label: "ROLLE", stats_target_label: "ZIEL", stats_scope_label: "FOKUS", stats_status_label: "STATUS",
      stats_role_solo: "SOLOPROJEKT", stats_target_realtime: "ECHTZEIT", stats_status_live: "VERÖFFENTLICHT", stats_status_wip: "IN PRODUKTION",
      stats_scope_01: "UMGEBUNG · LICHT", stats_scope_02: "INTERIEUR · PROPS", stats_scope_03: "TERRAIN · ATMOSPHÄRE", stats_scope_wip: "NICHT VERÖFFENTLICHT",
      details_desc_01: "Gibson Ridge ist ein filmischer Wüstenaußenposten, dessen Atmosphäre von Isolation und einem Leben fernab der Zivilisation geprägt ist.",
      details_desc_02: "Veröffentlichung ausstehend, vollständiges Breakdown folgt in Kürze. Innenraum-Studie mit Fokus auf Materialtreue und erzählerischen Props.",
      details_desc_03: "Veröffentlichung ausstehend, vollständiges Breakdown folgt in Kürze. Großflächige Bergumgebung, die Maßstab, Atmosphäre und fernen Dunst erforscht.",
      open_visual: "GALLERY",
      all_details: "PROJECT DETAILS ÖFFNEN",
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
      music_label: "MUSIK",
      music_state_on: "AN",
      music_state_off: "AUS",
      footer_copyright: "© 2026 Lytvin Daria. Alle Rechte vorbehalten. Design und Entwicklung von der Autorin.",
      bd_kicker: "PROZESS",
      asset_ac: "Klimagerät", asset_project: "PROJEKT", asset_material: "MATERIAL",
      bd_assets: "Assets.",
      bd_tech_title: "Technischer Breakdown.",
      bd_tech_intro: "Die Umgebung entstand als zusammenhängende Echtzeit-Pipeline: prozedurales Terrain definiert die großen Formen, erstellte Assets geben Geschichte und Maßstab, und in Unreal Engine werden Materialien, Vegetation, Licht und Atmosphäre zusammengeführt.",
      bd_pipe_1t: "Terrain-Grundlage", bd_pipe_1d: "Große Silhouetten und Erosionsmuster werden vor dem Export prozedural entwickelt.",
      bd_pipe_2t: "Asset-Produktion", bd_pipe_2d: "Hero- und Supporting-Assets werden modelliert, unwrapped und für die Szene vorbereitet.",
      bd_pipe_3t: "Material-Pass", bd_pipe_3d: "Farbe, Roughness, Normaldetails und Variation formen die Oberflächenwirkung.",
      bd_pipe_4t: "Echtzeit-Assembly", bd_pipe_4d: "Komposition, Vegetation, Licht und Atmosphäre werden in der finalen Umgebung ausbalanciert.",
      bd_scene_caption: "Szenenaufbau · Umgebungsstruktur", bd_assembly_caption: "Assembly-Pass · Maßstab und Komposition",
      bd_fact_terrain: "Terrain", bd_fact_assembly: "Assembly", bd_fact_material: "Materialien", bd_fact_engine: "Engine",
      bd_t1: "Referenz.",
      bd_d1: "Jedes Projekt beginnt mit Referenzen, reale Wüstenaußenposten, Terrain-Silhouetten, Materialproben und Lichtstimmungen. Boards sind nach Main Focus, Landschaft, Render, Licht, Atmosphäre, Asset-Details, Texturen und organischen Elementen organisiert und legen die visuelle Richtung vor dem Modeling fest.",
      bd_t2: "UV-Unwrapping.",
      bd_d2: "Nach dem Modeling wird jedes Asset sauber und verzerrungsfrei unwrapped. Ein gutes UV-Layout sorgt dafür, dass Texturen später perfekt auf jeder Oberfläche sitzen.",
      bd_t3: "Texturierung.",
      bd_d3: "Materialien entstehen Schicht für Schicht, Farbe, Roughness und Oberflächendetails werden aufgebaut, bis jedes Asset im Szenenlicht natürlich wirkt.",
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
      project_back: "← ВЕРНУТЬСЯ",
      project_next: "ДРУГОЙ ПРОЕКТ →",
      project_home: "ГЛАВНАЯ",
      hero_subheader: "КОМПЬЮТЕРНАЯ ГРАФИКА",
      about_title: "ОБО МНЕ",
      about_bio: "3D-художник по окружению с любовью к кинематографичной эстетике и масштабным мирам. Специализируюсь на создании ассетов, UV-развёртке, PBR-текстурировании, освещении и композиции сцен. Открыта к новым горизонтам и разноплановым проектам.",
      about_age_label: "ВОЗРАСТ",
      about_location_label: "ЛОКАЦИЯ",
      about_location_value: "Германия",
      about_languages_label: "ЯЗЫКИ",
      projects_title: "ПРОЕКТ",
      projects_subtitle: "Окружения на Unreal Engine 5, от пустынных аванпостов до горных хребтов.",
      file_meta_02: "Интерьер, 2026",
      file_meta_03: "Окружение, 2026",
      details_btn: "PROJECT DETAILS",
      breakdown_tab: "PROJECT DETAILS", breakdown_overview: "ОБЗОР ПРОИЗВОДСТВА",
      details_engine_label: "ДВИЖОК",
      details_tools_label: "ИНСТРУМЕНТЫ",
      details_year_label: "ГОД",
      stats_role_label: "РОЛЬ", stats_target_label: "ФОРМАТ", stats_scope_label: "ФОКУС", stats_status_label: "СТАТУС",
      stats_role_solo: "ЛИЧНЫЙ ПРОЕКТ", stats_target_realtime: "REAL-TIME", stats_status_live: "ОПУБЛИКОВАН", stats_status_wip: "В РАБОТЕ",
      stats_scope_01: "ОКРУЖЕНИЕ · СВЕТ", stats_scope_02: "ИНТЕРЬЕР · ПРОПСЫ", stats_scope_03: "ЛАНДШАФТ · АТМОСФЕРА", stats_scope_wip: "НЕ РАСКРЫТО",
      details_desc_01: "Gibson Ridge — кинематографичный пустынный аванпост, атмосфера которого построена вокруг изоляции и жизни вдали от цивилизации.",
      details_desc_02: "Скоро публикация, полный разбор скоро. Интерьерное исследование с фокусом на материалы и сторителлинг через пропсы.",
      details_desc_03: "Скоро публикация, полный разбор скоро. Горная среда с акцентом на масштаб, атмосферу и дальнюю дымку.",
      open_visual: "GALLERY",
      all_details: "ОТКРЫТЬ PROJECT DETAILS",
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
      music_label: "МУЗЫКА",
      music_state_on: "ВКЛ",
      music_state_off: "ВЫКЛ",
      footer_copyright: "© 2026 Лытвин Дарья. Все права защищены. Дизайн и разработка: автор.",
      bd_kicker: "ПРОЦЕСС",
      asset_ac: "Кондиционер", asset_project: "ПРОЕКТ", asset_material: "МАТЕРИАЛ",
      bd_assets: "Ассеты.",
      bd_tech_title: "Технический breakdown.",
      bd_tech_intro: "Окружение построено как единый real-time pipeline: процедурный ландшафт задаёт крупные формы, авторские ассеты добавляют историю и масштаб, а в Unreal Engine материалы, растительность, свет и атмосфера собираются в финальную сцену.",
      bd_pipe_1t: "Основа ландшафта", bd_pipe_1d: "Крупные силуэты и паттерны эрозии создаются процедурно до экспорта.",
      bd_pipe_2t: "Создание ассетов", bd_pipe_2d: "Ключевые и вспомогательные ассеты моделируются, разворачиваются и подготавливаются к сцене.",
      bd_pipe_3t: "Материалы", bd_pipe_3d: "Поверхности формируются через цвет, шероховатость, normal detail и вариативность.",
      bd_pipe_4t: "Сборка в real-time", bd_pipe_4d: "Композиция, растительность, освещение и атмосфера балансируются в финальном окружении.",
      bd_scene_caption: "Настройка сцены · структура окружения", bd_assembly_caption: "Сборка · масштаб и композиция",
      bd_fact_terrain: "Ландшафт", bd_fact_assembly: "Сборка", bd_fact_material: "Материалы", bd_fact_engine: "Движок",
      bd_t1: "Референсы.",
      bd_d1: "Проект начинается со сбора референсов, реальные пустынные аванпосты, силуэты рельефа, образцы материалов и световые настроения. Борды организованы по блокам: главный фокус, ландшафт, рендер, свет, атмосфера, детали ассетов, текстуры и органика, так задаётся визуальное направление до начала моделирования.",
      bd_t2: "UV-развёртка.",
      bd_d2: "После моделирования каждый ассет разворачивается в чистые UV без искажений. Грамотная развёртка позволяет добиться того, благодаря чему текстуры позже идеально ложатся на каждую поверхность.",
      bd_t3: "Текстурирование.",
      bd_d3: "Материалы создаются послойно, цвет, шероховатость и детали поверхности наращиваются постепенно, пока каждый ассет не станет естественно читаться в свете сцены.",
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
      project_back: "← ПОВЕРНУТИСЯ",
      project_next: "ІНШИЙ ПРОЄКТ →",
      project_home: "ГОЛОВНА",
      hero_subheader: "КОМП'ЮТЕРНА ГРАФІКА",
      about_title: "ПРО МЕНЕ",
      about_bio: "3D-художниця з оточення з любов'ю до кінематографічної естетики та масштабних світів. Спеціалізуюся на створенні асетів, UV-розгортці, PBR-текстуруванні, освітленні та композиції сцен. Відкрита до нових горизонтів і різнопланових проєктів.",
      about_age_label: "ВІК",
      about_location_label: "ЛОКАЦІЯ",
      about_location_value: "Німеччина",
      about_languages_label: "МОВИ",
      projects_title: "ПРОЄКТ",
      projects_subtitle: "Оточення на Unreal Engine 5, від пустельних аванпостів до гірських хребтів.",
      file_meta_02: "Інтер'єр, 2026",
      file_meta_03: "Оточення, 2026",
      details_btn: "PROJECT DETAILS",
      breakdown_tab: "PROJECT DETAILS", breakdown_overview: "ОГЛЯД ВИРОБНИЦТВА",
      details_engine_label: "РУШІЙ",
      details_tools_label: "ІНСТРУМЕНТИ",
      details_year_label: "РІК",
      stats_role_label: "РОЛЬ", stats_target_label: "ФОРМАТ", stats_scope_label: "ФОКУС", stats_status_label: "СТАТУС",
      stats_role_solo: "ОСОБИСТИЙ ПРОЄКТ", stats_target_realtime: "REAL-TIME", stats_status_live: "ОПУБЛІКОВАНО", stats_status_wip: "У РОБОТІ",
      stats_scope_01: "ОТОЧЕННЯ · СВІТЛО", stats_scope_02: "ІНТЕР’ЄР · ПРОПСИ", stats_scope_03: "ЛАНДШАФТ · АТМОСФЕРА", stats_scope_wip: "НЕ РОЗКРИТО",
      details_desc_01: "Gibson Ridge — кінематографічний пустельний аванпост, атмосфера якого побудована навколо ізоляції та життя далеко від цивілізації.",
      details_desc_02: "Скоро публікація, повний розбір незабаром. Інтер'єрне дослідження з фокусом на матеріали та сторітелінг через пропси.",
      details_desc_03: "Скоро публікація, повний розбір незабаром. Гірське середовище з акцентом на масштаб, атмосферу та далекий серпанок.",
      open_visual: "GALLERY",
      all_details: "ВІДКРИТИ PROJECT DETAILS",
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
      music_label: "МУЗИКА",
      music_state_on: "УВІМК",
      music_state_off: "ВИМК",
      footer_copyright: "© 2026 Литвин Дар'я. Всі права захищені. Дизайн і розробка, авторка.",
      bd_kicker: "ПРОЦЕС",
      asset_ac: "Кондиціонер", asset_project: "ПРОЄКТ", asset_material: "МАТЕРІАЛ",
      bd_assets: "Асети.",
      bd_tech_title: "Технічний breakdown.",
      bd_tech_intro: "Оточення побудовано як єдиний real-time pipeline: процедурний ландшафт задає великі форми, авторські асети додають історію й масштаб, а в Unreal Engine матеріали, рослинність, світло та атмосфера збираються у фінальну сцену.",
      bd_pipe_1t: "Основа ландшафту", bd_pipe_1d: "Великі силуети та патерни ерозії створюються процедурно до експорту.",
      bd_pipe_2t: "Створення асетів", bd_pipe_2d: "Ключові й допоміжні асети моделюються, розгортаються та готуються до сцени.",
      bd_pipe_3t: "Матеріали", bd_pipe_3d: "Поверхні формуються через колір, шорсткість, normal detail і варіативність.",
      bd_pipe_4t: "Збірка в real-time", bd_pipe_4d: "Композиція, рослинність, освітлення й атмосфера балансуються у фінальному оточенні.",
      bd_scene_caption: "Налаштування сцени · структура оточення", bd_assembly_caption: "Збірка · масштаб і композиція",
      bd_fact_terrain: "Ландшафт", bd_fact_assembly: "Збірка", bd_fact_material: "Матеріали", bd_fact_engine: "Рушій",
      bd_t1: "Референси.",
      bd_d1: "Проєкт починається зі збору референсів, реальні пустельні аванпости, силуети рельєфу, зразки матеріалів і світлові настрої. Борди організовано за блоками: головний фокус, ландшафт, рендер, світло, атмосфера, деталі асетів, текстури й органіка, так задається візуальний напрям до початку моделювання.",
      bd_t2: "UV-розгортка.",
      bd_d2: "Після моделювання кожен асет розгортається в чисті UV без спотворень. Грамотна розгортка, те, завдяки чому текстури згодом ідеально лягають на кожну поверхню.",
      bd_t3: "Текстурування.",
      bd_d3: "Матеріали створюються пошарово, колір, шорсткість і деталі поверхні нарощуються поступово, доки кожен асет не стане природно читатися у світлі сцени.",
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

  // Project-specific copy shares the same language switcher as the rest of the site.
  const mountainCopy = {
    en: [
      'Large-scale mountain environment exploring scale, atmosphere, and distant haze.',
      'Gaea.', 'Gaea Node System.', 'UE5 View.', 'Material Settings.', 'Render.',
      'The primary terrain is shaped and evaluated in Gaea. Erosion, thermal breakup and color adjustments define the mountain mass before export to Unreal Engine 5.',
      'The node graph combines Mountain, Erosion, Thermal, AO and color-processing nodes to generate the terrain.',
      'The terrain is reviewed in Unreal Engine 5 with attention to camera composition, atmosphere and depth.',
      'Landscape material settings control color variation, surface detail and transitions between rock and sediment.',
      'Terrain, materials, lighting, atmosphere and camera treatment come together in the mountain environment.',
      'UE5 VIEW · IN PROGRESS', 'MATERIAL SETTINGS · IN PROGRESS'
    ],
    de: [
      'Großflächige Berglandschaft mit Fokus auf Maßstab, Atmosphäre und fernen Dunst.',
      'Gaea.', 'Gaea-Node-System.', 'UE5-Ansicht.', 'Materialeinstellungen.', 'Rendering.',
      'Das Gelände wird in Gaea geformt und geprüft. Erosion, thermische Verwitterung und Farbanpassungen bestimmen das Bergmassiv vor dem Export in Unreal Engine 5.',
      'Der Node-Graph verbindet Mountain, Erosion, Thermal, AO und Farbverarbeitung zur Erzeugung des Geländes.',
      'Das Gelände wird in Unreal Engine 5 mit Fokus auf Bildkomposition, Atmosphäre und Tiefe geprüft.',
      'Die Landschaftsmaterialien steuern Farbvariation, Oberflächendetails und Übergänge zwischen Fels und Sediment.',
      'Gelände, Materialien, Licht, Atmosphäre und Kamera ergeben gemeinsam die Berglandschaft.',
      'UE5-ANSICHT · IN ARBEIT', 'MATERIALEINSTELLUNGEN · IN ARBEIT'
    ],
    ru: [
      'Масштабное горное окружение с акцентом на атмосферу, глубину и дальнюю дымку.',
      'Gaea.', 'Система нод Gaea.', 'Вид в UE5.', 'Настройки материала.', 'Рендер.',
      'Основной рельеф создаётся и оценивается в Gaea. Эрозия, термическое разрушение и настройка цвета формируют горный массив перед экспортом в Unreal Engine 5.',
      'Граф объединяет ноды Mountain, Erosion, Thermal, AO и обработки цвета для процедурного создания рельефа.',
      'Рельеф оценивается в Unreal Engine 5 с акцентом на композицию кадра, атмосферу и глубину.',
      'Настройки материала ландшафта управляют вариациями цвета, деталями поверхности и переходами между скалой и осадочными породами.',
      'Рельеф, материалы, освещение, атмосфера и настройки камеры объединяются в горное окружение.',
      'ВИД В UE5 · В РАБОТЕ', 'НАСТРОЙКИ МАТЕРИАЛА · В РАБОТЕ'
    ],
    uk: [
      'Масштабне гірське оточення з акцентом на атмосферу, глибину та далекий серпанок.',
      'Gaea.', 'Система нод Gaea.', 'Вигляд в UE5.', 'Налаштування матеріалу.', 'Рендер.',
      'Основний рельєф створюється й оцінюється в Gaea. Ерозія, термічне руйнування та налаштування кольору формують гірський масив перед експортом в Unreal Engine 5.',
      'Граф поєднує ноди Mountain, Erosion, Thermal, AO та обробки кольору для процедурного створення рельєфу.',
      'Рельєф оцінюється в Unreal Engine 5 з акцентом на композицію кадру, атмосферу та глибину.',
      'Налаштування матеріалу ландшафту керують варіаціями кольору, деталями поверхні та переходами між скелею й осадовими породами.',
      'Рельєф, матеріали, освітлення, атмосфера та налаштування камери поєднуються в гірське оточення.',
      'ВИГЛЯД В UE5 · У РОБОТІ', 'НАЛАШТУВАННЯ МАТЕРІАЛУ · У РОБОТІ'
    ]
  };
  Object.entries(mountainCopy).forEach(([lang,copy]) => {
    DICT[lang].details_desc_03 = copy[0];
    for(let i = 1; i <= 5; i++) {
      DICT[lang]['mountain_title_' + i] = copy[i];
      DICT[lang]['mountain_desc_' + i] = copy[i + 5];
    }
    DICT[lang].mountain_pending_ue5 = copy[11];
    DICT[lang].mountain_pending_material = copy[12];
  });

  const STORAGE_KEY = 'jui_lang';
  let current = 'en';
  let transitionTimer = 0;
  let transitionVersion = 0;
  const REDUCED_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { current = localStorage.getItem(STORAGE_KEY) || 'en'; } catch {}

  function render(lang){
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

  function apply(lang, animate = false){
    if(!Object.prototype.hasOwnProperty.call(DICT, lang)) lang = 'en';
    clearTimeout(transitionTimer);
    const version = ++transitionVersion;
    if(!animate || REDUCED_MOTION){
      document.documentElement.classList.remove('i18n-changing');
      render(lang);
      return;
    }
    document.documentElement.classList.add('i18n-changing');
    transitionTimer = window.setTimeout(() => {
      if(version !== transitionVersion) return;
      render(lang);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if(version === transitionVersion) document.documentElement.classList.remove('i18n-changing');
      }));
    }, 150);
  }

  function init(){
    // set initial
    if(!DICT[current]) current = 'en';
    apply(current);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => apply(btn.dataset.lang, true));
    });
  }

  window.JUI_I18N = { apply, DICT, get current(){ return current; } };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
