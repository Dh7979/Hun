/* RALLY AGAIN measurement v1. Pending deployment approval. */
(function(){'use strict';
var KEY='rally_consent_v1',consent={analytics:false,marketing:false},chosen=false,loaded=false,analyticsReady=false,marketingReady=false;
try{var saved=JSON.parse(localStorage.getItem(KEY));if(saved&&saved.version===1&&Date.now()-Date.parse(saved.at)<180*86400000){consent={analytics:saved.analytics===true,marketing:saved.marketing===true};chosen=true;}}catch(e){}
window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
var pageType=/^\/blog\/(?:index\.html)?$/.test(location.pathname)?'blog_index':location.pathname.indexOf('/blog/')===0?'blog_article':/^\/about\//.test(location.pathname)?'about':location.pathname==='/privacy.html'?'privacy':'landing';
var contentId=pageType==='blog_article'?'womens-singles-guide':undefined;
var keys=['guide_name','faq_id','question_index','match_id','round','cta_location','destination_url','method','read_percent','active_seconds','section_id','nav_target','resource_type','link_domain'];
function base(){var p={page_type:pageType,page_topic:'badminton_womens_singles',content_id:contentId,marketing_consent:consent.marketing};keys.forEach(function(k){p[k]=undefined;});return p;}
function push(name,p){window.dataLayer.push(Object.assign(base(),p||{},{event:name}));}
function cleanURL(raw){try{var u=new URL(raw,location.href);return u.origin+u.pathname;}catch(e){return '';}}
var lastGuide='space';
function track(name,p){p=p||{};if(!consent.analytics&&!consent.marketing)return;
if(name==='guide_select'){if(p.guide_name===lastGuide)return;lastGuide=p.guide_name;}
if(name==='replay_match'||name==='cta_click'){name='highlight_click';}
var data={};if(p.content_id)data.content_id=p.content_id;keys.forEach(function(k){if(p[k]!==undefined)data[k]=p[k];});
if(data.destination_url)data.destination_url=cleanURL(data.destination_url);
if(name==='highlight_click'){var isQf=/15397925/.test(data.destination_url);data.match_id=isQf?'ag2026_qf_an_intanon':'ag2026_final_an_yamaguchi';data.round=isQf?'quarter_final':'final';}
push(name,data);}
window.RallyMeasure={track:track};
function apply(){var selected=document.querySelector('[data-guide][aria-selected="true"]');if(selected)lastGuide=selected.dataset.guide;gtag('consent','update',{analytics_storage:consent.analytics?'granted':'denied',ad_storage:consent.marketing?'granted':'denied',ad_user_data:consent.marketing?'granted':'denied',ad_personalization:consent.marketing?'granted':'denied'});
if(!consent.analytics&&!consent.marketing)return;
if(!loaded){loaded=true;if(location.hostname==='rally-again.vercel.app'){push('gtm.js',{'gtm.start':Date.now()});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=GTM-NM26FJBC';document.head.appendChild(s);}}
if(consent.analytics&&!analyticsReady){analyticsReady=true;push('analytics_ready');}
if(consent.marketing&&!marketingReady){marketingReady=true;push('marketing_ready');}
}
function pageEvent(){var name={landing:'landing_view',blog_index:'blog_list_view',blog_article:'blog_view'}[pageType];if(name)track(name);}
function choose(a,m){var had=consent.analytics||consent.marketing;var downgrade=(consent.analytics&&!a)||(consent.marketing&&!m);consent={analytics:a,marketing:m};try{localStorage.setItem(KEY,JSON.stringify({version:1,analytics:a,marketing:m,at:new Date().toISOString()}));}catch(e){}chosen=true;
if(downgrade){gtag('consent','update',{analytics_storage:a?'granted':'denied',ad_storage:m?'granted':'denied',ad_user_data:m?'granted':'denied',ad_personalization:m?'granted':'denied'});if(window.fbq&&!m)window.fbq('consent','revoke');document.cookie.split(';').forEach(function(c){var n=c.split('=')[0].trim();if(/^(_ga|_gid|_gat|_fbp|_fbc)/.test(n)){document.cookie=n+'=;Max-Age=0;path=/';document.cookie=n+'=;Max-Age=0;path=/;domain='+location.hostname;document.cookie=n+'=;Max-Age=0;path=/;domain=.'+location.hostname;}});location.reload();return;}
apply();document.getElementById('rally-consent').hidden=true;if(!had)pageEvent();}
function init(){
var style=document.createElement('style');style.textContent='#rally-consent{position:fixed;inset:auto 12px 12px;max-width:760px;margin:auto;background:#fff;color:#151b18;padding:20px;box-shadow:0 4px 30px #0005;z-index:9999;border:1px solid #35443a;font:15px/1.5 system-ui}#rally-consent[hidden]{display:none}#rally-consent button,.rally-cookie-settings{font:inherit;padding:9px 12px;margin:6px 6px 0 0;cursor:pointer}#rally-consent a{color:#164c2b}.rally-cookie-settings{display:inline-block}';document.head.appendChild(style);
var panel=document.createElement('section');panel.id='rally-consent';panel.setAttribute('aria-label','쿠키 및 측정 동의');panel.hidden=chosen;
panel.innerHTML='<strong>쿠키 및 측정 설정</strong><p>방문 분석은 Google Analytics, 광고 성과 측정은 Meta 픽셀을 사용합니다. 선택하기 전에는 측정 도구를 불러오지 않습니다. 거부해도 사이트를 이용할 수 있고 하단에서 변경할 수 있습니다. <a href="/privacy.html">개인정보 및 쿠키 안내</a></p><button type="button" data-consent="none">모두 거부</button><button type="button" data-consent="analytics">분석만 허용</button><button type="button" data-consent="all">모두 허용</button>';
document.body.appendChild(panel);panel.addEventListener('click',function(e){var b=e.target.closest('[data-consent]');if(!b)return;choose(b.dataset.consent!=='none',b.dataset.consent==='all');});
var settings=document.createElement('button');settings.type='button';settings.className='rally-cookie-settings';settings.textContent='쿠키 설정';settings.addEventListener('click',function(){panel.hidden=false;panel.querySelector('button').focus();});(document.querySelector('footer')||document.body).appendChild(settings);

var states=new WeakMap();document.querySelectorAll('details').forEach(function(d,i){states.set(d,d.open);d.addEventListener('toggle',function(){var prev=states.get(d);states.set(d,d.open);if(d.open&&!prev)track('faq_open',{faq_id:(pageType==='landing'?'landing_':'article_')+String(i+1).padStart(2,'0'),question_index:i+1});});});
document.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;var u;try{u=new URL(a.href);}catch(err){return;}var loc=a.closest('#sources')?(pageType==='blog_article'?'article_sources':'landing_sources'):a.closest('article')?'article_body':a.closest('header')?'header':a.closest('footer')?'footer':'body';
if(u.hostname==='chzzk.naver.com'&&/\/(15397925|15430303)$/.test(u.pathname)&&!a.hasAttribute('data-track')){track('highlight_click',{cta_location:loc,destination_url:a.href});return;}
if(a.hasAttribute('data-track'))return;
if(u.origin===location.origin){if(pageType==='blog_index'&&u.pathname==='/blog/womens-singles-guide.html'){track('blog_card_click',{cta_location:'blog_list',content_id:'womens-singles-guide'});}else track('navigation_click',{nav_target:u.hash||u.pathname,cta_location:loc});}
else if(/^https?:$/.test(u.protocol)){track('resource_click',{resource_type:u.hostname==='www.yonex.com'?'profile':'source',link_domain:u.hostname,cta_location:loc,destination_url:a.href});}
});
if(pageType==='landing'&&window.IntersectionObserver){['guide','players','faq','sources','replay'].forEach(function(id){var el=document.getElementById(id),timer=null,seen=false;if(!el)return;var io=new IntersectionObserver(function(es){var visible=es[0].intersectionRatio>=0.5;if(visible&&!seen){timer=setTimeout(function(){if(document.visibilityState==='visible'&&(consent.analytics||consent.marketing)){seen=true;track('section_view',{section_id:id});io.disconnect();}},1000);}else clearTimeout(timer);},{threshold:0.5});io.observe(el);});}
if(pageType==='blog_article'){var active=0,read=false;setInterval(function(){if(!consent.analytics||document.visibilityState!=='visible'||!document.hasFocus())return;active++;var article=document.querySelector('article');if(!article)return;var box=article.getBoundingClientRect(),ratio=Math.max(0,Math.min(1,(innerHeight-box.top)/box.height));if(!read&&active>=30&&ratio>=0.9){read=true;track('article_read',{read_percent:90,active_seconds:active});}},1000);}
apply();pageEvent();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
