(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var css=function(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()};
var $=function(i){return document.getElementById(i)};

// ticker (home page only)
var tk=$('tk');
if(tk){var tech=['Web Apps','Mobile Apps','AI Automation','Cloud','E-commerce','CCTV','Biometric','GPS Tracking','Smart Locks','Networking','Bulk SMS','IVR','SEO','Surveys and M&E','Cyber Security','Training'];
tk.innerHTML=tech.concat(tech).map(function(t){return '<span>'+t+'</span>'}).join('')}

// network canvas
var cv=$('net'),cx=cv.getContext('2d'),W=0,H=0,pts=[],m={x:-999,y:-999};
function size(){var r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);var n=Math.round(Math.min(90,W*H/14000));pts=[];for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35})}
function draw(){var a=css('--accent'),g=css('--gold');cx.clearRect(0,0,W,H);
for(var i=0;i<pts.length;i++){var p=pts[i];
if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){cx.globalAlpha=(1-d/120)*.45;cx.strokeStyle=a;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
var mx=p.x-m.x,my=p.y-m.y,md=Math.sqrt(mx*mx+my*my);
if(md<150){cx.globalAlpha=(1-md/150)*.8;cx.strokeStyle=g;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}
cx.globalAlpha=.9;cx.fillStyle=a;cx.beginPath();cx.arc(p.x,p.y,1.8,0,6.283);cx.fill()}
cx.globalAlpha=1;if(!reduce)requestAnimationFrame(draw)}
var top=document.querySelector('.top');
top.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
top.addEventListener('pointerleave',function(){m.x=m.y=-999});
addEventListener('resize',function(){size();if(reduce)draw()});
size();draw();

// scroll reveal
document.documentElement.classList.add('js');
var rv=document.querySelectorAll('.card,.cols>div,.step,details,section h2,.sub,.strip .wrap');
if(reduce||!('IntersectionObserver' in window)){rv.forEach(function(e){e.classList.add('reveal','in')})}
else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.style.transitionDelay=''},1000)}})},{threshold:.12});
rv.forEach(function(e,i){e.classList.add('reveal');e.style.transitionDelay=(i%4)*70+'ms';io.observe(e)})}

// card glow
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});

// inquiry form: submits to Jotform in the background
var $=function(i){return document.getElementById(i)};
var JF={id:'263298051670056',map:{n:[3,'fullName',['first']],e:[4,'email'],ph:[5,'phoneNumber',['full']],t:[6,'inquiryType'],c:[7,'courseOfInterest'],m:[8,'message']}};
var f=$('f');
if(f){var ifr=document.createElement('iframe');ifr.name='jf';ifr.hidden=true;ifr.title='';document.body.appendChild(ifr);var sent=false;
ifr.addEventListener('load',function(){if(!sent)return;sent=false;f.reset();$('sb').disabled=false;$('sb').textContent='Send inquiry';$('fs').textContent='Thank you! We have received your inquiry and will contact you soon.'});
f.addEventListener('submit',function(ev){ev.preventDefault();if($('hp').value)return;
var jf=document.createElement('form');jf.method='post';jf.action='https://submit.jotform.com/submit/'+JF.id;jf.target='jf';jf.style.display='none';
var add=function(k,v){var i=document.createElement('input');i.type='hidden';i.name=k;i.value=v;jf.appendChild(i)};
add('formID',JF.id);add('simple_spc',JF.id+'-'+JF.id);
Object.keys(JF.map).forEach(function(k){var d=JF.map[k],v=$(k).value,b='q'+d[0]+'_'+d[1];add(b,v);(d[2]||[]).forEach(function(s){add(b+'['+s+']',v)})});
document.body.appendChild(jf);sent=true;$('sb').disabled=true;$('sb').textContent='Sending...';$('fs').textContent='';jf.submit();setTimeout(function(){jf.remove()},3000)})}

// certificate lightbox
var lb=document.getElementById('lb');
if(lb){var li=lb.querySelector('img'),closeLb=function(){lb.hidden=true};
document.querySelectorAll('.cert').forEach(function(b){b.addEventListener('click',function(){var im=b.querySelector('img');li.src=im.src;li.alt=im.alt;lb.hidden=false;lb.querySelector('.lbx').focus()})});
lb.addEventListener('click',function(e){if(e.target!==li)closeLb()});
addEventListener('keydown',function(e){if(e.key==='Escape')closeLb()})}

// terminal (home page only)
var tb=$('tbody');
if(tb){
var steps=[['anvex build --type web-app','built, tested and deployed'],['anvex install --devices cctv,biometric,gps','installed and configured on site'],['anvex send --channel bulk-sms','delivered via licensed telecom partners'],['anvex survey --method kii,fgd','data collected and analysed'],['anvex train --course ai-prompt-engineering','batch ready in Dhangadhi']];
var esc=function(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')};
var render=function(done,typing){var o='';done.forEach(function(s){o+='<span class="p">$</span> '+esc(s[0])+'\n<span class="ok">ok</span>  '+esc(s[1])+'\n\n'});
if(typing!==null)o+='<span class="p">$</span> '+esc(typing)+'<span class="cur"></span>';tb.innerHTML=o};
if(reduce){render(steps.slice(0,3),null)}else{
var si=0,done=[];
var run=function(){if(si>=steps.length){setTimeout(function(){si=0;done=[];run()},3200);return}
var cmd=steps[si][0],i=0;
(function type(){render(done,cmd.slice(0,i));if(i++<cmd.length)setTimeout(type,38);else setTimeout(function(){done.push(steps[si]);if(done.length>3)done.shift();si++;render(done,'');setTimeout(run,1100)},500)})()};
run()}}
})();
