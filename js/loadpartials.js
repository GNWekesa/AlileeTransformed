// js/load-partials.js
document.addEventListener('DOMContentLoaded', function() {
  // Load navbar
  fetch('/partials/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      setActiveLink(); // Optional: Add active class to current page
    });

  // Load footer (if needed)
  fetch('/partials/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});

// Optional: Add active class to current page link
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}