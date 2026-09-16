(() => {
    const params = new URLSearchParams(location.search);
    const isBreakdown = location.pathname.endsWith('project-breakdown.html');
    const maxProject = isBreakdown ? 6 : 3;
    const current = Number(params.get('id') || params.get('project') || 1);
    const safe = Number.isInteger(current) && current >= 1 && current <= maxProject ? current : 1;
    const next = safe === maxProject ? 1 : safe + 1;
    const nextLink = document.querySelector('[data-project-next]');
    const backLink = document.querySelector('[data-project-back]');
    if(nextLink){
        nextLink.href = isBreakdown ? `project-breakdown.html?project=${String(next).padStart(2,'0')}` : `project-view.html?id=${String(next).padStart(2,'0')}`;
    }
    if(window === window.parent && backLink && document.referrer.startsWith(location.origin)){
        backLink.addEventListener('click', event => {event.preventDefault(); history.back();});
    }
})();
