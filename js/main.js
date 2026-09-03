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
    // STORY SCROLL — великолепный сторителлинг
    setupStoryScroll();

    // 1b. HERO SUBHEADER DECODE EFFECT
    setupDecodeEffect();

    // 2b. CONTACT SPOTLIGHT (premium)
    setupContactSpotlight();

    // 3. MAGNETIC BUTTONS PHYSICS EFFECT
    setupMagneticButtons();

    // 4. PROJECT SHELL CAROUSEL
    setupPShellCarousel();
    setupProjectFilesTransition();

    // 5. SCI-FI ID CARD 'ABOUT ME' MODAL SYSTEM
    setupAboutMeModal();

    // 5b. MOBILE BURGER NAV
    setupMobileNav();

    // 6. 'ABOUT ME' TYPING EFFECT
    setupTypingEffect();
});


/* TERMINAL PRELOADER — removed for minimalism (instant display) */

/* ==========================================================================
   STORY SCROLL — великолепный сторителлинг, рассказывает сайт
   Глава 01 Intro → 02 Projects → 03 Skills → 04 Contact
   Плавный Lenis + прогресс с главами + параллакс героя +
   кинематографичные reveal для каждой секции
   ========================================================================== */
function setupStoryScroll(){
    const REDUCED = REDUCED_MOTION;
    const progressBar = document.getElementById('scroll-progress');
    const hero = document.querySelector('.hero');
    const heroInner = document.querySelector('.hero-inner');
    const heroTitle = document.querySelector('.hero-title');
    const heroAbout = document.querySelector('.hero-about-wrap');
    const marquee = document.querySelector('.marquee-bar');
    const sections = [
        {el: document.querySelector('.hero'), label: '01 INTRO'},
        {el: document.querySelector('#projects'), label: '02 PROJECTS'},
        {el: document.querySelector('#skills'), label: '03 SKILLS'},
        {el: document.querySelector('#experience'), label: '03 EXPERIENCE'},
        {el: document.querySelector('#contact'), label: '04 CONTACT'}
    ].filter(s=>s.el);

    // — Build chapter indicator
    let chapterEl = document.getElementById('story-chapter');
    if(!chapterEl && progressBar){
        chapterEl = document.createElement('div');
        chapterEl.id = 'story-chapter';
        chapterEl.className = 'story-chapter';
        chapterEl.innerHTML = '<span class="story-chapter-num">01</span><span class="story-chapter-label">INTRO</span><span class="story-chapter-progress"></span>';
        progressBar.insertAdjacentElement('afterend', chapterEl);
    }

    // — LENIS
    let lenis = null;
    if(window.Lenis && !REDUCED){
        lenis = new Lenis({ duration: 1.0, smoothWheel:true, smoothTouch:false, gestureOrientation:'vertical', touchMultiplier:1.6, lerp:0.08 });
        window.__lenis = lenis;
        const raf = (t)=>{ lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        document.querySelectorAll('a[href^="#"]').forEach(link=>{
            link.addEventListener('click', (e)=>{
                const href=link.getAttribute('href');
                if(!href || href==='#') return;
                const target=document.querySelector(href);
                if(!target) return;
                e.preventDefault();
                // bottom navbar — no top offset needed
                const offset = 0;
                lenis.scrollTo(target, {offset, duration:1.15});
            });
        });
    }

    // — REVEAL observer (staggered, but now with story delay)
    const revealObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('active');
                const children = entry.target.querySelectorAll('.skill-item');
                children.forEach((c,i)=>c.style.setProperty('--delay', i));
                animatePercentCounters(entry.target);
            }
        });
    }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

    // — Title reveal
    const titleObserver = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
            if(e.isIntersecting){ e.target.classList.add('in-view'); titleObserver.unobserve(e.target); }
        });
    }, {threshold:0.3});
    document.querySelectorAll('.title-reveal').forEach(t=>{
        if(REDUCED) t.classList.add('in-view'); else titleObserver.observe(t);
    });

    // — Nav highlight (bottom bar)
    const navMap = [
        {section: document.querySelector('#projects'), link: document.querySelector('.nav-link[href="#projects"]')},
        {section: document.querySelector('#experience'), link: document.querySelector('.nav-link[href="#experience"]')},
        {section: document.querySelector('#contact'), link: document.querySelector('.nav-link[href="#contact"]')}
    ].filter(x=>x.section && x.link);
    if(navMap.length){
        const navObs = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    navMap.forEach(m=>m.link.classList.toggle('nav-active', m.section===entry.target));
                }
            });
        }, {rootMargin:'-45% 0px -50% 0px'});
        navMap.forEach(m=>navObs.observe(m.section));
    }

    // — Story scroll loop (rAF, not scroll event)
    let ticking = false;
    let lastChapter = '';
    function onStoryFrame(){
        ticking = false;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH>0 ? Math.min(1, Math.max(0, scrollY/docH)) : 0;

        // progress bar width (transform for perf)
        if(progressBar){
            progressBar.style.width = (progress*100)+'%';
        }
        if(chapterEl){
            chapterEl.style.setProperty('--chapter-progress', progress);
        }

        // chapter detection
        let currentLabel = sections[0]?.label || '01 INTRO';
        let currentNum = '01';
        for(let i=sections.length-1;i>=0;i--){
            const rect = sections[i].el.getBoundingClientRect();
            if(rect.top <= window.innerHeight*0.45){
                currentLabel = sections[i].label;
                break;
            }
        }
        currentNum = currentLabel.slice(0,2);
        const labelOnly = currentLabel.slice(3);
        if(chapterEl && currentLabel!==lastChapter){
            lastChapter = currentLabel;
            const numEl = chapterEl.querySelector('.story-chapter-num');
            const labEl = chapterEl.querySelector('.story-chapter-label');
            if(numEl) numEl.textContent = currentNum;
            if(labEl) labEl.textContent = labelOnly;
            chapterEl.setAttribute('data-chapter', currentLabel);
        }

        // HERO parallax — рассказывает как вступление
        if(hero && !REDUCED){
            const rect = hero.getBoundingClientRect();
            // hero fades and scales as it leaves viewport
            const heroProgress = Math.min(1, Math.max(0, -rect.top / (rect.height*0.7)));
            if(heroInner){
                heroInner.style.transform = `translateY(${heroProgress* -22}px) scale(${1 - heroProgress*0.04})`;
                heroInner.style.opacity = String(1 - heroProgress*0.55);
            }
            if(heroTitle){
                heroTitle.style.transform = `translateY(${heroProgress* -12}px)`;
                heroTitle.style.filter = `blur(${heroProgress*1.2}px)`;
            }
            if(heroAbout){
                heroAbout.style.transform = `translateY(${heroProgress* 10}px)`;
                heroAbout.style.opacity = String(1 - heroProgress*0.9);
            }
            if(marquee){
                marquee.style.transform = `translateY(${heroProgress* 18}px)`;
                marquee.style.opacity = String(1 - heroProgress*0.7);
            }
        }

        // PROJECTS — вьюпорт убран по запросу (без параллакса)
    }

    function requestTick(){
        if(!ticking){
            ticking = true;
            requestAnimationFrame(onStoryFrame);
        }
    }

    if(REDUCED){
        // no parallax, just progress
        window.addEventListener('scroll', ()=>{
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const p = docH>0 ? window.scrollY/docH : 0;
            if(progressBar) progressBar.style.width = (p*100)+'%';
        }, {passive:true});
    } else {
        window.addEventListener('scroll', requestTick, {passive:true});
        // initial
        requestTick();
        // also on lenis scroll
        if(lenis) lenis.on('scroll', requestTick);
    }
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

    /* ── Native swipe via CSS scroll-snap (Android fix) ── */
    // Android Chrome needs explicit touch handling; Lenis is excluded via data-lenis-prevent
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        hasDragged = false;
        track.classList.add('is-dragging');
    }, {passive:true});
    track.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].clientX - touchStartX) > 10) hasDragged = true;
    }, {passive:true});
    track.addEventListener('touchend', () => {
        track.classList.remove('is-dragging');
        // Snap to nearest card after swipe ends (helps Android proximity snap)
        clearTimeout(track._snapTimer);
        track._snapTimer = setTimeout(() => {
            const scrollCenter = track.scrollLeft + track.clientWidth / 2;
            let closestIdx = 0;
            let closestDist = Infinity;
            cards.forEach((c, i) => {
                const center = c.offsetLeft + c.clientWidth / 2;
                const dist = Math.abs(center - scrollCenter);
                if (dist < closestDist) { closestDist = dist; closestIdx = i; }
            });
            if (closestIdx !== activeIdx) setActive(closestIdx);
        }, 80);
        setTimeout(() => { hasDragged = false; }, 220);
    }, {passive:true});

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

/* Project Files — transition to new page */
function setupProjectFilesTransition(){
    document.querySelectorAll('a[href="projects.html"], a[href^="project-breakdown.html"], .pshell-title-link').forEach(link=>{
        link.addEventListener('click', (e)=>{
            const href = link.getAttribute('href') || link.closest('a')?.getAttribute('href');
            if(!href) return;
            if(document.startViewTransition){
                e.preventDefault();
                document.startViewTransition(()=>{
                    window.location.href = href;
                });
            }
        });
    });
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


/* CONTACT premium spotlight — follows cursor */
function setupContactSpotlight(){
    const btn=document.getElementById('main-contact-btn');
    if(!btn || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(!window.matchMedia('(pointer:fine)').matches) return;
    btn.addEventListener('mousemove', (e)=>{
        const r=btn.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width)*100;
        const y=((e.clientY-r.top)/r.height)*100;
        btn.style.setProperty('--mx', x+'%');
        btn.style.setProperty('--my', y+'%');
    });
    btn.addEventListener('mouseleave', ()=>{
        btn.style.setProperty('--mx','50%');
        btn.style.setProperty('--my','50%');
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

    // Variant A — hover scramble for About Me (desktop only, during hold phase)
    const aboutBtnHover = document.getElementById('about-me-btn');
    if (aboutBtnHover && FINE_POINTER && !REDUCED_MOTION) {
        aboutBtnHover.addEventListener('mouseenter', () => {
            if (typingText.dataset.scrambling) return;
            const curPhrase = PHRASES[phraseIdx];
            if (typingText.textContent === curPhrase) {
                scrambleText(typingText, 420);
            }
        });
    }
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


/* IMAGE PARALLAX + MAGNETIC BRACKETS removed for minimalism */


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


/* 3D TILT removed for minimalism */
