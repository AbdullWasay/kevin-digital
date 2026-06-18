(function () {
  var root = document.querySelector("[data-legal-page]");
  if (!root) return;

  var pageKey = root.getAttribute("data-legal-page");

  function getLang() {
    return window.KDi18n ? window.KDi18n.getLang() : "de";
  }

  function updateMeta() {
    if (!window.KDi18n) return;
    var metaKey = pageKey === "privacy" ? "meta.privacy" : "meta.imprint";
    var title = document.querySelector("title");
    if (title) title.textContent = window.KDi18n.t(metaKey + ".title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", window.KDi18n.t(metaKey + ".description"));
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", window.KDi18n.t(metaKey + ".title"));
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", window.KDi18n.t(metaKey + ".description"));
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", window.KDi18n.t("meta.locale"));
  }

  function updateActiveFooterLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".footer__links-row--legal a").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", href === path);
    });
  }

  function render() {
    var lang = getLang();
    document.querySelectorAll("[data-lang-content]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang-content") !== lang;
    });
    updateMeta();
    updateActiveFooterLink();
  }

  window.addEventListener("kd:language-change", render);
  render();
})();
