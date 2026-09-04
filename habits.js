function renderHabits(){
  const {habits,checkedToday}=FlowData.getHabits();
  const el=document.getElementById('h-list');if(!el)return;
  const DN=['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
  el.innerHTML=habits.length?habits.map(h=>{
    const ck=checkedToday.includes(h.id);
    return '<div class="habit-row"><div class="hcheck '+(ck?'done':'')+'" onclick="doToggleHabit(\''+h.id+'\')">'+(ck?'✓':'')+'</div><span style="font-size:22px">'+(h.icon||'⭐')+'</span><div style="flex:1"><div style="font-size:14px;font-weight:600">'+esc(h.name)+'</div><div style="display:flex;gap:4px;margin-top:5px">'+
      h.week.map((d,i)=>'<div class="wdot '+(d?'done':'')+'" title="'+DN[i]+'"></div>').join('')+'</div></div><div class="streak-badge '+(ck?'active':'')+'">🔥 '+h.streak+' hari</div><button onclick="doDeleteHabit(\''+h.id+'\')" class="del-icon-btn">✕</button></div>';
  }).join(''):'<div class="empty-state"><span style="font-size:40px">🎯</span><p>Belum ada habit.<br>Tambah habit pertamamu!</p></div>';
}
function doToggleHabit(id){FlowData.toggleHabitToday(id);renderHabits();renderDashboard();}
function doDeleteHabit(id){if(!confirm('Hapus habit ini?'))return;FlowData.deleteHabit(id);renderHabits();renderDashboard();toast('🗑️ Habit dihapus!');}
