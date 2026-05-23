(function () {
  var STORAGE_KEY = "kd-lang";
  var DEFAULT_LANG = "de";

  var strings = {
    de: {
      "meta.title": "Kevin Digital — Social Media Manager & YouTube SEO",
      "meta.description":
        "Social Media Manager und YouTube-SEO-Spezialist für Unternehmen und Creator mit Fokus auf Reichweite und nachhaltiges Wachstum.",
      "a11y.nav": "Hauptnavigation",
      "a11y.menuOpen": "Menü öffnen",
      "a11y.menuClose": "Menü schließen",
      "a11y.lang": "Sprache wählen",
      "lang.de": "Deutsch",
      "lang.en": "Englisch",
      "a11y.closeVideo": "Video schließen",
      "nav.about": "ÜBER MICH",
      "nav.services": "LEISTUNGEN",
      "nav.cases": "CASE STUDIES",
      "nav.book": "Beratung buchen",
      "hero.title": "Social Media Manager für nachhaltiges Unternehmenswachstum.",
      "hero.body":
        "Als Social Media Manager und YouTube-SEO-Spezialist unterstütze ich Unternehmen und Creator beim Aufbau ihrer Online-Präsenz. Mein Fokus liegt auf strukturierten Content-Strategien, die Sichtbarkeit erhöhen und nachhaltiges Publikumswachstum schaffen. Mit Erfahrung in der Verwaltung mehrerer digitaler Kanäle und über 1.200 veröffentlichten Videos verbinde ich Strategie, Analyse und Umsetzung, um Plattformen mit langfristiger Reichweite aufzubauen.",
      "hero.cta": "CASE STUDIES ANSEHEN",
      "hero.portrait": "Kevin Porträt",
      "services.title": "Kernkompetenzen",
      "services.copy":
        "Ob Online-Präsenz, automatisierte Abläufe oder Reiseplanung — ich biete strukturierte Lösungen, die auf Ihre Ziele zugeschnitten sind.",
      "s1.title": "Strategisches Social-Media-Wachstum",
      "s1.intro":
        "Eine starke Social-Media-Präsenz ist für moderne Unternehmen unverzichtbar. Ich helfe Unternehmen und Creatorn, strukturierte Content-Strategien aufzubauen, die Sichtbarkeit erhöhen, Markenautorität stärken und langfristige Zielgruppen gewinnen. Durch datenbasierte Strategien und konsequentes Content-Management werden Social-Media-Kanäle zu wirksamen Werkzeugen für Kundengewinnung und Markenwachstum. Unsere Leistungen umfassen",
      "s1.l1": "Entwicklung von Social-Media-Strategien",
      "s1.l2": "Content-Planung und Redaktionskalender",
      "s1.l3": "Account-Management und Optimierung",
      "s1.l4": "Strategien für Reichweite und Engagement",
      "s1.l5": "Analytics und Performance-Tracking",
      "s1.goal":
        "Social-Media-Plattformen zu verlässlichen Wachstumskanälen zu machen, die kontinuierlich Aufmerksamkeit und Engagement erzeugen.",
      "s2.title": "YouTube-SEO und Kanalwachstum",
      "s2.intro":
        "YouTube ist eine der stärksten Plattformen für langfristige Auffindbarkeit. Mit der richtigen SEO-Strategie können Videos über Jahre hinweg Traffic und Sichtbarkeit generieren. Ich helfe Unternehmen und Creatorn, ihre YouTube-Kanäle so zu optimieren, dass Inhalte die richtige Zielgruppe erreichen und langfristig wachsen. Unsere Leistungen umfassen",
      "s2.l1": "YouTube-Kanal-Audits und Optimierung",
      "s2.l2": "Video-SEO und Ranking-Strategie",
      "s2.l3": "Optimierung von Titeln, Beschreibungen und Metadaten",
      "s2.l4": "Thumbnail-Strategie und Klickraten-Optimierung",
      "s2.l5": "Content-Strategie für langfristige Auffindbarkeit",
      "s2.goal":
        "YouTube-Kanäle aufzubauen, die konstant Traffic und dauerhafte Reichweite erzeugen.",
      "s3.title": "Teneriffa Reise- und Unterstützung",
      "s3.intro":
        "Neben digitalen Services unterstütze ich Reisende auch bei der Organisation ihres Aufenthalts auf Teneriffa. Die Planung kann komplex sein — besonders bei Flügen, Unterkünften und Aktivitäten. Ich helfe dabei, Reisen strukturiert zu organisieren, damit der Aufenthalt entspannt und reibungslos verläuft.",
      "s3.l1": "Unterkunftsempfehlungen und Buchungsunterstützung",
      "s3.l2": "Flugrecherche und Reiseplanung",
      "s3.l3": "Organisation und Zeitplanung der Reise",
      "s3.l4": "Lokale Tipps für Teneriffa",
      "s3.goal":
        "Reisenden zu helfen, Teneriffa mit professioneller Unterstützung von der Planung bis zur Ankunft zu erleben.",
      "goal.label": "Ziel:",
      "stats.quote":
        "Jedes Projekt fokussiert messbare Ergebnisse wie mehr Sichtbarkeit, stärkeres Engagement und langfristige digitale Reichweite.",
      "kpi.reach": "Social-Media-Reichweite",
      "kpi.tiktok": "Generierte TikTok-Views",
      "kpi.youtube": "Verwaltete YouTube-Videos",
      "kpi.monetized": "Monetarisierte digitale Kanäle",
      "kpi.growth": "Konstantes Publikumswachstum",
      "cases.title": "Case Studies",
      "cases.copy":
        "Ob Online-Präsenz, automatisierte Abläufe oder Reiseplanung — ich biete strukturierte Lösungen, die auf Ihre Ziele zugeschnitten sind.",
      "case1.title": "Laserland Projekt",
      "case1.body":
        "Laserland ist eine Entertainment-Location, bei der Social Media eine zentrale Rolle spielt, um Besucher anzuziehen und Events zu bewerben. Ziel des Projekts war es, die Online-Sichtbarkeit zu erhöhen und Engagement durch Short-Form-Videos und Community-Marketing zu steigern. Mit einem strukturierten Posting-Plan, plattformoptimiertem Content und Highlights von Events und Turnieren erreichten die Kanäle ein größeres Publikum und eine aktive Community.",
      "case1.l1": "Short-Form-Video-Strategie für Social Plattformen",
      "case1.l2": "Event-basiertes Content-Marketing",
      "case1.l3": "Strukturierter und konsequenter Posting-Plan",
      "case1.l4": "Strategien für Reichweite und Engagement",
      "case1.l5": "Aktive Community-Interaktion",
      "case1.video": "Laserland Video abspielen",
      "case2.title": "Gradtsummt Projekt",
      "case2.body":
        "Gradtsummt ist ein Projekt zur Förderung nachhaltiger Imkerei und Umweltbewusstsein durch Social-Media-Content. Die Strategie sollte informieren und gleichzeitig eine Community für Nachhaltigkeit und Natur aufbauen. Durch Storytelling-Content und konsequentes Posting gewann der Kanal Zuschauer, die sich für Bienen, Natur und verantwortungsvolle Umweltpraxis interessieren.",
      "case2.l1": "Storytelling-Strategie für Bildungscontent",
      "case2.l2": "Community-orientierter Audience-Aufbau",
      "case2.l3": "Konsequentes Short-Form-Video-Posting",
      "case2.l4": "Engagement zu Nachhaltigkeit und Natur",
      "case2.video": "Gradtsummt Video abspielen",
      "cta.title": "Lassen Sie uns Ihre digitale Präsenz gemeinsam ausbauen!",
      "cta.copy":
        "Ob Social-Media-Kanäle, YouTube-Strategie für langfristige Reichweite oder Ihr Aufenthalt auf Teneriffa — ich helfe Ihnen mit strukturierten und wirksamen Lösungen.",
      "cta.btn": "Beratung vereinbaren",
      "footer.blurb":
        "Ich helfe Unternehmen und Creatorn beim Wachstum durch Social-Media-Management und YouTube-SEO-Strategien.",
      "footer.links": "SCHNELLZUGRIFF",
      "footer.home": "START",
      "footer.about": "ÜBER MICH",
      "footer.services": "LEISTUNGEN",
      "footer.cases": "CASE STUDIES",
      "footer.contact": "KONTAKT",
      "footer.rights": "© 2026 Kevin Digital.de. Alle Rechte vorbehalten.",
      "form.title": "Starten Sie Ihre Reise mit mir",
      "form.subtitle": "Füllen Sie das Formular aus und legen wir los.",
      "form.name": "Name",
      "form.email": "E-Mail",
      "form.phone": "Telefonnummer",
      "form.message": "Nachricht",
      "form.submit": "Gespräch vereinbaren",
      "form.successTitle": "Erfolgreich gesendet",
      "form.successText": "Vielen Dank! Wir melden uns in Kürze bei Ihnen.",
    },
    en: {
      "meta.title": "Kevin Digital — Social Media Manager & YouTube SEO",
      "meta.description":
        "Social Media Manager and YouTube SEO specialist helping businesses and creators grow their online presence.",
      "a11y.nav": "Main navigation",
      "a11y.menuOpen": "Open menu",
      "a11y.menuClose": "Close menu",
      "a11y.lang": "Choose language",
      "lang.de": "German",
      "lang.en": "English",
      "a11y.closeVideo": "Close video",
      "nav.about": "ABOUT ME",
      "nav.services": "SERVICES",
      "nav.cases": "CASE STUDIES",
      "nav.book": "Book Consultation",
      "hero.title": "Social Media Manager Helping Businesses Grow.",
      "hero.body":
        "I work as a Social Media Manager and YouTube SEO specialist helping businesses and creators grow their online presence. My work focuses on building structured content strategies that increase visibility and create sustainable audience growth. With experience managing multiple digital channels and publishing more than 1,200 videos, I combine strategy, analytics and execution to build online platforms that generate long term reach.",
      "hero.cta": "VIEW CASE STUDIES",
      "hero.portrait": "Kevin portrait",
      "services.title": "Core Expertise",
      "services.copy":
        "Whether you want to grow your online presence, automate operations, or plan an unforgettable trip, I provide structured solutions tailored to your goals.",
      "s1.title": "Strategic Social Media Growth",
      "s1.intro":
        "A strong social media presence is essential for modern businesses. I help companies and creators build structured content strategies that increase visibility, strengthen brand authority and attract long term audiences. Through data driven strategies and consistent content management, social media channels can become powerful tools for customer acquisition and brand growth. Our Services Include",
      "s1.l1": "Social media strategy development",
      "s1.l2": "Content planning and editorial calendars",
      "s1.l3": "Account management and optimization",
      "s1.l4": "Audience growth and engagement strategies",
      "s1.l5": "Analytics and performance tracking",
      "s1.goal":
        "Turning social media platforms into reliable growth channels that continuously generate attention and engagement.",
      "s2.title": "YouTube SEO and Channel Growth Strategy",
      "s2.intro":
        "YouTube is one of the most powerful platforms for long term discoverability. With the right SEO strategy, videos can generate traffic and visibility for years. I help businesses and creators optimize their YouTube channels so their content reaches the right audience and continues to grow over time. Our Services Include",
      "s2.l1": "YouTube channel audits and optimization",
      "s2.l2": "Video SEO and ranking strategy",
      "s2.l3": "Title, description and metadata optimization",
      "s2.l4": "Thumbnail strategy and click through optimization",
      "s2.l5": "Content strategy for long term discoverability",
      "s2.goal":
        "Building YouTube channels that generate consistent traffic and permanent reach.",
      "s3.title": "Tenerife Travel and Accommodation Support",
      "s3.intro":
        "Alongside digital services, I also help travelers organize their stay in Tenerife. Planning a trip can be complex, especially when arranging flights, accommodation and activities. I assist travelers in organizing their trip so they can enjoy a smooth and stress free experience.",
      "s3.l1": "Accommodation recommendations and booking support",
      "s3.l2": "Flight research and travel planning",
      "s3.l3": "Trip organization and scheduling",
      "s3.l4": "Local advice for exploring Tenerife",
      "s3.goal":
        "Helping travelers experience Tenerife with professional support from planning to arrival.",
      "goal.label": "Goal:",
      "stats.quote":
        "Every project focuses on measurable results such as increased visibility, stronger audience engagement and long term digital reach.",
      "kpi.reach": "Social Media Reach",
      "kpi.tiktok": "TikTok Views Generated",
      "kpi.youtube": "YouTube Videos Managed",
      "kpi.monetized": "Monetized Digital Channels",
      "kpi.growth": "Consistent Audience Growth",
      "cases.title": "Case Studies",
      "cases.copy":
        "Whether you want to grow your online presence, automate operations, or plan an unforgettable trip, I provide structured solutions tailored to your goals.",
      "case1.title": "Laserland Project",
      "case1.body":
        "Laserland is an entertainment venue where social media plays a key role in attracting visitors and promoting events. The goal of this project was to increase online visibility and drive engagement through short form video content and community focused marketing. By implementing a structured posting schedule, creating platform optimized content, and highlighting event moments and tournaments, the social channels were able to reach a larger audience and build an active digital community.",
      "case1.l1": "Short form video strategy for social platforms",
      "case1.l2": "Event based content marketing",
      "case1.l3": "Structured and consistent posting schedule",
      "case1.l4": "Audience growth and engagement strategies",
      "case1.l5": "Active community interaction and engagement",
      "case1.video": "Play Laserland video",
      "case2.title": "Gradtsummt Project",
      "case2.body":
        "Gradtsummt is a project focused on promoting sustainable beekeeping and environmental awareness through social media content. The strategy aimed to educate audiences while building a community interested in sustainability and nature. Through storytelling based content and consistent posting, the channel successfully attracted viewers who were interested in learning about bees, nature, and responsible environmental practices.",
      "case2.l1": "Educational storytelling content strategy",
      "case2.l2": "Community focused audience building",
      "case2.l3": "Consistent short form video posting",
      "case2.l4": "Engagement around sustainability and nature topics",
      "case2.video": "Play Gradtsummt video",
      "cta.title": "Let's Grow Your Digital Presence Together!",
      "cta.copy":
        "Whether you want to grow your social media channels, build a YouTube strategy for long term reach or plan your stay in Tenerife, I can help you create structured and effective solutions.",
      "cta.btn": "Schedule a Consultation",
      "footer.blurb":
        "Helping businesses and creators grow through social media management and YouTube SEO strategies.",
      "footer.links": "QUICK LINKS",
      "footer.home": "HOME",
      "footer.about": "ABOUT",
      "footer.services": "SERVICES",
      "footer.cases": "CASE STUDIES",
      "footer.contact": "CONTACT",
      "footer.rights": "© 2026 Kevin Digital.de. All rights reserved.",
      "form.title": "Start Your Journey With Me",
      "form.subtitle": "Fill in the form and let's get started.",
      "form.name": "Name",
      "form.email": "Email",
      "form.phone": "Phone Number",
      "form.message": "Message",
      "form.submit": "Schedule a Call",
      "form.successTitle": "Successfully submitted",
      "form.successText": "Thank you! We'll get back to you shortly.",
    },
  };

  var currentLang = DEFAULT_LANG;

  function t(key) {
    var pack = strings[currentLang] || strings.de;
    if (pack[key] !== undefined) return pack[key];
    return strings.en[key] || key;
  }

  function applyLanguage(lang) {
    currentLang = strings[lang] ? lang : DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, currentLang);
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      el.setAttribute("aria-label", t(key));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (!key) return;
      el.setAttribute("alt", t(key));
    });

    var title = document.querySelector("title");
    if (title) title.textContent = t("meta.title");

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));

    var codeEl = document.querySelector(".lang-dropdown__code");
    if (codeEl) codeEl.textContent = currentLang.toUpperCase();

    document.querySelectorAll(".lang-dropdown__option[data-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === currentLang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    var navToggle = document.getElementById("site-nav-toggle");
    if (navToggle) {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", t(open ? "a11y.menuClose" : "a11y.menuOpen"));
    }

    var nav = document.getElementById("site-nav");
    if (nav) nav.setAttribute("aria-label", t("a11y.nav"));

    window.dispatchEvent(new CustomEvent("kd:language-change", { detail: { lang: currentLang } }));
  }

  function closeLangDropdown() {
    var root = document.getElementById("lang-dropdown");
    var trigger = document.getElementById("lang-dropdown-trigger");
    var menu = document.getElementById("lang-dropdown-menu");
    if (!root || !trigger || !menu) return;
    root.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  function openLangDropdown() {
    var root = document.getElementById("lang-dropdown");
    var trigger = document.getElementById("lang-dropdown-trigger");
    var menu = document.getElementById("lang-dropdown-menu");
    if (!root || !trigger || !menu) return;
    root.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    menu.hidden = false;
  }

  function initLangDropdown() {
    var root = document.getElementById("lang-dropdown");
    var trigger = document.getElementById("lang-dropdown-trigger");
    var menu = document.getElementById("lang-dropdown-menu");
    if (!root || !trigger || !menu) return;

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (root.classList.contains("is-open")) {
        closeLangDropdown();
      } else {
        openLangDropdown();
      }
    });

    menu.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
        closeLangDropdown();
      });
    });

    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) closeLangDropdown();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangDropdown();
    });
  }

  window.KDi18n = { t: t, apply: applyLanguage, getLang: function () { return currentLang; } };

  initLangDropdown();
  applyLanguage(localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG);
})();
