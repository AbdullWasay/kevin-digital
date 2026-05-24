(function () {
  var el = document.querySelector("[data-scroll-quote]");
  if (!el) return;

  var charEls = [];
  var lastBuiltText = "";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var splitEnabled = false;

  function getText() {
    if (window.KDi18n && el.getAttribute("data-i18n")) {
      return window.KDi18n.t(el.getAttribute("data-i18n"));
    }
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }

  function appendChar(parent, ch) {
    var span = document.createElement("span");
    span.className = "scroll-quote-reveal__char";
    span.textContent = ch;
    parent.appendChild(span);
    charEls.push(span);
  }

  function renderChars(text) {
    el.textContent = "";
    el.classList.add("scroll-quote-reveal");
    charEls = [];

    var parts = text.match(/\S+|\s+/g) || [];
    parts.forEach(function (part) {
      if (/^\s+$/.test(part)) {
        Array.from(part).forEach(function (ch) {
          appendChar(el, ch);
        });
        return;
      }

      var word = document.createElement("span");
      word.className = "scroll-quote-reveal__word";
      Array.from(part).forEach(function (ch) {
        appendChar(word, ch);
      });
      el.appendChild(word);
    });
  }

  function buildChars() {
    if (!splitEnabled && !isElementNearView()) return;

    var text = getText();
    if (!text || (text === lastBuiltText && charEls.length > 0)) return;

    lastBuiltText = text;
    el.setAttribute("aria-label", text);
    renderChars(text);
    update();
  }

  function isElementNearView() {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    return rect.top < vh * 1.15 && rect.bottom > -vh * 0.15;
  }

  function update() {
    if (charEls.length === 0) {
      if (splitEnabled || isElementNearView()) buildChars();
      return;
    }

    if (reducedMotion) {
      charEls.forEach(function (c) {
        c.classList.add("is-read");
        c.style.color = "";
      });
      return;
    }

    var track = el.closest(".stats-quote-wrap") || el;
    var rect = track.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.88;
    var end = vh * 0.12;
    var progress = (start - rect.top) / (start - end + rect.height * 0.6);
    progress = Math.max(0, Math.min(1, progress));

    var total = charEls.length;
    charEls.forEach(function (char, i) {
      var charProgress = progress * total - i;
      var t = Math.max(0, Math.min(1, charProgress));
      var alpha = 0.22 + t * 0.78;
      char.style.color = "rgba(0, 0, 0, " + alpha.toFixed(3) + ")";
      char.classList.toggle("is-read", t >= 0.99);
    });
  }

  var viewObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          splitEnabled = true;
          buildChars();
        }
      });
    },
    { rootMargin: "120px 0px" }
  );

  viewObserver.observe(el);

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  window.addEventListener("kd:language-change", function () {
    lastBuiltText = "";
    buildChars();
    update();
  });
})();
