/**
 * Slow project teasers and shared cover navigation.
 */
(() => {
    const REDUCED_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const links = document.querySelectorAll('a.proj-media[href*="project-view.html"]');

    links.forEach(link => {
        const base = link.querySelector('img');
        if (!base) return;

        const sources = (link.dataset.previewImages || '').split('|').filter(Boolean);
        const frames = [];
        let activeFrame = 0;
        let sourceIndex = 0;
        let delayTimer = 0;
        let cycleTimer = 0;
        let warmed = false;

        if (sources.length && !REDUCED_MOTION) {
            for (let index = 0; index < 2; index += 1) {
                const frame = document.createElement('img');
                frame.className = 'proj-preview-frame';
                frame.alt = '';
                frame.setAttribute('aria-hidden', 'true');
                frame.decoding = 'async';
                link.append(frame);
                frames.push(frame);
            }

            const warmImages = () => {
                if (warmed) return;
                warmed = true;
                sources.forEach(source => {
                    const preload = new Image();
                    preload.src = source;
                });
            };

            const showNext = () => {
                const nextFrame = activeFrame === 0 ? 1 : 0;
                const frame = frames[nextFrame];
                frame.onload = () => {
                    frames[activeFrame].classList.remove('is-visible');
                    frame.classList.add('is-visible');
                    activeFrame = nextFrame;
                };
                frame.src = sources[sourceIndex];
                sourceIndex = (sourceIndex + 1) % sources.length;
            };

            const start = () => {
                warmImages();
                clearTimeout(delayTimer);
                clearInterval(cycleTimer);
                delayTimer = window.setTimeout(() => {
                    showNext();
                    cycleTimer = window.setInterval(showNext, 1900);
                }, 520);
            };

            const stop = () => {
                clearTimeout(delayTimer);
                clearInterval(cycleTimer);
                frames.forEach(frame => frame.classList.remove('is-visible'));
                sourceIndex = 0;
            };

            link.addEventListener('pointerenter', start);
            link.addEventListener('pointerleave', stop);
            link.addEventListener('focus', start);
            link.addEventListener('blur', stop);
        }

        const prepareCoverTransition = () => {
            frames.forEach(frame => frame.classList.remove('is-visible'));
            base.style.viewTransitionName = 'project-cover';
            try { sessionStorage.setItem('jui_project_transition', '1'); } catch {}
        };
        link.addEventListener('click', prepareCoverTransition);
        const card = link.closest('.proj-card');
        card?.querySelectorAll(`a.file-details-link[href="${link.getAttribute('href')}"]`).forEach(action => {
            action.addEventListener('click', prepareCoverTransition);
        });
    });
})();
