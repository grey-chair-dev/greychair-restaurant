
import React, { useState, useRef, useEffect } from 'react';
import { askConcierge } from '../services/geminiService';

const Concierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);
    const result = await askConcierge(query);
    setResponse(result);
    setIsLoading(false);
    setQuery('');
  };

  useEffect(() => {
    if (response && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white shadow-2xl rounded-lg w-80 md:w-96 border border-[#EEE] overflow-hidden flex flex-col max-h-[500px]">
          <div className="bg-[#8E443D] p-4 text-white flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg">Zeytin Concierge</h4>
              <p className="text-xs opacity-80">Ask about our menu or location</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70 text-2xl">×</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-[#F9F9F9] p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-sm border border-[#EEE]">
              Hello! I'm here to help with questions about parking, the menu, or our hours. How can I assist you today?
            </div>
            
            {response && (
              <div className="bg-[#E9F0E9] p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm border border-[#DCE5DC] self-end">
                {response}
              </div>
            )}
            
            {isLoading && (
              <div className="flex gap-1 items-center p-2">
                <div className="w-1.5 h-1.5 bg-[#8E443D] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#8E443D] rounded-full animate-bounce delay-75" />
                <div className="w-1.5 h-1.5 bg-[#8E443D] rounded-full animate-bounce delay-150" />
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-[#EEE]">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Is there parking?"
              className="w-full px-3 py-2 text-sm border border-[#DDD] rounded-sm focus:outline-none focus:border-[#8E443D]"
            />
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#2C2C2C] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-all group"
          aria-label="Ask a question"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Concierge;
