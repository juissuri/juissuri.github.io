/**
 * JUI PORTFOLIO - LIGHTBOX
 * Fullscreen image viewer with shared-element morph (View Transitions API).
 * Attach to any <img> via data-lightbox attribute.
 */
(function () {
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let overlay = null;
    let imgEl = null;
    let captionEl = null;
    let isOpen = false;

    function build() {
        overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', 'Image viewer');
        overlay.innerHTML = `
            <button class="lightbox-close" type="button" aria-label="Close">
                <span></span><span></span>
            </button>
            <figure class="lightbox-figure">
                <img class="lightbox-img" src="" alt="">
                <figcaption class="lightbox-caption"></figcaption>
            </figure>
            <div class="lightbox-hint">[ CLICK ANYWHERE TO CLOSE ]</div>
        `;
        document.body.appendChild(overlay);
        imgEl = overlay.querySelector('.lightbox-img');
        captionEl = overlay.querySelector('.lightbox-caption');

        overlay.addEventListener('click', (e) => {
            if (!e.target.closest('.lightbox-img')) close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) close();
        });
    }

    function open(src, alt, originImg) {
        if (!overlay) build();
        if (window.__lenis) window.__lenis.stop();
        document.body.style.overflow = 'hidden';

        imgEl.classList.remove('loaded');
        imgEl.onload = () => imgEl.classList.add('loaded');
        imgEl.src = src;
        imgEl.alt = alt || '';
        captionEl.textContent = (alt || '').toUpperCase();

        const canMorph = document.startViewTransition && originImg && !REDUCED_MOTION;
        if (canMorph) {
            originImg.style.viewTransitionName = 'project-media';
            imgEl.style.viewTransitionName = 'project-media';

            const transition = document.startViewTransition(() => {
                overlay.classList.add('open');
            });
            transition.finished.finally(() => {
                originImg.style.viewTransitionName = '';
                imgEl.style.viewTransitionName = '';
            });
        } else {
            overlay.classList.add('open');
        }

        isOpen = true;
    }

    function close() {
        overlay.classList.remove('open');
        isOpen = false;
        document.body.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
    }

    function init() {
        document.querySelectorAll('img[data-lightbox]').forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                open(img.currentSrc || img.src, img.alt, img);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
