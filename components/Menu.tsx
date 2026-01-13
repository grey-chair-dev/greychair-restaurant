
import React, { useState } from 'react';
import { MENU } from '../constants';

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Meze' | 'Grill' | 'Dessert'>('Meze');
  const filteredMenu = MENU.filter(item => item.category === activeTab);

  const scrollToReservations = () => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#8E443D] font-bold tracking-widest uppercase text-xs mb-2">The Kitchen</p>
          <h2 className="text-4xl font-bold text-[#2C2C2C]">Dinner & Drinks</h2>
        </div>

        {/* Category Selection */}
        <div className="flex gap-x-8 mb-12 border-b border-[#EEE] overflow-x-auto whitespace-nowrap scrollbar-hide">
          {(['Meze', 'Grill', 'Dessert'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`pb-4 text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                activeTab === cat 
                  ? 'text-[#8E443D] border-b-2 border-[#8E443D]' 
                  : 'text-[#999] hover:text-[#666]'
              }`}
            >
              {cat === 'Grill' ? 'Mains' : cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {filteredMenu.map((item) => (
            <div key={item.id} className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-bold text-[#2C2C2C]">{item.name}</h3>
                <span className="text-[#2C2C2C] font-semibold ml-4">${item.price}</span>
              </div>
              <p className="text-[#666] text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Drink/Reservation Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 bg-[#FDFBF7] border border-[#EEE] rounded-sm flex flex-col justify-center">
            <h4 className="font-bold text-lg mb-2 text-[#2C2C2C]">Wine & Spirits</h4>
            <p className="text-sm text-[#666] leading-relaxed mb-4">
              We serve Mediterranean wines, Turkish Raki, and local Cincinnati craft beer.
            </p>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8E443D]">Ask your server for tonight's list</span>
          </div>
          
          <div className="p-8 bg-[#2C2C2C] text-white rounded-sm flex flex-col justify-center">
            <h4 className="font-bold text-xl mb-3">Table for tonight?</h4>
            <p className="text-[#AAA] text-sm mb-6 leading-relaxed">We recommend booking for groups of 4 or more.</p>
            <button 
              onClick={scrollToReservations}
              className="inline-block bg-[#8E443D] text-white px-8 py-4 text-center font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-[#743630] transition-all"
            >
              Reserve
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-[#999] uppercase tracking-widest leading-loose">
            Consuming raw or undercooked meats may increase risk of foodborne illness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
