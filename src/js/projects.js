/**
 * Projects Module
 * Handles rendering the EXACTLY 3 projects in clean, distinct horizontal container blocks
 * inspired by mikewilcockdesign.com, with interactive detail modal support ("DETAIL SELENGKAPNYA ↗").
 * Follows strict rules:
 * - Exactly 3 projects rendered (PRJ 01, PRJ 02, PRJ 03).
 * - Handles empty fields gracefully with deliberate, elegant placeholders.
 * - Never renders broken images, undefined text, or dead links.
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

export function renderProjects(projects = [], containerId = 'projects-container') {
  const container = document.getElementById(containerId);
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('project-modal-close-btn');
  const modalContent = document.getElementById('project-modal-content');

  if (!container) return;

  // Strict requirement: Exactly 3 projects
  const normalizedProjects = projects.slice(0, 3);
  while (normalizedProjects.length < 3) {
    normalizedProjects.push({
      id: normalizedProjects.length + 1,
      title: '',
      category: '',
      description: '',
      year: '',
      image: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
    });
  }

  // Render distinct horizontal container blocks
  container.innerHTML = normalizedProjects
    .map((project, index) => {
      const num = String(index + 1).padStart(2, '0');
      const hasTitle = Boolean(project.title && project.title.trim());
      const hasDesc = Boolean(project.description && project.description.trim());
      const hasCategory = Boolean(project.category && project.category.trim());
      const hasYear = Boolean(project.year && project.year.trim());
      const hasImage = Boolean(project.image && project.image.trim());
      const hasTech = Array.isArray(project.technologies) && project.technologies.length > 0;

      const displayTitle = hasTitle ? escapeHtml(project.title) : `Project ${num} — Development Pending`;
      const displayCategory = hasCategory ? escapeHtml(project.category) : 'SOFTWARE DEVELOPMENT';
      const displayYear = hasYear ? escapeHtml(project.year) : 'IN DEVELOPMENT';
      const displayDesc = hasDesc
        ? escapeHtml(project.description)
        : 'Ringkasan arsitektur teknis dan dokumentasi modul proyek akan ditampilkan di sini setelah rilis publik.';

      return `
        <article class="reveal-item group relative rounded-xl border border-zinc-200 dark:border-white/[0.06] hover:border-[#FF3366]/40 dark:hover:border-[#FF3366]/50 bg-white dark:bg-[#121216] p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 w-full">
            <!-- Thumbnail or Monospace PRJ Badge -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center">
              ${hasImage 
                ? `<img src="${escapeHtml(project.image)}" alt="${displayTitle}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />` 
                : `<span class="text-xs font-mono font-bold text-[#FF3366]">PRJ ${num}</span>`}
            </div>

            <!-- Content Area -->
            <div class="space-y-1.5 flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span class="font-bold text-[#FF3366] tracking-wider uppercase">${displayCategory}</span>
                <span class="text-zinc-400 dark:text-zinc-600">•</span>
                <span class="px-2 py-0.5 rounded border border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 font-medium text-[11px] uppercase tracking-wide">${displayYear}</span>
              </div>
              <h3 class="text-base sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-[#EDEDED] group-hover:text-[#FF3366] transition-colors truncate">
                ${displayTitle}
              </h3>
              <p class="text-xs sm:text-sm text-zinc-600 dark:text-[#888892] line-clamp-2 max-w-2xl leading-relaxed">
                ${displayDesc}
              </p>
            </div>
          </div>

          <!-- Action Button: High Visibility Trigger -->
          <div class="shrink-0 w-full md:w-auto flex items-center justify-end pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-white/[0.06]">
            <button
              type="button"
              class="project-detail-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF3366] hover:bg-[#E02456] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#FF3366]/20 hover:shadow-[#FF3366]/35 focus-ring"
              data-project-id="${index}"
              aria-haspopup="dialog"
              aria-label="Detail selengkapnya untuk ${displayTitle}"
            >
              <span>DETAIL SELENGKAPNYA</span>
              <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17"></path></svg>
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  // Project Modal Handler
  let lastFocusedElement = null;

  const openProjectModal = (projIndex) => {
    const proj = normalizedProjects[projIndex];
    if (!proj || !modal || !modalContent) return;

    lastFocusedElement = document.activeElement;

    const num = String(projIndex + 1).padStart(2, '0');
    const hasTitle = Boolean(proj.title && proj.title.trim());
    const hasDesc = Boolean(proj.description && proj.description.trim());
    const displayCategory = proj.category?.trim() || 'SOFTWARE ARCHITECTURE';
    const displayYear = proj.year?.trim() || 'IN DEVELOPMENT';
    const hasImage = Boolean(proj.image && proj.image.trim());
    const hasTech = Array.isArray(proj.technologies) && proj.technologies.length > 0;
    const hasLiveUrl = Boolean(proj.liveUrl && proj.liveUrl.trim());
    const hasGithubUrl = Boolean(proj.githubUrl && proj.githubUrl.trim());

    const displayTitle = hasTitle ? escapeHtml(proj.title) : `Project ${num} — Development In Progress`;
    const displayDesc = hasDesc
      ? escapeHtml(proj.description)
      : 'Dokumentasi rinci proyek, skema arsitektur, dan ringkasan implementasi teknis akan dirilis setelah tahap pengujian selesai.';

    const largeImageMarkup = hasImage
      ? `<img
          src="${escapeHtml(proj.image)}"
          alt="${displayTitle} full view"
          class="w-full max-h-[50vh] object-cover rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-100 dark:bg-[#0A0A0C]"
         />`
      : `<div class="w-full aspect-[16/9] max-h-[45vh] flex flex-col items-center justify-center p-8 bg-zinc-100 dark:bg-white/[0.02] rounded-xl border border-dashed border-zinc-300 dark:border-white/10 text-center select-none">
          <span class="text-xs font-mono font-bold text-[#FF3366] uppercase tracking-wider mb-2">
            [PROJECT ${num} // PREVIEW]
          </span>
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
            IMAGE TO BE ADDED
          </p>
         </div>`;

    const techTagsMarkup = hasTech
      ? proj.technologies.map(t => `<span class="inline-flex items-center px-3 py-1 text-xs font-mono font-medium rounded-md border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200">${escapeHtml(t)}</span>`).join(' ')
      : `<span class="text-xs font-mono text-zinc-500 dark:text-zinc-400">Tech Stack Documentation Pending</span>`;

    let actionsMarkup = '';
    if (hasLiveUrl) {
      actionsMarkup += `
        <a
          href="${escapeHtml(proj.liveUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF3366] hover:bg-[#E02456] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors shadow-sm focus-ring"
        >
          <span>Live Demonstration</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      `;
    }
    if (hasGithubUrl) {
      actionsMarkup += `
        <a
          href="${escapeHtml(proj.githubUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-semibold uppercase tracking-wider hover:border-[#FF3366] transition-colors focus-ring"
        >
          <span>Source Code</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        </a>
      `;
    }
    if (!hasLiveUrl && !hasGithubUrl) {
      actionsMarkup = `<span class="text-xs font-mono text-zinc-500 dark:text-zinc-400">Source code &amp; live preview link pending release</span>`;
    }

    modalContent.innerHTML = `
      <div class="space-y-6">
        <div class="relative w-full overflow-hidden flex items-center justify-center">
          ${largeImageMarkup}
        </div>

        <div>
          <div class="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
            <span class="text-[#FF3366] font-bold">${escapeHtml(displayCategory)}</span>
            <span>${escapeHtml(displayYear)}</span>
          </div>

          <h3 id="project-modal-title" class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
            ${displayTitle}
          </h3>

          <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
            ${displayDesc}
          </p>

          <div class="mb-6">
            <span class="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Technologies &amp; Architecture</span>
            <div class="flex flex-wrap gap-2">
              ${techTagsMarkup}
            </div>
          </div>

          <div class="pt-5 border-t border-zinc-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            ${actionsMarkup}
            <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              PRJ ID: // 0${projIndex + 1}
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

  const closeProjectModal = () => {
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
    const trigger = e.target.closest('.project-detail-btn');
    if (trigger) {
      const index = parseInt(trigger.getAttribute('data-project-id'), 10);
      if (!isNaN(index)) {
        openProjectModal(index);
      }
    }
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalBackdrop?.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeProjectModal();
      }
    }
  });
}
