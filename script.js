// Mini-player track controls
document.addEventListener('DOMContentLoaded', function() {
  const tracks = [
    {src: '/musica/Lady Gaga Bruno Mars - Die with A Samile.mp3'},
    {src: '/musica/LexMorris  HALUNA - Summertime Sadness.mp3'},
  ];
  let currentTrack = 0;
  const audio = document.getElementById('mini-audio');
  const titleDiv = document.getElementById('track-title');
  const prevBtn = document.getElementById('prev-track');
  const nextBtn = document.getElementById('next-track');
  const randomBtn = document.getElementById('random-track');
  function setTrack(idx) {
    if (!audio) return;
    currentTrack = idx;
    audio.pause();
    audio.src = tracks[currentTrack].src;
    audio.load();
    if (titleDiv) titleDiv.textContent = tracks[currentTrack].title;
    audio.play();
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      setTrack((currentTrack - 1 + tracks.length) % tracks.length);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      setTrack((currentTrack + 1) % tracks.length);
    });
  }
  if (randomBtn) {
    randomBtn.addEventListener('click', function() {
      let idx;
      do {
        idx = Math.floor(Math.random() * tracks.length);
      } while (idx === currentTrack && tracks.length > 1);
      setTrack(idx);
    });
  }
  // Inicializar título y fuente
  if (audio && tracks.length > 0) {
    audio.src = tracks[0].src;
    audio.load();
    if (titleDiv) titleDiv.textContent = tracks[0].title;
    // Autoplay al cargar la página
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        // Si el navegador bloquea autoplay, mostrar un mensaje o ignorar
        // Opcional: mostrar un botón para iniciar la música
      });
    }
  }
});
// Scroll suave al hacer clic en el indicador de flecha y en los enlaces de navegación, dejando la sección alineada arriba (considerando navbar fija)
document.addEventListener('DOMContentLoaded', function() {
  function scrollToSection(section) {
    if (!section) return;
    const navbar = document.querySelector('.navbar.fixed-top');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const sectionRect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = sectionRect.top + scrollTop - navbarHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
  function scrollToNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('.section'));
    const idx = sections.indexOf(currentSection);
    if (idx !== -1 && idx < sections.length - 1) {
      scrollToSection(sections[idx + 1]);
    }
  }
  // Flechas scroll-down
  document.querySelectorAll('.scroll-down-indicator').forEach(indicator => {
    indicator.addEventListener('click', function(e) {
      let section = this.closest('.section');
      if (section) scrollToNextSection(section);
    });
  });
  // Enlaces de navegación
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
            scrollToSection(target);
          }
        }
      });
    });
  }
});

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALvl8xhRRE4OMSXv7kCNZREzfuqyJfla0",
  authDomain: "tarjeta-casamiento-fc0da.firebaseapp.com",
  projectId: "tarjeta-casamiento-fc0da",
  storageBucket: "tarjeta-casamiento-fc0da.firebasestorage.app",
  messagingSenderId: "1079233122357",
  appId: "1:1079233122357:web:02ae5b755c51919d0b217c",
  measurementId: "G-KYF33Q8RJT"
};
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
}

// Función para mostrar el modal de éxito
function showSuccessModal() {
  var modal = new bootstrap.Modal(document.getElementById('modalExitoForm'));
  modal.show();
}

// Manejo de formularios RSVP y Contacto
document.addEventListener('DOMContentLoaded', function() {
  // RSVP
  var rsvpForm = document.getElementById('form-rsvp');
  if (rsvpForm && typeof db !== 'undefined') {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = {
        nombre: rsvpForm.querySelector('[name="name"], [name="nombre"]').value,
        invitados: rsvpForm.querySelector('[name="invitados"]').value,
        email: rsvpForm.querySelector('[name="email"]').value,
        mensaje: rsvpForm.querySelector('[name="mensaje"]').value,
        fecha: new Date().toISOString()
      };
      db.collection('rsvp').add(data)
        .then(() => {
          rsvpForm.reset();
          showSuccessModal();
        })
        .catch(() => {
          alert('Error al enviar. Intenta nuevamente.');
        });
    });
  }
  // Contacto
  var contactoForm = document.querySelector('section#contacto form');
  if (contactoForm && typeof db !== 'undefined') {
    contactoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = {
        nombre: contactoForm.querySelector('input[type="text"]').value,
        mensaje: contactoForm.querySelector('textarea').value,
        fecha: new Date().toISOString()
      };
      db.collection('contacto').add(data)
        .then(() => {
          contactoForm.reset();
          showSuccessModal();
        })
        .catch(() => {
          alert('Error al enviar. Intenta nuevamente.');
        });
    });
  }
});

// Fade-out al recargar la página (opcional, mobile friendly)
window.addEventListener('beforeunload', function () {
  document.body.classList.add('fadeout');
});

// Control de música flotante, mobile friendly
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('musica-fondo');
  const miniAudio = document.getElementById('mini-audio');
  const btnMusic = document.getElementById('toggle-music');
  const iconOn = document.getElementById('icon-music-on');
  const iconOff = document.getElementById('icon-music-off');
  if (audio && btnMusic && iconOn && iconOff) {
    let muted = false;
    audio.volume = 0.5;
    audio.loop = true;
    if (miniAudio) {
      miniAudio.volume = 0.5;
      miniAudio.loop = true;
      // Sincronizar mute
      btnMusic.addEventListener('click', function() {
        muted = !muted;
        audio.muted = muted;
        miniAudio.muted = muted;
        iconOn.style.display = muted ? 'none' : 'block';
        iconOff.style.display = muted ? 'block' : 'none';
      });
      // Sincronizar play/pause
      miniAudio.addEventListener('play', function() {
        if (audio.paused) audio.play();
      });
      miniAudio.addEventListener('pause', function() {
        if (!audio.paused) audio.pause();
      });
      audio.addEventListener('play', function() {
        if (miniAudio.paused) miniAudio.play();
      });
      audio.addEventListener('pause', function() {
        if (!miniAudio.paused) miniAudio.pause();
      });
    } else {
      btnMusic.addEventListener('click', function() {
        muted = !muted;
        audio.muted = muted;
        iconOn.style.display = muted ? 'none' : 'block';
        iconOff.style.display = muted ? 'block' : 'none';
      });
    }
    audio.muted = false;
    if (miniAudio) miniAudio.muted = false;
    iconOn.style.display = 'block';
    iconOff.style.display = 'none';
  }
});

// Fade entre secciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-section');
        } else {
          entry.target.classList.remove('show-section');
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));
    sections.forEach(section => section.classList.remove('fade-section'));
  }
});

// Contador regresivo con círculos
function actualizarContador() {
  const fechaBoda = new Date('2026-02-21T20:00:00');
  const ahora = new Date();
  const diff = fechaBoda - ahora;
  if (diff <= 0) {
    document.getElementById('contador').innerHTML = '<span style="color:#8B5C2A;font-size:2rem;font-family:\'Dancing Script\',cursive;">¡Llegó el gran día!</span>';
    return;
  }
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById('contador').innerHTML = `
    <div class="contador-circulos">
      <div class="contador-circulo">
        <div class="contador-numero">${dias}</div>
        <div class="contador-label">Días</div>
      </div>
      <div class="contador-circulo">
        <div class="contador-numero">${horas}</div>
        <div class="contador-label">Horas</div>
      </div>
      <div class="contador-circulo">
        <div class="contador-numero">${minutos}</div>
        <div class="contador-label">Minutos</div>
      </div>
      <div class="contador-circulo">
        <div class="contador-numero">${segundos}</div>
        <div class="contador-label">Segundos</div>
      </div>
    </div>
  `;
}
setInterval(actualizarContador, 1000);
actualizarContador();
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


// Cierra el menú hamburguesa al hacer clic fuera si está abierto
document.addEventListener('click', function(event) {
  var navbarCollapse = document.getElementById('navbarNav');
  var toggler = document.querySelector('.navbar-toggler');
  if (!navbarCollapse || !toggler) return;
  var isOpen = navbarCollapse.classList.contains('show');
  // Si el menú está abierto y el clic no es sobre el toggler ni dentro del menú
  if (isOpen && !navbarCollapse.contains(event.target) && !toggler.contains(event.target)) {
    toggler.click();
  }
});