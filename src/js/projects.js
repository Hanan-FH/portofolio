/**
 * Projects Module
 * Handles rendering the EXACTLY 3 projects in a compact, minimized vertical stack ("scroll bawah")
 * with interactive detail modal support ("fitur click untuk lebih lanjut").
 * Follows strict rules:
 * - Exactly 3 projects rendered.
 * - Compact, minimal card layout.
 * - Handles empty fields gracefully with deliberate, clean placeholders.
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

  // Render compact, minimized project stack cards
  container.innerHTML = normalizedProjects
    .map((project, index) => {
      const num = String(index + 1).padStart(2, '0');
      const hasTitle = Boolean(project.title && project.title.trim());
      const hasDesc = Boolean(project.description && project.description.trim());
      const hasCategory = Boolean(project.category && project.category.trim());
      const hasYear = Boolean(project.year && project.year.trim());
      const hasImage = Boolean(project.image && project.image.trim());
      const hasTech = Array.isArray(project.technologies) && project.technologies.length > 0;
      const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim());
      const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim());

      const displayTitle = hasTitle ? escapeHtml(project.title) : `Project ${num} — Development Pending`;
      const displayCategory = hasCategory ? escapeHtml(project.category) : 'Software Development';
      const displayYear = hasYear ? escapeHtml(project.year) : 'In Development';
      const displayDesc = hasDesc
        ? escapeHtml(project.description)
        : 'Ringkasan arsitektur teknis dan dokumentasi proyek akan ditampilkan di sini.';

      return `
        <article class="reveal-item group relative rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-[#1E080F] p-4 sm:p-5 transition-all duration-300 hover:border-rose-500 dark:hover:border-rose-400 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div class="flex items-start sm:items-center gap-4 flex-1">
            <div class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center">
              ${hasImage ? `<img src="${escapeHtml(project.image)}" alt="${displayTitle}" class="w-full h-full object-cover" />` : `<span class="text-xs font-bold font-mono text-rose-600 dark:text-rose-400">PRJ ${num}</span>`}
            </div>

            <div class="space-y-1">
              <div class="flex items-center gap-2 text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                <span>${displayCategory}</span>
                <span>•</span>
                <span>${displayYear}</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                ${displayTitle}
              </h3>
              <p class="text-xs text-zinc-600 dark:text-rose-200/80 line-clamp-1 max-w-xl">
                ${displayDesc}
              </p>
            </div>
          </div>

          <div class="shrink-0 flex items-center gap-3 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-rose-100 dark:border-rose-900/40">
            <button
              type="button"
              class="project-detail-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors focus-ring shadow-sm"
              data-project-id="${index}"
              aria-haspopup="dialog"
            >
              <span>Detail Selengkapnya</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
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
    const hasCategory = Boolean(proj.category && proj.category.trim());
    const hasYear = Boolean(proj.year && proj.year.trim());
    const hasImage = Boolean(proj.image && proj.image.trim());
    const hasTech = Array.isArray(proj.technologies) && proj.technologies.length > 0;
    const hasLiveUrl = Boolean(proj.liveUrl && proj.liveUrl.trim());
    const hasGithubUrl = Boolean(proj.githubUrl && proj.githubUrl.trim());

    const displayTitle = hasTitle ? escapeHtml(proj.title) : `Project ${num} — Unassigned`;
    const displayCategory = hasCategory ? escapeHtml(proj.category) : 'Software Architecture';
    const displayYear = hasYear ? escapeHtml(proj.year) : 'Year Pending';
    const displayDesc = hasDesc
      ? escapeHtml(proj.description)
      : 'Dokumentasi rinci proyek, arsitektur, dan penjelasan teknis akan ditampilkan di sini setelah rilis publik.';

    const largeImageMarkup = hasImage
      ? `<img
          src="${escapeHtml(proj.image)}"
          alt="${displayTitle} full view"
          class="w-full max-h-[50vh] object-cover rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-[#140509]"
         />`
      : `<div class="w-full aspect-[16/9] max-h-[45vh] flex flex-col items-center justify-center p-8 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-dashed border-rose-200 dark:border-rose-900/50 text-center select-none">
          <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider mb-2">
            Project ${num} Overview
          </span>
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Gambar Screenshot Akan Ditambahkan
          </p>
         </div>`;

    const techTagsMarkup = hasTech
      ? proj.technologies.map(t => `<span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200">${escapeHtml(t)}</span>`).join(' ')
      : `<span class="text-xs text-rose-400">Tech Stack Pending</span>`;

    let actionsMarkup = '';
    if (hasLiveUrl) {
      actionsMarkup += `
        <a
          href="${escapeHtml(proj.liveUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm focus-ring"
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
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 text-xs font-semibold uppercase tracking-wider hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors focus-ring"
        >
          <span>Source Code</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        </a>
      `;
    }
    if (!hasLiveUrl && !hasGithubUrl) {
      actionsMarkup = `<span class="text-xs text-rose-400 font-medium">Repository &amp; Live Preview Belum Dirilis</span>`;
    }

    modalContent.innerHTML = `
      <div class="space-y-6">
        <div class="relative w-full overflow-hidden flex items-center justify-center">
          ${largeImageMarkup}
        </div>

        <div>
          <div class="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 mb-2 uppercase tracking-wider font-medium">
            <span>Kategori: ${displayCategory}</span>
            <span>Tahun: ${displayYear}</span>
          </div>

          <h3 id="project-modal-title" class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            ${displayTitle}
          </h3>

          <p class="text-sm text-zinc-600 dark:text-rose-100/90 leading-relaxed mb-6">
            ${displayDesc}
          </p>

          <div class="mb-6">
            <span class="block text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">Teknologi &amp; Tools</span>
            <div class="flex flex-wrap gap-2">
              ${techTagsMarkup}
            </div>
          </div>

          <div class="pt-4 border-t border-rose-200 dark:border-rose-900/60 flex flex-wrap items-center justify-between gap-4">
            ${actionsMarkup}
            <span class="text-xs text-rose-500/80 font-mono">
              Project ID: PRJ-${num}
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
