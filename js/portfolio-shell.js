(() => {
    const frame = document.getElementById('portfolio-page');
    const allowed = ['index.html','project-view.html','project-breakdown.html'];
    const targetOrigin = location.origin === 'null' ? '*' : location.origin;
    const valid = route => typeof route === 'string' && allowed.includes(route.split(/[?#]/)[0]);
    function readRoute() {
        const route = new URLSearchParams(location.search).get('page');
        return valid(route) ? route : 'index.html';
    }
    function navigate(route, push) {
        if (!valid(route)) return;
        if (push) {
            const url = new URL(location.href);
            url.searchParams.set('page',route);
            history.pushState(null,'',url);
        }
        document.body.classList.add('is-loading');
        frame.contentWindow.postMessage({type:'jui:navigate',route}, targetOrigin);
    }
    window.addEventListener('message', event => {
        if (event.source !== frame.contentWindow || (location.origin !== 'null' && event.origin !== location.origin)) return;
        if (event.data?.type === 'jui:route') navigate(event.data.route,true);
        if (event.data?.type === 'jui:ready') {
            document.body.classList.remove('is-loading');
            if (typeof event.data.title === 'string') document.title = event.data.title;
            if (['en','ru','de','uk'].includes(event.data.lang)) document.documentElement.lang = event.data.lang;
        }
    });
    window.addEventListener('popstate', () => navigate(readRoute(),false));
    frame.src = readRoute();
})();
