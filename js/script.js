// Element Selector
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const allLinks = document.querySelectorAll("a:link");
const heroSectionEl = document.querySelector(".section-hero");
const bodyEl = document.body;

// Fix flexbox issue for some browser
function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) {
    document.body.classList.add("no-flexbox-gap");
  }
}
checkFlexGap();

// Implementing smooth scrolling behaviour
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      const targetEl = document.querySelector(href);
      targetEl.scrollIntoView({ behavior: "smooth" });

      // Close mobile navbar after clicking link
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.remove("nav-open");
      }
    }
  });
});

// Implementing sticky navigation
const observer = new IntersectionObserver(
  function (entries, observer) {
    if (!entries[0].isIntersecting) {
      bodyEl.classList.add("sticky");
      return;
    }
    bodyEl.classList.remove("sticky");
  },
  {
    root: null,
    rootMargin: "-80px",
    threshold: 0,
  }
);
observer.observe(heroSectionEl);

// Keep copyright year up to date
const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

// Make navigation work
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
