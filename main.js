/* =====================================================================
   QUICK TECH MEGA ENGINEERING SERVICES — main.js
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Hamburger / mobile nav ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a dropdown toggle on mobile, toggle submenu instead
      const parent = link.closest('.dropdown');
      if (parent && window.innerWidth <= 768 && link.classList.contains('dropdown-toggle')) {
        e.preventDefault();
        parent.classList.toggle('open');
        return;
      }
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Lightweight AOS (Animate on Scroll) ---- */
  const aosElements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0, 10);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  aosElements.forEach(el => observer.observe(el));

  /* ---- Training Form → WhatsApp ---- */
  const trainingForm = document.getElementById('training-form');
  if (trainingForm) {
    trainingForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('t-name').value.trim();
      const phone   = document.getElementById('t-phone').value.trim();
      const service = document.getElementById('t-service').value;

      if (!name || !phone || !service) {
        alert('Please fill in all required fields.');
        return;
      }

      const message = encodeURIComponent(
        `Hello, I want to register for training with Quick Tech Mega Engineering Services.\n\n` +
        `Name: ${name}\nPhone: ${phone}\nProgram: ${service}\n\n` +
        `Please confirm my booking. Thank you!`
      );

      window.open(`https://wa.me/233243133899?text=${message}`, '_blank');
    });
  }

  /* ---- Stat counter animation ---- */
  const statNums = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));

  function animateCount(el) {
    const text  = el.textContent;
    const match = text.match(/[\d]+/);
    if (!match) return;
    const end    = parseInt(match[0], 10);
    const suffix = el.querySelector('.stat-plus')?.outerHTML || '';
    let current  = 0;
    const duration = 1400;
    const step   = Math.ceil(end / (duration / 16));
    const timer  = setInterval(() => {
      current = Math.min(current + step, end);
      el.innerHTML = current + suffix;
      if (current >= end) clearInterval(timer);
    }, 16);
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-links > li > a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

});
