(function () {
  var MOBILE_QUERY = window.matchMedia("(max-width: 1023px)");
  var stacks = document.querySelectorAll("[data-sticky-stack]");
  if (!stacks.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observer = null;
  var observedItems = [];

  function clearSlideClasses(item) {
    item.classList.remove("stack-cards__item--visible");
    item.style.removeProperty("--card-reveal");
  }

  function setupItems() {
    observedItems = [];
    stacks.forEach(function (stack) {
      stack.querySelectorAll(".stack-cards__item").forEach(function (item) {
        clearSlideClasses(item);
        if (MOBILE_QUERY.matches && reduced) {
          item.classList.add("stack-cards__item--visible");
        }
        observedItems.push(item);
      });
    });
  }

  function createObserver() {
    if (observer) observer.disconnect();
    if (!MOBILE_QUERY.matches || reduced) return;

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("stack-cards__item--visible");
          } else {
            entry.target.classList.remove("stack-cards__item--visible");
          }
        });
      },
      { root: null, threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    observedItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function refresh() {
    setupItems();
    createObserver();
  }

  refresh();
  MOBILE_QUERY.addEventListener("change", refresh);
})();
