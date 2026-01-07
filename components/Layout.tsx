
import React from 'react';
import { UIState } from '../types';
import { RESTAURANT_INFO } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: UIState;
  onTabChange: (tab: UIState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      {/* Utility Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-stone-900 px-6 py-4 flex justify-between items-center shadow-sm">
        <div 
          onClick={() => onTabChange('home')}
          className="cursor-pointer flex items-center gap-3"
        >
          <div className="bg-stone-900 text-white w-8 h-8 flex items-center justify-center font-bold text-xs">GC</div>
          <h1 className="text-lg font-serif font-bold text-stone-900 uppercase tracking-tighter leading-none">
            Grey Chair
          </h1>
        </div>
        
        <button 
          onClick={() => onTabChange('menu')}
          className="bg-orange-950 text-white px-5 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-95"
        >
          Order Pickup
        </button>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Simplified Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-stone-900 flex justify-around items-center py-3 md:hidden">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')}
          label="Home"
          icon={<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>}
        />
        <NavButton 
          active={activeTab === 'menu'} 
          onClick={() => onTabChange('menu')}
          label="Food"
          icon={
            <>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </>
          }
        />
        <NavButton 
          active={activeTab === 'location'} 
          onClick={() => onTabChange('location')}
          label="Visit"
          icon={
            <>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </>
          }
        />
        <a 
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center gap-1 text-stone-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span className="text-[9px] font-bold uppercase tracking-tight">Call</span>
        </a>
      </nav>

      {/* Plain Text Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-stone-800 pb-10">
            <div>
              <h3 className="text-white font-serif text-2xl mb-4 italic">Grey Chair Family Kitchen</h3>
              <p className="text-sm leading-relaxed font-light">
                Milford's home for honest food since 1994. No shortcuts, no microwaves, just good cooking.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-stone-300 font-bold">{RESTAURANT_INFO.address}</p>
              <p className="text-stone-300 font-bold">{RESTAURANT_INFO.phone}</p>
              <p>Owned & Operated by the Heritage Family</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Grey Chair Milford</p>
            <div className="flex gap-4">
              <button onClick={() => onTabChange('story')} className="hover:text-white">Our Story</button>
              <button onClick={() => onTabChange('location')} className="hover:text-white">Hours</button>
            </div>
          </div>
        </div>
      </footer>
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, label, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-stone-900' : 'text-stone-400'}`}
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={active ? "2.5" : "2"} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icon}
    </svg>
    <span className="text-[9px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default Layout;
