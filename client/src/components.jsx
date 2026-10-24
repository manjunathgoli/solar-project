import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Menu, ShoppingBag, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { BRAND } from './config.js';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>;
}
export function Card({ children, className = '' }) { return <div className={`card ${className}`}>{children}</div>; }
export function Badge({ children, className = '' }) { return <span className={`inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800 ${className}`}>{children}</span>; }
export function PageTitle({ eyebrow, title, subtitle, center = false }) {
  return <div className={`mb-10 ${center ? 'text-center' : ''}`}>{eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}<h1 className="heading font-extrabold">{title}</h1>{subtitle && <p className={`muted mt-4 max-w-2xl text-lg leading-7 ${center ? 'mx-auto' : ''}`}>{subtitle}</p>}</div>;
}
const navLinks = [['Services', '/services'], ['Shop', '/products'], ['Projects', '/projects'], ['About', '/about'], ['Resources', '/blog']];
export function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-green-100/80 bg-white/95 backdrop-blur">
    <div className="container flex h-[72px] items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-green-900"><span className="grid h-9 w-9 place-items-center rounded-xl bg-green-100 text-green-700"><Sun size={22}/></span>{BRAND.name}</Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">{navLinks.map(([label,path])=><Link className="text-sm font-semibold text-slate-600 hover:text-green-700" key={path} to={path}>{label}</Link>)}</nav>
      <div className="flex items-center gap-2">
        <Link aria-label={`Cart, ${cartCount} items`} className="relative rounded-full p-3 text-green-900 hover:bg-green-50" to="/cart"><ShoppingBag size={20}/>{cartCount>0&&<span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-yellow-400 px-1 text-[11px] font-black">{cartCount}</span>}</Link>
        <Link className="btn btn-primary hidden sm:inline-flex" to="/quote">Get a Free Quote <ArrowRight size={16}/></Link>
        <button className="rounded-full p-2 md:hidden" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
      </div>
    </div>
    {open&&<nav className="container grid gap-1 border-t border-green-100 py-3 md:hidden" aria-label="Mobile navigation">{[...navLinks,['Calculator','/calculator'],['FAQ','/faq'],['Contact','/contact']].map(([label,path])=><Link className="rounded-lg px-3 py-3 font-semibold hover:bg-green-50" key={path} to={path} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>}
  </header>;
}
export function Footer() {
  return <footer className="bg-[#123c2b] text-white"><div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
    <div><Link to="/" className="flex items-center gap-2 text-xl font-black"><Sun className="text-yellow-300"/>{BRAND.name}</Link><p className="mt-4 max-w-xs text-sm leading-6 text-green-100/75">Clean energy, made simple. Thoughtful solar solutions for brighter homes and businesses.</p><p className="mt-4 flex items-center gap-2 text-sm text-green-100"><Leaf size={16}/> Powering a brighter tomorrow</p></div>
    <div><b>Explore</b><div className="mt-4 grid gap-3 text-sm text-green-100/80"><Link to="/services">Our services</Link><Link to="/projects">Our projects</Link><Link to="/about">About us</Link></div></div>
    <div><b>Shop & learn</b><div className="mt-4 grid gap-3 text-sm text-green-100/80"><Link to="/products">Solar products</Link><Link to="/calculator">Savings calculator</Link><Link to="/blog">Solar journal</Link><Link to="/faq">FAQs</Link></div></div>
    <div><b>Let’s talk</b><div className="mt-4 grid gap-3 text-sm text-green-100/80"><Link to="/quote">Request a quote</Link><Link to="/contact">Contact us</Link><a href="mailto:hello@sunnovasolar.example">hello@sunnovasolar.example</a></div></div>
    </div><div className="border-t border-white/10 py-5 text-center text-xs text-green-100/60">© {new Date().getFullYear()} {BRAND.name}. A brighter future, together.</div></footer>;
}
export function Modal({ title, children, onClose }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><section role="dialog" aria-modal="true" aria-label={title} className="card max-h-[90vh] w-full max-w-2xl overflow-auto p-6"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-extrabold">{title}</h2><button aria-label="Close dialog" onClick={onClose} className="rounded-full p-2 hover:bg-green-50"><X/></button></div>{children}</section></div>;
}
