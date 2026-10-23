const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){closeMenu();menuButton.focus()}});
window.dataLayer=window.dataLayer||[];
window.dataLayer.push({event:document.querySelector('article')?'blog_view':'blog_list_view',page_topic:'badminton_womens_singles'});
document.querySelectorAll('[data-track]').forEach(a=>a.addEventListener('click',()=>window.dataLayer.push({event:a.dataset.track,cta_location:a.dataset.location,cta_text:a.textContent.trim(),destination_url:a.href})));
const share=document.querySelector('.share-link');
share?.addEventListener('click',async()=>{const status=document.querySelector('.share-status');try{await navigator.clipboard.writeText(location.href);status.textContent='링크를 복사했습니다.'}catch{status.textContent='주소창의 URL을 복사해주세요.'}});
