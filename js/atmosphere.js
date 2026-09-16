(() => {
    // Runs inside the content iframe, where the waveform toggles live.
    const audio = new Audio('assets/audio/tech-bass-intro.mp3');
    audio.preload = 'none';
    audio.loop = true;
    audio.volume = 0;

    // Waveform toggles placed after the language switcher in the hero nav.
    // No floating fallback: nothing is rendered bottom-right anymore.
    const buttons = Array.from(document.querySelectorAll('[data-music-wave]'));
    if (!buttons.length) return;
    const status = document.createElement('span');
    status.className = 'ascii-sound-notice';
    status.setAttribute('role', 'status');
    document.body.append(status);

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const labels = {
        en: ['Play background music', 'Pause background music', 'Unable to play audio. Try again.'],
        ru: ['Включить фоновую музыку', 'Выключить фоновую музыку', 'Не удалось включить звук. Попробуйте ещё раз.'],
        de: ['Hintergrundmusik einschalten', 'Hintergrundmusik ausschalten', 'Audio konnte nicht abgespielt werden. Erneut versuchen.'],
        uk: ['Увімкнути фонову музику', 'Вимкнути фонову музику', 'Не вдалося увімкнути звук. Спробуйте ще раз.']
    };
    let wanted = false;
    let playing = false;
    let revision = 0;
    let fadeFrame = 0;
    const storageKey = 'jui-atmosphere-session';
    let savedPosition = 0;
    let resumeAfterGesture = false;
    let leaving = false;

    // WebAudio rhythm analyser: drives the bars in time with the music.
    let actx = null;
    let analyser = null;
    let freqData = null;
    let graphBuilt = false;
    let vizFrame = 0;
    function ensureGraph() {
        if (graphBuilt) return true;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        try {
            actx = new AC();
            const src = actx.createMediaElementSource(audio);
            analyser = actx.createAnalyser();
            analyser.fftSize = 64;
            analyser.smoothingTimeConstant = 0.82;
            freqData = new Uint8Array(analyser.frequencyBinCount);
            src.connect(analyser);
            analyser.connect(actx.destination);
            graphBuilt = true;
            return true;
        } catch {
            return false;
        }
    }
    function stopViz() {
        cancelAnimationFrame(vizFrame);
        vizFrame = 0;
        buttons.forEach(btn => {
            btn.querySelectorAll('.wave-bars i').forEach(bar => { bar.style.transform = ''; });
        });
    }
    function startViz() {
        if (vizFrame || !analyser || reduced.matches) return;
        const loop = () => {
            vizFrame = requestAnimationFrame(loop);
            analyser.getByteFrequencyData(freqData);
            const usable = Math.max(4, Math.floor(freqData.length * 0.72));
            buttons.forEach(btn => {
                const bars = btn.querySelectorAll('.wave-bars i');
                const n = bars.length;
                bars.forEach((bar, i) => {
                    const bin = freqData[Math.floor((i / n) * usable)];
                    const v = bin / 255;
                    bar.style.transform = `scaleY(${(0.22 + v * 1.7).toFixed(2)})`;
                });
            });
        };
        loop();
    }

    function save() {
        if (leaving) return;
        try {
            sessionStorage.setItem(storageKey, JSON.stringify({on: wanted || resumeAfterGesture, position: audio.readyState ? audio.currentTime : savedPosition}));
        } catch {}
    }
    function restorePosition() {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = savedPosition % audio.duration;
        }
    }
    audio.addEventListener('loadedmetadata', restorePosition);
    async function resume() {
        wanted = true;
        resumeAfterGesture = false;
        const request = ++revision;
        render();
        try {
            ensureGraph();
            if (actx && actx.state === 'suspended') await actx.resume();
            await audio.play();
            if (request !== revision) return;
            playing = true;
            startViz();
            fade(.22);
            save();
        } catch (error) {
            if (request !== revision) return;
            wanted = playing = false;
            stopViz();
            resumeAfterGesture = error.name === 'NotAllowedError';
            if (!resumeAfterGesture) status.textContent = copy()[2];
        }
        render();
    }
    function restore() {
        leaving = false;
        try {
            const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
            savedPosition = Number.isFinite(saved?.position) ? Math.max(0, saved.position) : 0;
            if (audio.readyState) restorePosition();
            if (saved?.on) resume();
        } catch {}
    }
    const copy = () => labels[document.documentElement.lang] || labels.en;
    function render() {
        const dict = window.JUI_I18N?.DICT?.[document.documentElement.lang];
        const onText = dict?.music_state_on ?? 'ON';
        const offText = dict?.music_state_off ?? 'OFF';
        buttons.forEach(btn => {
            btn.setAttribute('aria-pressed', String(wanted));
            btn.setAttribute('aria-label', copy()[wanted ? 1 : 0]);
            btn.title = copy()[wanted ? 1 : 0] + ' · Tech Bass Intro';
            btn.classList.toggle('is-playing', playing && wanted);
            btn.classList.toggle('is-loading', wanted && !playing);
            btn.setAttribute('aria-busy', String(wanted && !playing));
            const stateEl = btn.querySelector('[data-music-state]');
            if (stateEl) stateEl.textContent = wanted ? onText : offText;
        });
    }
    function fade(target, done) {
        cancelAnimationFrame(fadeFrame);
        const start = performance.now();
        const from = audio.volume;
        function step(now) {
            const t = Math.min(1, (now - start) / 650);
            audio.volume = Math.max(0, Math.min(1, from + (target - from) * t));
            if (t < 1) fadeFrame = requestAnimationFrame(step);
            else done?.();
        }
        fadeFrame = requestAnimationFrame(step);
    }
    buttons.forEach(btn => {
        btn.addEventListener('click', async () => {
            resumeAfterGesture = false;
            wanted = !wanted;
            const request = ++revision;
            cancelAnimationFrame(fadeFrame);
            status.textContent = '';
            render();
            save();
            if (!wanted) {
                stopViz();
                fade(0, () => { audio.pause(); playing = false; render(); });
                return;
            }
            try {
                ensureGraph();
                if (actx && actx.state === 'suspended') await actx.resume();
                await audio.play();
                if (request !== revision) return;
                playing = true;
                render();
                startViz();
                fade(.22);
            } catch {
                if (request !== revision) return;
                wanted = playing = false;
                stopViz();
                status.textContent = copy()[2];
                save();
                render();
            }
        });
    });
    audio.addEventListener('error', () => {
        ++revision;
        cancelAnimationFrame(fadeFrame);
        wanted = playing = false;
        stopViz();
        status.textContent = copy()[2];
        render();
    });
    window.addEventListener('pagehide', () => {
        save();
        leaving = true;
        ++revision;
        cancelAnimationFrame(fadeFrame);
        stopViz();
        audio.pause();
        wanted = playing = false;
        render();
    });
    window.addEventListener('pageshow', event => { if (event.persisted) restore(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
    audio.addEventListener('timeupdate', save);
    document.addEventListener('click', event => {
        if (resumeAfterGesture && !event.target.closest?.('[data-music-wave]')) resume();
    });
    reduced.addEventListener('change', () => { playing && wanted ? startViz() : stopViz(); render(); });
    new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
    render();
    restore();
})();
