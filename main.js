function goto(page,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const t=document.getElementById('page-'+page);if(t)t.classList.add('active');
  document.querySelectorAll('.nav-btn,.mob-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('[data-page="'+page+'"]').forEach(b=>b.classList.add('active'));
  _rp(page);
}
function _rp(p){
  if(p==='dashboard')renderDashboard();
  if(p==='board')renderKanban();
  if(p==='habits')renderHabits();
  if(p==='timer')renderTimer();
  if(p==='notes')renderNotes();
}
function openModal(id){
  const el=document.getElementById(id);if(!el)return;el.classList.add('open');
  setTimeout(()=>{const i=el.querySelector('input,textarea');if(i)i.focus();},120);
}
function closeModal(id){const el=document.getElementById(id);if(el)el.classList.remove('open');}
function openTaskModal(status){const s=document.getElementById('ti-stat');if(s)s.value=status||'todo';openModal('m-task');}
function _v(id){const e=document.getElementById(id);return e?e.value:'';}

function saveTask(){
  const name=_v('ti-name').trim();if(!name){toast('⚠️ Nama task tidak boleh kosong!');return;}
  FlowData.addTask({name,priority:_v('ti-pri'),status:_v('ti-stat'),category:_v('ti-cat')});
  closeModal('m-task');document.getElementById('ti-name').value='';
  renderKanban();renderDashboard();toast('✅ Task berhasil disimpan!');
}
function saveHabit(){
  const name=_v('hi-name').trim();if(!name){toast('⚠️ Nama habit tidak boleh kosong!');return;}
  FlowData.addHabit({name,icon:_v('hi-icon')||'⭐'});
  closeModal('m-habit');document.getElementById('hi-name').value='';document.getElementById('hi-icon').value='';
  renderHabits();renderDashboard();toast('✅ Habit ditambahkan!');
}
function saveNote(){
  const title=_v('ni-title').trim()||'Tanpa Judul',body=_v('ni-body').trim();
  FlowData.addNote({title,body,color:getCurrentNoteColor()});
  closeModal('m-note');document.getElementById('ni-title').value='';document.getElementById('ni-body').value='';
  renderNotes();toast('✅ Catatan disimpan!');
}
function exportData(){
  const blob=new Blob([FlowData.exportJSON()],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='flowtask-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();
  URL.revokeObjectURL(url);toast('📥 Data berhasil diexport!');
}
function importData(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json';
  inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
    r.onload=ev=>{try{FlowData.importJSON(ev.target.result);location.reload();}catch(err){toast('❌ File tidak valid!');}};
    r.readAsText(f);};inp.click();
}
function resetData(){if(!confirm('Reset semua data? Tidak bisa dibatalkan!'))return;FlowData.reset();location.reload();}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.modal-bg').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));
  renderDashboard();
});
