function renderKanban(){
  const tasks=FlowData.getTasks(),grid=document.getElementById('k-grid');if(!grid)return;
  grid.innerHTML=KCOLS.map(col=>{
    const cards=tasks.filter(t=>t.status===col.key);
    return '<div class="k-col"><div class="k-col-header"><span style="font-size:12px;font-weight:700;color:'+col.color+';text-transform:uppercase;letter-spacing:.04em">'+col.lbl+'</span><span class="k-badge">'+cards.length+'</span></div>'+
      cards.map(t=>'<div class="k-card"><div style="font-size:13px;font-weight:600;line-height:1.4;margin-bottom:8px">'+esc(t.name)+'</div>'+
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px"><div class="pdot" style="background:'+(PCOL[t.priority]||'#d1d5db')+'"></div><span style="font-size:11px;color:#6b7280">'+priLbl(t.priority)+'</span><span class="tag" style="background:'+catBg(t.category)+';color:'+catTc(t.category)+';margin-left:auto">'+catLbl(t.category)+'</span></div>'+
        '<div style="display:flex;gap:4px;flex-wrap:wrap">'+
        KCOLS.filter(c=>c.key!==col.key).map(c=>'<button class="k-move-btn" onclick="doMoveTask(\''+t.id+'\',\''+c.key+'\')">→ '+{todo:'To Do',progress:'In Progress',review:'Review',done:'Done'}[c.key]+'</button>').join('')+
        '<button class="k-del-btn" onclick="doDeleteTask(\''+t.id+'\')">✕ Hapus</button></div></div>').join('')+
      '<button class="k-add-btn" onclick="openTaskModal(\''+col.key+'\')">+ Tambah card</button></div>';
  }).join('');
}
function doMoveTask(id,status){FlowData.updateTaskStatus(id,status);renderKanban();renderDashboard();toast('✅ Task dipindahkan!');}
function doDeleteTask(id){if(!confirm('Hapus task ini?'))return;FlowData.deleteTask(id);renderKanban();renderDashboard();toast('🗑️ Task dihapus!');}
