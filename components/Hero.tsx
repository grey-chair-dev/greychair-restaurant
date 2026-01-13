
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1600" 
          alt="Grey Chair dining room" 
          className="w-full h-full object-cover opacity-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-transparent to-[#FDFBF7]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-2xl">
          <p className="text-[#8E443D] font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Race Street · Over-the-Rhine
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-[#2C2C2C] leading-[1.1] mb-6 text-balance">
            Wood-fired grill. <br />
            Neighborhood kitchen.
          </h1>
          <p className="text-xl md:text-2xl text-[#555] mb-10 font-medium leading-relaxed max-w-lg">
            Focused Mediterranean cooking in the heart of Over-the-Rhine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#8E443D] text-white px-10 py-4 text-lg font-bold rounded-sm shadow-md hover:bg-[#743630] transition-all"
            >
              Book a Table
            </button>
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border-2 border-[#2C2C2C] text-[#2C2C2C] px-10 py-4 text-lg font-bold rounded-sm hover:bg-[#2C2C2C] hover:text-white transition-all"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
