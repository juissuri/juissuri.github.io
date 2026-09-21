(() => {
    const pages = ['index.html', 'project-view.html', 'project-breakdown.html'];
    const targetOrigin = location.origin === 'null' ? '*' : location.origin;
    const current = () => (location.pathname.split('/').pop() || 'index.html') + location.search + location.hash;
    const valid = route => typeof route === 'string' && pages.includes(route.split(/[?#]/)[0]);
    if (window === window.parent) {
        const shell = new URL('portfolio.html', location.href);
        shell.searchParams.set('page', current());
        location.replace(shell.href);
        return;
    }
    window.addEventListener('message', event => {
        if (event.source !== parent || (location.origin !== 'null' && event.origin !== location.origin) || event.data?.type !== 'jui:navigate' || !valid(event.data.route)) return;
        location.replace(new URL(event.data.route, location.href).href);
    });
    document.addEventListener('click', event => {
        const link = event.target.closest?.('a[href]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.download || (link.target && link.target !== '_self')) return;
        const url = new URL(link.href, location.href);
        if (url.protocol !== location.protocol || url.host !== location.host || url.pathname.slice(0,url.pathname.lastIndexOf('/')) !== location.pathname.slice(0,location.pathname.lastIndexOf('/'))) return;
        const route = url.pathname.split('/').pop() + url.search + url.hash;
        if (!valid(route) || (url.pathname === location.pathname && url.search === location.search)) return;
        event.preventDefault();
        parent.postMessage({type:'jui:route', route}, targetOrigin);
    });
    function report() {
        parent.postMessage({type:'jui:ready', title:document.title, lang:document.documentElement.lang}, targetOrigin);
    }
    window.addEventListener('load', report);
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.documentElement;
        if (root) new MutationObserver(report).observe(root, {attributes:true,attributeFilter:['lang']});
    });
})();
