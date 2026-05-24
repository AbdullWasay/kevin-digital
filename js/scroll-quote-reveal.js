(function () {
  var el = document.querySelector("[data-scroll-quote]");
  if (!el) return;

  var charEls = [];
  var lastBuiltText = "";
  var originalText = (el.textContent || "").replace(/\s+/g, " ").trim();
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rebuildTimer;
  var translateRetries = 0;
  var splitEnabled = false;

  function isPageTranslated() {
    var root = document.documentElement;
    return root.classList.contains("translated-ltr") || root.classList.contains("translated-rtl");
  }

  function extractText() {
    return (el.innerText || el.textContent || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function isGarbled(text) {
    if (!text || text.length < 10) return true;
    var tokens = text.split(/\s+/);
    if (tokens.length < 12) return false;
    var singles = tokens.filter(function (token) {
      return token.length === 1;
    }).length;
    return singles / tokens.length > 0.55;
  }

  function flattenQuote() {
    charEls = [];
    lastBuiltText = "";
    el.textContent = originalText;
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

  function shouldSplit() {
    return splitEnabled || isElementNearView();
  }

  function isElementNearView() {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    return rect.top < vh * 1.15 && rect.bottom > -vh * 0.15;
  }

  function buildChars() {
    if (!shouldSplit()) return;

    var text = extractText() || originalText;

    if (isPageTranslated() && text === originalText) {
      if (translateRetries < 8) {
        translateRetries += 1;
        scheduleRebuild(300 + translateRetries * 200);
        return;
      }
    }

    if (isGarbled(text)) {
      if (translateRetries < 8) {
        translateRetries += 1;
        scheduleRebuild(300 + translateRetries * 200);
        return;
      }
      flattenQuote();
      text = originalText;
    }

    translateRetries = 0;
    if (text === lastBuiltText && charEls.length > 0) return;

    lastBuiltText = text;
    el.setAttribute("aria-label", text);
    renderChars(text);
    update();
  }

  function scheduleRebuild(delay) {
    clearTimeout(rebuildTimer);
    rebuildTimer = window.setTimeout(buildChars, delay || 0);
  }

  function onTranslateChange() {
    translateRetries = 0;
    lastBuiltText = "";

    if (el.querySelector(".scroll-quote-reveal__char")) {
      flattenQuote();
    } else if (!isPageTranslated()) {
      el.textContent = originalText;
    }

    if (isPageTranslated()) {
      scheduleRebuild(700);
      return;
    }

    if (shouldSplit()) {
      scheduleRebuild(0);
    }
  }

  function update() {
    if (charEls.length === 0) {
      if (shouldSplit()) buildChars();
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

  var htmlObserver = new MutationObserver(onTranslateChange);
  htmlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

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
})();
