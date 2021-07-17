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