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
// Animación de ingreso para imágenes de galería
window.addEventListener('DOMContentLoaded', function() {
  const galeriaImgs = document.querySelectorAll('.galeria-img');
  if (galeriaImgs.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    galeriaImgs.forEach(img => observer.observe(img));
  } else {
    // fallback: mostrar todas si no hay soporte
    galeriaImgs.forEach(img => img.classList.add('visible'));
  }
});
