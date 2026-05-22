(function () {
  var el = document.querySelector("[data-scroll-quote]");
  if (!el) return;

  var text = el.textContent.trim();
  var chars = Array.from(text);

  el.textContent = "";
  el.classList.add("scroll-quote-reveal");

  chars.forEach(function (ch) {
    var span = document.createElement("span");
    span.className = "scroll-quote-reveal__char";
    span.textContent = ch;
    el.appendChild(span);
  });

  var charEls = el.querySelectorAll(".scroll-quote-reveal__char");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function update() {
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

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
