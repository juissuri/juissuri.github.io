/**
 * Fullscreen project gallery with keyboard, swipe, counter and image zoom.
 */
(() => {
    const REDUCED_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let overlay, image, caption, counter, previousButton, nextButton;
    let items = [];
    let current = 0;
    let returnFocus;
    let previousOverflow = '';
    let touchStart = null;
    const pad = value => String(value).padStart(2, '0');
    const sourceFor = node => node.dataset.lightboxSrc || node.currentSrc || node.src || '';
    const altFor = node => node.dataset.lightboxAlt || node.alt || node.querySelector?.('img')?.alt || '';

    function build() {
        overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Project gallery');
        overlay.innerHTML = `
            <div class="lightbox-topline"><span class="lightbox-label">PROJECT GALLERY</span><span class="lightbox-counter" aria-live="polite"></span></div>
            <button class="lightbox-close" type="button" aria-label="Close"><span></span><span></span></button>
            <button class="lightbox-arrow lightbox-arrow--previous" type="button" aria-label="Previous image">←</button>
            <figure class="lightbox-figure"><img class="lightbox-img" src="" alt=""><figcaption class="lightbox-caption"></figcaption></figure>
            <button class="lightbox-arrow lightbox-arrow--next" type="button" aria-label="Next image">→</button>
            <div class="lightbox-hint">CLICK IMAGE TO ZOOM</div>`;
        document.body.append(overlay);
        image = overlay.querySelector('.lightbox-img');
        caption = overlay.querySelector('.lightbox-caption');
        counter = overlay.querySelector('.lightbox-counter');
        previousButton = overlay.querySelector('.lightbox-arrow--previous');
        nextButton = overlay.querySelector('.lightbox-arrow--next');

        overlay.querySelector('.lightbox-close').addEventListener('click', close);
        previousButton.addEventListener('click', event => { event.stopPropagation(); show(current - 1, -1); });
        nextButton.addEventListener('click', event => { event.stopPropagation(); show(current + 1, 1); });
        image.addEventListener('click', event => { event.stopPropagation(); image.classList.toggle('is-zoomed'); });
        overlay.addEventListener('click', event => {
            if (event.target === overlay || (!event.target.closest('.lightbox-figure') && !event.target.closest('button'))) close();
        });
        overlay.addEventListener('touchstart', event => {
            if (event.touches.length === 1) touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }, { passive: true });
        overlay.addEventListener('touchend', event => {
            if (!touchStart || !event.changedTouches.length) return;
            const dx = touchStart.x - event.changedTouches[0].clientX;
            const dy = touchStart.y - event.changedTouches[0].clientY;
            touchStart = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.25) show(current + Math.sign(dx), Math.sign(dx));
        }, { passive: true });

        document.addEventListener('keydown', event => {
            if (!overlay.classList.contains('open')) return;
            if (event.key === 'Escape') close();
            if (event.key === 'ArrowLeft') show(current - 1, -1);
            if (event.key === 'ArrowRight') show(current + 1, 1);
            if (event.key === 'Home') show(0, -1);
            if (event.key === 'End') show(items.length - 1, 1);
            if (event.key === 'Tab') {
                const controls = [overlay.querySelector('.lightbox-close'), previousButton, nextButton].filter(control => !control.hidden);
                const position = controls.indexOf(document.activeElement);
                event.preventDefault();
                controls[(position + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
            }
        });
    }

    function collect(origin) {
        if (origin.dataset.lightboxSources) {
            try {
                const parsed = JSON.parse(origin.dataset.lightboxSources);
                if (Array.isArray(parsed) && parsed.length) return parsed;
            } catch {}
        }
        return [...document.querySelectorAll('[data-lightbox]')]
            .filter(node => node.offsetParent !== null)
            .map(node => ({ src: sourceFor(node), alt: altFor(node), origin: node }))
            .filter(item => item.src);
    }

    function show(index, direction = 1) {
        if (!items.length) return;
        current = (index + items.length) % items.length;
        const item = items[current];
        image.classList.remove('loaded', 'is-zoomed', 'from-left', 'from-right');
        image.classList.add(direction < 0 ? 'from-left' : 'from-right');
        image.onload = () => image.classList.add('loaded');
        image.src = item.src;
        image.alt = item.alt || '';
        caption.textContent = (item.alt || '').toUpperCase();
        counter.textContent = `${pad(current + 1)} / ${pad(items.length)}`;
        const multiple = items.length > 1;
        previousButton.hidden = !multiple;
        nextButton.hidden = !multiple;
    }

    function open(origin) {
        if (!overlay) build();
        items = collect(origin);
        const source = sourceFor(origin);
        const found = items.findIndex(item => item.origin === origin || item.src === source);
        current = found >= 0 ? found : 0;
        returnFocus = origin;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.__lenis?.stop();
        show(current);

        if (document.startViewTransition && !REDUCED_MOTION) {
            origin.style.viewTransitionName = 'project-media';
            const transition = document.startViewTransition(() => {
                origin.style.viewTransitionName = '';
                image.style.viewTransitionName = 'project-media';
                overlay.classList.add('open');
            });
            transition.finished.finally(() => {
                origin.style.viewTransitionName = '';
                image.style.viewTransitionName = '';
            });
        } else overlay.classList.add('open');
        overlay.querySelector('.lightbox-close').focus({ preventScroll: true });
    }

    function close() {
        if (!overlay?.classList.contains('open')) return;
        overlay.classList.remove('open');
        image.classList.remove('is-zoomed');
        document.body.style.overflow = previousOverflow;
        window.__lenis?.start();
        returnFocus?.focus({ preventScroll: true });
    }

    function init() {
        document.querySelectorAll('[data-lightbox]').forEach(node => {
            const nativeControl = node.matches('button, a[href]');
            if (!nativeControl) {
                node.tabIndex = 0;
                node.setAttribute('role', 'button');
            }
            node.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); open(node); });
            if (!nativeControl) {
                node.addEventListener('keydown', event => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    open(node);
                });
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
