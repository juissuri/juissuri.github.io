document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

const toggleLogo = (elementId) => {
    const el = document.getElementById(elementId);
    if(el) {
        el.addEventListener('click', () => {
            el.classList.toggle('logo-active');
        });
    }
};
toggleLogo('header-logo');
toggleLogo('footer-logo');

const audioElement = document.getElementById('bg-audio');
let isAudioPlaying = false;
let currentRotation = 0;
const minRotation = -135;
const maxRotation = 135;

const knobContainer = document.getElementById('volume-knob-container');
const knobDisc = document.getElementById('knob-disc');
const knobRing = document.getElementById('knob-ring');

// Setup base volume initially
if (audioElement) audioElement.volume = 0.5;

function toggleAudio() {
    if (!audioElement) return;

    if (!isAudioPlaying && currentRotation <= minRotation + 10) {
        currentRotation = 0;
        updateKnobVisuals();
        updateVolume();
    }

    if (!isAudioPlaying) {
        isAudioPlaying = true;
        knobRing.classList.add('active');

        audioElement.play().catch(e => {
            console.log("Audio play blocked by browser policy:", e);
            isAudioPlaying = false;
            knobRing.classList.remove('active');
        });
    } else {
        audioElement.pause();
        isAudioPlaying = false;
        knobRing.classList.remove('active');
    }
}

if (knobContainer) {
    let dragThresholdExceeded = false;
    let startY = 0;

    knobContainer.addEventListener('click', (e) => {
        if (dragThresholdExceeded) return;
        toggleAudio();
    });

    knobContainer.addEventListener('mousedown', (e) => {
        dragThresholdExceeded = false;
        startY = e.clientY;

        const onMouseMove = (moveEvent) => {
            let deltaY = startY - moveEvent.clientY;
            if (Math.abs(deltaY) > 2) {
                dragThresholdExceeded = true;
                document.body.classList.add('dragging');
            }

            if (dragThresholdExceeded) {
                currentRotation += deltaY * 1.5;
                startY = moveEvent.clientY;
                updateKnobVisuals();
                updateVolume();
            }
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove('dragging');

            setTimeout(() => {
                dragThresholdExceeded = false;
            }, 50);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    knobContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (!isAudioPlaying) {
            toggleAudio();
        }
        let delta = e.deltaY < 0 ? 15 : -15;
        currentRotation += delta;
        updateKnobVisuals();
        updateVolume();
    }, { passive: false });
}

function updateKnobVisuals() {
    currentRotation = Math.max(minRotation, Math.min(maxRotation, currentRotation));
    if(knobDisc) {
        knobDisc.style.transform = `rotate(${currentRotation}deg)`;
    }
}

function updateVolume() {
    let rotationRange = maxRotation - minRotation;
    let currentRange = currentRotation - minRotation;
    let percentage = currentRange / rotationRange;

    if (audioElement) {
        audioElement.volume = Math.max(0, Math.min(1, percentage));
    }
}

updateKnobVisuals();
updateVolume();
