(() => {
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const cards = Array.from(document.querySelectorAll('.folder-card'));
    if (!cards.length || !finePointer.matches || reducedMotion.matches) return;

    cards.forEach(card => {
        card.classList.add('parallax-ready');

        let frame = 0;
        let nextX = 0;
        let nextY = 0;

        const render = () => {
            frame = 0;
            card.style.setProperty('--parallax-rx', `${nextX.toFixed(2)}deg`);
            card.style.setProperty('--parallax-ry', `${nextY.toFixed(2)}deg`);
        };

        card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect();
            const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
            nextX = (0.5 - py) * 6;
            nextY = (px - 0.5) * 7;
            card.classList.add('is-parallax-active');
            if (!frame) frame = requestAnimationFrame(render);
        }, {passive: true});

        card.addEventListener('pointerleave', () => {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            card.classList.remove('is-parallax-active');
            card.style.setProperty('--parallax-rx', '0deg');
            card.style.setProperty('--parallax-ry', '0deg');
        });
    });
})();
