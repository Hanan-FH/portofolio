/**
 * Main Application Orchestrator
 * Coordinates data hydration, module initialization, accessibility,
 * FormSubmit AJAX integration, and Lucide icon rendering.
 */

import { portfolioData } from '../data/portfolio.js';
import { initNavigation } from './navigation.js';
import { renderProjects } from './projects.js';
import { initCertificates } from './certificates.js';
import { initAnimations } from './animations.js';

import {
  createIcons,
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  Sun,
  Moon,
  FileText,
  CheckCircle2,
  Code2,
  Terminal,
  Layers,
  Cpu,
  Database,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Send,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide';

// Helper to escape text
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {
  const { personal, social, about, expertise, skills, education, projects, certificates, contact } = portfolioData;
  const primaryEmail = personal.email || contact?.recipientEmail || 'hananfh77@gmail.com';

  // ============================================================================
  // 1. BRAND & HERO DATA HYDRATION
  // ============================================================================
  const nameElements = document.querySelectorAll('.bind-name');
  nameElements.forEach(el => {
    el.textContent = personal.name || 'Developer';
  });

  const roleElements = document.querySelectorAll('.bind-role');
  roleElements.forEach(el => {
    el.textContent = personal.role || 'Software Engineering';
  });

  const eyebrowEl = document.getElementById('hero-eyebrow');
  if (eyebrowEl && personal.eyebrow) {
    eyebrowEl.textContent = personal.eyebrow;
  }

  const headlineEl = document.getElementById('hero-headline');
  if (headlineEl && personal.headline) {
    headlineEl.textContent = personal.headline;
  }

  const shortBioEl = document.getElementById('hero-shortbio');
  if (shortBioEl && personal.shortBio) {
    shortBioEl.textContent = personal.shortBio;
  }

  const heroStatusEl = document.getElementById('hero-status-badge');
  if (heroStatusEl && personal.status) {
    heroStatusEl.innerHTML = `
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
      </span>
      <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300">${escapeHtml(personal.status)}</span>
    `;
  }

  // Profile Image Container (graceful fallback with shadow reflection)
  const profileContainer = document.getElementById('hero-profile-container');
  if (profileContainer) {
    if (personal.profileImage && personal.profileImage.trim()) {
      profileContainer.innerHTML = `
        <img
          src="${escapeHtml(personal.profileImage)}"
          alt="Photograph of ${escapeHtml(personal.name || 'Developer')}"
          width="480"
          height="560"
          class="w-full h-full object-cover object-center rounded-2xl border border-zinc-200 dark:border-zinc-800"
        />
      `;
    } else {
      const initials = (personal.name || 'HF')
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      profileContainer.innerHTML = `
        <div class="w-full aspect-[4/5] max-w-md mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16141A] p-8 flex flex-col justify-between relative overflow-hidden">
          <div class="relative z-10 flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span>PROFILE PHOTO</span>
            <span class="text-rose-600 dark:text-rose-400 font-medium">Pending</span>
          </div>

          <div class="relative z-10 my-auto text-center py-10">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-dashed border-rose-400/50 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-2xl font-bold text-rose-600 dark:text-rose-400 shadow-md shadow-rose-600/20">
              ${initials}
            </div>
            <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              Photo Placeholder
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              Place image at <code class="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-rose-600 dark:text-rose-400">src/assets/profile/profile.webp</code>
            </p>
          </div>

          <div class="relative z-10 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Location: ${escapeHtml(personal.location || 'Indonesia')}</span>
            <span>Software Engineer</span>
          </div>
        </div>
      `;
    }
  }

  // Social Links in Hero
  const heroSocialContainer = document.getElementById('hero-social-links');
  if (heroSocialContainer) {
    const socialItems = [];

    if (social.github && social.github.trim()) {
      socialItems.push({
        key: 'github',
        label: 'GitHub',
        url: social.github,
        icon: 'github',
        ariaLabel: 'Visit Hanan-FH on GitHub',
        isExternal: true,
      });
    }

    if (social.linkedin && social.linkedin.trim()) {
      socialItems.push({
        key: 'linkedin',
        label: 'LinkedIn',
        url: social.linkedin,
        icon: 'linkedin',
        ariaLabel: 'Visit my LinkedIn profile',
        isExternal: true,
      });
    }

    if (primaryEmail && primaryEmail.trim()) {
      socialItems.push({
        key: 'email',
        label: 'Email',
        url: `mailto:${primaryEmail}?subject=Portfolio%20Inquiry`,
        icon: 'mail',
        ariaLabel: `Send email to ${primaryEmail}`,
        isExternal: false,
      });
    }

    heroSocialContainer.innerHTML = socialItems
      .map(
        s => `
        <a
          href="${escapeHtml(s.url)}"
          ${s.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
          class="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-ring py-1 group"
          aria-label="${escapeHtml(s.ariaLabel)}"
        >
          <i data-lucide="${s.icon}" class="w-4 h-4"></i>
          <span>${escapeHtml(s.label)}</span>
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
        </a>
      `
      )
      .join('');
  }

  // ============================================================================
  // 2. ABOUT SECTION HYDRATION
  // ============================================================================
  const aboutHeadingEl = document.getElementById('about-heading');
  if (aboutHeadingEl && about?.heading) {
    aboutHeadingEl.textContent = about.heading;
  }

  const aboutParagraphsContainer = document.getElementById('about-paragraphs');
  if (aboutParagraphsContainer && Array.isArray(about?.paragraphs)) {
    aboutParagraphsContainer.innerHTML = about.paragraphs
      .map(
        p => `
        <p class="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
          ${escapeHtml(p)}
        </p>
      `
      )
      .join('');
  }

  const aboutStatusEl = document.getElementById('about-status');
  if (aboutStatusEl && about?.status) {
    aboutStatusEl.textContent = about.status;
  }

  const aboutFocusEl = document.getElementById('about-focus');
  if (aboutFocusEl && about?.currentFocus) {
    aboutFocusEl.textContent = about.currentFocus;
  }

  const aboutLocationEl = document.getElementById('about-location');
  if (aboutLocationEl && personal?.location) {
    aboutLocationEl.textContent = personal.location;
  }

  // ============================================================================
  // 3. EXPERTISE SECTION (01 - 04)
  // ============================================================================
  const expertiseContainer = document.getElementById('expertise-container');
  if (expertiseContainer && Array.isArray(expertise)) {
    expertiseContainer.innerHTML = expertise
      .map(
        exp => `
        <div class="reveal-item p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16141A] hover:border-rose-500 dark:hover:border-rose-400 transition-all shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-3">
              ${escapeHtml(exp.number)}
            </span>
            <h3 class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
              ${escapeHtml(exp.title)}
            </h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              ${escapeHtml(exp.description)}
            </p>
          </div>
        </div>
      `
      )
      .join('');
  }

  // ============================================================================
  // 4. SKILLS & TECHNOLOGIES SECTION
  // ============================================================================
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && skills) {
    const categories = [
      { key: 'frontend', label: 'Frontend & UI' },
      { key: 'backend', label: 'Backend & APIs' },
      { key: 'database', label: 'Database Systems' },
      { key: 'programming', label: 'Languages' },
      { key: 'tools', label: 'Tooling & Workflow' },
      { key: 'design', label: 'Design & Systems' },
    ];

    skillsContainer.innerHTML = categories
      .filter(cat => Array.isArray(skills[cat.key]) && skills[cat.key].length > 0)
      .map(
        cat => `
        <div class="reveal-item p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16141A] shadow-sm">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span>${escapeHtml(cat.label)}</span>
            <span class="text-xs font-bold text-rose-600 dark:text-rose-400">${skills[cat.key].length}</span>
          </h3>
          <div class="flex flex-wrap gap-2">
            ${skills[cat.key]
              .map(
                skill => `
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200">
                ${escapeHtml(skill)}
              </span>
            `
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  // ============================================================================
  // 5. EDUCATION SECTION
  // ============================================================================
  const educationContainer = document.getElementById('education-timeline');
  if (educationContainer && Array.isArray(education)) {
    educationContainer.innerHTML = education
      .map(
        (edu) => `
        <div class="reveal-item relative pl-6 sm:pl-8 pb-10 last:pb-0 border-l-2 border-zinc-200 dark:border-zinc-800">
          <span class="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-rose-600 dark:bg-rose-400 ring-4 ring-[#FAFAFA] dark:ring-[#0D0D11]"></span>
          
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold tracking-wide uppercase">
              ${escapeHtml(edu.period)}
            </span>
            ${edu.status ? `<span class="text-xs text-zinc-500 dark:text-zinc-400 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">${escapeHtml(edu.status)}</span>` : ''}
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            ${escapeHtml(edu.program)}
          </h3>

          <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">
            ${escapeHtml(edu.institution)}
          </p>

          <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            ${escapeHtml(edu.description)}
          </p>
        </div>
      `
      )
      .join('');
  }

  // ============================================================================
  // 6. CONTACT SECTION HYDRATION & FORMSUBMIT AJAX
  // ============================================================================
  const contactHeadingEl = document.getElementById('contact-heading');
  if (contactHeadingEl && contact?.heading) {
    contactHeadingEl.textContent = contact.heading;
  }

  const contactSubheadingEl = document.getElementById('contact-subheading');
  if (contactSubheadingEl && contact?.subheading) {
    contactSubheadingEl.textContent = contact.subheading;
  }

  const contactEmailBtn = document.getElementById('contact-email-btn');
  if (contactEmailBtn) {
    contactEmailBtn.setAttribute('href', `mailto:${primaryEmail}?subject=Portfolio%20Inquiry`);
    const emailText = contactEmailBtn.querySelector('.contact-email-text');
    if (emailText) emailText.textContent = primaryEmail;
  }

  // Functional FormSubmit AJAX Handler
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('contact-form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitText = document.getElementById('contact-submit-text');

  if (contactForm) {
    const nameInput = document.getElementById('form-sender-name');
    const emailInput = document.getElementById('form-sender-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const honeyInput = document.getElementById('form-honey');

    const errName = document.getElementById('err-name');
    const errEmail = document.getElementById('err-email');
    const errSubject = document.getElementById('err-subject');
    const errMessage = document.getElementById('err-message');

    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      inp?.addEventListener('input', () => {
        inp.classList.remove('border-red-500', 'focus:ring-red-500');
        const errEl = document.getElementById(`err-${inp.id.replace('form-', '').replace('sender-', '')}`);
        if (errEl) errEl.classList.add('hidden');
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (honeyInput && honeyInput.value.trim() !== '') {
        console.warn('Bot submission prevented.');
        return;
      }

      let isValid = true;

      if (!nameInput?.value.trim()) {
        isValid = false;
        nameInput?.classList.add('border-red-500');
        errName?.classList.remove('hidden');
      } else {
        nameInput?.classList.remove('border-red-500');
        errName?.classList.add('hidden');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput?.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailInput?.classList.add('border-red-500');
        errEmail?.classList.remove('hidden');
      } else {
        emailInput?.classList.remove('border-red-500');
        errEmail?.classList.add('hidden');
      }

      if (!subjectInput?.value.trim()) {
        isValid = false;
        subjectInput?.classList.add('border-red-500');
        errSubject?.classList.remove('hidden');
      } else {
        subjectInput?.classList.remove('border-red-500');
        errSubject?.classList.add('hidden');
      }

      if (!messageInput?.value.trim() || messageInput.value.trim().length < 10) {
        isValid = false;
        messageInput?.classList.add('border-red-500');
        errMessage?.classList.remove('hidden');
      } else {
        messageInput?.classList.remove('border-red-500');
        errMessage?.classList.add('hidden');
      }

      if (!isValid) {
        if (formFeedback) {
          formFeedback.innerHTML = `
            <div class="p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-xs flex items-center gap-2 font-medium">
              <i data-lucide="alert-circle" class="w-4 h-4 shrink-0"></i>
              <span>Please correct the highlighted fields before submitting.</span>
            </div>
          `;
          formFeedback.classList.remove('hidden');
          createIcons({ icons: { AlertCircle } });
        }
        return;
      }

      if (submitBtn && submitText) {
        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';
      }
      if (formFeedback) {
        formFeedback.classList.add('hidden');
      }

      const endpoint = contact?.formSubmitEndpoint || `https://formsubmit.co/ajax/${primaryEmail}`;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            _replyto: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            _subject: `New Portfolio Contact — ${subjectInput.value.trim()}`,
            message: messageInput.value.trim(),
          }),
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
          contactForm.reset();

          if (submitBtn && submitText) {
            submitBtn.disabled = false;
            submitText.textContent = 'Message Sent!';
            setTimeout(() => {
              submitText.textContent = 'Send Message';
            }, 5000);
          }

          if (formFeedback) {
            formFeedback.innerHTML = `
              <div class="p-4 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-xs space-y-2">
                <div class="flex items-center gap-2 font-semibold">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                  <span>Your message has been sent successfully.</span>
                </div>
                <p class="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                  Thank you for reaching out! I will respond to your email as soon as possible.
                </p>
              </div>
            `;
            formFeedback.classList.remove('hidden');
            createIcons({ icons: { CheckCircle2 } });
          }
        } else {
          throw new Error(data.message || 'Form submission failed.');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);

        if (submitBtn && submitText) {
          submitBtn.disabled = false;
          submitText.textContent = 'Failed — Try Again';
        }

        if (formFeedback) {
          formFeedback.innerHTML = `
            <div class="p-4 rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 text-xs space-y-2">
              <div class="flex items-center gap-2 font-semibold">
                <i data-lucide="alert-circle" class="w-4 h-4 text-red-600 dark:text-red-400"></i>
                <span>Something went wrong while sending your message. Please try again or contact me directly via email.</span>
              </div>
              <p class="text-[11px]">
                Direct fallback email:
                <a href="mailto:${escapeHtml(primaryEmail)}?subject=${encodeURIComponent(subjectInput?.value.trim() || 'Portfolio Inquiry')}" class="underline font-bold hover:text-red-700 dark:hover:text-red-200">
                  ${escapeHtml(primaryEmail)}
                </a>
              </p>
            </div>
          `;
          formFeedback.classList.remove('hidden');
          createIcons({ icons: { AlertCircle } });
        }
      }
    });
  }

  // ============================================================================
  // 7. FOOTER HYDRATION
  // ============================================================================
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  const footerSocialContainer = document.getElementById('footer-social-links');
  if (footerSocialContainer) {
    footerSocialContainer.innerHTML = `
      <a
        href="mailto:${escapeHtml(primaryEmail)}"
        class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-ring inline-flex items-center gap-1.5 py-1"
        aria-label="Email ${escapeHtml(primaryEmail)}"
      >
        <i data-lucide="mail" class="w-3.5 h-3.5"></i>
        <span>${escapeHtml(primaryEmail)}</span>
      </a>
    `;
  }

  // ============================================================================
  // 8. RENDER DYNAMIC DATA-DRIVEN MODULES
  // ============================================================================
  renderProjects(projects);
  initCertificates(certificates);
  initNavigation(portfolioData);

  // Initialize Lucide icons
  createIcons({
    icons: {
      ArrowUpRight,
      Github,
      Linkedin,
      Instagram,
      Mail,
      ExternalLink,
      Download,
      Menu,
      X,
      Sun,
      Moon,
      FileText,
      CheckCircle2,
      Code2,
      Terminal,
      Layers,
      Cpu,
      Database,
      Sparkles,
      MapPin,
      Calendar,
      ChevronRight,
      ChevronLeft,
      Send,
      Check,
      AlertCircle,
      Loader2,
    },
  });

  // Initialize IntersectionObserver animations & scrollspy
  initAnimations();
});
