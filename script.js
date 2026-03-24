'use strict';

/* ===============================
   HELPER FUNCTIONS
================================ */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ===============================
   NAVBAR TOGGLE
================================ */
const navbar = $("[data-navbar]");
const navTogglers = $$("[data-nav-toggler]");
const navLinks = $$("[data-nav-link]");

navTogglers.forEach(btn => {
  btn.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

/* ===============================
   SMOOTH SCROLL
================================ */
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* ===============================
   ACTIVE NAV LINK ON SCROLL
================================ */
const sections = $$("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ===============================
   HEADER + BACK TO TOP
================================ */
const header = $("[data-header]");
const backTopBtn = $("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/* ===============================
   LAZY LOADING IMAGES 🚀
================================ */
const images = $$("img");

const imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    img.src = img.dataset.src || img.src;
    observer.unobserve(img);
  });
}, {
  rootMargin: "100px"
});

images.forEach(img => {
  imgObserver.observe(img);
});

/* ===============================
   SCROLL ANIMATION (FADE IN)
================================ */
const fadeElements = $$(".section");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.6s ease";
  fadeObserver.observe(el);
});

/* ===============================
   DARK MODE 🌙
================================ */
const darkToggle = document.createElement("button");
darkToggle.innerText = "🌙";
darkToggle.style.position = "fixed";
darkToggle.style.bottom = "20px";
darkToggle.style.left = "20px";
darkToggle.style.padding = "10px";
darkToggle.style.zIndex = "999";
document.body.appendChild(darkToggle);

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode"));
});

// Load saved theme
if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark-mode");
}

/* ===============================
   SIMPLE LOADER
================================ */
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.innerHTML = "Loading...";
  loader.style.position = "fixed";
  loader.style.top = 0;
  loader.style.left = 0;
  loader.style.width = "100%";
  loader.style.height = "100%";
  loader.style.background = "#000";
  loader.style.color = "#fff";
  loader.style.display = "flex";
  loader.style.alignItems = "center";
  loader.style.justifyContent = "center";
  loader.style.zIndex = "9999";

  document.body.appendChild(loader);

  setTimeout(() => {
    loader.remove();
  }, 1000);
});

/* ===============================
   FORM VALIDATION
================================ */
const form = $(".footer-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector("input").value;

    if (!email.includes("@")) {
      alert("Enter valid email ❌");
    } else {
      alert("Subscribed Successfully ✅");
      form.reset();
    }
  });
}

/* ===============================
   DEBOUNCE FUNCTION (Performance)
================================ */
function debounce(func, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), delay);
  };
}

/* Example Usage */
window.addEventListener("resize", debounce(() => {
  console.log("Resized!");
}, 300));