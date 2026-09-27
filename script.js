(function () {
  "use strict";

  document.documentElement.classList.add("has-js");

  var viewModeRoot = document.documentElement;
  var viewModeMeta = document.querySelector('meta[name="viewport"]');
  var viewModeButtons = document.querySelectorAll("[data-view-mode]");
  var viewModeStatus = document.getElementById("view-mode-status");
  var viewModeStorageKey = "sabah-electric-view-mode";
  var viewModeLabels = { auto: "Automatic", mobile: "Mobile", desktop: "Computer" };

  function readViewMode() {
    try {
      var savedMode = window.localStorage.getItem(viewModeStorageKey);
      return Object.prototype.hasOwnProperty.call(viewModeLabels, savedMode) ? savedMode : "auto";
    } catch (error) {
      return "auto";
    }
  }

  function applyViewMode(mode, persist) {
    if (!Object.prototype.hasOwnProperty.call(viewModeLabels, mode)) mode = "auto";
    viewModeRoot.classList.toggle("view-mobile", mode === "mobile");
    viewModeRoot.classList.toggle("view-desktop", mode === "desktop");
    if (viewModeMeta) {
      viewModeMeta.setAttribute("content", mode === "desktop" ? "width=1280, initial-scale=1" : "width=device-width, initial-scale=1");
    }
    viewModeButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-view-mode") === mode));
    });
    if (viewModeStatus) viewModeStatus.textContent = viewModeLabels[mode];
    if (persist) {
      try { window.localStorage.setItem(viewModeStorageKey, mode); } catch (error) { /* Private browsing may block storage. */ }
    }
    if (typeof closeMenu === "function") closeMenu(false);
  }

  applyViewMode(readViewMode(), false);
  viewModeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyViewMode(button.getAttribute("data-view-mode"), true);
    });
  });

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

  document.querySelectorAll('a[href="#top"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      closeMenu(false);
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  });

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

  function renderReviews() {
    var reviewList = document.getElementById("reviews-list");
    var reviews = window.SABAH_REVIEWS;
    if (!reviewList || !Array.isArray(reviews) || reviews.length === 0) return;

    reviewList.innerHTML = "";
    reviews.forEach(function (review) {
      var card = document.createElement("article");
      card.className = "review-card";
      card.setAttribute("data-reveal", "");

      var top = document.createElement("div");
      top.className = "review-card__top";
      var rating = Math.min(5, Math.max(1, Number(review.rating) || 5));
      var stars = document.createElement("div");
      stars.className = "review-card__rating";
      stars.setAttribute("role", "img");
      stars.setAttribute("aria-label", rating + " out of 5 stars");
      for (var starIndex = 1; starIndex <= 5; starIndex += 1) {
        var star = document.createElement("span");
        star.textContent = starIndex <= rating ? "★" : "☆";
        if (starIndex <= rating) star.className = "is-filled";
        star.setAttribute("aria-hidden", "true");
        stars.appendChild(star);
      }
      var confirmed = document.createElement("span");
      confirmed.className = "review-card__verified";
      confirmed.textContent = "Confirmed client";
      top.appendChild(stars);
      top.appendChild(confirmed);

      var quote = document.createElement("blockquote");
      quote.className = "review-card__quote";
      quote.textContent = review.comment || "A confirmed client review will appear here.";

      var author = document.createElement("div");
      author.className = "review-card__author";
      var initial = String(review.initial || review.name || "?").trim().charAt(0).toUpperCase() || "?";
      var avatar = document.createElement("span");
      avatar.className = "review-card__avatar";
      avatar.textContent = initial;
      avatar.setAttribute("aria-hidden", "true");
      var authorCopy = document.createElement("div");
      var name = document.createElement("strong");
      name.textContent = review.name || "Sabah Electric client";
      var project = document.createElement("span");
      project.textContent = review.project || "Sabah Electric client";
      authorCopy.appendChild(name);
      authorCopy.appendChild(project);
      author.appendChild(avatar);
      author.appendChild(authorCopy);

      card.appendChild(top);
      card.appendChild(quote);
      card.appendChild(author);

      if (Array.isArray(review.photos) && review.photos.length) {
        var photos = document.createElement("div");
        photos.className = "review-card__photos";
        review.photos.forEach(function (photo) {
          var source = typeof photo === "string" ? photo : photo && photo.src;
          if (!source) return;
          var photoLink = document.createElement("a");
          photoLink.href = source;
          photoLink.target = "_blank";
          photoLink.rel = "noreferrer";
          photoLink.setAttribute("aria-label", "View project photo");
          var image = document.createElement("img");
          image.src = source;
          image.alt = typeof photo === "object" && photo.alt ? photo.alt : "Completed Sabah Electric project";
          image.loading = "lazy";
          photoLink.appendChild(image);
          photos.appendChild(photoLink);
        });
        if (photos.childNodes.length) card.appendChild(photos);
      }

      reviewList.appendChild(card);
    });
  }

  renderReviews();

  var thanksPage = document.querySelector(".thanks-page");
  if (thanksPage && new URLSearchParams(window.location.search).get("review") === "1") {
    var thanksEyebrow = document.getElementById("thanks-eyebrow");
    var thanksTitle = document.getElementById("thanks-title");
    var thanksCopy = document.getElementById("thanks-copy");
    if (thanksEyebrow) thanksEyebrow.lastChild.textContent = " Review received";
    if (thanksTitle) thanksTitle.innerHTML = "Thanks for<br><span>sharing it.</span>";
    if (thanksCopy) thanksCopy.textContent = "Your review has been sent to Sabah Electric. It will be checked before it is published on the website.";
    document.title = "Review received | Sabah Electric Inc.";
  }

  document.querySelectorAll(".contact-form, .review-form").forEach(function (form) {
    form.addEventListener("submit", function () {
      var submitButton = form.querySelector(".form-submit");
      if (!submitButton) return;
      submitButton.disabled = true;
      submitButton.setAttribute("aria-label", form.classList.contains("review-form") ? "Submitting review" : "Sending project inquiry");
      var buttonText = submitButton.firstChild;
      if (buttonText && buttonText.nodeType === Node.TEXT_NODE) {
        buttonText.textContent = form.classList.contains("review-form") ? "Submitting review… " : "Sending inquiry… ";
      }
    });
  });
}());
