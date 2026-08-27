// ===== components/menu.js =====
// Menú hamburguesa para navegación en dispositivos móviles.

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  if (!navbar || !navLinks) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.classList.add('menu-toggle');
  toggleBtn.setAttribute('aria-label', 'Abrir menú');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.innerHTML = '<span></span><span></span><span></span>';
  navbar.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar el menú al tocar un enlace
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
});
