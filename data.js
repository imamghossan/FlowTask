const FlowData=(()=>{
  const KEY='flowtask_v1';
  function _def(){
    return{
      tasks:[
        {id:uid(),name:'Review mockup desain Q4',priority:'high',status:'progress',category:'design',created:new Date().toISOString()},
        {id:uid(),name:'Persiapkan sprint retrospective',priority:'med',status:'todo',category:'work',created:new Date().toISOString()},
      ],
      habits:[
        {id:uid(),name:'Olahraga Pagi',icon:'🏃',streak:5,week:[true,true,false,true,true,false,false]},
        {id:uid(),name:'Baca 30 Menit',icon:'📚',streak:3,week:[false,true,true,false,false,false,false]},
      ],
      notes:[
        {id:uid(),title:'Ide Proyek',body:'Buat tool mirip Notion.',color:'#fde68a',date:fmtDate()},
      ],
      sessions:[],habitsToday:[],habitsDate:'',
    };
  }
  function _load(){try{const r=localStorage.getItem(KEY);return r?JSON.parse(r):_def();}catch(e){return _def();}}
  function _save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
  function _dayReset(d){const t=new Date().toDateString();if(d.habitsDate!==t){d.habitsToday=[];d.habitsDate=t;}return d;}
  return{
    getAllData(){const d=_dayReset(_load());_save(d);return{tasks:d.tasks,habits:d.habits,checkedToday:d.habitsToday,notes:[...d.notes].reverse(),todaySessions:d.sessions.filter(s=>new Date(s.date).toDateString()===new Date().toDateString())};},
    getTasks(){return _load().tasks;},
    addTask(t){const d=_load();d.tasks.unshift({id:uid(),created:new Date().toISOString(),...t});_save(d);return d.tasks;},
    updateTaskStatus(id,status){const d=_load();d.tasks=d.tasks.map(t=>t.id===id?{...t,status}:t);_save(d);return d.tasks;},
    deleteTask(id){const d=_load();d.tasks=d.tasks.filter(t=>t.id!==id);_save(d);return d.tasks;},
    getHabits(){const d=_dayReset(_load());_save(d);return{habits:d.habits,checkedToday:d.habitsToday};},
    addHabit(h){const d=_load();d.habits.push({id:uid(),streak:0,week:[false,false,false,false,false,false,false],...h});_save(d);return d.habits;},
    toggleHabitToday(id){
      const d=_dayReset(_load());const idx=d.habitsToday.indexOf(id);const h=d.habits.find(x=>x.id===id);
      if(!h){_save(d);return d;}
      if(idx===-1){d.habitsToday.push(id);h.streak++;const wd=(new Date().getDay()+6)%7;h.week=h.week.map((v,i)=>i===wd?true:v);}
      else{d.habitsToday.splice(idx,1);h.streak=Math.max(0,h.streak-1);}
      _save(d);return{habits:d.habits,checkedToday:d.habitsToday};
    },
    deleteHabit(id){const d=_load();d.habits=d.habits.filter(h=>h.id!==id);d.habitsToday=d.habitsToday.filter(x=>x!==id);_save(d);return d.habits;},
    getNotes(){return[..._load().notes].reverse();},
    addNote(n){const d=_load();d.notes.push({id:uid(),date:fmtDate(),...n});_save(d);return[...d.notes].reverse();},
    deleteNote(id){const d=_load();d.notes=d.notes.filter(n=>n.id!==id);_save(d);return[...d.notes].reverse();},
    getTodaySessions(){return _load().sessions.filter(s=>new Date(s.date).toDateString()===new Date().toDateString());},
    logSession(s){const d=_load();d.sessions.push({id:uid(),date:new Date().toISOString(),...s});_save(d);},
    exportJSON(){return JSON.stringify(_load(),null,2);},
    importJSON(json){_save(JSON.parse(json));},
    reset(){localStorage.removeItem(KEY);},
  };
})();
