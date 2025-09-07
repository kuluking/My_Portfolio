// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 12, behavior: 'smooth' });
    }
  });
});

// Animate tiles on scroll
function revealOnScroll() {
  const tiles = document.querySelectorAll('.tile');
  const windowHeight = window.innerHeight;
  tiles.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 30) el.style.opacity = 1;
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Contact form feedback
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      status.textContent = "Thank you! (Demo only, not actually sent)";
      status.style.color = "#20a7cc";
      form.reset();
      setTimeout(() => { status.textContent = ""; }, 3000);
    }
  }
});

// Tile interactive bounce effect
document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('mousedown', function() {
    tile.style.transform += " scale(0.93)";
  });
  tile.addEventListener('mouseup', function() {
    tile.style.transform = "";
  });
  tile.addEventListener('mouseleave', function() {
    tile.style.transform = "";
  });
});
