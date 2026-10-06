/**
 * Projects Module
 * Handles rendering the EXACTLY 3 projects from portfolioData.
 * Follows strict rules:
 * - Exactly 3 projects rendered.
 * - Handles empty fields gracefully with deliberate, intentional editorial placeholders.
 * - Never renders broken images, undefined text, or dead links.
 */

// Helper function to safely escape HTML text
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

      const displayTitle = hasTitle ? escapeHtml(project.title) : `Project ${num} — Architecture Pending`;
      const displayCategory = hasCategory ? escapeHtml(project.category) : 'Software Development';
      const displayYear = hasYear ? escapeHtml(project.year) : 'In Development';
      const displayDesc = hasDesc
        ? escapeHtml(project.description)
        : 'Detailed technical specification, architectural decisions, and production build metrics will be documented here once the initial release cycle concludes.';

      // Image or deliberate technical placeholder
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
        : `<div class="w-full h-full flex flex-col items-center justify-center p-8 bg-[#EFEFEc] dark:bg-[#141414] text-center select-none relative overflow-hidden group-hover:bg-[#EAEAEA] dark:group-hover:bg-[#1A1A1A] transition-colors duration-400">
            <!-- Subtle architectural grid backdrop -->
            <div class="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div class="relative z-10 flex flex-col items-center">
              <span class="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-widest uppercase mb-2">
                [PROJECT ${num} // PREVIEW]
              </span>
              <p class="font-mono text-sm tracking-wide text-neutral-800 dark:text-neutral-200 uppercase font-medium">
                Image To Be Added
              </p>
              <p class="text-xs text-neutral-500 dark:text-neutral-500 mt-2 max-w-xs">
                Asset placeholder reserved for production screenshot (800×480px WebP)
              </p>
            </div>
           </div>`;

      // Tech tags markup
      const techTags = hasTech
        ? project.technologies.map(t => `<span class="inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#171717] text-neutral-700 dark:text-neutral-300">${escapeHtml(t)}</span>`).join('')
        : `<span class="inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded border border-dashed border-[#DADADA] dark:border-[#262626] text-neutral-500 dark:text-neutral-500">Tech Stack Pending</span>`;

      // Action links markup
      let actionButtons = '';
      if (hasLiveUrl) {
        actionButtons += `
          <a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring">
            <span>Live Demonstration</span>
            <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        `;
      }
      if (hasGithubUrl) {
        actionButtons += `
          <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-ring">
            <span>Source Code</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </a>
        `;
      }
      if (!hasLiveUrl && !hasGithubUrl) {
        actionButtons = `
          <span class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-600 cursor-default select-none">
            <span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600"></span>
            Repository & Preview Pending Release
          </span>
        `;
      }

      return `
        <article class="reveal-item group relative rounded-lg border border-[#DADADA] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#111111] overflow-hidden transition-all duration-400 hover:border-neutral-400 dark:hover:border-neutral-700">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <!-- Project Preview Column (7 cols on desktop) -->
            <div class="lg:col-span-7 relative aspect-[16/10] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#DADADA] dark:border-[#262626] bg-[#F7F7F5] dark:bg-[#0A0A0A]">
              ${imageMarkup}
              <div class="absolute top-4 left-4 font-mono text-xs px-2.5 py-1 rounded bg-[#FFFFFF]/90 dark:bg-[#111111]/90 backdrop-blur border border-[#DADADA] dark:border-[#262626] text-neutral-700 dark:text-neutral-300 font-semibold tracking-wider">
                PRJ ${num}
              </div>
            </div>

            <!-- Project Information Column (5 cols on desktop) -->
            <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <!-- Metadata Eyebrow -->
                <div class="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-3 uppercase tracking-wider">
                  <span>${displayCategory}</span>
                  <span>${displayYear}</span>
                </div>

                <!-- Title -->
                <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3 transition-colors">
                  ${displayTitle}
                </h3>

                <!-- Description -->
                <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  ${displayDesc}
                </p>

                <!-- Technology Badges -->
                <div class="flex flex-wrap gap-2 mb-8">
                  ${techTags}
                </div>
              </div>

              <!-- Action Links -->
              <div class="pt-4 border-t border-[#DADADA] dark:border-[#262626] flex items-center gap-6">
                ${actionButtons}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}
