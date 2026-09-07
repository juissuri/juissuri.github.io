/* Archive folders: the existing card content and controls stay intact. */
.projects-grid{gap:3.5rem 1.5rem;padding-top:2rem;align-items:start}
.folder-card{
    --folder-surface:linear-gradient(145deg,#202020 0%,#191919 28%,#111111 62%,#0B0B0B 100%);
    overflow:visible;
    border-radius:0 15px 15px 15px;
    border-color:#373737;
    background:var(--folder-surface);
    box-shadow:0 16px 32px #0005,inset 0 1px 0 #FFFFFF24,inset 0 -1px 0 #ffffff05;
    transition:transform 480ms cubic-bezier(.22,1,.36,1),border-color 300ms ease;
}
.folder-tab{
    position:absolute;left:-1px;top:-30px;
    display:flex;align-items:center;gap:.7rem;
    height:30px;min-width:146px;padding:0 1.2rem;
    border:1px solid #373737;border-bottom:0;
    border-radius:12px 18px 0 0;background:linear-gradient(120deg,#2B2B2B,#1B1B1B);
    box-shadow:inset 0 1px 0 #FFFFFF20;
    font-family:var(--font-mono);font-size:.63rem;line-height:1;
    letter-spacing:.14em;color:#DEDEDE;
    transition:border-color 250ms ease,color 250ms ease;
}
.folder-tab-mark{width:13px;height:9px;border:1px solid #BBBBBB;border-radius:2px;position:relative}
.folder-tab-mark::before{content:'';position:absolute;top:-4px;left:-1px;width:6px;height:3px;border:1px solid #BBBBBB;border-bottom:0;border-radius:2px 2px 0 0}
.folder-card::before{
    content:'';position:absolute;top:-10px;left:158px;right:14px;height:6px;
    border:1px solid #3E3E3E;border-bottom:0;border-radius:6px 6px 0 0;
    background:linear-gradient(90deg,#303030,#181818);z-index:-1;pointer-events:none;
    transition:transform 480ms cubic-bezier(.22,1,.36,1);
}
.folder-card .proj-media{
    margin:12px 12px 0;border:1px solid #FFFFFF40;border-radius:7px;
    box-shadow:0 6px 16px #0006;
    transition:transform 550ms cubic-bezier(.22,1,.36,1),border-color 300ms ease;
}
.folder-card .proj-body{padding:1.3rem 1.35rem 1.4rem;gap:.65rem}
.folder-card .proj-name{font-size:1.65rem;line-height:1.15;letter-spacing:.04em;color:#F2F2F2}
.folder-card .proj-meta{color:#C4C4C4}
.folder-card .proj-tags{margin:.1rem 0 .6rem;gap:.4rem}
.folder-card .proj-tags span{border-radius:4px;border-color:#FFFFFF30;background:linear-gradient(135deg,#FFFFFF14,#FFFFFF05);color:#D4D4D4}
.folder-card .proj-actions{padding-top:.8rem;border-top:1px solid #ffffff12;justify-content:space-between}
.folder-card .file-details{margin:0 1.35rem 1.4rem;border-top-color:#ffffff24}
.folder-card:hover{background:var(--folder-surface);transform:none}
.folder-card:focus-within,.folder-card:hover{border-color:#777777}
.folder-card:focus-within .folder-tab,.folder-card:hover .folder-tab{border-color:#777777;color:#FFFFFF}
.folder-card:focus-within .proj-media,.folder-card:hover .proj-media{border-color:#FFFFFF70}
.folder-card a:focus-visible,.folder-card button:focus-visible{outline:2px solid #E0E0E0;outline-offset:4px}
@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){
    .folder-card:hover{transform:translateY(-3px)}
    .folder-card:hover::before{transform:translateY(-3px)}
    .folder-card:hover .proj-media{transform:translateY(-2px)}
    .folder-card:hover .proj-media img{transform:scale(1.035)}
}
@media(prefers-reduced-motion:no-preference){
    .folder-card .file-details:not([hidden]){animation:folderDetailsIn 320ms cubic-bezier(.22,1,.36,1)}
}
@keyframes folderDetailsIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
@media(prefers-reduced-motion:reduce),(hover:none){
    .folder-card:hover .proj-media img{transform:none}
}
@media(prefers-reduced-motion:reduce){
    .folder-card,.folder-tab,.folder-card::before,.folder-card .proj-media{transition:none}
}
@media(max-width:700px){
    .projects-grid{row-gap:3.3rem;padding-top:2rem}
    .folder-card .proj-body{padding:1.1rem}
    .folder-card .proj-name{font-size:1.5rem}
    .folder-card .file-details{margin-left:1.1rem;margin-right:1.1rem}
}
@media print{
    .folder-card{margin-top:2rem;box-shadow:none;break-inside:avoid}
    .folder-card::before{display:none}
}
