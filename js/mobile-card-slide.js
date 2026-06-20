(function () {
  var MOBILE_QUERY = window.matchMedia("(max-width: 1023px)");
  var stacks = document.querySelectorAll("[data-sticky-stack]");
  if (!stacks.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observer = null;
  var observedItems = [];

  function clearSlideClasses(item) {
    item.classList.remove(
      "stack-cards__item--from-left",
      "stack-cards__item--from-right",
      "stack-cards__item--visible"
    );
  }

  function setupItems() {
    observedItems = [];
    stacks.forEach(function (stack) {
      stack.querySelectorAll(".stack-cards__item").forEach(function (item, index) {
        clearSlideClasses(item);
        if (MOBILE_QUERY.matches && !reduced) {
          item.classList.add(
            index % 2 === 0 ? "stack-cards__item--from-left" : "stack-cards__item--from-right"
          );
        } else if (MOBILE_QUERY.matches) {
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
          }
        });
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
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
