import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';

const steps = [
  { id: 'confirmed', label: 'Order Confirmed', sub: 'Your order has been confirmed', time: '11:30 AM', done: true },
  { id: 'packed',    label: 'Packed',          sub: 'Items packed and ready',         time: '12:45 PM', done: true },
  { id: 'dispatched',label: 'Out for Delivery', sub: 'Rider is on the way',           time: '2:00 PM',  done: true, active: true },
  { id: 'delivered', label: 'Delivered',        sub: 'Order delivered to you',         time: 'Expected by 3:30 PM', done: false },
];

export default function OrderTrackingScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => onNavigate('payment-success')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Track Order</h2>
          <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>#ORD-2842</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-6">
        {/* Status badge */}
        <div className="flex items-center gap-3 bg-white rounded-2xl p-4 mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF8E1' }}>
            <span className="text-2xl">🛵</span>
          </div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Out for Delivery</p>
            <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Estimated arrival: 3:30 PM</p>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold pulse-dot inline-block" style={{ background: '#FFF8E1', color: '#F9A825', fontFamily: 'Poppins, sans-serif' }}>Live</span>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="rounded-3xl overflow-hidden mb-4 relative" style={{ height: 160, background: '#E8F0E9' }}>
          {/* Fake map grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 390 160" preserveAspectRatio="none">
            {[0,1,2,3,4,5,6,7].map(i => <line key={`h${i}`} x1="0" y1={i*22} x2="390" y2={i*22} stroke="#2E7D32" strokeWidth="1"/>)}
            {[0,1,2,3,4,5,6,7,8,9,10].map(i => <line key={`v${i}`} x1={i*40} y1="0" x2={i*40} y2="160" stroke="#2E7D32" strokeWidth="1"/>)}
          </svg>
          {/* Roads */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 160" preserveAspectRatio="none">
            <path d="M0 80 Q100 60 200 80 Q300 100 390 80" stroke="#B8D4B8" strokeWidth="6" fill="none"/>
            <path d="M195 0 Q200 40 200 80 Q200 120 190 160" stroke="#B8D4B8" strokeWidth="6" fill="none"/>
            <path d="M0 40 Q80 45 160 40" stroke="#D4E8D4" strokeWidth="4" fill="none"/>
            <path d="M230 120 Q310 115 390 120" stroke="#D4E8D4" strokeWidth="4" fill="none"/>
          </svg>
          {/* Pins */}
          <div className="absolute flex flex-col items-center" style={{ left: 80, top: 56 }}>
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center" style={{ background: '#2E7D32', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              <span className="text-xs">🏠</span>
            </div>
          </div>
          <div className="absolute flex flex-col items-center" style={{ left: 220, top: 52 }}>
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center pulse-dot" style={{ background: '#F9A825', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              <span className="text-xs">🛵</span>
            </div>
          </div>
          <div className="absolute bottom-2 right-3 px-3 py-1 rounded-xl text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.9)', color: '#212121', fontFamily: 'Inter, sans-serif' }}>
            ~1.2 km away
          </div>
        </div>

        {/* Timeline */}
        <h3 className="font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Order Timeline</h3>
        {steps.map((s, i) => (
          <div key={s.id} className="flex gap-4 mb-1">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  background: s.done ? '#2E7D32' : '#E8F0E9',
                  boxShadow: s.active ? '0 0 0 4px rgba(46,125,50,0.2)' : 'none',
                }}
              >
                {s.done ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#BDBDBD' }} />
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 my-1" style={{ background: s.done ? '#2E7D32' : '#E8F0E9', minHeight: 32 }} />
              )}
            </div>
            {/* Content */}
            <div className="pb-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: s.done ? '#212121' : '#BDBDBD' }}>{s.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: s.done ? '#757575' : '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{s.sub}</p>
                </div>
                <span className="text-[10px] ml-2 flex-shrink-0" style={{ color: s.done ? '#757575' : '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{s.time}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Contact */}
        <div className="bg-white rounded-2xl p-4 mt-2" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Rider" className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Kofi (Rider)</p>
              <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>+233 24 123 4567</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8F5E9' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 10.79a19.79 19.79 0 01-3.07-8.67A2 2 0 011.9 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              </button>
              <button onClick={() => onNavigate('chat')} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2E7D32' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
