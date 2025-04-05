// script.js

// Sayfa içi bağlantılar için yumuşak kaydırma
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-links a, .btn");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
