const typingText = document.getElementById("typing-text");
const roles = ["Full Stack Developer", "UI Designer", "Creative Coder", "Problem Solver"];
let index = 0;
let charIndex = 0;

function type() {
  if (charIndex < roles[index].length) {
    typingText.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 90);
  } else {
    setTimeout(erase, 1800);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 40);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 700);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  setupReveal();
  filterProjects('all');
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
};

// Navigation active link on scroll
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 200;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  revealOnScroll();
});

// Project filtering function
function filterProjects(category) {
  const cards = document.querySelectorAll(".card");
  const buttons = document.querySelectorAll(".project-filters button");
  buttons.forEach(btn => btn.classList.remove("active"));
  // Highlight clicked button
  event.target.classList.add("active");

  cards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
      card.classList.add("reveal");
    } else {
      card.style.display = "none";
      card.classList.remove("reveal");
    }
  });
  revealOnScroll(); // trigger reveal for filtered cards
}

// Contact form submission (front-end only)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  if (!name || !email || !message) {
    status.textContent = "Please fill out all fields!";
    status.style.color = "red";
    return;
  }

  status.textContent = "Message sent (frontend only 😉)";
  status.style.color = "#0f0";

  e.target.reset();
});

// Scroll reveal logic
function setupReveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
