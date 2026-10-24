import { useEffect, useRef, useState } from 'react';
import { Bot, ChevronDown, Send, Sparkles, Trash2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { apiUrl } from './api.js';
const starters = ['How much does a 5kW system cost?', 'Explain net metering', 'Which battery should I choose?', 'How do I get a quote?'];
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(()=>{try{return JSON.parse(sessionStorage.getItem('sunnova-chat')||'[]')}catch{return[]}});
  const [input,setInput]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [intent,setIntent]=useState(false);
  const bottom=useRef(null);
  useEffect(()=>{sessionStorage.setItem('sunnova-chat',JSON.stringify(messages));bottom.current?.scrollIntoView({behavior:'smooth'});},[messages,open,busy]);
  async function send(text=input) {
    if(!text.trim()||busy)return;
    const next=[...messages,{role:'user',content:text.trim()}].slice(-10);
    setMessages(next);setInput('');setBusy(true);setError('');setIntent(false);
    try {
      const response=await fetch(apiUrl('/chat'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next,stream:true})});
      if(!response.ok) {const data=await response.json().catch(()=>({}));throw new Error(data.error||'Unable to reach the solar assistant.');}
      if(!response.headers.get('content-type')?.includes('text/event-stream')) {
        const data=await response.json();
        setMessages([...next,{role:'assistant',content:data.reply}].slice(-10));setIntent(data.buyingIntent);
      } else {
        setMessages([...next,{role:'assistant',content:''}]);
        const reader=response.body.getReader();const decoder=new TextDecoder();let buffer='';let answer='';let buying=false;
        while(true) {
          const {value,done}=await reader.read();if(done)break;
          buffer+=decoder.decode(value,{stream:true});const events=buffer.split('\n\n');buffer=events.pop()||'';
          for(const event of events) {
            const line=event.split('\n').find(x=>x.startsWith('data: '));if(!line)continue;
            const data=JSON.parse(line.slice(6));
            if(data.token){answer+=data.token;setMessages([...next,{role:'assistant',content:answer}].slice(-10));}
            if(data.done)buying=Boolean(data.buyingIntent);
            if(data.error)throw new Error(data.error);
          }
        }
        setIntent(buying);
      }
    }
    catch(err){setError(err.message);setMessages(next);}
    finally{setBusy(false);}
  }
  return <>
    {open&&<section className="fixed bottom-0 right-0 z-50 flex h-[min(640px,90vh)] w-full flex-col overflow-hidden bg-white shadow-2xl sm:bottom-24 sm:right-6 sm:h-[580px] sm:w-[390px] sm:rounded-3xl sm:border sm:border-green-100" aria-label="SunNova solar assistant">
      <header className="flex items-center justify-between bg-green-800 px-5 py-4 text-white"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/15"><Bot/></span><div><b>SunNova Assistant</b><p className="text-xs text-green-100">Solar answers, made simple</p></div></div><div className="flex"><button title="Clear chat" aria-label="Clear chat" className="rounded-full p-2 hover:bg-white/15" onClick={()=>{setMessages([]);setError('')}}><Trash2 size={18}/></button><button title="Close chat" aria-label="Close chat" className="rounded-full p-2 hover:bg-white/15 sm:hidden" onClick={()=>setOpen(false)}><X size={19}/></button><button title="Minimize chat" aria-label="Minimize chat" className="hidden rounded-full p-2 hover:bg-white/15 sm:block" onClick={()=>setOpen(false)}><ChevronDown size={19}/></button></div></header>
      <div className="chat-scroll flex-1 space-y-4 overflow-auto bg-[#f7fbf8] p-4">
        {!messages.length&&<div className="pt-4"><div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-700"><Sparkles/></div><p className="mb-4 text-center text-sm text-slate-600">Hi! I can help with solar, products, savings and your next steps.</p><div className="grid gap-2">{starters.map(q=><button key={q} onClick={()=>send(q)} className="rounded-xl border border-green-100 bg-white px-3 py-2 text-left text-xs font-semibold text-green-900 hover:bg-green-50">{q}</button>)}</div></div>}
        {messages.map((m,i)=><div className={`flex ${m.role==='user'?'justify-end':'justify-start'}`} key={`${i}-${m.role}`}><div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.role==='user'?'rounded-br-sm bg-green-700 text-white':'rounded-bl-sm border border-green-100 bg-white text-slate-700'}`}><ReactMarkdown components={{a:({href,children})=><a className="font-bold underline" href={href}>{children}</a>}}>{m.content}</ReactMarkdown></div></div>)}
        {busy&&<div className="w-fit rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-slate-500">Thinking<span className="animate-pulse"> ···</span></div>}
        {error&&<div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">{error} <Link className="font-bold underline" to="/quote" onClick={()=>setOpen(false)}>Request a quote</Link></div>}
        {intent&&!busy&&<Link className="btn btn-yellow w-full text-sm" to="/quote" onClick={()=>setOpen(false)}>Talk to a human / Get a quote</Link>}
        <div ref={bottom}/>
      </div>
      <form className="flex items-end gap-2 border-t border-green-100 bg-white p-3" onSubmit={(e)=>{e.preventDefault();send()}}><textarea aria-label="Message the solar assistant" className="field max-h-24 min-h-11 resize-none text-sm" placeholder="Ask anything about solar..." rows="1" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}/><button disabled={busy||!input.trim()} aria-label="Send message" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green-700 text-white disabled:opacity-50"><Send size={17}/></button></form>
    </section>}
    <button aria-label={open?'Close solar assistant':'Chat with SunNova'} onClick={()=>setOpen(!open)} className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-700 text-white shadow-xl transition hover:scale-105 hover:bg-green-800 sm:bottom-6 sm:right-6">{open?<X/>:<Bot/>}</button>
  </>;
}
