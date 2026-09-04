let _nci=0;
function renderNotes(){
  const notes=FlowData.getNotes(),grid=document.getElementById('n-grid');if(!grid)return;
  grid.innerHTML=notes.map(n=>
    '<div class="note-card" style="background:'+n.color+'"><button class="note-del" onclick="doDeleteNote(\''+n.id+'\')">✕</button>'+
    '<div style="font-size:13px;font-weight:700;color:rgba(0,0,0,.8)">'+esc(n.title)+'</div>'+
    '<div style="font-size:12px;line-height:1.55;color:rgba(0,0,0,.7);flex:1">'+esc(n.body)+'</div>'+
    '<div style="font-size:10px;color:rgba(0,0,0,.5)">'+n.date+'</div></div>').join('')+
    '<button class="note-add-btn" onclick="openModal(\'m-note\')"><span style="font-size:26px">+</span><span>Catatan Baru</span></button>';
}
function doDeleteNote(id){if(!confirm('Hapus catatan ini?'))return;FlowData.deleteNote(id);renderNotes();toast('🗑️ Catatan dihapus!');}
function cycleNoteColor(){_nci=(_nci+1)%NOTE_COLORS.length;const e=document.getElementById('ni-color');if(e)e.style.background=NOTE_COLORS[_nci];}
function getCurrentNoteColor(){return NOTE_COLORS[_nci];}
