document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu --- //
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- Dark Mode Toggle --- //
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const themeIconLight = document.getElementById('theme-icon-light');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const htmlElement = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      themeIconLight.classList.add('hidden');
      themeIconDark.classList.remove('hidden');
    } else {
      htmlElement.classList.remove('dark');
      themeIconLight.classList.remove('hidden');
      themeIconDark.classList.add('hidden');
    }
  };

  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(currentTheme);

  if(darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
      });
  }

  // --- Scroll to Top Button --- //
  const scrollToTopButton = document.getElementById('scroll-to-top');
  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.add('visible');
      } else {
        scrollToTopButton.classList.remove('visible');
      }
    });
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active Nav Link --- //
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
       link.removeAttribute('aria-current');
    }
  });

  // --- FAQ Accordion --- //
  const faqAccordion = document.getElementById('faq-accordion');
  if (faqAccordion) {
    const faqButtons = faqAccordion.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.parentElement.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Optional: Close other accordions
        // faqButtons.forEach(btn => {
        //   btn.setAttribute('aria-expanded', 'false');
        //   btn.parentElement.nextElementSibling.classList.add('hidden');
        // });

        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('hidden');
      });
    });
  }

  // --- Portfolio Filter --- //
  const filtersContainer = document.getElementById('portfolio-filters');
  const portfolioGrid = document.getElementById('portfolio-grid');
  if(filtersContainer && portfolioGrid) {
    const filterButtons = filtersContainer.querySelectorAll('.filter-btn');
    const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        button.classList.add('active-filter');

        // Filter items
        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || filter === category) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

});