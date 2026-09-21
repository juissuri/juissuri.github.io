// Add further images to each project's array to extend its gallery.
(() => {
    const assets = {
        '01': [{src:'assets/images/gibson-air-conditioner.jpeg', alt:'Gibson Ridge: air conditioner asset in Unreal Engine'}],
        '02': [], '03': [], '04': [], '05': [], '06': []
    };
    const requested = new URLSearchParams(location.search).get('project');
    const key = Object.hasOwn(assets, requested) ? requested : '01';
    const section = document.querySelector('#project-assets');
    if(!section) return;
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
        const stage = document.createElement('div');
        stage.className = 'asset-stage';
        stage.append(image);
        const caption = document.createElement('figcaption');
        caption.className = 'asset-caption';
        caption.innerHTML = '<small>ASSET 01</small><h3 data-i18n="asset_ac">Air conditioner</h3><dl><div><dt data-i18n="asset_project">PROJECT</dt><dd>Gibson Ridge</dd></div><div><dt data-i18n="details_engine_label">ENGINE</dt><dd>Unreal Engine 5</dd></div><div><dt data-i18n="asset_material">MATERIAL</dt><dd>M_Conditioner</dd></div><div><dt>UV</dt><dd>1</dd></div></dl>';
        figure.append(stage,caption); slides.append(figure);
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
    gallery.addEventListener('touchstart',event => {
        start = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
    }, {passive:true});
    gallery.addEventListener('touchend',event => {
        if(start !== null && event.changedTouches.length){
            const delta = start.x - event.changedTouches[0].clientX;
            const vertical = start.y - event.changedTouches[0].clientY;
            if(Math.abs(delta)>50 && Math.abs(delta)>Math.abs(vertical)*1.3) show(current + Math.sign(delta));
        }
        start = null;
    }, {passive:true});
    gallery.addEventListener('touchcancel',() => {start = null;}, {passive:true});
    show(0);
})();
