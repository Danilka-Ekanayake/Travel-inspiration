const themeToggle = document.querySelector('.theme-toggle');
const nav = document.querySelector('.nav');
const themeStorageKey = 'travelquest-theme';

if (themeToggle && nav) {
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  themeToggle.before(hamburger);

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
  });
}

const navLinks = document.querySelectorAll('.nav a');
const currentUrl = window.location.pathname.split('/').pop();
navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (linkHref === currentUrl || linkHref === '') {
    link.classList.add('active');
  }
});

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);

  document.querySelectorAll('.theme-toggle').forEach(button => {
    button.textContent = isDark ? '🌙' : '🌞';
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('aria-pressed', String(isDark));
    button.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  });
}

function readSavedTheme() {
  try {
    return window.localStorage.getItem(themeStorageKey) === 'dark';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'SecurityError') {
      console.warn('Theme preference could not be read because browser storage is unavailable.');
      return false;
    }

    throw error;
  }
}

function saveTheme(isDark) {
  try {
    window.localStorage.setItem(themeStorageKey, isDark ? 'dark' : 'light');
  } catch (error) {
    if (error instanceof DOMException && error.name === 'SecurityError') {
      console.warn('Theme preference could not be saved because browser storage is unavailable.');
      return;
    }

    throw error;
  }
}

applyTheme(readSavedTheme());

window.addEventListener('storage', event => {
  if (event.key === themeStorageKey || event.key === null) {
    applyTheme(event.newValue === 'dark');
  }
});

function toggleTheme() {
  const isDark = !document.body.classList.contains('dark');
  applyTheme(isDark);
  saveTheme(isDark);
}

if (document.body.classList.contains('destination-page') && 'IntersectionObserver' in window) {
  const placeCards = document.querySelectorAll('.destination-places .place-card');
  const placeCardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -48px 0px',
    threshold: 0.12
  });

  placeCards.forEach((card, index) => {
    card.classList.add('place-card--reveal');
    card.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
    placeCardObserver.observe(card);
  });
}
