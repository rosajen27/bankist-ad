"use strict";

///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookie Message
const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = "We use cookies for improved functionality and analytics. <button class='btn btn--close--cookie'>Got it!</button>";
header.append(message);

// Cookie styles
message.style.backgroundColor = "#37383d";
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";
message.style.width = Number.parseFloat(getComputedStyle(message).width, 10) + 60 + "px";
document.querySelector(".btn--close--cookie").addEventListener("click", function () {
  message.remove();
});

///////////////////////////////////////
// Smooth Scrolling
// learn more button
const btnScrollTo = document.querySelector(".btn--scroll-to");
// section we want to scroll to when learn more button is clicked
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Page Navigation - Smooth Scrolling
document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (clicked) {

    // Remove active classes on tabs
    tabs.forEach(function (t) {
      t.classList.remove("operations__tab--active");
    });
    // Activate clicked tab
    clicked.classList.add("operations__tab--active");
  }

  // Remove active classes on content
  tabsContent.forEach(function (c) {
    c.classList.remove("operations__content--active");
  });
  // Activate content area for clicked tab
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");

});

///////////////////////////////////////
// Menu Fade Animation
const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = 0.5;
        logo.style.opacity = 0.5;
      }
    });
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = 1;
        logo.style.opacity = 1;
      }
    });
  }
});

///////////////////////////////////////
// Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal Sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
// Lazy Loading
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    // Remove blur filter once high resolution img is loaded
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // start loading images 200px before threshold
  rootMargin: "200px",
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

///////////////////////////////////////
// Testimonial Carousel
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let currentSlide = 0;
const maxSlide = slides.length;

slides.forEach(function (slide, index) {
  // 0%, 100%, 200%, 300%
  slide.style.transform = `translateX(${100 * index}%)`;
});

// next slide
btnRight.addEventListener("click", function () {
  if (currentSlide === (maxSlide - 1)) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slides.forEach(function (slide, index) {
    // currentSlide = 1: -100%, 0%, 100%, 200%
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
});

btnLeft.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  slides.forEach(function (slide, index) {
    // currentSlide = 1: -100%, 0%, 100%, 200%
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
});