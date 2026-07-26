import { useState } from 'react';
import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';
import { products, reviews } from '../data/mockData';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#F9A825' : '#E0E0E0'}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailsScreen({ onNavigate, params }: ScreenProps) {
  const productId = (params?.productId as string) ?? 'p1';
  const product = products.find(p => p.id === productId) ?? products[0];
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      {/* Hero image */}
      <div className="relative" style={{ height: 280, flexShrink: 0 }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(248,250,245,1) 100%)' }} />
        <StatusBar light />
        <div className="absolute top-10 left-5 right-5 flex items-center justify-between">
          <button onClick={() => onNavigate('search')} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setLiked(v => !v)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={liked ? '#F44336' : 'none'} stroke={liked ? '#F44336' : '#212121'} strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
            <button onClick={() => onNavigate('cart')} className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
            </button>
          </div>
        </div>
        {product.badge && (
          <div className="absolute bottom-16 left-5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#F9A825', color: '#212121', fontFamily: 'Poppins, sans-serif' }}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scroll px-5 pt-4 pb-24">
        {/* Name + price */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium mr-2" style={{ background: '#E8F5E9', color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>{product.category}</span>
            <h2 className="font-bold mt-1.5" style={{ fontSize: 22, fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{product.name}</h2>
          </div>
          <div className="text-right">
            <p className="font-bold" style={{ fontSize: 22, color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>GH₵{product.price.toFixed(2)}</p>
            <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>per {product.unit}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRow rating={product.rating} />
          <span className="text-sm font-semibold" style={{ color: '#212121', fontFamily: 'Poppins, sans-serif' }}>{product.rating}</span>
          <span className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>({product.reviews} reviews)</span>
        </div>

        {/* Farmer card */}
        <button
          onClick={() => onNavigate('chat')}
          className="w-full flex items-center gap-3 p-3 rounded-2xl mb-4"
          style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
        >
          <img src={product.farmerAvatar} alt={product.farmerName} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{product.farmerName}</p>
            <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>📍 {product.farmerLocation}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#F9A825"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span className="text-xs font-medium" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>{product.farmerRating}</span>
              <span className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Verified Farmer</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <button
              onClick={e => { e.stopPropagation(); onNavigate('chat'); }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-white"
              style={{ background: '#2E7D32', fontFamily: 'Inter, sans-serif' }}
            >
              Chat
            </button>
          </div>
        </button>

        {/* Qty selector */}
        <div className="flex items-center justify-between mb-4 p-4 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div>
            <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Quantity</p>
            <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Total: GH₵{(product.price * qty).toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{ border: '1.5px solid #E8F0E9', background: qty === 1 ? '#F8FAF5' : 'white' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={qty === 1 ? '#BDBDBD' : '#212121'} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span className="w-8 text-center font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121', fontSize: 18 }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: '#2E7D32' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Description</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{product.description}</p>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Reviews</h3>
            <button className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>See all</button>
          </div>
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3 mb-2">
                <img src={r.userAvatar} alt={r.userName} className="w-9 h-9 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{r.userName}</p>
                  <div className="flex items-center gap-2">
                    <StarRow rating={r.rating} />
                    <span className="text-[10px]" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{r.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add to cart bar */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4" style={{ background: 'linear-gradient(to top, #F8FAF5 60%, transparent)' }}>
        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            background: addedToCart ? '#4CAF50' : 'linear-gradient(135deg, #2E7D32, #4CAF50)',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0 8px 24px rgba(46,125,50,0.4)',
          }}
        >
          {addedToCart ? (
            <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> Added to Cart!</>
          ) : (
            <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg> Add to Cart · GH₵{(product.price * qty).toFixed(2)}</>
          )}
        </button>
      </div>
    </div>
  );
}
