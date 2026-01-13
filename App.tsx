
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reservations from './components/Reservations';
import Footer from './components/Footer';
import Concierge from './components/Concierge';
import MobileActionBar from './components/MobileActionBar';
import { ADDRESS, PHONE } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <Hero />
        
        {/* Logistics */}
        <section className="bg-white py-10 border-y border-[#EEE]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <span className="text-[10px] font-black text-[#8E443D] uppercase tracking-[0.2em] block mb-1">Address</span>
              <p className="text-sm font-bold text-[#2C2C2C]">{ADDRESS}</p>
            </div>
            <div className="md:border-x md:border-[#EEE] md:px-8">
              <span className="text-[10px] font-black text-[#8E443D] uppercase tracking-[0.2em] block mb-1">Kitchen Hours</span>
              <p className="text-sm font-bold text-[#2C2C2C]">Tuesday – Sunday from 4:00 PM</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#8E443D] uppercase tracking-[0.2em] block mb-1">Phone</span>
              <p className="text-sm font-bold text-[#2C2C2C]">{PHONE}</p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 bg-[#FDFBF7]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight text-[#2C2C2C] text-balance">
              A quiet neighborhood kitchen dedicated to the tradition of the fire.
            </h2>
          </div>
        </section>

        <Menu />

        {/* Gallery */}
        <section id="photos" className="py-24 bg-[#FDFBF7] border-t border-[#EEE]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-[#8E443D] font-bold tracking-widest uppercase text-xs mb-4">The Gallery</p>
              <h2 className="text-4xl font-bold mb-6">Real Food. Real Lighting.</h2>
              <p className="text-xl text-[#555] leading-relaxed">
                No food stylists or studio lights. These are daily moments from our dining room and wood-fired grill.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="aspect-[4/5] bg-[#EEE] overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800" alt="Grey Chair Dining Room" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="md:col-span-2 aspect-[16/9] bg-[#EEE] overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200" alt="Wood Grill" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="md:col-span-2 aspect-[16/9] bg-[#EEE] overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=1200" alt="Grilled Kebab" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="aspect-[4/5] bg-[#EEE] overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?auto=format&fit=crop&q=80&w=800" alt="Fresh Pita" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section id="our-story" className="py-24 bg-white border-t border-[#EEE]">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-[#8E443D] font-bold tracking-widest uppercase text-xs mb-4">Our Story</p>
              <h2 className="text-4xl font-bold mb-8">From the Grill to Race Street</h2>
              
              <div className="space-y-6 text-[#555] leading-relaxed">
                <p className="text-lg">
                  We cook with a single wood-fired grill and the recipes we brought from Turkey over a decade ago. We opened Grey Chair to serve the simple, honest food we grew up eating.
                </p>
                <p>
                  Since 2012, we've remained a family-run fixture in Cincinnati. Moving to Over-the-Rhine allowed us to bring our fire to the city's heart. Our process hasn't changed: we still hand-mince our meats and prepare meze daily.
                </p>
                <p>
                  We are here every night because we believe in consistency. We aren’t trying to be the newest restaurant in OTR—just the one you can always count on for a good meal.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 h-[500px] bg-[#F3F4F6] rounded-sm overflow-hidden border border-[#EEE]">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" 
                alt="Working in the Grey Chair kitchen" 
                className="w-full h-full object-cover grayscale contrast-110"
              />
            </div>
          </div>
        </section>

        <Reservations />
      </main>
      <Footer />
      <Concierge />
      <MobileActionBar />
    </div>
  );
};

export default App;
