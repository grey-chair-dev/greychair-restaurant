
import React from 'react';
import { PHONE, ADDRESS } from '../constants';

const MobileActionBar: React.FC = () => {
  const scrollToReservations = () => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 left-0 w-full z-[70] p-4 bg-gradient-to-t from-white via-white/80 to-transparent"
    >
      <div className="bg-[#2C2C2C] text-white rounded-lg shadow-2xl flex items-stretch overflow-hidden h-14 border border-[#444]">
        <a 
          href={`tel:${PHONE.replace(/\D/g,'')}`}
          aria-label="Call restaurant"
          className="flex-1 flex flex-col items-center justify-center border-r border-[#444] active:bg-black transition-colors"
        >
          <svg className="w-5 h-5 mb-1" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Call</span>
        </a>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open maps"
          className="flex-1 flex flex-col items-center justify-center border-r border-[#444] active:bg-black transition-colors"
        >
          <svg className="w-5 h-5 mb-1" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Maps</span>
        </a>
        <button 
          onClick={scrollToReservations}
          aria-label="Scroll to reservations"
          className="flex-[2] bg-[#8E443D] flex items-center justify-center gap-2 active:bg-[#743630] transition-colors"
        >
          <span className="text-sm font-bold uppercase tracking-widest">Reserve</span>
          <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </button>
      </div>
    </nav>
  );
};

export default MobileActionBar;
