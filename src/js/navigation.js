/**
 * Navigation Module
 * Handles sticky navbar behavior, active section indicator,
 * accessible mobile menu, theme toggle, and CV button visibility.
 */

export function initNavigation(portfolioData) {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const cvButtons = document.querySelectorAll('.cv-link-btn');

  // 1. Navbar scroll appearance (subtle border and backdrop)
  const handleScroll = () => {
    if (window.scrollY > 24) {
      navbar?.classList.add('navbar-scrolled');
    } else {
      navbar?.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu toggle with focus and scroll lock
  let isMenuOpen = false;

  const toggleMobileMenu = (open) => {
    isMenuOpen = typeof open === 'boolean' ? open : !isMenuOpen;

    if (mobileMenuDrawer && mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', String(isMenuOpen));

      if (isMenuOpen) {
        mobileMenuDrawer.classList.remove('pointer-events-none', 'opacity-0');
        mobileMenuDrawer.classList.add('pointer-events-auto', 'opacity-100');
        document.body.style.overflow = 'hidden';
        // Focus first link in drawer
        const firstLink = mobileMenuDrawer.querySelector('a, button');
        firstLink?.focus();
      } else {
        mobileMenuDrawer.classList.add('pointer-events-none', 'opacity-0');
        mobileMenuDrawer.classList.remove('pointer-events-auto', 'opacity-100');
        document.body.style.overflow = '';
      }
    }
  };

  mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu());

  // Close mobile menu when any link inside is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Close mobile menu on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMobileMenu(false);
      mobileMenuBtn?.focus();
    }
  });

  // 3. Theme Toggle (Light / Dark)
  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);

    // Update aria labels & icons
    themeToggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });
  };

  // Read current theme from html class or storage
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(currentTheme);

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      applyTheme(isCurrentlyDark ? 'light' : 'dark');
    });
  });

  // Listen to OS theme changes if user has no stored preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 4. CV Link Configuration: Strictly hide if empty, show if populated
  const resumeUrl = portfolioData.personal?.resumeUrl?.trim();
  cvButtons.forEach((btn) => {
    if (resumeUrl) {
      btn.classList.remove('hidden');
      btn.setAttribute('href', resumeUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
      const span = btn.querySelector('.cv-button-text');
      if (span) span.textContent = 'Download CV';
    } else {
      // Strictly hide the button if empty
      btn.classList.add('hidden');
    }
  });
}
