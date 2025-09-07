// Minimal interaction for contact form (no backend, just demo)
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
