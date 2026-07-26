import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';

export default function PaymentSuccessScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Animated check */}
        <div
          className="bounce-in w-28 h-28 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', boxShadow: '0 16px 48px rgba(46,125,50,0.35)' }}
        >
          <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        {/* Circles decoration */}
        <div className="absolute" style={{ width: 200, height: 200, border: '2px solid rgba(46,125,50,0.1)', borderRadius: '50%', top: '30%', transform: 'translate(-50%, -50%)', left: '50%' }} />
        <div className="absolute" style={{ width: 280, height: 280, border: '1px solid rgba(46,125,50,0.05)', borderRadius: '50%', top: '30%', transform: 'translate(-50%, -50%)', left: '50%' }} />

        <div className="fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="font-bold mb-2" style={{ fontSize: 26, fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Order Placed!</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
            Your order has been placed successfully.<br />The farmer will confirm it shortly.
          </p>

          {/* Order card */}
          <div className="w-full bg-white rounded-3xl p-5 mb-6 text-left" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: '1px solid #E8F0E9' }}>
              <div>
                <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Order Number</p>
                <p className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>#ORD-2842</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#E8F5E9', color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>Confirmed</span>
            </div>
            {[
              { label: 'Items', value: '3 products' },
              { label: 'Total Paid', value: 'GH₵24.28' },
              { label: 'Estimated Delivery', value: 'Jul 25, 2026' },
              { label: 'Payment', value: 'Mobile Money' },
            ].map(r => (
              <div key={r.label} className="flex justify-between mb-2">
                <span className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{r.label}</span>
                <span className="text-xs font-semibold" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-10 flex flex-col gap-3">
        <button
          onClick={() => onNavigate('order-tracking')}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(46,125,50,0.4)' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Track My Order
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="w-full py-4 rounded-2xl font-bold text-sm border-2"
          style={{ border: '2px solid #E8F0E9', color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
