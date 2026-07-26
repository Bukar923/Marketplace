import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import type { ScreenName } from '../types';
import { products, farmers, categories } from '../data/mockData';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-2.5 h-2.5" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#F9A825' : '#E0E0E0'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="text-[10px] ml-0.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{rating}</span>
    </div>
  );
}

export default function HomeScreen({ onNavigate }: ScreenProps) {
  const catColors = ['#FFF8E1', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E3F2FD', '#F1F8E9'];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex-1 overflow-y-auto hide-scroll">
        {/* Header */}
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Good morning 👋</p>
              <h2 className="font-bold" style={{ fontSize: 20, fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Efua Darko</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('notifications')}
                className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
                style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: '#F44336' }} />
              </button>
              <button onClick={() => onNavigate('profile')}>
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format" alt="Profile" className="w-10 h-10 rounded-2xl object-cover" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <button
            onClick={() => onNavigate('search')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span className="text-sm" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>Search tomatoes, mangoes...</span>
            <div className="ml-auto w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2E7D32' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/>
                <line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/>
                <line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Promo banner */}
        <div className="mx-5 mb-5 rounded-3xl overflow-hidden relative" style={{ height: 120 }}>
          <img
            src="https://images.unsplash.com/photo-1506484381205-f7945653044d?w=800&h=400&fit=crop&auto=format"
            alt="Fresh produce"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(27,94,32,0.85) 0%, transparent 70%)' }} />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <div className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block" style={{ background: '#F9A825', color: '#212121', fontFamily: 'Poppins, sans-serif' }}>LIMITED OFFER</div>
            <p className="font-bold text-white mb-0.5" style={{ fontSize: 16, fontFamily: 'Poppins, sans-serif' }}>20% Off Organic</p>
            <p className="text-white/80 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Fresh vegetables today!</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-5 mb-3">
            <h3 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#212121' }}>Categories</h3>
            <button onClick={() => onNavigate('categories')} className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>See all</button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto hide-scroll pb-1">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('categories')}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl"
                style={{ background: catColors[i % catColors.length], minWidth: 72 }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured products */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-5 mb-3">
            <h3 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#212121' }}>Featured Products</h3>
            <button onClick={() => onNavigate('search')} className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>See all</button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto hide-scroll pb-1">
            {products.slice(0, 6).map(p => (
              <button
                key={p.id}
                onClick={() => onNavigate('product-details', { productId: p.id })}
                className="flex-shrink-0 bg-white rounded-3xl overflow-hidden text-left"
                style={{ width: 148, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
              >
                <div className="relative" style={{ height: 120 }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {p.badge && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: '#F9A825', color: '#212121', fontFamily: 'Poppins, sans-serif' }}>
                      {p.badge}
                    </div>
                  )}
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  </button>
                </div>
                <div className="px-3 py-2.5">
                  <p className="font-semibold text-xs mb-0.5 truncate" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{p.name}</p>
                  <StarRating rating={p.rating} />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-bold text-sm" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>
                      GH₵{p.price.toFixed(2)}<span className="text-[10px] font-normal text-gray-400">/{p.unit}</span>
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

        {/* Nearby farmers */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h3 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#212121' }}>Nearby Farmers</h3>
            <button className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>See all</button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto hide-scroll pb-2">
            {farmers.map(f => (
              <button
                key={f.id}
                onClick={() => onNavigate('chat')}
                className="flex-shrink-0 bg-white rounded-3xl p-3 flex flex-col items-center text-center"
                style={{ width: 120, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
              >
                <div className="relative mb-2">
                  <img src={f.avatar} alt={f.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: '#4CAF50' }} />
                </div>
                <p className="text-xs font-semibold truncate w-full" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{f.name.split(' ')[0]}</p>
                <p className="text-[10px] truncate w-full" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{f.speciality}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#F9A825"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="text-[10px]" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{f.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate as (s: ScreenName) => void} />
    </div>
  );
}
