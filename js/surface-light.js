/* Cursor lighting for project cards and the glass navigation bar. */
(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const surfaces = Array.from(document.querySelectorAll('.proj-card, .navbar:not(.hero-navigation) .navbar-inner'));
    const clearAll = () => surfaces.forEach(surface => surface.classList.remove('has-surface-light'));
    surfaces.forEach(surface => {
        let frame = 0;
        let pointerX = 0;
        let pointerY = 0;

        const clear = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            surface.classList.remove('has-surface-light');
        };
        const move = event => {
            if (!preference.matches || event.pointerType === 'touch') return;
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const rect = surface.getBoundingClientRect();
                surface.style.setProperty('--surface-x', `${pointerX - rect.left}px`);
                surface.style.setProperty('--surface-y', `${pointerY - rect.top}px`);
                surface.classList.add('has-surface-light');
            });
        };
        surface.addEventListener('pointerenter', move);
        surface.addEventListener('pointermove', move);
        surface.addEventListener('pointerleave', clear);
        surface.addEventListener('pointercancel', clear);
        surface.addEventListener('click', clear);
    });
    preference.addEventListener('change', clearAll);
    window.addEventListener('blur', clearAll);
    // One passive listener replaces a separate window listener per surface.
    window.addEventListener('scroll', clearAll, {passive: true});
})();
