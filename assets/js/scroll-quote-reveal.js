(function () {
  var el = document.querySelector("[data-scroll-quote]");
  if (!el) return;

  var text = el.textContent.trim();
  var words = text.split(/\s+/).filter(Boolean);

  el.textContent = "";
  el.classList.add("scroll-quote-reveal");

  words.forEach(function (word, i) {
    var span = document.createElement("span");
    span.className = "scroll-quote-reveal__word";
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });

  var wordEls = el.querySelectorAll(".scroll-quote-reveal__word");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function update() {
    if (reducedMotion) {
      wordEls.forEach(function (w) {
        w.classList.add("is-read");
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

    var total = wordEls.length;
    wordEls.forEach(function (word, i) {
      var wordProgress = progress * total - i;
      var t = Math.max(0, Math.min(1, wordProgress));
      var alpha = 0.22 + t * 0.78;
      word.style.color = "rgba(0, 0, 0, " + alpha.toFixed(3) + ")";
      word.classList.toggle("is-read", t >= 0.99);
    });
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
