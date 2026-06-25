const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-menu-overlay");
const mobileClose = document.getElementById("mobile-menu-close");

function openMenu() {
  mobileMenu.classList.add("open");
  mobileOverlay.classList.add("open");
  hamburger.classList.add("active");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  mobileOverlay.classList.remove("open");
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMenu);
mobileClose.addEventListener("click", closeMenu);
mobileOverlay.addEventListener("click", closeMenu);

// Close menu when a link is tapped
mobileMenu
  .querySelectorAll(".mobile-menu-link")
  .forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
