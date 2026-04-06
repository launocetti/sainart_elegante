/ ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  });
});

// ===== ANIMATE ON SCROLL =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Also observe gallery items for staggered animation
document.querySelectorAll('.gallery-item').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
});

const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(el => {
  galleryObserver.observe(el);
});

// ===== FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-buttons .btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach((item, index) => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===== PARALLAX EFFECT ON HERO =====
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');

if (heroSection && heroContent) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrolled < heroHeight) {
      const opacity = 1 - (scrolled / heroHeight) * 0.5;
      const translateY = scrolled * 0.3;
      
      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${translateY}px)`;
    }
  });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY;
  const navbarHeight = navbar.offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== FEATURE & CONTACT ITEMS ANIMATION =====
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-item, .contact-item').forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
  featureObserver.observe(el);
});

// ===== SECTION TITLES ANIMATION =====
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-title').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  titleObserver.observe(el);
});

// ===== PRELOADER & INITIAL ANIMATIONS =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger hero animations
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.15}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
});

// ===== IMAGE ERROR HANDLING =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.opacity = '0.5';
  });
});
