
import React, { useState, useRef } from 'react';
import { askKitchenAssistant } from '../services/geminiService';

const MenuAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    const result = await askKitchenAssistant(query);
    setResponse(result);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-4 z-40 md:bottom-8 md:right-8">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-stone-900 text-white px-5 py-3 border-2 border-white shadow-xl flex items-center gap-2 hover:scale-105 transition-transform font-bold text-[10px] uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Ask the Kitchen
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={chatRef}
      className="fixed inset-0 z-[60] bg-white flex flex-col md:inset-auto md:bottom-8 md:right-8 md:w-[380px] md:h-[500px] md:border-2 md:border-stone-900 md:shadow-[8px_8px_0_0_rgba(28,25,23,1)]"
    >
      <div className="bg-stone-900 text-white p-4 flex justify-between items-center">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Kitchen Notepad</h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-stone-700 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div className="flex-grow p-5 overflow-y-auto space-y-5 bg-[#FEFCE8]">
        <div className="border-b border-stone-200 pb-3 text-sm text-stone-800 font-medium italic">
          "Hi there. Need a recommendation or have a question about our ingredients? Just type it below."
        </div>
        
        {response && (
          <div className="bg-white border border-stone-200 p-4 shadow-sm text-sm text-stone-900 leading-relaxed">
            {response}
          </div>
        )}

        {loading && (
          <div className="text-[10px] text-stone-400 uppercase tracking-widest animate-pulse">
            Writing...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-5 border-t-2 border-stone-900 bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow bg-stone-50 border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-stone-900"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-stone-900 text-white px-4 py-2 hover:bg-black disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </button>
        </div>
        <p className="text-[8px] text-stone-400 mt-3 text-center uppercase tracking-widest">A simple tool for our guests</p>
      </form>
    </div>
  );
};

export default MenuAssistant;
