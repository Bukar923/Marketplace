import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';

const menuItems = [
  { icon: '📦', label: 'My Orders', sub: '5 orders', screen: 'order-tracking' as ScreenName },
  { icon: '❤️', label: 'Wishlist', sub: '12 items', screen: null },
  { icon: '📍', label: 'Addresses', sub: '2 saved', screen: null },
  { icon: '💳', label: 'Payment Methods', sub: 'MoMo, Card', screen: 'checkout' as ScreenName },
  { icon: '⭐', label: 'Reviews', sub: '8 reviews', screen: null },
  { icon: '🔔', label: 'Notifications', sub: '2 unread', screen: 'notifications' as ScreenName },
  { icon: '🛡️', label: 'Privacy & Security', sub: null, screen: 'settings' as ScreenName },
  { icon: '❓', label: 'Help & Support', sub: null, screen: null },
  { icon: '🚪', label: 'Log Out', sub: null, screen: 'login' as ScreenName, danger: true },
];

export default function ProfileScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex-1 overflow-y-auto hide-scroll pb-20">
        {/* Cover + avatar */}
        <div className="relative mb-16">
          <div style={{ height: 130, background: 'linear-gradient(135deg, #1B5E20, #4CAF50)', position: 'relative', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=300&fit=crop&auto=format"
              alt="Cover"
              className="w-full h-full object-cover opacity-40"
            />
            {/* Edit cover */}
            <button className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
          <div className="absolute -bottom-12 left-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&auto=format"
                alt="Profile"
                className="w-20 h-20 rounded-3xl object-cover border-4 border-white"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
              />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white" style={{ background: '#2E7D32' }}>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Name + stats */}
        <div className="px-5">
          <h2 className="font-bold" style={{ fontSize: 20, fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Efua Darko</h2>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>📍 Accra, Ghana</span>
            <span className="text-xs" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>· Member since Jan 2024</span>
          </div>
          <div className="px-3 py-1 rounded-full inline-flex items-center gap-1 mb-4" style={{ background: '#E8F5E9' }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#2E7D32"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>Verified Buyer</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[{ v: '18', l: 'Orders' }, { v: '8', l: 'Reviews' }, { v: '24', l: 'Saved' }].map(s => (
              <div key={s.l} className="bg-white rounded-2xl p-3 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div className="font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif', color: '#2E7D32' }}>{s.v}</div>
                <div className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Menu */}
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            {menuItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => item.screen && onNavigate(item.screen)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
                style={{
                  borderBottom: i < menuItems.length - 1 ? '1px solid #F8FAF5' : 'none',
                }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: item.danger ? '#FEE2E2' : '#F8FAF5' }}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: item.danger ? '#F44336' : '#212121' }}>
                    {item.label}
                  </p>
                  {item.sub && <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{item.sub}</p>}
                </div>
                {!item.danger && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate as (s: ScreenName) => void} />
    </div>
  );
}
