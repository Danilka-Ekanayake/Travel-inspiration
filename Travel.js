function toggleMenu() {
  const nav = document.getElementById("nav-links");
  const burger = document.getElementById("burger");
  
  nav.classList.toggle("active");
  burger.classList.toggle("active");

  // Change icon
  if (burger.classList.contains("active")) {
    burger.textContent = "✖"; // cross
  } else {
    burger.textContent = "☰"; // burger
  }
}

    function toggleTheme() {
      const body = document.body;
      const button = document.querySelector(".theme-toggle");
      body.classList.toggle("dark");
      button.textContent = body.classList.contains("dark") ? "🌙" : "🌞";
    }