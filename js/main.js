// ===== main.js =====
// Lógica principal del sitio

document.addEventListener('DOMContentLoaded', () => {

  // ===== Carrusel del hero =====
  const carousel = document.getElementById('hero-carousel');

  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');
    let current = 0;
    let autoplayTimer;

    function goToSlide(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function startAutoplay() {
      autoplayTimer = setInterval(() => goToSlide(current + 1), 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    prevBtn.addEventListener('click', () => {
      goToSlide(current - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(current + 1);
      resetAutoplay();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index, 10));
        resetAutoplay();
      });
    });

    startAutoplay();
  }

  // ===== Modo oscuro =====
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    };

    updateIcon();

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jvdevs-theme', next);
      updateIcon();
    });
  }

  // ===== Header: reduce logo en scroll (todas las páginas) =====
  const siteHeader = document.getElementById('site-header') || document.querySelector('.header');

  if (siteHeader) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // ===== Animación al hacer scroll (reveal) =====
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ===== Pestañas de paquetes (servicios.html) =====
  const packageButtons = document.querySelectorAll('.package-btn');

  if (packageButtons.length) {
    packageButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.package;

        packageButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        document.querySelectorAll('.package-panel').forEach((panel) => {
          panel.classList.toggle('active', panel.id === `package-${target}`);
        });
      });
    });
  }
});
