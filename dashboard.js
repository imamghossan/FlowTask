function renderDashboard(){
  const d=FlowData.getAllData();
  const total=d.tasks.length,done=d.tasks.filter(t=>t.status==='done').length;
  const pct=total?Math.round(done/total*100):0;
  const sess=d.todaySessions.filter(s=>s.type==='focus');
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('st-total',total); set('st-prog',d.tasks.filter(t=>t.status==='progress').length);
  set('st-done',done); set('st-hab',d.checkedToday.length+'/'+d.habits.length);
  set('d-sess',sess.length); set('d-min',sess.reduce((a,s)=>a+(s.durationMin||0),0));
  set('d-count',d.tasks.filter(t=>t.status!=='done').length+' aktif');
  set('d-greeting',greeting()+'! 👋'); set('d-date',fullDate());
  const pb=document.getElementById('sb-pbar');if(pb)pb.style.width=pct+'%';
  const pc=document.getElementById('sb-pct');if(pc)pc.textContent=pct+'% selesai';
  const active=d.tasks.filter(t=>t.status!=='done').slice(0,6);
  const dt=document.getElementById('d-tasks');
  if(dt)dt.innerHTML=active.length?active.map(t=>
    '<div class="task-row"><div class="pdot" style="background:'+(PCOL[t.priority]||'#d1d5db')+'"></div>'+
    '<span style="flex:1;font-size:13px;font-weight:500">'+esc(t.name)+'</span>'+
    '<span class="tag" style="background:'+catBg(t.category)+';color:'+catTc(t.category)+'">'+catLbl(t.category)+'</span></div>'
  ).join(''):'<p style="text-align:center;color:#9ca3af;padding:20px 0;font-size:13px">🎉 Semua task selesai!</p>';
  const dh=document.getElementById('d-habits');
  if(dh)dh.innerHTML=d.habits.slice(0,4).map(h=>
    '<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #f3f4f6">'+
    '<span style="font-size:18px">'+(h.icon||'⭐')+'</span><span style="font-size:13px;font-weight:500;flex:1">'+esc(h.name)+'</span>'+
    '<span>'+(d.checkedToday.includes(h.id)?'✅':'○')+'</span></div>'
  ).join('');
}
