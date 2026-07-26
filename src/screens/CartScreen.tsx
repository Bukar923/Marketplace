import { useState } from 'react';
import type { ScreenProps, ScreenName, CartItem } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { cartItems as initialCart } from '../data/mockData';

export default function CartScreen({ onNavigate }: ScreenProps) {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item => item.product.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item
    ));
  };
  const remove = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = 2.50;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>My Cart</h2>
        </div>
        <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: '#E8F5E9', color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>
          {items.length} items
        </span>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-6xl">🛒</div>
            <p className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Your cart is empty</p>
            <button onClick={() => onNavigate('home')} className="px-6 py-3 rounded-2xl text-white font-semibold" style={{ background: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>Shop Now</button>
          </div>
        ) : (
          <>
            {/* Items */}
            {items.map(item => (
              <div key={item.product.id} className="bg-white rounded-2xl p-3 mb-3 flex items-center gap-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{item.product.name}</p>
                  <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{item.product.farmerName}</p>
                  <p className="font-bold text-sm mt-0.5" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>
                    GH₵{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => remove(item.product.id)} className="text-gray-300 hover:text-red-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded-lg border flex items-center justify-center" style={{ border: '1.5px solid #E8F0E9' }}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span className="w-5 text-center text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, 1)} className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#2E7D32' }}>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo */}
            <div className="flex gap-2 mb-4">
              <input
                value={promo}
                onChange={e => setPromo(e.target.value)}
                placeholder="Promo code"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm border outline-none"
                style={{ border: '1.5px solid #E8F0E9', background: 'white', color: '#212121', fontFamily: 'Inter, sans-serif' }}
              />
              <button
                onClick={() => { if (promo) setPromoApplied(true); }}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: promo ? '#2E7D32' : '#BDBDBD', fontFamily: 'Inter, sans-serif' }}
              >
                {promoApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-4 mb-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#212121' }}>Order Summary</h3>
              {[
                { label: 'Subtotal', value: `GH₵${subtotal.toFixed(2)}` },
                { label: 'Delivery', value: `GH₵${delivery.toFixed(2)}` },
                ...(promoApplied ? [{ label: 'Discount (10%)', value: `-GH₵${discount.toFixed(2)}` }] : []),
              ].map(row => (
                <div key={row.label} className="flex justify-between mb-2">
                  <span className="text-sm" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{row.label}</span>
                  <span className="text-sm font-medium" style={{ color: row.label.startsWith('Disc') ? '#4CAF50' : '#212121', fontFamily: 'Inter, sans-serif' }}>{row.value}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between" style={{ borderColor: '#E8F0E9' }}>
                <span className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Total</span>
                <span className="font-bold text-lg" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>GH₵{total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div className="px-5 pb-20 pt-2">
          <button
            onClick={() => onNavigate('checkout')}
            className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(46,125,50,0.4)' }}
          >
            Proceed to Checkout
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      )}

      <BottomNav active="cart" onNavigate={onNavigate as (s: ScreenName) => void} />
    </div>
  );
}
