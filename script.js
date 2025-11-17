// Enhanced hover effects with JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const devLink = document.querySelector(".nav-dev");
  const musicianLink = document.querySelector(".nav-musician");

  // Dev link hover effects
  devLink.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  devLink.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });

  // Musician link hover effects
  musicianLink.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  musicianLink.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});
