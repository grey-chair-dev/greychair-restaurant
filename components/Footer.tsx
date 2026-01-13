
import React from 'react';
import { BUSINESS_NAME, ADDRESS, PHONE, HOURS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="location" className="bg-[#1A1A1A] text-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">{BUSINESS_NAME}</h2>
          <p className="text-[#999] leading-relaxed max-w-xs">
            A neighborhood fixture in Over-the-Rhine. 
            Honest food, fire-cooked, served simply.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#666] mb-6">Contact & Location</h4>
          <p className="mb-2">{ADDRESS}</p>
          <p className="mb-6">{PHONE}</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8E443D] font-bold hover:underline"
          >
            Get Directions →
          </a>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#666] mb-6">Kitchen Hours</h4>
          <ul className="space-y-2">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between text-[#DDD]">
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-[#333] text-[#666] text-xs flex justify-between">
        <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. Built for OTR.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
