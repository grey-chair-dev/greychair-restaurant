
import React, { useState } from 'react';
import { ReservationData } from '../types';

const Reservations: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '18:00',
    guests: 2
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSubmitted(true), 600);
  };

  if (isSubmitted) {
    return (
      <section id="reservations" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="bg-white p-12 rounded-sm shadow-sm border border-[#EEE]">
            <h2 className="text-3xl font-bold mb-4">Table Confirmed</h2>
            <p className="text-[#666] mb-8">
              We have you down, {formData.name}. A confirmation email has been sent. We'll see you on {formData.date}.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-[#8E443D] font-bold uppercase tracking-widest text-sm hover:underline"
            >
              Book another table
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservations" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <h2 className="text-4xl font-bold mb-6">Book a Table</h2>
          <div className="space-y-6 text-lg text-[#555] leading-relaxed max-w-md">
            <p>
              Instantly confirmed. For parties larger than 8, please call us directly.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm font-bold text-[#2C2C2C]">
                <svg className="w-5 h-5 text-[#8E443D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                No credit card required
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-[#2C2C2C]">
                <svg className="w-5 h-5 text-[#8E443D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Instant confirmation
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-[#EEE] rounded-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#999] mb-2">Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 border border-[#DDD] focus:border-[#2C2C2C] focus:outline-none rounded-sm bg-[#FAFAFA]"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#999] mb-2">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-4 py-3 border border-[#DDD] focus:border-[#2C2C2C] focus:outline-none rounded-sm bg-[#FAFAFA]"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#999] mb-2">Phone</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-4 py-3 border border-[#DDD] focus:border-[#2C2C2C] focus:outline-none rounded-sm bg-[#FAFAFA]"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#999] mb-2">Date</label>
                <input 
                  required
                  type="date" 
                  className="w-full px-4 py-3 border border-[#DDD] focus:border-[#2C2C2C] focus:outline-none rounded-sm bg-[#FAFAFA]"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#999] mb-2">Guests</label>
                <select 
                  className="w-full px-4 py-3 border border-[#DDD] focus:border-[#2C2C2C] focus:outline-none rounded-sm bg-[#FAFAFA]"
                  value={formData.guests}
                  onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-[#8E443D] text-white py-5 font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#743630] transition-colors shadow-sm"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
