/**
 * JUI PORTFOLIO - MAIN JAVASCRIPT
 * Vanilla JS implementation for Terminal Preloader, Custom HUD Cursor, Native Smooth Scroll,
 * Scroll Progress, Staggered Reveals, Smooth Viewport Carousel, Image Parallax,
 * Text Scramble, Magnetic HUD Brackets, Sci-Fi ID Card 'About Me' Modal,
 * Typing Effect & Magnetic Physics.
 */

/* Respect the user's reduced motion preference across all effects */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

document.addEventListener("DOMContentLoaded", function() {
    // STORY SCROLL, великолепный сторителлинг
    setupStoryScroll();

    // 2b. CONTACT SPOTLIGHT (premium)
    setupContactSpotlight();

    // 3. MAGNETIC BUTTONS PHYSICS EFFECT
    setupMagneticButtons();

    // 4. PROJECT SHELL CAROUSEL
    setupPShellCarousel();

    // 5. SCI-FI ID CARD 'ABOUT ME' MODAL SYSTEM
    setupAboutMeModal();

    // 5b. MOBILE BURGER NAV
    setupMobileNav();

    // 6. 'ABOUT ME' TYPING EFFECT
    setupTypingEffect();

    // 7. FILE DETAILS TOGGLE
    setupFileDetails();

    // 8. PROJECTS PAGING (3 per page)
    setupProjectsPaging();
});


/* TERMINAL PRELOADER, removed for minimalism (instant display) */

/* ==========================================================================
   STORY SCROLL, великолепный сторителлинг, рассказывает сайт
   Глава 01 Intro → 02 Projects → 03 Skills → 04 Contact
   Нативный скролл + прогресс с главами + параллакс героя +
   кинематографичные reveal для каждой секции
   ========================================================================== */
function setupStoryScroll(){
    const REDUCED = REDUCED_MOTION;
    const progressBar = document.getElementById('scroll-progress');
    const hero = document.querySelector('.hero');
    const heroInner = document.querySelector('.hero-inner');
    const heroTitle = document.querySelector('.hero-title');
    if(hero){
        const heroVisibility = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                hero.classList.toggle('is-offscreen', !entry.isIntersecting);
            });
        });
        heroVisibility.observe(hero);
    }
    // Perf: pause infinite paint animations while their section is offscreen.
    if(!REDUCED){
        const animObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
            });
        });
        document.querySelectorAll('.about-me-section,#projects,#skills,#experience,#contact').forEach(s => animObs.observe(s));
    }
    const marquee = document.querySelector('.marquee-bar');
    const sections = [
        {el: document.querySelector('.hero'), label: '01 INTRO'},
        {el: document.querySelector('#projects'), label: '02 PROJECTS'},
        {el: document.querySelector('#skills'), label: '03 SKILLS'},
        {el: document.querySelector('#experience'), label: '03 EXPERIENCE'},
        {el: document.querySelector('#contact'), label: '04 CONTACT'}
    ].filter(s=>s.el);

    //, Build chapter indicator
    let chapterEl = document.getElementById('story-chapter');
    if(!chapterEl && progressBar){
        chapterEl = document.createElement('div');
        chapterEl.id = 'story-chapter';
        chapterEl.className = 'story-chapter';
        chapterEl.innerHTML = '<span class="story-chapter-num">01</span><span class="story-chapter-label">INTRO</span><span class="story-chapter-progress"></span>';
        progressBar.insertAdjacentElement('afterend', chapterEl);
    }

    // Native scrolling avoids a permanent animation loop and preserves the
    // browser's wheel/touch momentum. Smooth motion is used only for nav jumps.
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
        link.addEventListener('click', (e)=>{
            if(e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            const href=link.getAttribute('href');
            if(!href || href==='#') return;
            let id;
            try { id = decodeURIComponent(href.slice(1)); } catch { return; }
            const target=document.getElementById(id);
            if(!target) return;
            e.preventDefault();
            const offset = id === 'main-contact-btn' ? -window.innerHeight * 0.55 : 0;
            const top = target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({top, behavior: REDUCED ? 'auto' : 'smooth'});
        });
    });

    //, REVEAL observer (staggered, but now with story delay)
    const revealObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('active');
            }
        });
    }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

    // Fill each row when it actually enters the viewport, once per visit.
    if(!REDUCED){
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(!entry.isIntersecting) return;
                entry.target.classList.add('skill-filled');
                skillObserver.unobserve(entry.target);
            });
        }, {threshold:0.6, rootMargin:'0px 0px -8% 0px'});
        document.querySelectorAll('#skills .skill-item').forEach((row, index) => {
            row.classList.add('skill-pending');
            row.style.setProperty('--fill-delay', `${index * 70}ms`);
            skillObserver.observe(row);
        });
    }

    //, Title reveal
    const titleObserver = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
            if(e.isIntersecting){ e.target.classList.add('in-view'); titleObserver.unobserve(e.target); }
        });
    }, {threshold:0.3});
    document.querySelectorAll('.title-reveal').forEach(t=>{
        if(REDUCED) t.classList.add('in-view'); else titleObserver.observe(t);
    });

    //, Nav highlight (bottom bar)
    const navMap = [
        {section: document.querySelector('#projects'), link: document.querySelector('.nav-link[href="#projects"]')},
        {section: document.querySelector('#experience'), link: document.querySelector('.nav-link[href="#experience"]')},
        {section: document.querySelector('#contact'), link: document.querySelector('.nav-link[href="#main-contact-btn"], .nav-link[href="#contact"]')}
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

    //, Story scroll loop (single rAF, compositor-only, no blur per-frame)
    let lastChapter = '';
    function onStoryFrame(){
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docH>0 ? Math.min(1, Math.max(0, scrollY/docH)) : 0;

        // progress bar via transform (no layout thrash)
        if(progressBar){
            progressBar.style.transform = `scaleX(${progress})`;
        }
        if(chapterEl){
            chapterEl.style.setProperty('--chapter-progress', progress);
        }

        // chapter detection
        let currentLabel = sections[0]?.label || '01 INTRO';
        for(let i=sections.length-1;i>=0;i--){
            const rect = sections[i].el.getBoundingClientRect();
            if(rect.top <= window.innerHeight*0.45){
                currentLabel = sections[i].label;
                break;
            }
        }
        const currentNum = currentLabel.slice(0,2);
        const labelOnly = currentLabel.slice(3);
        if(chapterEl && currentLabel!==lastChapter){
            lastChapter = currentLabel;
            const numEl = chapterEl.querySelector('.story-chapter-num');
            const labEl = chapterEl.querySelector('.story-chapter-label');
            if(numEl) numEl.textContent = currentNum;
            if(labEl) labEl.textContent = labelOnly;
            chapterEl.setAttribute('data-chapter', currentLabel);
        }

        // HERO parallax, only while hero is on screen, transform+opacity only
        if(hero && !REDUCED){
            const rect = hero.getBoundingClientRect();
            const heroVisible = rect.bottom > 0;
            if(heroVisible){
                const heroProgress = Math.min(1, Math.max(0, -rect.top / (rect.height*0.7)));
                if(heroInner){
                    heroInner.style.transform = `translate3d(0,${(heroProgress* -22).toFixed(1)}px,0) scale(${(1 - heroProgress*0.04).toFixed(3)})`;
                    heroInner.style.opacity = String(1 - heroProgress*0.55);
                }
                if(heroTitle){
                    heroTitle.style.transform = `translate3d(0,${(heroProgress* -12).toFixed(1)}px,0)`;
                }
                if(marquee){
                    marquee.style.transform = `translate3d(0,${(heroProgress* 18).toFixed(1)}px,0)`;
                    marquee.style.opacity = String(1 - heroProgress*0.7);
                }
            }
        }

        // PROJECTS, вьюпорт убран по запросу (без параллакса)
    }

    let storyFrame = 0;
    const invalidateStory = () => {
        if(storyFrame) return;
        storyFrame = requestAnimationFrame(() => {
            storyFrame = 0;
            onStoryFrame();
        });
    };
    window.addEventListener('scroll', invalidateStory, {passive:true});
    window.addEventListener('resize', invalidateStory, {passive:true});
    // Images and expanded project descriptions can change the page height.
    if(window.ResizeObserver){
        const layoutObserver = new ResizeObserver(() => {
            invalidateStory();
        });
        layoutObserver.observe(document.body);
    }
    onStoryFrame();
}


/* ==========================================================================
   CUSTOM HUD CURSOR, ASCII crosshair
   ========================================================================== */
/* ==========================================================================
   TEXT SCRAMBLE, used by project names
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
   PROJECT SHELL, SMOOTH HORIZONTAL CAROUSEL (MOUSE WHEEL, DRAG & TOUCH)
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
        // Do NOT intercept vertical wheel, let the page scroll normally
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

/* ==========================================================================
   SCI-FI ID CARD 'ABOUT ME' MODAL SYSTEM
   ========================================================================== */
function setupAboutMeModal() {
    const aboutBtn = document.getElementById('about-me-btn');
    const aboutModal = document.getElementById('about-modal');
    const aboutBackdrop = document.getElementById('about-modal-backdrop');
    const aboutCloseBtn = document.getElementById('about-modal-close');

    if (!aboutModal) return;
    let returnFocus = null;
    let previousOverflow = '';
    let backgroundState = [];

    function openAboutModal() {
        if (aboutModal.classList.contains('active')) return;
        returnFocus = document.activeElement;
        if (!returnFocus || returnFocus === document.body || !returnFocus.getClientRects().length) {
            returnFocus = aboutBtn?.getClientRects().length ? aboutBtn : document.getElementById('nav-burger');
        }
        previousOverflow = document.body.style.overflow;
        const updateDOM = () => {
            aboutModal.classList.add('active');
            aboutModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (window.__lenis) window.__lenis.stop();
            aboutCloseBtn.focus({preventScroll: true});
            backgroundState = Array.from(document.body.children)
                .filter(el => el !== aboutModal && !['SCRIPT', 'STYLE'].includes(el.tagName))
                .map(el => ({el, inert: el.inert}));
            backgroundState.forEach(({el}) => { el.inert = true; });
        };

        updateDOM();
    }

    function closeAboutModal() {
        if (!aboutModal.classList.contains('active')) return;
        const updateDOM = () => {
            backgroundState.forEach(({el, inert}) => { el.inert = inert; });
            backgroundState = [];
            if (returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
            aboutModal.classList.remove('active');
            aboutModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = previousOverflow;
            if (window.__lenis) window.__lenis.start();
        };

        updateDOM();
    }

    if (aboutBtn) aboutBtn.addEventListener('click', openAboutModal);
    if (aboutCloseBtn) aboutCloseBtn.addEventListener('click', closeAboutModal);
    if (aboutBackdrop) aboutBackdrop.addEventListener('click', closeAboutModal);

    document.addEventListener('keydown', (e) => {
        if (!aboutModal.classList.contains('active')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeAboutModal();
        } else if (e.key === 'Tab') {
            const focusable = Array.from(aboutModal.querySelectorAll(
                'a[href], button, input, select, textarea, [tabindex]'
            )).filter(el => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first) { e.preventDefault(); return; }
            if (!aboutModal.contains(document.activeElement) ||
                (e.shiftKey && document.activeElement === first) ||
                (!e.shiftKey && document.activeElement === last)) {
                e.preventDefault();
                (e.shiftKey ? last : first).focus();
            }
        }
    });
}


/* ==========================================================================
   MAGNETIC BUTTON PHYSICS
   ========================================================================== */
function setupMagneticButtons() {
    if (REDUCED_MOTION) return; // Skip magnetic physics if user prefers reduced motion
    if (!FINE_POINTER) return; // no magnetic on touch, saves battery + jank

    const magneticElements = document.querySelectorAll('.magnetic-btn');

    magneticElements.forEach(btn => {
        let rafId = null;
        let tx = 0, ty = 0;
        const render = () => {
            rafId = null;
            btn.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
        };
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;

            const pullFactor = 0.32;
            tx = (e.clientX - btnCenterX) * pullFactor;
            ty = (e.clientY - btnCenterY) * pullFactor;

            if(!rafId) rafId = requestAnimationFrame(render);
        });

        btn.addEventListener('mouseleave', () => {
            if(rafId) cancelAnimationFrame(rafId);
            rafId = null;
            tx = 0; ty = 0;
            btn.style.transform = `translate3d(0, 0, 0)`;
        });
    });
}


/* CONTACT premium spotlight, follows cursor */
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

    let PHRASES = ['About me', 'Dossier', 'ID Card'];
    if(window.JUI_I18N && window.JUI_I18N.DICT[window.JUI_I18N.current]){
        PHRASES[0] = window.JUI_I18N.DICT[window.JUI_I18N.current].nav_about || PHRASES[0];
        typingText.textContent = PHRASES[0];
    }
    // i18n hook, update first phrase when language changes
    window.__updateTypingText = (newText) => {
        PHRASES[0] = newText;
    };
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

    // Variant A, hover scramble for About Me (desktop only, during hold phase)
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

function setupFileDetails(){
    const buttons = document.querySelectorAll('.file-details-btn');
    if(!buttons.length) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'project-details-dialog';
    dialog.setAttribute('aria-labelledby','project-dialog-title');
    dialog.innerHTML = '<button type="button" class="project-dialog-close" aria-label="Close project details">×</button><div class="project-dialog-shell"><div class="project-dialog-main"><h2 id="project-dialog-title"></h2><div class="project-dialog-content"></div></div></div>';
    document.body.append(dialog);
    window.JUI_I18N?.apply(window.JUI_I18N.current);
    let active = null;
    let previousOverflow = '';
    let typingTimer = 0;
    let typingText = '';
    const close = () => dialog.close();
    dialog.querySelector('.project-dialog-close').addEventListener('click',close);
    dialog.addEventListener('click',event => {
        const rect = dialog.getBoundingClientRect();
        if(event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
    });
    dialog.addEventListener('close',() => {
        if(!active) return;
        clearInterval(typingTimer);
        if(active.description) active.description.textContent = typingText;
        active.panel.hidden = true;
        active.marker.replaceWith(active.panel);
        active.button.setAttribute('aria-expanded','false');
        document.body.style.overflow = previousOverflow;
        window.__lenis?.start();
        active.button.focus({preventScroll:true});
        active = null;
    });
    buttons.forEach(button => {
        button.setAttribute('aria-haspopup','dialog');
        button.addEventListener('click',() => {
            if(dialog.open) return;
            const panel = document.getElementById(button.dataset.target);
            if(!panel) return;
            const marker = document.createComment('project details position');
            panel.before(marker);
            active = {panel,marker,button};
            dialog.querySelector('h2').textContent = button.closest('.proj-card').querySelector('.proj-name').textContent;
            dialog.querySelector('.project-dialog-content').append(panel);
            panel.hidden = false;
            const description = panel.querySelector('.file-details-desc');
            typingText = description?.textContent || '';
            if(description && !REDUCED_MOTION) description.textContent = '';
            active.description = description;
            button.setAttribute('aria-expanded','true');
            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            window.__lenis?.stop();
            dialog.showModal();
            dialog.classList.remove('properties-opening');
            void dialog.offsetWidth;
            dialog.classList.add('properties-opening');
            if(description && !REDUCED_MOTION){
                let index = 0;
                const startTyping = () => {
                    if(!dialog.open || !active || active.description !== description) return;
                    typingTimer = window.setInterval(() => {
                        index += 2;
                        description.textContent = typingText.slice(0,index);
                        if(index >= typingText.length) clearInterval(typingTimer);
                    },18);
                };
                window.setTimeout(startTyping,360);
            }
            dialog.querySelector('.project-dialog-close').focus();
        });
    });
}

/* 3D TILT removed for minimalism */

/* ==========================================================================
   PROJECTS PAGING, 3 cards per page, pager built only if needed
   ========================================================================== */
function setupProjectsPaging(){
    const grid = document.querySelector('.projects-grid');
    if(!grid || grid.hasAttribute('data-no-paging')) return;
    const cards = Array.from(grid.querySelectorAll('.proj-card'));
    const PER_PAGE = 3;
    const total = Math.ceil(cards.length / PER_PAGE);
    if(total < 2) return;

    let page = 0;
    const pager = document.createElement('div');
    pager.className = 'projects-pager';
    pager.innerHTML = '<button type="button" class="pager-btn" data-dir="-1" aria-label="Previous projects">←</button>'
        + '<div class="pager-dots"></div>'
        + '<span class="pager-count"><span class="pager-cur">1</span> · ' + total + '</span>'
        + '<button type="button" class="pager-btn" data-dir="1" aria-label="Next projects">→</button>';
    grid.after(pager);

    const dotsBox = pager.querySelector('.pager-dots');
    for(let i = 0; i < total; i++){
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'pager-dot';
        dot.textContent = String(i + 1).padStart(2, '0');
        dot.setAttribute('aria-label', 'Page ' + (i + 1));
        dot.addEventListener('click', ()=>go(i));
        dotsBox.appendChild(dot);
    }
    const dots = Array.from(dotsBox.children);
    const prevBtn = pager.querySelector('[data-dir="-1"]');
    const nextBtn = pager.querySelector('[data-dir="1"]');
    const curEl = pager.querySelector('.pager-cur');

    function render(){
        cards.forEach((card, i)=>{
            const visible = Math.floor(i / PER_PAGE) === page;
            card.hidden = !visible;
            if(visible){
                card.classList.remove('pg-in');
                void card.offsetWidth;
                card.classList.add('pg-in');
            }
        });
        // close any open details on page switch
        grid.querySelectorAll('.file-details').forEach(p=>p.setAttribute('hidden',''));
        grid.querySelectorAll('.file-details-btn').forEach(b=>b.setAttribute('aria-expanded','false'));
        dots.forEach((d, i)=>{
            d.classList.toggle('is-active', i === page);
            if(i === page) d.setAttribute('aria-current','true');
            else d.removeAttribute('aria-current');
        });
        curEl.textContent = String(page + 1);
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
    function go(i){
        const next = ((i % total) + total) % total;
        if(next === page) return;
        page = next;
        render();
    }
    prevBtn.addEventListener('click', ()=>go(page - 1));
    nextBtn.addEventListener('click', ()=>go(page + 1));
    render();
}
