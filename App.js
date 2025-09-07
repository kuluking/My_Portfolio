// Night mode toggle
const nightToggle = document.getElementById("night-toggle");
const nightIcon = document.getElementById("night-toggle-icon");
function setNightMode(on) {
  if(on) {
    document.body.classList.add("night");
    nightIcon.textContent = "☀️";
  } else {
    document.body.classList.remove("night");
    nightIcon.textContent = "🌙";
  }
}
let night = false;
nightToggle.onclick = () => { night = !night; setNightMode(night); };
window.addEventListener('DOMContentLoaded',()=>setNightMode(false));

// Animated header on scroll
const mainHeader = document.getElementById('main-header');
window.addEventListener('scroll',()=>{
  if(window.scrollY > 40) {
    mainHeader.style.background = night
      ? 'linear-gradient(90deg, #181928 0%, #232946 100%)'
      : 'linear-gradient(90deg, #232946 0%, #8c52ff 100%)';
  } else {
    mainHeader.style.background = night
      ? 'linear-gradient(90deg, #232946 0%, #8c52ff 100%)'
      : 'rgba(32, 167, 204, 0.98)';
  }
});

// Animated tiles on scroll
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

// Tile bounce effect
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

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    }
  });
});
