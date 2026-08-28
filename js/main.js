/**
 * JUI PORTFOLIO - MAIN JAVASCRIPT
 * Vanilla JS implementation for Terminal Preloader, Custom HUD Cursor, Lenis Smooth Scroll,
 * Scroll Progress, Staggered Reveals, Smooth Viewport Carousel, Image Parallax,
 * Text Scramble, Magnetic HUD Brackets, Sci-Fi ID Card 'About Me' Modal,
 * Typing Effect & Magnetic Physics.
 */

/* Respect the user's reduced motion preference across all effects */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

document.addEventListener("DOMContentLoaded", function() {
    // 0. TERMINAL PRELOADER
    setupPreloader();

    // 0b. LENIS SMOOTH SCROLL
    setupLenis();

    // 1. STAGGERED SCROLL REVEAL ANIMATIONS
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const children = entry.target.querySelectorAll('.skill-item, .tool-item, .pshell-sw-item');
                children.forEach((child, index) => {
                    child.style.setProperty('--delay', index);
                });
                animatePercentCounters(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 1b. HERO SUBHEADER DECODE EFFECT
    setupDecodeEffect();

    // 2. TOP SCROLL PROGRESS BAR
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercentage))}%`;
        }, { passive: true });
    }

    // 3. MAGNETIC BUTTONS PHYSICS EFFECT
    setupMagneticButtons();

    // 4. PROJECT SHELL CAROUSEL
    setupPShellCarousel();

    // 4b. IMAGE PARALLAX
    setupImageParallax();

    // 4c. MAGNETIC HUD BRACKETS
    setupMagneticBrackets();

    // 4d. 3D TILT ON ACTIVE CARD
    setupCardTilt();

    // 4e. ACTIVE SECTION NAV HIGHLIGHT
    setupNavHighlight();

    // 4e. SECTION TITLE REVEAL
    setupTitleReveal();

    // 5. SCI-FI ID CARD 'ABOUT ME' MODAL SYSTEM
    setupAboutMeModal();

    // 5b. MOBILE BURGER NAV
    setupMobileNav();

    // 6. 'ABOUT ME' TYPING EFFECT
    setupTypingEffect();
});


/* ==========================================================================
   TERMINAL PRELOADER
   ========================================================================== */
function setupPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) { document.body.classList.remove('is-preloading'); return; }

    const barEl = document.getElementById('preloader-bar');
    const percentEl = document.getElementById('preloader-percent');

    if (REDUCED_MOTION) {
        preloader.classList.add('done');
        document.body.classList.remove('is-preloading');
        setTimeout(() => preloader.remove(), 800);
        return;
    }

    // Progress 0 -> 100
    const DURATION = 1800;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - progress, 2);
        const percent = Math.round(eased * 100);
        barEl.style.width = `${percent}%`;
        percentEl.textContent = `${percent}%`;

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            setTimeout(() => {
                preloader.classList.add('done');
                document.body.classList.remove('is-preloading');
                if (window.__lenis) window.__lenis.start();
                setTimeout(() => preloader.remove(), 900);
            }, 300);
        }
    }

    if (window.__lenis) window.__lenis.stop();
    requestAnimationFrame(frame);

    // Failsafe: never let the preloader trap the page
    setTimeout(() => {
        if (document.body.contains(preloader) && !preloader.classList.contains('done')) {
            preloader.classList.add('done');
            document.body.classList.remove('is-preloading');
            if (window.__lenis) window.__lenis.start();
            setTimeout(() => preloader.remove(), 900);
        }
    }, 5000);
}


/* ==========================================================================
   LENIS SMOOTH SCROLL + ANCHOR LINKS
   ========================================================================== */
function setupLenis() {
    if (!window.Lenis || REDUCED_MOTION) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Route anchor links through Lenis
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            lenis.scrollTo(target, { offset: -72, duration: 1.4 });
        });
    });
}


/* ==========================================================================
   CUSTOM HUD CURSOR — ASCII crosshair
   ========================================================================== */
/* ==========================================================================
   TEXT SCRAMBLE — used by project names
   ========================================================================== */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@$&';

function scrambleText(el, duration = 650) {
    if (REDUCED_MOTION) return;
    if (el.dataset.scrambling) return;
    el.dataset.scrambling = '1';

    const original = el.textContent;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const resolved = Math.floor(progress * original.length);

        let output = original.slice(0, resolved);
        for (let i = resolved; i < original.length; i++) {
            output += original[i] === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }

        el.textContent = output;
        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            el.textContent = original;
            delete el.dataset.scrambling;
        }
    }

    requestAnimationFrame(frame);
}


/* ==========================================================================
   PROJECT SHELL — SMOOTH HORIZONTAL CAROUSEL (MOUSE WHEEL, DRAG & TOUCH)
   ========================================================================== */
function setupPShellCarousel() {
    const track = document.getElementById('pshell-track');
    const btnPrev = document.getElementById('pshell-prev');
    const btnNext = document.getElementById('pshell-next');

    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.pshell-card'));
    const total = cards.length;
    let activeIdx = 0;
    let hasDragged = false;

    /* ── Scroll helper (mathematically centered) ── */
    function scrollToCard(index, smooth = true) {
        if (index < 0 || index >= total) return;
        const card = cards[index];
        if (!card) return;

        const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        track.scrollTo({
            left: targetLeft,
            behavior: smooth ? 'smooth' : 'auto'
        });
    }

    /* ── Set active card state ── */
    function setActive(index) {
        if (index < 0 || index >= total) return;
        activeIdx = index;
        cards.forEach((c, i) => {
            const isActive = (i === index);
            c.classList.toggle('is-active', isActive);
            c.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        // Text scramble on the newly centered project name
        const nameEl = cards[index].querySelector('.pshell-card-name');
        if (nameEl) scrambleText(nameEl);

        if (btnPrev) btnPrev.disabled = (index === 0);
        if (btnNext) btnNext.disabled = (index === total - 1);
    }

    /* ── IntersectionObserver for active card detection during smooth scrolls ── */
    const ioOptions = {
        root: track,
        rootMargin: '0px -30% 0px -30%',
        threshold: 0.4
    };
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = parseInt(entry.target.dataset.pshellIndex, 10);
                if (!isNaN(idx)) setActive(idx);
            }
        });
    }, ioOptions);

    cards.forEach(c => io.observe(c));

    /* ── Mouse Wheel: DISABLED to prevent page scroll interference ── */
    // Mouse-wheel scrolling on the carousel is intentionally disabled.
    // The carousel is navigated exclusively via the arrow buttons.
    track.addEventListener('wheel', (e) => {
        // Only prevent default if the horizontal scroll is dominant (native trackpad swipe)
        // Do NOT intercept vertical wheel — let the page scroll normally
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
        }
    }, { passive: false });

    /* ── Arrow navigation ── */
    if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToCard(Math.max(0, activeIdx - 1), !REDUCED_MOTION);
        });
    }
    if (btnNext) {
        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToCard(Math.min(total - 1, activeIdx + 1), !REDUCED_MOTION);
        });
    }

    /* ── Keyboard navigation ── */
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToCard(Math.max(0, activeIdx - 1), !REDUCED_MOTION);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollToCard(Math.min(total - 1, activeIdx + 1), !REDUCED_MOTION);
        }
    });

    /* ── Pointer Drag — enabled for Android swipe fix ── */
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;

    track.addEventListener('pointerdown', (e) => {
        // Only left button / touch
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        isDown = true;
        isDragging = false;
        hasDragged = false;
        track.classList.add('is-dragging');
        startX = e.clientX;
        startScrollLeft = track.scrollLeft;
        try { track.setPointerCapture(e.pointerId); } catch(_){}
    });
    track.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 6) isDragging = true;
        // Allow native vertical scroll to pass through if vertical dominant
        if (isDragging) {
            // Prevent text selection and page scroll hijack during horizontal drag
            if (Math.abs(dx) > 10) e.preventDefault();
            track.scrollLeft = startScrollLeft - dx;
        }
    });
    const endDrag = (e) => {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('is-dragging');
        try { if (e && e.pointerId) track.releasePointerCapture(e.pointerId); } catch(_){}
        if (isDragging) {
            hasDragged = true;
            // Prevent the click that fires after drag from triggering card navigation
            setTimeout(() => { hasDragged = false; isDragging = false; }, 120);
        } else {
            isDragging = false;
        }
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);

    /* ── Click handling on cards ── */
    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            if (hasDragged) { e.preventDefault(); return; }
            // If clicking an interactive link or button (like CONTINUE button), let it execute naturally
            if (e.target.closest('a, button')) return;

            // If clicking inactive card, scroll it to center
            if (!card.classList.contains('is-active')) {
                scrollToCard(idx, !REDUCED_MOTION);
                return;
            }
        });
    });

    // Initialize first card
    setActive(0);
}


/* ==========================================================================
   SCI-FI ID CARD 'ABOUT ME' MODAL SYSTEM
   ========================================================================== */
function setupAboutMeModal() {
    const aboutBtn = document.getElementById('about-me-btn');
    const aboutModal = document.getElementById('about-modal');
    const aboutBackdrop = document.getElementById('about-modal-backdrop');
    const aboutCloseBtn = document.getElementById('about-modal-close');

    if (!aboutModal) return;

    function openAboutModal() {
        const updateDOM = () => {
            aboutModal.classList.add('active');
            aboutModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (window.__lenis) window.__lenis.stop();
        };

        if (document.startViewTransition) {
            document.startViewTransition(updateDOM);
        } else {
            updateDOM();
        }
    }

    function closeAboutModal() {
        const updateDOM = () => {
            aboutModal.classList.remove('active');
            aboutModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (window.__lenis) window.__lenis.start();
        };

        if (document.startViewTransition) {
            document.startViewTransition(updateDOM);
        } else {
            updateDOM();
        }
    }

    if (aboutBtn) aboutBtn.addEventListener('click', openAboutModal);
    if (aboutCloseBtn) aboutCloseBtn.addEventListener('click', closeAboutModal);
    if (aboutBackdrop) aboutBackdrop.addEventListener('click', closeAboutModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
            closeAboutModal();
        }
    });
}


/* ==========================================================================
   MAGNETIC BUTTON PHYSICS
   ========================================================================== */
function setupMagneticButtons() {
    if (REDUCED_MOTION) return; // Skip magnetic physics if user prefers reduced motion

    const magneticElements = document.querySelectorAll('.magnetic-btn');

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            const distanceX = e.clientX - btnCenterX;
            const distanceY = e.clientY - btnCenterY;

            const pullFactor = 0.32;
            const translateX = distanceX * pullFactor;
            const translateY = distanceY * pullFactor;

            btn.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate3d(0, 0, 0)`;
        });
    });
}


/* ==========================================================================
   'ABOUT ME' TYPING EFFECT
   ========================================================================== */
function setupTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const PHRASES = ['About me', 'Dossier', 'ID Card'];
    const TYPE_SPEED_MS = 90;
    const ERASE_SPEED_MS = 45;
    const HOLD_MS = 2600;

    if (REDUCED_MOTION) {
        typingText.textContent = PHRASES[0];
        return;
    }

    let phraseIdx = 0;
    let charIdx = PHRASES[0].length;
    let erasing = false;

    function tick() {
        const phrase = PHRASES[phraseIdx];

        if (!erasing) {
            charIdx++;
            typingText.textContent = phrase.slice(0, charIdx);

            if (charIdx >= phrase.length) {
                erasing = true;
                setTimeout(tick, HOLD_MS);
            } else {
                setTimeout(tick, TYPE_SPEED_MS);
            }
        } else {
            charIdx--;
            typingText.textContent = phrase.slice(0, charIdx);

            if (charIdx <= 0) {
                erasing = false;
                phraseIdx = (phraseIdx + 1) % PHRASES.length;
                setTimeout(tick, 500);
            } else {
                setTimeout(tick, ERASE_SPEED_MS);
            }
        }
    }

    setTimeout(tick, HOLD_MS);
}


/* ==========================================================================
   SKILL PERCENT COUNTERS — count up when revealed
   ========================================================================== */
function animatePercentCounters(scope) {
    if (REDUCED_MOTION) return;

    scope.querySelectorAll('.skill-percent').forEach(el => {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';

        const target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;

        const item = el.closest('.skill-item');
        const delay = (parseInt(item && item.style.getPropertyValue('--delay'), 10) || 0) * 140 + 1300;

        setTimeout(() => {
            const duration = 1100;
            const start = performance.now();

            function frame(now) {
                const progress = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = `${Math.round(eased * target)}%`;
                if (progress < 1) requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
        }, delay);
    });
}


/* ==========================================================================
   HERO SUBHEADER DECODE EFFECT — text resolves from random characters
   ========================================================================== */
function setupDecodeEffect() {
    const subheader = document.querySelector('.hero-subheader-text');
    if (!subheader || REDUCED_MOTION) return;

    const textNode = subheader.firstChild;
    if (!textNode || textNode.nodeType !== 3) return;

    const original = textNode.textContent;
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#$@';
    const duration = 1600;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const resolved = Math.floor(progress * original.length);

        let output = original.slice(0, resolved);
        for (let i = resolved; i < original.length; i++) {
            output += original[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        textNode.textContent = output;
        if (progress < 1) requestAnimationFrame(frame);
        else textNode.textContent = original;
    }

    textNode.textContent = ' '.repeat(original.length);
    setTimeout(() => requestAnimationFrame(frame), 500);
}


/* ==========================================================================
   IMAGE PARALLAX — project renders drift on scroll
   ========================================================================== */
function setupImageParallax() {
    if (REDUCED_MOTION) return;

    const imgs = Array.from(document.querySelectorAll('.pshell-card .pshell-img'));
    if (!imgs.length) return;

    function update() {
        imgs.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.bottom < -150 || rect.top > window.innerHeight + 150) return;

            const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
            const y = progress * -42;
            img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1.15)`;
        });
        requestAnimationFrame(update);
    }

    update();
}


/* ==========================================================================
   MAGNETIC HUD BRACKETS — card corners gravitate toward the cursor
   ========================================================================== */
function setupMagneticBrackets() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    const track = document.getElementById('pshell-track');
    if (!track) return;

    let mouseX = -9999, mouseY = -9999;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    (function loop() {
        const brackets = track.querySelectorAll('.pshell-card.is-active .hud-bracket');
        const radius = 150;

        brackets.forEach(bracket => {
            const rect = bracket.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = mouseX - cx;
            const dy = mouseY - cy;
            const dist = Math.hypot(dx, dy) || 1;

            if (dist < radius) {
                const pull = (1 - dist / radius) * 12;
                bracket.style.transform = `translate(${(dx / dist * pull).toFixed(1)}px, ${(dy / dist * pull).toFixed(1)}px)`;
            } else {
                bracket.style.transform = '';
            }
        });

        requestAnimationFrame(loop);
    })();
}


function setupMobileNav(){
    const burger = document.getElementById('nav-burger');
    const drawer = document.getElementById('nav-drawer');
    if(!burger || !drawer) return;
    const close = ()=>{
        drawer.classList.remove('is-open');
        burger.setAttribute('aria-expanded','false');
        drawer.setAttribute('aria-hidden','true');
    };
    const open = ()=>{
        drawer.classList.add('is-open');
        burger.setAttribute('aria-expanded','true');
        drawer.setAttribute('aria-hidden','false');
    };
    burger.addEventListener('click', ()=>{
        drawer.classList.contains('is-open') ? close() : open();
    });
    drawer.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', close);
    });
    // Drawer About me -> delegates to main About me modal
    const drawerAbout = document.getElementById('about-me-btn-drawer');
    const mainAbout = document.getElementById('about-me-btn');
    if(drawerAbout && mainAbout){
        drawerAbout.addEventListener('click', ()=>{
            close();
            // small delay so drawer close anim completes before modal opens
            setTimeout(()=> mainAbout.click(), 180);
        });
    }
    document.addEventListener('click', (e)=>{
        if(!drawer.contains(e.target) && !burger.contains(e.target) && drawer.classList.contains('is-open')){
            close();
        }
    });
    document.addEventListener('keydown', (e)=>{
        if(e.key==='Escape' && drawer.classList.contains('is-open')) close();
    });
    // close on resize to desktop
    window.addEventListener('resize', ()=>{
        if(window.innerWidth>860 && drawer.classList.contains('is-open')) close();
    });
}

/* ==========================================================================
   ACTIVE SECTION NAV HIGHLIGHT
   ========================================================================== */
function setupNavHighlight() {
    const map = [
        { section: document.querySelector('#projects'), link: document.querySelector('.nav-link[href="#projects"]') },
        { section: document.querySelector('#experience'), link: document.querySelector('.nav-link[href="#experience"]') },
        { section: document.querySelector('#contact'), link: document.querySelector('.nav-link[href="#contact"]') }
    ].filter(item => item.section && item.link);

    if (!map.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                map.forEach(item => {
                    item.link.classList.toggle('nav-active', item.section === entry.target);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    map.forEach(item => observer.observe(item.section));
}


/* ==========================================================================
   SECTION TITLE REVEAL — smooth entrance for big headings
   ========================================================================== */
function setupTitleReveal() {
    const titles = document.querySelectorAll('.title-reveal');
    if (!titles.length) return;

    if (REDUCED_MOTION) {
        titles.forEach(t => t.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    titles.forEach(t => observer.observe(t));
}


/* ==========================================================================
   3D TILT — active project card leans toward the cursor
   ========================================================================== */
function setupCardTilt() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    const track = document.getElementById('pshell-track');
    if (!track) return;

    let targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;

    const getWrap = () => track.querySelector('.pshell-card.is-active .pshell-img-wrap');

    document.addEventListener('mousemove', (e) => {
        const wrap = getWrap();
        if (!wrap) { targetRX = 0; targetRY = 0; return; }

        const rect = wrap.getBoundingClientRect();
        const inside = e.clientX > rect.left - 80 && e.clientX < rect.right + 80 &&
                       e.clientY > rect.top - 80 && e.clientY < rect.bottom + 80;

        if (inside) {
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            targetRY = px * 6;
            targetRX = -py * 6;
        } else {
            targetRX = 0;
            targetRY = 0;
        }
    });

    (function loop() {
        curRX += (targetRX - curRX) * 0.08;
        curRY += (targetRY - curRY) * 0.08;

        const wrap = getWrap();
        if (wrap) {
            wrap.style.transform = `perspective(1200px) rotateX(${curRX.toFixed(2)}deg) rotateY(${curRY.toFixed(2)}deg)`;
        }

        requestAnimationFrame(loop);
    })();
}
