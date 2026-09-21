const $=s=>document.querySelector(s);$('.menu').addEventListener('click',()=>$('.links').classList.toggle('open'));document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>$('.links').classList.remove('open')));$('#year').textContent=new Date().getFullYear();

const events={
 '2026-09-21':'Aktiviti sekolah',
 '2026-09-23':'Perhimpunan / aktiviti mingguan',
 '2026-10-01':'Program sekolah',
 '2026-10-16':'Aktiviti kokurikulum',
 '2026-11-02':'Program akademik'
};
let view=new Date();view.setDate(1);
const pad=n=>String(n).padStart(2,'0');
function renderCalendar(){const y=view.getFullYear(),m=view.getMonth();$('#monthTitle').textContent=new Intl.DateTimeFormat('ms-MY',{month:'long',year:'numeric'}).format(view);const first=(new Date(y,m,1).getDay()+6)%7,last=new Date(y,m+1,0).getDate(),prev=new Date(y,m,0).getDate();let html='';
for(let i=0;i<42;i++){let n=i-first+1,yy=y,mm=m,muted=false;if(n<1){n=prev+n;mm=m-1;muted=true}else if(n>last){n-=last;mm=m+1;muted=true}if(mm<0){mm=11;yy--}if(mm>11){mm=0;yy++}const key=yy+'-'+pad(mm+1)+'-'+pad(n),today=new Date(),isToday=key===today.getFullYear()+'-'+pad(today.getMonth()+1)+'-'+pad(today.getDate());html+=`<div class="day ${muted?'muted ':''}${isToday?'today ':''}${events[key]?'event':''}"><b>${n}</b>${events[key]?'<span class="event-dot">● '+events[key]+'</span>':''}</div>`}$('#calendarGrid').innerHTML=html}
$('#prevMonth').onclick=()=>{view.setMonth(view.getMonth()-1);renderCalendar()};$('#nextMonth').onclick=()=>{view.setMonth(view.getMonth()+1);renderCalendar()};renderCalendar();

const key='sksp_bilik_v1';let bookings=JSON.parse(localStorage.getItem(key)||'[]');
function renderBookings(){const box=$('#bookingList');if(!bookings.length){box.innerHTML='<p style="color:#8191a0;font-size:11px">Belum ada penggunaan direkodkan.</p>';return}bookings.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));box.innerHTML=bookings.slice(-30).reverse().map((x,i)=>`<div class="booking"><b>${x.room}</b><span>${x.date} · ${x.time}</span><small>${x.name} · ${x.className}</small></div>`).join('')}
$('#roomForm').addEventListener('submit',e=>{e.preventDefault();const item={name:$('#nama').value.trim(),className:$('#kelas').value.trim(),date:$('#tarikh').value,time:$('#waktu').value,room:$('#bilikSelect').value};bookings.push(item);localStorage.setItem(key,JSON.stringify(bookings));renderBookings();e.target.reset()});$('#clearBookings').onclick=()=>{if(confirm('Kosongkan semua rekod pada peranti ini?')){bookings=[];localStorage.removeItem(key);renderBookings()}};renderBookings();