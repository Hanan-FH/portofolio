/**
 * Certificates Module
 * Handles rendering the EXACTLY 10 certificates and managing the accessible lightbox modal.
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

  // 1. Render certificates grid (responsive 2-column / 3-column desktop, 1-column mobile)
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

        // Thumbnail preview or deliberate placeholder
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
          : `<div class="w-full h-full flex flex-col items-center justify-center p-4 bg-[#EFEFEc] dark:bg-[#141414] text-center select-none border-b border-[#DADADA] dark:border-[#262626]">
              <span class="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1">
                CERT ${num}
              </span>
              <span class="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase">
                Placeholder Preview
              </span>
             </div>`;

        return `
          <div class="reveal-item">
            <button
              type="button"
              class="cert-trigger group w-full text-left rounded-lg border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-sm focus-ring flex flex-col justify-between h-full"
              data-cert-id="${index}"
              aria-haspopup="dialog"
              aria-label="View details for Certificate ${num}: ${displayTitle}"
            >
              <!-- Thumbnail Container (aspect 16:10) -->
              <div class="w-full aspect-[16/10] overflow-hidden bg-[#F7F7F5] dark:bg-[#0A0A0A] relative">
                ${thumbMarkup}
                <div class="absolute top-2.5 left-2.5 font-mono text-[10px] px-2 py-0.5 rounded bg-[#FFFFFF]/90 dark:bg-[#111111]/90 backdrop-blur border border-[#DADADA] dark:border-[#262626] text-neutral-700 dark:text-neutral-300 font-semibold">
                  #${num}
                </div>
              </div>

              <!-- Metadata content -->
              <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between w-full">
                <div>
                  <div class="flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-500 uppercase tracking-wider mb-2">
                    <span class="truncate pr-2">${displayIssuer}</span>
                    <span class="shrink-0">${displayYear}</span>
                  </div>
                  <h4 class="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                    ${displayTitle}
                  </h4>
                </div>

                <div class="pt-3 border-t border-[#DADADA]/60 dark:border-[#262626]/60 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span class="inline-flex items-center gap-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                    <span>Inspect</span>
                    <svg class="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  </span>
                  ${hasVerification ? `<span class="text-emerald-600 dark:text-emerald-400 text-[10px] uppercase tracking-wide">Verified</span>` : `<span class="text-neutral-400 dark:text-neutral-600 text-[10px] uppercase tracking-wide">Pending</span>`}
                </div>
              </div>
            </button>
          </div>
        `;
      })
      .join('');
  }

  // 2. Lightbox Modal Logic
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

    const displayTitle = hasTitle ? escapeHtml(cert.title) : `Certificate ${num} — Unassigned`;
    const displayIssuer = hasIssuer ? escapeHtml(cert.issuer) : 'Issuing Organization Pending';
    const displayYear = hasYear ? escapeHtml(cert.year) : 'Year Pending';

    const largeImageMarkup = hasImage
      ? `<img
          src="${escapeHtml(cert.image)}"
          alt="${displayTitle} full view"
          class="w-full max-h-[55vh] object-contain rounded border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#121212]"
         />`
      : `<div class="w-full aspect-[16/10] max-h-[50vh] flex flex-col items-center justify-center p-8 bg-[#EFEFEc] dark:bg-[#141414] rounded border border-dashed border-[#DADADA] dark:border-[#262626] text-center select-none">
          <span class="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest mb-2">
            [CERTIFICATE ${num} // OFFICIAL RECORD]
          </span>
          <p class="font-mono text-sm tracking-wide text-neutral-800 dark:text-neutral-200 uppercase font-medium">
            Certificate Image To Be Added
          </p>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-sm">
            High-resolution WebP scan or credential document will be displayed here once verified.
          </p>
         </div>`;

    const verificationMarkup = hasVerification
      ? `<a
          href="${escapeHtml(cert.verificationUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors focus-ring"
         >
          <span>Verify Credential</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
         </a>`
      : `<span class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 rounded border border-[#DADADA] dark:border-[#262626] bg-[#F7F7F5] dark:bg-[#171717] cursor-default">
          <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600"></span>
          Credential Verification Pending
         </span>`;

    modalContent.innerHTML = `
      <div class="space-y-6">
        <div class="relative w-full overflow-hidden flex items-center justify-center">
          ${largeImageMarkup}
        </div>

        <div class="border-t border-[#DADADA] dark:border-[#262626] pt-5">
          <div class="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-2 uppercase tracking-wider">
            <span>Issuer: ${displayIssuer}</span>
            <span>Issued: ${displayYear}</span>
          </div>

          <h3 id="modal-title" class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            ${displayTitle}
          </h3>

          <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
            ${verificationMarkup}
            <span class="text-xs font-mono text-neutral-500 dark:text-neutral-500">
              Record ID: CERT-${num}
            </span>
          </div>
        </div>
      </div>
    `;

    // Show modal & lock body scroll
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button inside modal
    setTimeout(() => {
      modalCloseBtn?.focus();
    }, 50);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to triggering card
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  // Attach event delegation for certificate triggers
  container?.addEventListener('click', (e) => {
    const trigger = e.target.closest('.cert-trigger');
    if (trigger) {
      const index = parseInt(trigger.getAttribute('data-cert-id'), 10);
      if (!isNaN(index)) {
        openModal(index);
      }
    }
  });

  // Modal close listeners
  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // Keyboard support: Escape closes modal & Tab trap
  window.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab') {
        // Simple focus trap inside modal dialog
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
