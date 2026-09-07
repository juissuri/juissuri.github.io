// Add further images to each project's array to extend its gallery.
(() => {
    const assets = {
        '01': [{src:'assets/images/gibson-air-conditioner.jpeg', alt:'Gibson Ridge: air conditioner asset in Unreal Engine'}],
        '02': [], '03': [], '04': [], '05': [], '06': []
    };
    const requested = new URLSearchParams(location.search).get('project');
    const key = Object.hasOwn(assets, requested) ? requested : '01';
    const scene = document.querySelector('img[src="assets/images/scene-setup.jpg"]');
    if(key === '01' && scene){
        const process = document.createElement('img');
        process.src = 'assets/images/gibson-scene-process.jpeg';
        process.alt = 'Gibson Ridge: scene assembly in Blender';
        process.width = 2560; process.height = 1440;
        process.loading = 'lazy'; process.setAttribute('data-lightbox','');
        const frame = document.createElement('div');
        frame.className = 'process-media process-media--reference';
        frame.append(process); scene.parentElement.before(frame);
    }
    const section = document.querySelector('#project-assets');
    const images = assets[key];
    if(!images.length){section.hidden = true; return;}
    const gallery = section.querySelector('.asset-gallery');
    const slides = section.querySelector('.asset-slides');
    images.forEach((item,index) => {
        const figure = document.createElement('figure');
        figure.className = 'asset-slide'; figure.hidden = index !== 0;
        const image = document.createElement('img');
        image.src = item.src; image.alt = item.alt; image.loading = 'lazy';
        image.setAttribute('data-lightbox','');
        figure.append(image); slides.append(figure);
    });
    let current = 0;
    const buttons = [...gallery.querySelectorAll('button')];
    const show = (next) => {
        current = Math.max(0, Math.min(images.length - 1, next));
        [...slides.children].forEach((slide,index) => {slide.hidden = index !== current;});
        gallery.querySelector('.asset-count').textContent = `${current + 1} · ${images.length}`;
        buttons[0].disabled = current === 0;
        buttons[1].disabled = current === images.length - 1;
    };
    buttons.forEach(button => button.addEventListener('click',() => show(current + Number(button.dataset.step))));
    gallery.addEventListener('keydown',event => {
        if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    let start = null;
    gallery.addEventListener('touchstart',event => {start = event.touches[0].clientX;}, {passive:true});
    gallery.addEventListener('touchend',event => {
        if(start !== null){const delta = start - event.changedTouches[0].clientX; if(Math.abs(delta)>50) show(current + Math.sign(delta));}
        start = null;
    }, {passive:true});
    show(0);
})();
