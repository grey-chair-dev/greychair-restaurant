
import React, { useState } from 'react';
import { UIState } from './types';
import Layout from '../greychair-restaurant/components/Layout';
import MenuAssistant from '../greychair-restaurant/components/MenuAssistant';
import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from './constants';
import type { MenuItemImage } from './types';

const PhotoComingSoon: React.FC<{
  className?: string;
  label?: string;
}> = ({ className, label = 'Photo coming soon' }) => (
  <div
    className={[
      'w-full h-full flex items-center justify-center bg-stone-100 text-stone-500',
      className ?? '',
    ].join(' ')}
    role="img"
    aria-label={label}
  >
    <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
  </div>
);

const MenuItemPhoto: React.FC<{
  image?: MenuItemImage;
  alt: string;
  className?: string;
}> = ({ className }) => {
  return <PhotoComingSoon className={className} />;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UIState>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false
  });
  // Temporary in-session order state (id -> quantity)
  const [order, setOrder] = useState<Record<string, number>>({});
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    pickupTime: 'ASAP',
    notes: '',
  });
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const filteredMenu = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVegetarian = !filters.vegetarian || item.isVegetarian;
    const matchesGlutenFree = !filters.glutenFree || item.isGlutenFree;
    return matchesCategory && matchesVegetarian && matchesGlutenFree;
  });

  const toggleFilter = (key: 'vegetarian' | 'glutenFree') => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addToOrder = (itemId: string) => {
    setOrder(prev => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }));
  };

  const decrementFromOrder = (itemId: string) => {
    setOrder(prev => {
      const current = prev[itemId] ?? 0;
      if (current <= 1) {
        const { [itemId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const clearOrder = () => setOrder({});

  const orderedLines = Object.entries(order)
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find(m => m.id === id);
      if (!item) return null;
      return { item, qty: Number(qty), lineTotal: item.price * Number(qty) };
    })
    .filter(Boolean) as Array<{ item: (typeof MENU_ITEMS)[number]; qty: number; lineTotal: number }>;

  const orderCount = orderedLines.reduce((sum, l) => sum + l.qty, 0);
  const orderTotal = orderedLines.reduce((sum, l) => sum + l.lineTotal, 0);
  const canCheckout = orderCount > 0;

  const startCheckout = () => {
    if (!canCheckout) return;
    setCheckoutError(null);
    setPlacedOrderId(null);
    setActiveTab('checkout');
  };

  const validateCheckout = () => {
    const nameOk = checkoutForm.name.trim().length >= 2;
    const phoneDigits = checkoutForm.phone.replace(/\D/g, '');
    const phoneOk = phoneDigits.length >= 10;
    if (!nameOk) return 'Please enter your name.';
    if (!phoneOk) return 'Please enter a valid phone number.';
    return null;
  };

  const placeOrder = () => {
    const err = validateCheckout();
    if (err) {
      setCheckoutError(err);
      return;
    }
    if (!canCheckout) {
      setCheckoutError('Your order is empty.');
      return;
    }

    // Front-end confirmation (no backend). Generate a friendly short order id.
    const id = `GC-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setPlacedOrderId(id);
    setCheckoutError(null);
    setOrder({});
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'home' && (
        <div className="animate-in fade-in duration-500">
          <section className="relative h-[60vh] flex items-center px-6 overflow-hidden border-b-2 border-stone-900 bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-90" 
              alt="Grey Chair Kitchen Dining Room" 
            />
            <div className="absolute inset-0 bg-stone-900/10"></div>
            <div className="relative z-20 max-w-xl bg-white p-8 md:p-10 border-2 border-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)]">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4 leading-tight">
                Family recipes. <br/>Friendly faces.
              </h2>
              <p className="text-base text-stone-700 mb-6 font-light leading-relaxed">
                We've been cooking for the Milford community since 1994. No fancy talk, just good meals and a place to sit.
              </p>
              <button 
                onClick={() => setActiveTab('menu')}
                className="bg-stone-900 text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95"
              >
                Check Today's Menu
              </button>
            </div>
          </section>

          <section className="py-16 px-6 bg-stone-50">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-stone-900">What We're About</h3>
                <p className="text-stone-600 leading-relaxed">
                  We cook from scratch. Our beef is local, our biscuits are fresh, and we don't own a microwave. If it's not good enough for our own table, it's not good enough for yours.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setActiveTab('story')}
                    className="text-stone-900 font-bold border-b-2 border-stone-900 pb-0.5 text-xs uppercase tracking-widest hover:text-stone-600 transition-colors"
                  >
                    Our History
                  </button>
                </div>
              </div>
              <div className="bg-white p-6 border-2 border-stone-900">
                <h4 className="font-bold text-stone-900 text-[10px] uppercase mb-4 tracking-widest">Store Hours</h4>
                <div className="space-y-2 text-sm">
                  {RESTAURANT_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between border-b border-stone-50 pb-1">
                      <span className="text-stone-500">{h.day}</span>
                      <span className="text-stone-900 font-bold">{h.time}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-stone-400 italic">Closed Mondays to be with family.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="p-6 md:p-12 bg-stone-50 animate-in slide-in-from-right duration-300">
          <div className="max-w-6xl mx-auto">
            <header className="mb-10 border-b-2 border-stone-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-1">Our Kitchen</h2>
                <p className="text-stone-500">Made fresh to order in Milford, Ohio.</p>
              </div>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Prices subject to market change</p>
            </header>
            
            <div className="space-y-6 mb-10 sticky top-[75px] z-30 bg-stone-50/95 pt-2 pb-4 backdrop-blur-sm border-b border-stone-200">
              {/* Order Summary */}
              <div className="bg-white border-2 border-stone-900 p-4 shadow-[4px_4px_0_0_rgba(28,25,23,1)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Your Order</div>
                    <div className="text-sm text-stone-900 font-bold tabular-nums">
                      {orderCount > 0 ? `${orderCount} item${orderCount === 1 ? '' : 's'} • $${orderTotal.toFixed(2)}` : 'No items yet'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearOrder}
                      disabled={orderCount === 0}
                      className="text-[10px] font-bold uppercase tracking-widest border-2 px-3 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
                    >
                      Clear
                    </button>
                    <button
                      onClick={startCheckout}
                      disabled={!canCheckout}
                      className="text-[10px] font-bold uppercase tracking-widest border-2 px-3 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-orange-950 bg-orange-950 text-white hover:bg-black hover:border-black"
                    >
                      Checkout
                    </button>
                  </div>
                </div>

                {orderCount > 0 && (
                  <div className="mt-4 space-y-2">
                    {orderedLines.map(({ item, qty, lineTotal }) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 border-t border-stone-100 pt-2">
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold text-stone-900 truncate">{item.name}</div>
                          <div className="text-[10px] text-stone-500 tabular-nums">${lineTotal.toFixed(2)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementFromOrder(item.id)}
                            className="w-8 h-8 border-2 border-stone-900 text-stone-900 font-bold leading-none hover:bg-stone-900 hover:text-white transition-colors"
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-[11px] font-bold tabular-nums text-stone-900">{qty}</span>
                          <button
                            onClick={() => addToOrder(item.id)}
                            className="w-8 h-8 border-2 border-stone-900 text-stone-900 font-bold leading-none hover:bg-stone-900 hover:text-white transition-colors"
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-6 py-2 border-2 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      selectedCategory === cat.id 
                      ? 'bg-stone-900 text-white border-stone-900' 
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400">Dietary Needs:</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => toggleFilter('vegetarian')}
                    className={`flex items-center gap-2 group transition-colors ${filters.vegetarian ? 'text-stone-900' : 'text-stone-400'}`}
                  >
                    <div className={`w-4 h-4 border-2 border-stone-900 flex items-center justify-center transition-all ${filters.vegetarian ? 'bg-stone-900' : 'bg-white'}`}>
                      {filters.vegetarian && <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-stone-900">Vegetarian</span>
                  </button>

                  <button 
                    onClick={() => toggleFilter('glutenFree')}
                    className={`flex items-center gap-2 group transition-colors ${filters.glutenFree ? 'text-stone-900' : 'text-stone-400'}`}
                  >
                    <div className={`w-4 h-4 border-2 border-stone-900 flex items-center justify-center transition-all ${filters.glutenFree ? 'bg-stone-900' : 'bg-white'}`}>
                      {filters.glutenFree && <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-stone-900">Gluten-Free</span>
                  </button>
                </div>
              </div>
            </div>

            {filteredMenu.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24">
                {filteredMenu.map(item => (
                  <div 
                    key={item.id} 
                    className={`group border-2 flex flex-col sm:flex-row transition-all duration-200 overflow-hidden ${
                      item.isGrandpaChoice 
                        ? 'bg-orange-50 border-orange-900 shadow-[4px_4px_0_0_rgba(124,45,18,1)] hover:shadow-[8px_8px_0_0_rgba(124,45,18,1)]' 
                        : 'bg-white border-stone-900 hover:bg-stone-100/50 hover:shadow-[8px_8px_0_0_rgba(28,25,23,1)]'
                    }`}
                  >
                    <div className={`sm:w-1/3 h-48 sm:h-auto border-b-2 sm:border-b-0 sm:border-r-2 overflow-hidden bg-stone-100 ${
                      item.isGrandpaChoice ? 'border-orange-900' : 'border-stone-900'
                    }`}>
                      <MenuItemPhoto
                        image={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>

                    <div className="sm:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif font-bold text-stone-900 uppercase leading-none">{item.name}</h3>
                          <span className="text-stone-900 font-bold text-sm tabular-nums">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed mb-4 font-light">
                          {item.description}
                        </p>
                        <div className="flex gap-2 mb-6">
                           {item.isVegetarian && <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200 px-1.5 py-0.5">V</span>}
                           {item.isGlutenFree && <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200 px-1.5 py-0.5">GF</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        {item.isGrandpaChoice ? (
                          <div className="flex items-center gap-2">
                            <span className="bg-orange-900 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm border border-orange-800">
                              Grandpa's Choice
                            </span>
                          </div>
                        ) : <div />}
                        <button
                          className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group/btn transition-colors ${
                          item.isGrandpaChoice ? 'text-orange-950 hover:text-black' : 'text-stone-900 hover:text-orange-950'
                        }`}
                          onClick={() => addToOrder(item.id)}
                        >
                          <span>Add to Order</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-stone-200">
                <p className="text-stone-400 italic">No items match those filters. Try adjusting your preferences!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'checkout' && (
        <div className="p-6 md:p-12 bg-stone-50 animate-in slide-in-from-right duration-300">
          <div className="max-w-3xl mx-auto space-y-8 pb-24">
            <header className="border-b-2 border-stone-900 pb-6 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-1">Checkout</h2>
                <p className="text-stone-500">Pickup order • Milford, Ohio</p>
              </div>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-[10px] font-bold uppercase tracking-widest border-2 border-stone-900 px-4 py-2 hover:bg-stone-900 hover:text-white transition-colors"
              >
                Back to Menu
              </button>
            </header>

            {placedOrderId ? (
              <div className="bg-white border-2 border-stone-900 p-8 shadow-[6px_6px_0_0_rgba(28,25,23,1)] space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Order Placed</div>
                <div className="text-2xl font-serif font-bold text-stone-900">Thanks, {checkoutForm.name.trim() || 'neighbor'}.</div>
                <div className="text-stone-700 leading-relaxed">
                  We’ve got it. Your pickup confirmation code is <span className="font-bold tabular-nums">{placedOrderId}</span>.
                </div>
                <div className="text-[11px] text-stone-600">
                  Pickup time: <span className="font-bold text-stone-900">{checkoutForm.pickupTime}</span>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setPlacedOrderId(null);
                      setCheckoutForm({ name: '', phone: '', pickupTime: 'ASAP', notes: '' });
                      setActiveTab('menu');
                    }}
                    className="bg-stone-900 text-white px-5 py-3 font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    Start New Order
                  </button>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="border-2 border-stone-900 px-5 py-3 font-bold text-[10px] uppercase tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
                  >
                    Call the Kitchen
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Order Review */}
                <div className="bg-white border-2 border-stone-900 p-6 shadow-[6px_6px_0_0_rgba(28,25,23,1)]">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Order Review</div>
                      <div className="text-sm text-stone-900 font-bold tabular-nums">
                        {orderCount > 0 ? `${orderCount} item${orderCount === 1 ? '' : 's'} • $${orderTotal.toFixed(2)}` : 'Your order is empty'}
                      </div>
                    </div>
                    <button
                      onClick={clearOrder}
                      disabled={!canCheckout}
                      className="text-[10px] font-bold uppercase tracking-widest border-2 px-3 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
                    >
                      Clear
                    </button>
                  </div>

                  {canCheckout ? (
                    <div className="space-y-3">
                      {orderedLines.map(({ item, qty, lineTotal }) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3">
                          <div className="min-w-0">
                            <div className="text-[12px] font-bold text-stone-900 truncate">{item.name}</div>
                            <div className="text-[11px] text-stone-500 tabular-nums">${lineTotal.toFixed(2)}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrementFromOrder(item.id)}
                              className="w-9 h-9 border-2 border-stone-900 text-stone-900 font-bold leading-none hover:bg-stone-900 hover:text-white transition-colors"
                              aria-label={`Remove one ${item.name}`}
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-[12px] font-bold tabular-nums text-stone-900">{qty}</span>
                            <button
                              onClick={() => addToOrder(item.id)}
                              className="w-9 h-9 border-2 border-stone-900 text-stone-900 font-bold leading-none hover:bg-stone-900 hover:text-white transition-colors"
                              aria-label={`Add one ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-stone-500 italic border-2 border-dashed border-stone-200">
                      Add items from the menu to begin checkout.
                    </div>
                  )}
                </div>

                {/* Pickup Details */}
                <div className="bg-white border-2 border-stone-900 p-6 shadow-[6px_6px_0_0_rgba(28,25,23,1)] space-y-5">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Pickup Details</div>

                  {checkoutError && (
                    <div className="border-2 border-orange-900 bg-orange-50 text-orange-950 p-4 text-sm font-medium">
                      {checkoutError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="space-y-2">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Name</div>
                      <input
                        value={checkoutForm.name}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-stone-50 border-2 border-stone-900 px-3 py-2 text-sm focus:outline-none"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="space-y-2">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Phone</div>
                      <input
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-stone-50 border-2 border-stone-900 px-3 py-2 text-sm focus:outline-none"
                        placeholder="(513) 555-0123"
                        inputMode="tel"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 block">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Pickup time</div>
                    <select
                      value={checkoutForm.pickupTime}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, pickupTime: e.target.value }))}
                      className="w-full bg-stone-50 border-2 border-stone-900 px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="ASAP">ASAP</option>
                      <option value="15 minutes">15 minutes</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="60 minutes">60 minutes</option>
                    </select>
                  </label>

                  <label className="space-y-2 block">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Notes (optional)</div>
                    <textarea
                      value={checkoutForm.notes}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full bg-stone-50 border-2 border-stone-900 px-3 py-2 text-sm focus:outline-none min-h-[100px]"
                      placeholder="Allergies, substitutions, 'extra gravy', etc."
                    />
                  </label>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="text-[11px] text-stone-500">
                      We’ll call if we have questions.
                    </div>
                    <button
                      onClick={placeOrder}
                      disabled={!canCheckout}
                      className="bg-orange-950 text-white px-6 py-3 font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'story' && (
        <div className="p-6 md:p-16 bg-stone-200 min-h-screen animate-in zoom-in duration-500">
          <div className="max-w-xl mx-auto bg-stone-50 p-8 md:p-12 border-2 border-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)]">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6 italic">How we started</h2>
            <div className="space-y-6 text-stone-700 leading-relaxed text-base font-light">
              <p>The name "Grey Chair" isn't a marketing slogan. It was a real chair that sat in our family's house for three generations.</p>
              <p>When Sarah and James Miller opened this spot in '94, they wanted to create a place that felt like that kitchen.</p>
              <div className="py-6">
                   <img src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1000" className="w-full border-2 border-stone-900 grayscale" alt="Old family kitchen" />
              </div>
              <footer className="pt-8 border-t border-stone-200">
                 <p className="font-serif text-xl text-stone-900 italic">— The Millers</p>
              </footer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'location' && (
        <div className="p-6 md:p-12 bg-stone-50 animate-in slide-in-from-left duration-300">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">Visit Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 border-2 border-stone-900 shadow-[6px_6px_0_0_rgba(28,25,23,1)] space-y-8">
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Address</h4>
                  <p className="text-xl text-stone-900 font-serif font-bold">{RESTAURANT_INFO.address}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Call the Kitchen</h4>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-3xl text-stone-900 font-serif font-bold hover:text-stone-600 block">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MenuAssistant />
    </Layout>
  );
};

export default App;
