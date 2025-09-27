// Manejo del formulario RSVP (solo frontend, sin backend)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-rsvp');
  const mensaje = document.getElementById('rsvp-mensaje');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      mensaje.textContent = '¡Gracias por confirmar tu asistencia!';
      mensaje.style.color = '#4caf50';
      form.reset();
    });
  }
});
// Scroll suave con offset para navbar fija
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar.fixed-top');
  const navLinks = document.querySelectorAll('a.nav-link');
  if (navbar && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const targetRect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = targetRect.top + scrollTop - navbarHeight;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
      });
    });
  }
});
