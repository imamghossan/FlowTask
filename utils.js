function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtDate(d){
  const m=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  const dt=d?new Date(d):new Date(); return dt.getDate()+' '+m[dt.getMonth()]+' '+dt.getFullYear();
}
function greeting(){ const h=new Date().getHours(); return h<12?'Selamat pagi':h<15?'Selamat siang':h<18?'Selamat sore':'Selamat malam'; }
function fullDate(){
  const D=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const M=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const n=new Date(); return D[n.getDay()]+', '+n.getDate()+' '+M[n.getMonth()]+' '+n.getFullYear();
}
let _tt; function toast(msg,dur=2800){ const el=document.getElementById('toast'); if(!el)return; el.textContent=msg; el.classList.add('show'); clearTimeout(_tt); _tt=setTimeout(()=>el.classList.remove('show'),dur); }
const CAT={work:{bg:'#dbeafe',tc:'#1d4ed8',lbl:'💼 Pekerjaan'},personal:{bg:'#fce7f3',tc:'#be185d',lbl:'🏠 Personal'},design:{bg:'#ede9fe',tc:'#7c3aed',lbl:'🎨 Desain'},dev:{bg:'#d1fae5',tc:'#065f46',lbl:'💻 Dev'},health:{bg:'#fff7ed',tc:'#c2410c',lbl:'💪 Kesehatan'},};
function catBg(c){return(CAT[c]||CAT.work).bg;} function catTc(c){return(CAT[c]||CAT.work).tc;} function catLbl(c){return(CAT[c]||CAT.work).lbl;}
const PCOL={high:'#ef4444',med:'#f59e0b',low:'#22c55e'};
function priLbl(p){return{high:'Tinggi',med:'Sedang',low:'Rendah'}[p]||p;}
const KCOLS=[{key:'todo',lbl:'📌 To Do',color:'#6366f1'},{key:'progress',lbl:'🔄 In Progress',color:'#f59e0b'},{key:'review',lbl:'👀 Review',color:'#0ea5e9'},{key:'done',lbl:'✅ Done',color:'#22c55e'}];
const NOTE_COLORS=['#fde68a','#bfdbfe','#d1fae5','#fce7f3','#e0e7ff','#fed7aa'];
