import { useState } from 'react';
import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';

const paymentMethods = [
  { id: 'momo', label: 'Mobile Money', sub: 'MTN, Vodafone, AirtelTigo', icon: '📱' },
  { id: 'card', label: 'Debit / Credit Card', sub: 'Visa, Mastercard', icon: '💳' },
  { id: 'cash', label: 'Cash on Delivery', sub: 'Pay when you receive', icon: '💵' },
];

export default function CheckoutScreen({ onNavigate }: ScreenProps) {
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState('momo');
  const [address, setAddress] = useState({ name: 'Efua Darko', phone: '+233 24 000 0000', street: '45 Nkrumah Avenue', city: 'Kumasi', region: 'Ashanti' });

  const steps = ['Address', 'Payment', 'Review'];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : onNavigate('cart')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Checkout</h2>
      </div>

      {/* Progress */}
      <div className="px-5 mb-5">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: i <= step ? '#2E7D32' : '#E8F0E9',
                    color: i <= step ? 'white' : '#BDBDBD',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {i < step ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : i + 1}
                </div>
                <span className="text-[10px] mt-1 font-medium" style={{ color: i <= step ? '#2E7D32' : '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{s}</span>
              </div>
              {i < 2 && <div className="flex-1 h-0.5 mx-2 mb-4" style={{ background: i < step ? '#2E7D32' : '#E8F0E9' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-28">
        {step === 0 && (
          <div className="fade-up">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#212121' }}>Delivery Address</h3>
            {([
              { key: 'name', label: 'Full Name', icon: '👤' },
              { key: 'phone', label: 'Phone Number', icon: '📱' },
              { key: 'street', label: 'Street Address', icon: '🏠' },
              { key: 'city', label: 'City', icon: '🏙️' },
              { key: 'region', label: 'Region', icon: '📍' },
            ] as const).map(f => (
              <div key={f.key} className="mb-3">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">{f.icon}</span>
                  <input
                    value={address[f.key]}
                    onChange={e => setAddress(a => ({ ...a, [f.key]: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border outline-none"
                    style={{ border: '1.5px solid #E8F0E9', background: 'white', color: '#212121', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="fade-up">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#212121' }}>Payment Method</h3>
            {paymentMethods.map(m => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl mb-3 border-2 text-left transition-all"
                style={{
                  border: `2px solid ${payment === m.id ? '#2E7D32' : '#E8F0E9'}`,
                  background: payment === m.id ? '#F1F8F2' : 'white',
                  boxShadow: payment === m.id ? '0 4px 16px rgba(46,125,50,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{m.label}</p>
                  <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{m.sub}</p>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ border: `2px solid ${payment === m.id ? '#2E7D32' : '#E0E0E0'}` }}
                >
                  {payment === m.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2E7D32' }} />}
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="fade-up">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#212121' }}>Order Summary</h3>
            <div className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p className="font-semibold text-xs mb-2" style={{ color: '#757575', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items (3)</p>
              {['Fresh Tomatoes × 2', 'Red Apples × 1', 'Ripe Mangoes × 3'].map(item => (
                <div key={item} className="flex justify-between mb-1.5">
                  <span className="text-sm" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>{item}</span>
                  <span className="text-sm font-medium" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>GH₵{(Math.random() * 10 + 2).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-3 pt-3" style={{ borderColor: '#E8F0E9' }}>
                {[['Subtotal', 'GH₵24.20'], ['Delivery', 'GH₵2.50'], ['Discount', '-GH₵2.42']].map(([l, v]) => (
                  <div key={l} className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{l}</span>
                    <span className="text-xs font-medium" style={{ color: l === 'Discount' ? '#4CAF50' : '#212121', fontFamily: 'Inter, sans-serif' }}>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-2">
                  <span className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Total</span>
                  <span className="font-bold text-lg" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>GH₵24.28</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p className="font-semibold text-xs mb-2" style={{ color: '#757575', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delivery To</p>
              <p className="text-sm font-semibold" style={{ color: '#212121', fontFamily: 'Poppins, sans-serif' }}>{address.name}</p>
              <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{address.street}, {address.city}, {address.region}</p>
            </div>
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p className="font-semibold text-xs mb-2" style={{ color: '#757575', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment</p>
              <p className="text-sm" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>{paymentMethods.find(m => m.id === payment)?.label}</p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-3" style={{ background: 'linear-gradient(to top, #F8FAF5 70%, transparent)' }}>
        <button
          onClick={() => step < 2 ? setStep(s => s + 1) : onNavigate('payment-success')}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(46,125,50,0.4)' }}
        >
          {step < 2 ? 'Continue' : 'Place Order · GH₵24.28'}
        </button>
      </div>
    </div>
  );
}
