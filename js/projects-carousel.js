(() => {
    const track = document.querySelector('#projects .projects-grid');
    if (!track) return;

    const cards = [...track.querySelectorAll('.proj-card')];
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dragging = false;
    let pointerId = null;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let moved = false;
    let suppressClick = false;
    let wheelTotal = 0;
    let wheelLocked = false;
    let wheelResetTimer = 0;

    track.querySelectorAll('img, a').forEach(element => element.setAttribute('draggable', 'false'));
    track.addEventListener('dragstart', event => event.preventDefault());

    const clampIndex = index => Math.max(0, Math.min(cards.length - 1, index));
    const cardTarget = index => {
        const card = cards[clampIndex(index)];
        return card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    };
    const nearestIndex = (projectedLeft = track.scrollLeft) => {
        const center = projectedLeft + track.clientWidth / 2;
        let nearest = 0;
        let smallestDistance = Infinity;
        cards.forEach((card, index) => {
            const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                nearest = index;
            }
        });
        return nearest;
    };
    const scrollToCard = (index, smooth = true) => {
        track.scrollTo({
            left: cardTarget(index),
            behavior: smooth && !reducedMotion ? 'smooth' : 'auto'
        });
    };

    let zoomFrame = 0;
    let zoomEvent = null;
    const updateZoom = event => {
        if (event.pointerType === 'touch') return;
        zoomEvent = event;
        if (zoomFrame) return;
        zoomFrame = requestAnimationFrame(() => {
            zoomFrame = 0;
            const pointed = document.elementFromPoint(zoomEvent.clientX, zoomEvent.clientY);
            const card = pointed?.closest?.('.proj-card');
            if (!card || !track.contains(card)) return;
            const rect = card.getBoundingClientRect();
            const x = Math.max(0, Math.min(100, ((zoomEvent.clientX - rect.left) / rect.width) * 100));
            const y = Math.max(0, Math.min(100, ((zoomEvent.clientY - rect.top) / rect.height) * 100));
            card.style.setProperty('--zoom-x', `${x.toFixed(2)}%`);
            card.style.setProperty('--zoom-y', `${y.toFixed(2)}%`);
        });
    };

    track.addEventListener('pointerleave', () => {
        cards.forEach(card => {
            card.style.setProperty('--zoom-x', '50%');
            card.style.setProperty('--zoom-y', '50%');
        });
    });

    track.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch' || event.button !== 0) return;
        event.preventDefault();
        dragging = true;
        pointerId = event.pointerId;
        startX = lastX = event.clientX;
        lastTime = performance.now();
        velocity = 0;
        moved = false;
        track.classList.add('is-dragging');
        track.setPointerCapture?.(pointerId);
    });

    track.addEventListener('pointermove', event => {
        updateZoom(event);
        if (!dragging || event.pointerId !== pointerId) return;

        const now = performance.now();
        const dx = event.clientX - lastX;
        const elapsed = Math.max(8, now - lastTime);
        const instantVelocity = -dx / elapsed;
        velocity = velocity * .68 + instantVelocity * .32;
        track.scrollLeft -= dx;

        if (Math.abs(event.clientX - startX) > 6) moved = true;
        lastX = event.clientX;
        lastTime = now;
    });

    const finishDrag = event => {
        if (!dragging || event.pointerId !== pointerId) return;
        const wasMoved = moved;
        dragging = false;
        suppressClick = wasMoved;
        track.releasePointerCapture?.(pointerId);
        pointerId = null;
        track.classList.remove('is-dragging');

        // A regular click (for example, opening a project image) must not
        // reposition the carousel underneath the lightbox.
        if (!wasMoved) return;

        const projected = track.scrollLeft + velocity * 180;
        const target = nearestIndex(projected);
        requestAnimationFrame(() => scrollToCard(target, true));
    };

    track.addEventListener('pointerup', finishDrag);
    track.addEventListener('pointercancel', finishDrag);
    track.addEventListener('click', event => {
        if (!suppressClick) return;
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
    }, true);

    track.addEventListener('wheel', event => {
        // Vertical wheel motion always belongs to the page. Only an intentional
        // horizontal trackpad gesture advances the project rail.
        if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
        const delta = event.deltaX;
        if (!delta) return;

        const current = nearestIndex();
        const direction = Math.sign(delta);
        const atBeginning = current === 0 && direction < 0;
        const atEnd = current === cards.length - 1 && direction > 0;
        if (atBeginning || atEnd) return;

        event.preventDefault();
        event.stopPropagation();
        clearTimeout(wheelResetTimer);
        wheelResetTimer = window.setTimeout(() => { wheelTotal = 0; }, 180);
        if (wheelLocked) return;

        wheelTotal += delta;
        if (Math.abs(wheelTotal) < 24) return;

        wheelLocked = true;
        wheelTotal = 0;
        scrollToCard(current + Math.sign(delta), true);
        window.setTimeout(() => { wheelLocked = false; }, reducedMotion ? 120 : 620);
    }, { passive: false });

    track.tabIndex = 0;
    track.setAttribute('aria-label', 'Projects carousel');
    track.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        scrollToCard(nearestIndex() + (event.key === 'ArrowRight' ? 1 : -1), true);
    });
})();
