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
