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
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span class="font-mono text-xs font-medium text-neutral-700 dark:text-neutral-300">${escapeHtml(personal.status)}</span>
    `;
  }

  // Profile Image Container (graceful fallback if image is missing)
  const profileContainer = document.getElementById('hero-profile-container');
  if (profileContainer) {
    if (personal.profileImage && personal.profileImage.trim()) {
      profileContainer.innerHTML = `
        <img
          src="${escapeHtml(personal.profileImage)}"
          alt="Photograph of ${escapeHtml(personal.name || 'Developer')}"
          width="480"
          height="560"
          class="w-full h-full object-cover object-center filter grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-500 rounded-lg border border-[#DADADA] dark:border-[#262626]"
        />
      `;
    } else {
      // Intentional, editorial monogram portrait placeholder
      const initials = (personal.name || 'HF')
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      profileContainer.innerHTML = `
        <div class="w-full aspect-[4/5] max-w-md mx-auto rounded-lg border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#121212] p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div class="relative z-10 flex items-center justify-between font-mono text-xs text-neutral-500">
            <span>[PORTRAIT ANCHOR]</span>
            <span class="text-blue-600 dark:text-blue-400 font-semibold">ASSET PENDING</span>
          </div>

          <div class="relative z-10 my-auto text-center py-10">
            <div class="w-24 h-24 mx-auto mb-5 rounded-full border border-dashed border-[#DADADA] dark:border-[#333333] flex items-center justify-center font-mono text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              ${initials}
            </div>
            <p class="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest mb-1">
              Profile Photo
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-500 max-w-xs mx-auto">
              Place profile image in <code class="font-mono text-[11px] bg-[#EFEFEc] dark:bg-[#1C1C1C] px-1 py-0.5 rounded">src/assets/profile/profile.webp</code>
            </p>
          </div>

          <div class="relative z-10 pt-4 border-t border-[#DADADA] dark:border-[#262626] flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>LOC: ${escapeHtml(personal.location || 'GLOBAL')}</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>
      `;
    }
  }

  // Social Links in Hero (strictly only render if URL exists and is non-empty)
  // Per requirements: Exactly GitHub, LinkedIn (when configured), and Email.
  const heroSocialContainer = document.getElementById('hero-social-links');
  if (heroSocialContainer) {
    const socialItems = [];

    // 1. Personal GitHub Profile (rendered strictly ONCE across the entire site in Hero)
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

    // 2. LinkedIn (rendered strictly when configured, empty until verified)
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

    // 3. Primary Email CTA
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
          class="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring py-1 group"
          aria-label="${escapeHtml(s.ariaLabel)}"
        >
          <i data-lucide="${s.icon}" class="w-4 h-4"></i>
          <span>${escapeHtml(s.label)}</span>
          <i data-lucide="arrow-up-right" class="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
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
        <p class="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
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
        <div class="reveal-item p-6 sm:p-8 rounded-lg border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors flex flex-col justify-between">
          <div>
            <span class="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-4">
              // ${escapeHtml(exp.number)}
            </span>
            <h3 class="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
              ${escapeHtml(exp.title)}
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              ${escapeHtml(exp.description)}
            </p>
          </div>
          <div class="pt-6 mt-6 border-t border-[#DADADA]/60 dark:border-[#262626]/60 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Specialization</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600"></i>
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
        <div class="reveal-item p-6 rounded-lg border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111]">
          <h3 class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-4 pb-2 border-b border-[#DADADA] dark:border-[#262626] flex items-center justify-between">
            <span>${escapeHtml(cat.label)}</span>
            <span class="text-[11px] text-blue-600 dark:text-blue-400">${skills[cat.key].length}</span>
          </h3>
          <div class="flex flex-wrap gap-2">
            ${skills[cat.key]
              .map(
                skill => `
              <span class="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded border border-[#DADADA] dark:border-[#262626] bg-[#F7F7F5] dark:bg-[#171717] text-neutral-800 dark:text-neutral-200">
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
        <div class="reveal-item relative pl-6 sm:pl-8 pb-10 last:pb-0 border-l border-[#DADADA] dark:border-[#262626]">
          <span class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 ring-4 ring-[#F7F7F5] dark:ring-[#0A0A0A]"></span>
          
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span class="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase">
              ${escapeHtml(edu.period)}
            </span>
            ${edu.status ? `<span class="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 px-2 py-0.5 rounded bg-[#EFEFEc] dark:bg-[#171717] border border-[#DADADA] dark:border-[#262626]">${escapeHtml(edu.status)}</span>` : ''}
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            ${escapeHtml(edu.program)}
          </h3>

          <p class="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-3">
            ${escapeHtml(edu.institution)}
          </p>

          <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
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

    // Clear field-level error styling on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      inp?.addEventListener('input', () => {
        inp.classList.remove('border-red-500', 'focus:ring-red-500');
        const errEl = document.getElementById(`err-${inp.id.replace('form-', '').replace('sender-', '')}`);
        if (errEl) errEl.classList.add('hidden');
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Anti-spam check (honeypot field)
      if (honeyInput && honeyInput.value.trim() !== '') {
        console.warn('Bot submission prevented.');
        return;
      }

      let isValid = true;

      // Validate Name
      if (!nameInput?.value.trim()) {
        isValid = false;
        nameInput?.classList.add('border-red-500');
        errName?.classList.remove('hidden');
      } else {
        nameInput?.classList.remove('border-red-500');
        errName?.classList.add('hidden');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput?.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailInput?.classList.add('border-red-500');
        errEmail?.classList.remove('hidden');
      } else {
        emailInput?.classList.remove('border-red-500');
        errEmail?.classList.add('hidden');
      }

      // Validate Subject
      if (!subjectInput?.value.trim()) {
        isValid = false;
        subjectInput?.classList.add('border-red-500');
        errSubject?.classList.remove('hidden');
      } else {
        subjectInput?.classList.remove('border-red-500');
        errSubject?.classList.add('hidden');
      }

      // Validate Message (minimum 10 characters)
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
            <div class="p-3 rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 font-mono text-xs flex items-center gap-2">
              <i data-lucide="alert-circle" class="w-4 h-4 shrink-0"></i>
              <span>Please correct the highlighted fields before submitting.</span>
            </div>
          `;
          formFeedback.classList.remove('hidden');
          createIcons({ icons: { AlertCircle } });
        }
        return;
      }

      // Begin Submitting State (SEND MESSAGE -> SENDING...)
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
          // Success State
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
              <div class="p-4 rounded border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-mono text-xs space-y-2">
                <div class="flex items-center gap-2 font-semibold">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                  <span>Your message has been sent successfully.</span>
                </div>
                <p class="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                  Thank you for reaching out! I will respond to your email as soon as possible.
                </p>
                <div class="p-2 rounded bg-emerald-100/60 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-[10px] text-emerald-900 dark:text-emerald-200">
                  <strong>Notice:</strong> If this is your first form submission via FormSubmit, remember to complete the one-time activation link sent to <span class="underline">${escapeHtml(primaryEmail)}</span> to enable automatic forwarding.
                </div>
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
            <div class="p-4 rounded border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 font-mono text-xs space-y-2">
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
    // Only Email in footer per specification
    footerSocialContainer.innerHTML = `
      <a
        href="mailto:${escapeHtml(primaryEmail)}"
        class="hover:text-neutral-900 dark:hover:text-white transition-colors focus-ring inline-flex items-center gap-1.5 py-1"
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
      Send,
      Check,
      AlertCircle,
      Loader2,
    },
  });

  // Initialize IntersectionObserver animations & scrollspy
  initAnimations();
});
