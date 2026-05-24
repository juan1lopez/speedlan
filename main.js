/* ================================================================
   SPEEDLAND - MAIN JAVASCRIPT
   Enhanced with Analytics & Tracking
   ================================================================ */

// ================================================================
// NAVBAR VISIBILITY ON SCROLL
// ================================================================
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

const navbarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  });
}, { threshold: 0 });

navbarObserver.observe(hero);

// ================================================================
// INTERSECTION OBSERVER FOR ENTRANCE ANIMATIONS
// ================================================================
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const children = element.querySelectorAll('[data-animate]');
      
      element.classList.add('visible');
      
      if (children.length > 0) {
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, i * 100);
        });
      } else {
        const childElements = element.children;
        for (let i = 0; i < childElements.length; i++) {
          const child = childElements[i];
          if (child.classList.length === 0 || !child.classList.contains('visible')) {
            setTimeout(() => {
              child.classList.add('visible');
            }, i * 100);
          }
        }
      }
      
      animationObserver.unobserve(element);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => {
  animationObserver.observe(el);
});

// ================================================================
// HERO SECTION PARTICLES
// ================================================================
function generateHeroParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const opacity = Math.random() * 0.35 + 0.25;
    particle.style.opacity = opacity;

    const size = Math.random() * 2 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    const duration = Math.random() * 8 + 6;
    particle.style.animationDuration = duration + 's';

    const delay = Math.random() * 3;
    particle.style.animationDelay = delay + 's';

    const drift = Math.random() * 200 - 100;
    particle.style.setProperty('--drift', drift + 'px');

    const rightOffset = Math.random() * 30 + 10;
    particle.style.right = rightOffset + '%';

    container.appendChild(particle);
  }
}

// ================================================================
// FINAL CTA PARTICLES
// ================================================================
function generateFinalCTAParticles() {
  const container = document.getElementById('finalCTAParticles');
  if (!container) return;
  
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    particle.style.animation = 'float-up 10s ease-out infinite';

    const size = Math.random() * 2 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = 'rgba(232, 93, 48, 0.5)';

    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';

    const leftOffset = Math.random() * 100;
    particle.style.left = leftOffset + '%';

    const bottomOffset = Math.random() * 20;
    particle.style.bottom = bottomOffset + '%';

    const drift = Math.random() * 200 - 100;
    particle.style.setProperty('--drift', drift + 'px');

    container.appendChild(particle);
  }
}

// ================================================================
// PARALLAX EFFECT ON VISION SECTION
// ================================================================
const visionSection = document.getElementById('visionSection');
const visionBackground = document.getElementById('visionBackground');

if (visionSection && visionBackground) {
  window.addEventListener('scroll', () => {
    const rect = visionSection.getBoundingClientRect();
    const scrollPosition = window.scrollY;
    const sectionTop = visionSection.offsetTop;
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const parallaxValue = (scrollPosition - sectionTop) * 0.3;
      visionBackground.style.transform = `translateY(${parallaxValue}px)`;
    }
  }, { passive: true });
}

// ================================================================
// STATS COUNTER
// ================================================================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(target * easeProgress);
    
    if (element.dataset.target.includes('+')) {
      element.textContent = current.toLocaleString() + '+';
    } else if (element.dataset.target.includes('%')) {
      element.textContent = current.toFixed(1) + '%';
    } else {
      element.textContent = current.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = element.dataset.target;
    }
  }

  update();
}

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      
      statNumbers.forEach(stat => {
        const target = stat.dataset.target;
        if (target) {
          let numericTarget = parseFloat(target);
          if (target.includes('%')) {
            numericTarget = parseFloat(target);
          } else if (target.includes('+')) {
            numericTarget = parseInt(target);
          } else if (target.includes('M')) {
            numericTarget = 12;
          } else {
            numericTarget = parseInt(target);
          }
          
          animateCounter(stat, numericTarget, 2000);
        }
      });

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ================================================================
// 3D CARD TILT EFFECT (BENTO CARDS & SERVICE CARDS)
// ================================================================
const bentoCards = document.querySelectorAll('.bento-card, .servicio-card');

bentoCards.forEach(card => {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (e.clientX - centerX) / -10;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
  }
});

// ================================================================
// CURSOR GLOW EFFECT (DESKTOP ONLY)
// ================================================================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232, 93, 48, 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    display: none;
    will-change: transform;
  `;
  document.body.appendChild(cursorGlow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.display = 'block';
  });

  function updateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    
    cursorGlow.style.transform = `translate(${glowX - 100}px, ${glowY - 100}px)`;
    requestAnimationFrame(updateGlow);
  }

  updateGlow();

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.display = 'none';
  });
}

// ================================================================
// HERO TEXT ENTRANCE ANIMATIONS
// ================================================================
function animateHeroElements() {
  const accentLine = document.querySelector('.accent-line');
  const headingMain = document.querySelector('.heading-main');
  const headingSecondary = document.querySelector('.heading-secondary');
  const subtitle = document.querySelector('.subtitle');
  const buttonGroup = document.querySelector('.button-group');
  const scrollAccent = document.querySelector('.scroll-accent');

  const elements = [
    { el: accentLine, delay: 0.15 },
    { el: headingMain, delay: 0.3 },
    { el: headingSecondary, delay: 0.45 },
    { el: subtitle, delay: 0.6 },
    { el: buttonGroup, delay: 0.75 },
    { el: scrollAccent, delay: 0.9 }
  ];

  elements.forEach(({ el, delay }) => {
    if (el) {
      setTimeout(() => {
        el.classList.add('visible');
      }, delay * 1000);
    }
  });
}

// ================================================================
// SMOOTH SCROLL BEHAVIOR
// ================================================================
document.documentElement.style.scrollBehavior = 'smooth';

// ================================================================
// VISION QUOTE AND BYLINE ANIMATIONS
// ================================================================
const visionQuote = document.querySelector('.vision-quote');
const visionByline = document.querySelector('.vision-byline');

const visionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (visionQuote) visionQuote.classList.add('visible');
      if (visionByline) visionByline.classList.add('visible');
      visionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (visionSection) {
  visionObserver.observe(visionSection);
}

// ================================================================
// ANALYTICS & EVENT TRACKING
// ================================================================
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
  console.log(`Event tracked: ${eventName}`, eventData);
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnText = btn.textContent;
    trackEvent('button_click', { button_text: btnText });
  });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      if (sectionId) {
        trackEvent('section_viewed', { section: sectionId });
      }
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
  sectionObserver.observe(section);
});

// ================================================================
// INITIALIZE ON PAGE LOAD
// ================================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    animateHeroElements();
    generateHeroParticles();
    generateFinalCTAParticles();
    trackEvent('page_view', { page_title: document.title });
  });
} else {
  animateHeroElements();
  generateHeroParticles();
  generateFinalCTAParticles();
  trackEvent('page_view', { page_title: document.title });
}

// ================================================================
// FAQ ACCORDION (Expandible)
// ================================================================
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    const respuesta = item.querySelector('.faq-respuesta');
    
    if (isOpen) {
      respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
      trackEvent('faq_expanded', { question: item.querySelector('.faq-pregunta').textContent });
    } else {
      respuesta.style.maxHeight = '0';
    }
  });
});

// ================================================================
// PERFORMANCE MONITORING
// ================================================================
if ('PerformanceObserver' in window) {
  // Monitor Core Web Vitals
  const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-input') {
        trackEvent('core_web_vital', {
          metric: 'FID',
          value: Math.round(entry.processingDuration)
        });
      }
    });
  });

  perfObserver.observe({ entryTypes: ['first-input'] });
}

// ================================================================
// SCROLL DEPTH TRACKING
// ================================================================
let scrollDepthTracked = {
  25: false,
  50: false,
  75: false,
  100: false
};

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  [25, 50, 75, 100].forEach(percent => {
    if (scrollPercent >= percent && !scrollDepthTracked[percent]) {
      scrollDepthTracked[percent] = true;
      trackEvent('scroll_depth', { depth_percent: percent });
    }
  });
}, { passive: true });