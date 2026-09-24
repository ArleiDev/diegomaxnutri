/**
 * DIEGO MAX - NUTRIÇÃO & FISIOLOGIA DO EXERCÍCIO
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const headerContainer = document.querySelector('.header-container');
  if (mobileToggle && headerContainer) {
    mobileToggle.addEventListener('click', () => {
      headerContainer.classList.toggle('mobile-nav-active');
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        headerContainer.classList.remove('mobile-nav-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. WhatsApp Message Helper
  // Allows any element with data-whatsapp-mode or data-whatsapp-intent to format direct URL
  const defaultPhone = '558597322901'; // Número do cliente
  
  const setupWhatsAppLinks = () => {
    const onlineLinks = document.querySelectorAll('.btn-whatsapp-online');
    onlineLinks.forEach(btn => {
      const text = encodeURIComponent('Olá Diego Max! Gostaria de informações para agendar uma consulta ONLINE de Nutrição & Fisiologia.');
      btn.setAttribute('href', `https://wa.me/${defaultPhone}?text=${text}`);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

    const presencialLinks = document.querySelectorAll('.btn-whatsapp-presencial');
    presencialLinks.forEach(btn => {
      const text = encodeURIComponent('Olá Diego Max! Gostaria de agendar uma consulta PRESENCIAL em Fortaleza (Clínica Brayner).');
      btn.setAttribute('href', `https://wa.me/${defaultPhone}?text=${text}`);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });
  };
  setupWhatsAppLinks();

  // 5. Reveal on Scroll Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersectment || entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
