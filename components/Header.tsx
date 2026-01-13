
import React, { useState, useEffect } from 'react';
import { BUSINESS_NAME } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#EEE] py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-2xl font-bold tracking-tight text-[#2C2C2C] flex items-center gap-2"
        >
          <span className="w-8 h-8 bg-[#8E443D] rounded-full flex items-center justify-center text-white text-xs font-black italic">G</span>
          {BUSINESS_NAME}
        </button>
        
        <nav className="hidden md:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.2em] text-[#555]">
          <button onClick={() => scrollTo('menu')} className="hover:text-[#8E443D] transition-colors">Menu</button>
          <button onClick={() => scrollTo('photos')} className="hover:text-[#8E443D] transition-colors">Photos</button>
          <button onClick={() => scrollTo('our-story')} className="hover:text-[#8E443D] transition-colors">Our Story</button>
          <button onClick={() => scrollTo('location')} className="hover:text-[#8E443D] transition-colors">Contact</button>
          <button 
            onClick={() => scrollTo('reservations')} 
            className="bg-[#8E443D] text-white px-8 py-3 rounded-sm hover:bg-[#743630] transition-all shadow-sm active:scale-95"
          >
            Book a Table
          </button>
        </nav>

        {/* Mobile Header Button - Secondary focus compared to Bottom Bar */}
        <button 
          onClick={() => scrollTo('reservations')} 
          className="md:hidden bg-[#8E443D] text-white px-5 py-2 rounded-sm text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          Book
        </button>
      </div>
    </header>
  );
};

export default Header;
