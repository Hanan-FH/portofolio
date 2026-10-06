/**
 * Projects Module
 * Handles rendering the EXACTLY 3 projects in a vertical stack ("scroll bawah")
 * with interactive detail modal support ("fitur click untuk lebih lanjut").
 * Follows strict rules:
 * - Exactly 3 projects rendered.
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

  // Render vertical project stack cards
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
        : 'Detailed technical overview and project documentation will be displayed here once initial release concludes.';

      const imageMarkup = hasImage
        ? `<img
            src="${escapeHtml(project.image)}"
            alt="${displayTitle} preview screenshot"
            loading="lazy"
            decoding="async"
            width="800"
            height="480"
            class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
           />`
        : `<div class="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-100 dark:bg-[#110E14] text-center select-none relative overflow-hidden transition-colors duration-300">
            <div class="relative z-10 flex flex-col items-center">
              <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider mb-2">
                Project ${num} Preview
              </span>
              <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Screenshot Pending
              </p>
            </div>
           </div>`;

      const techTags = hasTech
        ? project.technologies.map(t => `<span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">${escapeHtml(t)}</span>`).join('')
        : `<span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">Tech Stack Pending</span>`;

      return `
        <article class="reveal-item group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16141A] overflow-hidden transition-all duration-300 hover:border-rose-500 dark:hover:border-rose-400 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <!-- Project Preview Column -->
            <div class="lg:col-span-7 relative aspect-[16/10] overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0D0D11]">
              ${imageMarkup}
              <div class="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-md bg-white/90 dark:bg-[#16141A]/90 backdrop-blur border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                Project ${num}
              </div>
            </div>

            <!-- Project Information Column -->
            <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-medium uppercase tracking-wider">
                  <span>${displayCategory}</span>
                  <span>${displayYear}</span>
                </div>

                <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                  ${displayTitle}
                </h3>

                <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 line-clamp-3">
                  ${displayDesc}
                </p>

                <div class="flex flex-wrap gap-2 mb-8">
                  ${techTags}
                </div>
              </div>

              <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  class="project-detail-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors focus-ring shadow-sm"
                  data-project-id="${index}"
                  aria-haspopup="dialog"
                >
                  <span>Project Details</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>

                <div class="flex items-center gap-3">
                  ${hasLiveUrl ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline">Live Preview &rarr;</a>` : ''}
                  ${hasGithubUrl ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">Code &rarr;</a>` : ''}
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // 2. Project Modal Handler ("fitur click untuk lebih lanjut")
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
      : 'Comprehensive engineering details, architecture diagrams, and release notes will be published when available.';

    const largeImageMarkup = hasImage
      ? `<img
          src="${escapeHtml(proj.image)}"
          alt="${displayTitle} full view"
          class="w-full max-h-[50vh] object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D11]"
         />`
      : `<div class="w-full aspect-[16/9] max-h-[45vh] flex flex-col items-center justify-center p-8 bg-zinc-100 dark:bg-[#110E14] rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center select-none">
          <span class="text-xs text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider mb-2">
            Project ${num} Overview
          </span>
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Screenshot To Be Added
          </p>
         </div>`;

    const techTagsMarkup = hasTech
      ? proj.technologies.map(t => `<span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">${escapeHtml(t)}</span>`).join(' ')
      : `<span class="text-xs text-zinc-500">Tech Stack Pending</span>`;

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
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-ring"
        >
          <span>Source Code</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        </a>
      `;
    }
    if (!hasLiveUrl && !hasGithubUrl) {
      actionsMarkup = `<span class="text-xs text-zinc-500 font-medium">Repository &amp; Live Preview Pending Release</span>`;
    }

    modalContent.innerHTML = `
      <div class="space-y-6">
        <div class="relative w-full overflow-hidden flex items-center justify-center">
          ${largeImageMarkup}
        </div>

        <div>
          <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider font-medium">
            <span>Category: ${displayCategory}</span>
            <span>Year: ${displayYear}</span>
          </div>

          <h3 id="project-modal-title" class="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            ${displayTitle}
          </h3>

          <p class="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
            ${displayDesc}
          </p>

          <div class="mb-6">
            <span class="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Technologies &amp; Architecture</span>
            <div class="flex flex-wrap gap-2">
              ${techTagsMarkup}
            </div>
          </div>

          <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            ${actionsMarkup}
            <span class="text-xs text-zinc-400 dark:text-zinc-500">
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
