const Timer=(()=>{
  const MS={focus:25*60,short:5*60,long:15*60};
  const LB={focus:'WAKTU FOKUS',short:'ISTIRAHAT PENDEK',long:'ISTIRAHAT PANJANG'};
  const C=552.9;
  let iv=null,on=false,mode='focus',sec=25*60,total=25*60,sess=0,fmin=0;
  function _ui(){
    const m=Math.floor(sec/60).toString().padStart(2,'0'),s=(sec%60).toString().padStart(2,'0');
    const d=document.getElementById('t-display');if(d)d.textContent=m+':'+s;
    const l=document.getElementById('t-lbl');if(l)l.textContent=LB[mode];
    const r=document.getElementById('t-ring');if(r)r.style.strokeDashoffset=C*(1-sec/total);
  }
  function _dots(){
    const el=document.getElementById('t-dots');if(!el)return;
    el.innerHTML=Array.from({length:Math.max(4,sess)},(_,i)=>
      '<div class="sess-dot '+(i<sess?'done':'')+'"></div>').join('');
  }
  function _setMode(m){if(on)return;mode=m;sec=MS[m];total=MS[m];
    ['focus','short','long'].forEach(k=>{const b=document.getElementById('tb-'+k);if(!b)return;
      b.style.background=k===m?'#4f46e5':'transparent';b.style.color=k===m?'#fff':'#6b7280';});_ui();}
  function _done(){
    clearInterval(iv);on=false;const b=document.getElementById('t-btn');if(b)b.textContent='▶ Mulai';
    if(mode==='focus'){sess++;fmin+=25;
      const s=document.getElementById('t-task');
      FlowData.logSession({taskName:s?.options[s.selectedIndex]?.text||'-',durationMin:25,type:'focus'});
      _dots();renderDashboard();toast('🎉 Sesi fokus selesai! Istirahat dulu.');_setMode('short');
    }else{toast('⚡ Istirahat selesai! Siap fokus lagi?');_setMode('focus');}
  }
  return{
    render(){_ui();_dots();const s=document.getElementById('t-task');const t=FlowData.getTasks().filter(t=>t.status!=='done');
      if(s)s.innerHTML='<option value="">— Pilih task —</option>'+t.map(t=>'<option value="'+t.id+'">'+esc(t.name)+'</option>').join('');},
    setMode(m){_setMode(m);},
    toggle(){if(on){clearInterval(iv);on=false;const b=document.getElementById('t-btn');if(b)b.textContent='▶ Mulai';}
      else{on=true;const b=document.getElementById('t-btn');if(b)b.textContent='⏸ Jeda';
        iv=setInterval(()=>{sec--;if(mode==='focus')fmin=Math.floor((total-sec)/60);_ui();if(sec<=0)_done();},1000);}},
    reset(){clearInterval(iv);on=false;sec=total;const b=document.getElementById('t-btn');if(b)b.textContent='▶ Mulai';_ui();},
    skip(){clearInterval(iv);on=false;const b=document.getElementById('t-btn');if(b)b.textContent='▶ Mulai';sec=0;_done();},
  };
})();
function setTimerMode(m){Timer.setMode(m);} function toggleTimer(){Timer.toggle();} function resetTimer(){Timer.reset();} function skipTimer(){Timer.skip();} function renderTimer(){Timer.render();}
