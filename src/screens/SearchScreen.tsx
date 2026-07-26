import { useState } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { products } from '../data/mockData';

const filters = ['All', 'Vegetables', 'Fruits', 'Grains', 'Tubers', 'Dairy'];
const sortOptions = ['Relevance', 'Price: Low', 'Price: High', 'Rating'];

export default function SearchScreen({ onNavigate }: ScreenProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Relevance');
  const [showSort, setShowSort] = useState(false);

  const filtered = products.filter(p => {
    const matchCat = activeFilter === 'All' || p.category === activeFilter;
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => onNavigate('home')} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className="flex-1 text-sm outline-none bg-transparent"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search fresh produce..."
              style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}
              autoFocus
            />
            {query && <button onClick={() => setQuery('')} className="text-gray-400">✕</button>}
          </div>
          <button
            onClick={() => setShowSort(v => !v)}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: showSort ? '#2E7D32' : 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={showSort ? 'white' : '#212121'} strokeWidth="2" strokeLinecap="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto hide-scroll">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeFilter === f ? '#2E7D32' : 'white',
                color: activeFilter === f ? 'white' : '#757575',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort options */}
        {showSort && (
          <div className="flex gap-2 overflow-x-auto hide-scroll mt-2">
            {sortOptions.map(s => (
              <button
                key={s}
                onClick={() => { setActiveSort(s); setShowSort(false); }}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{
                  border: `1.5px solid ${activeSort === s ? '#2E7D32' : '#E8F0E9'}`,
                  color: activeSort === s ? '#2E7D32' : '#757575',
                  fontFamily: 'Inter, sans-serif',
                  background: 'white',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-4">
        <p className="text-xs font-medium mb-3" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
          {filtered.length} results {query ? `for "${query}"` : ''}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map(p => (
            <button
              key={p.id}
              onClick={() => onNavigate('product-details', { productId: p.id })}
              className="bg-white rounded-3xl overflow-hidden text-left"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
            >
              <div className="relative" style={{ height: 110 }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {p.badge && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: '#F9A825', color: '#212121', fontFamily: 'Poppins, sans-serif' }}>{p.badge}</div>
                )}
              </div>
              <div className="px-3 py-2.5">
                <p className="font-semibold text-xs mb-0.5 truncate" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{p.name}</p>
                <p className="text-[10px] mb-1" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{p.farmerName}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>
                    GH₵{p.price.toFixed(2)}
                    <span className="text-[10px] font-normal text-gray-400">/{p.unit}</span>
                  </span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#2E7D32' }}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="categories" onNavigate={onNavigate as (s: ScreenName) => void} />
    </div>
  );
}
