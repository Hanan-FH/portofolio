/**
 * Certificates Module
 * Handles rendering the EXACTLY 10 certificates in a horizontal scroll carousel ("scroll ke samping")
 * and managing the accessible detail lightbox modal.
 * Follows strict rules:
 * - Exactly 10 certificates (01 to 10).
 * - Handles empty states intentionally without fake issuers or stock graphics.
 * - Accessible modal with ESC key support, focus trap, body scroll locking, and click-outside closure.
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function initCertificates(certificates = [], containerId = 'certificates-container') {
  const container = document.getElementById(containerId);
  const modal = document.getElementById('certificate-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content');

  const scrollLeftBtn = document.getElementById('cert-scroll-left');
  const scrollRightBtn = document.getElementById('cert-scroll-right');

  // Enforce EXACTLY 10 certificates
  const normalizedCerts = certificates.slice(0, 10);
  while (normalizedCerts.length < 10) {
    normalizedCerts.push({
      id: normalizedCerts.length + 1,
      title: '',
      issuer: '',
      year: '',
      image: '',
      verificationUrl: '',
    });
  }

  // 1. Render certificates horizontal scroll cards
  if (container) {
    container.innerHTML = normalizedCerts
      .map((cert, index) => {
        const num = String(index + 1).padStart(2, '0');
        const hasTitle = Boolean(cert.title && cert.title.trim());
        const hasIssuer = Boolean(cert.issuer && cert.issuer.trim());
        const hasYear = Boolean(cert.year && cert.year.trim());
        const hasImage = Boolean(cert.image && cert.image.trim());
        const hasVerification = Boolean(cert.verificationUrl && cert.verificationUrl.trim());

        const displayTitle = hasTitle ? escapeHtml(cert.title) : `Certificate ${num}`;
        const displayIssuer = hasIssuer ? escapeHtml(cert.issuer) : 'Accreditation Pending';
        const displayYear = hasYear ? escapeHtml(cert.year) : '—';

        const thumbMarkup = hasImage
          ? `<img
              src="${escapeHtml(cert.image)}"
              alt="${displayTitle} thumbnail"
              loading="lazy"
              decoding="async"
              width="360"
              height="240"
              class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
             />`
          : `<div class="w-full h-full flex flex-col items-center justify-center p-4 bg-zinc-100 dark:bg-[#110E14] text-center select-none border-b border-zinc-200 dark:border-zinc-800">
              <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider mb-1">
                Cert ${num}
              </span>
              <span class="text-xs text-zinc-500 dark:text-zinc-400">
                Preview Pending
              </span>
             </div>`;

        return `
          <div class="reveal-item w-[260px] sm:w-[300px] shrink-0 snap-start">
            <button
              type="button"
              class="cert-trigger group w-full text-left rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16141A] overflow-hidden transition-all duration-300 hover:border-rose-500 dark:hover:border-rose-400 hover:shadow-lg focus-ring flex flex-col justify-between h-full"
              data-cert-id="${index}"
              aria-haspopup="dialog"
              aria-label="View details for Certificate ${num}: ${displayTitle}"
            >
              <!-- Thumbnail Container (aspect 16:10) -->
              <div class="w-full aspect-[16/10] overflow-hidden bg-zinc-50 dark:bg-[#0D0D11] relative">
                ${thumbMarkup}
                <div class="absolute top-2.5 left-2.5 text-[10px] px-2 py-0.5 rounded-md bg-white/90 dark:bg-[#16141A]/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  #${num}
                </div>
              </div>

              <!-- Metadata content -->
              <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between w-full">
                <div>
                  <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 font-medium">
                    <span class="truncate pr-2">${displayIssuer}</span>
                    <span class="shrink-0">${displayYear}</span>
                  </div>
                  <h4 class="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 mb-2">
                    ${displayTitle}
                  </h4>
                </div>

                <div class="pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span class="inline-flex items-center gap-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    <span>View Details</span>
                    <svg class="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  </span>
                  ${hasVerification ? `<span class="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">Verified</span>` : `<span class="text-zinc-400 dark:text-zinc-500 text-xs">Pending</span>`}
                </div>
              </div>
            </button>
          </div>
        `;
      })
      .join('');
  }

  // 2. Horizontal Scroll Navigation Buttons
  if (container) {
    scrollLeftBtn?.addEventListener('click', () => {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    });
    scrollRightBtn?.addEventListener('click', () => {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // 3. Lightbox Modal Logic
  let lastFocusedElement = null;

  const openModal = (certIndex) => {
    const cert = normalizedCerts[certIndex];
    if (!cert || !modal || !modalContent) return;

    lastFocusedElement = document.activeElement;

    const num = String(certIndex + 1).padStart(2, '0');
    const hasTitle = Boolean(cert.title && cert.title.trim());
    const hasIssuer = Boolean(cert.issuer && cert.issuer.trim());
    const hasYear = Boolean(cert.year && cert.year.trim());
    const hasImage = Boolean(cert.image && cert.image.trim());
    const hasVerification = Boolean(cert.verificationUrl && cert.verificationUrl.trim());

    const displayTitle = hasTitle ? escapeHtml(cert.title) : `Certificate ${num} — Pending`;
    const displayIssuer = hasIssuer ? escapeHtml(cert.issuer) : 'Issuing Organization Pending';
    const displayYear = hasYear ? escapeHtml(cert.year) : 'Year Pending';

    const largeImageMarkup = hasImage
      ? `<img
          src="${escapeHtml(cert.image)}"
          alt="${displayTitle} full view"
          class="w-full max-h-[55vh] object-contain rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D11]"
         />`
      : `<div class="w-full aspect-[16/10] max-h-[50vh] flex flex-col items-center justify-center p-8 bg-zinc-100 dark:bg-[#110E14] rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center select-none">
          <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider mb-2">
            Certificate ${num} Image
          </span>
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Image To Be Added
          </p>
         </div>`;

    const verificationMarkup = hasVerification
      ? `<a
          href="${escapeHtml(cert.verificationUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors focus-ring shadow-sm"
         >
          <span>Verify Credential</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
         </a>`
      : `<span class="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0D0D11] cursor-default font-medium">
          <span class="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
          Verification Pending
         </span>`;

    modalContent.innerHTML = `
      <div class="space-y-6">
        <div class="relative w-full overflow-hidden flex items-center justify-center">
          ${largeImageMarkup}
        </div>

        <div class="border-t border-zinc-200 dark:border-zinc-800 pt-5">
          <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider font-medium">
            <span>Issuer: ${displayIssuer}</span>
            <span>Issued: ${displayYear}</span>
          </div>

          <h3 id="modal-title" class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            ${displayTitle}
          </h3>

          <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
            ${verificationMarkup}
            <span class="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              Credential #${num}
            </span>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      modalCloseBtn?.focus();
    }, 50);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  container?.addEventListener('click', (e) => {
    const trigger = e.target.closest('.cert-trigger');
    if (trigger) {
      const index = parseInt(trigger.getAttribute('data-cert-id'), 10);
      if (!isNaN(index)) {
        openModal(index);
      }
    }
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  });
}
