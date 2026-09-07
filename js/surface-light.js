/* Cursor lighting for project cards and the glass navigation bar. */
(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    document.querySelectorAll('.proj-card, .navbar:not(.hero-navigation) .navbar-inner').forEach(surface => {
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
        preference.addEventListener('change', clear);
        window.addEventListener('blur', clear);
        // Clear stale coordinates when scrolling, switching pages or opening details.
        window.addEventListener('scroll', clear, {passive: true});
        surface.addEventListener('click', clear);
    });
})();
