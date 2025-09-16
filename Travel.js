const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<span></span><span></span><span></span>';

// insert before theme toggle
document.querySelector('.theme-toggle').before(hamburger);

const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  hamburger.classList.toggle('toggle');
});

// highlight current page
const navLinks = document.querySelectorAll('.nav a');
const currentUrl = window.location.pathname.split('/').pop();
navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentUrl || linkHref === '') {
    link.classList.add('active');
  }
});

function toggleTheme() {
  const body = document.body;
  const button = document.querySelector(".theme-toggle");
  body.classList.toggle("dark");
  button.textContent = body.classList.contains("dark") ? "🌙" : "🌞";
}
