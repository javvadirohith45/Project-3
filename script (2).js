(() => {
  const ready = () => {
    document.body.classList.add('js-ready','page-enter');
    const reveals=[...document.querySelectorAll('.reveal')];
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');io.unobserve(entry.target)}}),{threshold:.08});
      reveals.forEach((el,i)=>{el.style.transitionDelay=Math.min(i*65,420)+'ms';io.observe(el)});
    }else reveals.forEach(el=>el.classList.add('show'));
    const bar=document.querySelector('.progress span');
    const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;if(bar)bar.style.width=(max>0?window.scrollY/max*100:0)+'%'};
    addEventListener('scroll',update,{passive:true});update();
    const current=location.pathname.split('/').pop()||'index.html';
    document.querySelectorAll('.menu a').forEach(a=>{const href=(a.getAttribute('href')||'').split('/').pop().split('?')[0].split('#')[0];if(href===current)a.classList.add('active')});
    const transition=document.querySelector('.page-transition');
    document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||a.target==='_blank')return;e.preventDefault();if(transition)transition.classList.add('show');setTimeout(()=>location.href=href,330)}));
    document.querySelectorAll('.btn').forEach(btn=>btn.addEventListener('click',()=>sparkleBurst(btn)));
    document.querySelectorAll('.icon-cloud span,.love-art').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
  };
  function sparkleBurst(origin){const r=origin.getBoundingClientRect();for(let i=0;i<10;i++){const s=document.createElement('i');s.className='spark';s.style.left=(r.left+r.width/2)+'px';s.style.top=(r.top+r.height/2)+'px';s.style.setProperty('--dx',((Math.random()-.5)*170)+'px');s.style.setProperty('--dy',((Math.random()-.5)*120)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),1150)}}
  window.heartBurst=(count=50)=>{const icons=['❤️','💗','💖','💘','💞','✨','💍','🥹','🌹','🫶🏻'];for(let i=0;i<count;i++){const s=document.createElement('span');s.textContent=icons[Math.floor(Math.random()*icons.length)];s.style.position='fixed';s.style.left=(50+(Math.random()*60-30))+'vw';s.style.top=(52+(Math.random()*16-8))+'vh';s.style.zIndex='9999';s.style.pointerEvents='none';s.style.fontSize=(18+Math.random()*24)+'px';document.body.appendChild(s);const dx=Math.random()*440-220,dy=-(120+Math.random()*460),rot=Math.random()*540-270;s.animate([{transform:'translate(0,0) scale(.35) rotate(0deg)',opacity:0},{transform:`translate(${dx}px,${dy}px) scale(1.25) rotate(${rot}deg)`,opacity:1},{transform:`translate(${dx*1.15}px,${dy*1.18}px) scale(.35) rotate(${rot*1.5}deg)`,opacity:0}],{duration:1500+Math.random()*900,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish=()=>s.remove()}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
