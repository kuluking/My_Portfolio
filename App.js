// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 10, behavior: 'smooth' });
    }
  });
});

// Animate on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.slide-in,.fade-in,.fade-up,.zoom-in');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 30) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add visible class to trigger transitions
document.querySelectorAll('.slide-in,.fade-in,.fade-up,.zoom-in').forEach(el => {
  el.classList.add('animated');
});

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

// Add a little interactive bounce on skill card click
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', function() {
    card.style.transform = "scale(1.18) rotate(-1deg)";
    setTimeout(() => {
      card.style.transform = "";
    }, 270);
  });
});
