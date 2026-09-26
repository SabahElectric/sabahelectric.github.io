(function () {
  "use strict";

  document.documentElement.classList.add("has-js");

  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".site-nav");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function closeMenu(returnFocus) {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    if (returnFocus) menuButton.focus();
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", opening);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    document.addEventListener("click", function (event) {
      if (menuButton.getAttribute("aria-expanded") === "true" &&
          !navigation.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu(false);
      }
    });
  }

  var progressBar = document.getElementById("scroll-progress-bar");
  var header = document.querySelector(".site-header");
  var scrollQueued = false;

  function updateScrollState() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    scrollQueued = false;
  }

  window.addEventListener("scroll", function () {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(updateScrollState);
  }, { passive: true });
  updateScrollState();

  var revealItems = document.querySelectorAll("[data-reveal]");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  var year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      var submitButton = contactForm.querySelector(".form-submit");
      if (!submitButton) return;
      submitButton.disabled = true;
      submitButton.setAttribute("aria-label", "Sending project inquiry");
      var buttonText = submitButton.firstChild;
      if (buttonText && buttonText.nodeType === Node.TEXT_NODE) {
        buttonText.textContent = "Sending inquiry… ";
      }
    });
  }
}());
