import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { categories } from '../data/mockData';

const catImages: Record<string, string> = {
  fruits:     'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=200&fit=crop&auto=format',
  vegetables: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=200&fit=crop&auto=format',
  grains:     'https://images.unsplash.com/photo-1574323347407-f5e1c2d47474?w=300&h=200&fit=crop&auto=format',
  tubers:     'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop&auto=format',
  livestock:  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=200&fit=crop&auto=format',
  dairy:      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop&auto=format',
};

export default function CategoriesScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="px-5 py-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate('home')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Categories</h2>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="flex-1 text-sm outline-none bg-transparent" placeholder="Search categories..." style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-4">
        {/* Stats row */}
        <div className="flex gap-3 mb-5">
          {[{ v: '6', l: 'Categories' }, { v: '84', l: 'Products' }, { v: '5', l: 'Farmers' }].map(s => (
            <div key={s.l} className="flex-1 bg-white rounded-2xl p-3 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="font-bold" style={{ fontSize: 20, fontFamily: 'Poppins, sans-serif', color: '#2E7D32' }}>{s.v}</div>
              <div className="text-[10px]" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onNavigate('search')}
              className="bg-white rounded-3xl overflow-hidden text-left"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
            >
              <div className="relative" style={{ height: 100 }}>
                <img src={catImages[cat.id]} alt={cat.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${cat.color}CC 100%)` }} />
                <span className="absolute top-2.5 left-2.5 text-2xl">{cat.icon}</span>
              </div>
              <div className="px-3 py-2.5">
                <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{cat.name}</p>
                <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{cat.count} products</p>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="h-1 rounded-full flex-1 mr-2" style={{ background: '#E8F0E9' }}>
                    <div className="h-full rounded-full" style={{ width: `${(cat.count / 40) * 100}%`, background: cat.color }} />
                  </div>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
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
