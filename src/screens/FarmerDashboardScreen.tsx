import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { orders } from '../data/mockData';

const statusColors: Record<string, { bg: string; text: string }> = {
  pending:    { bg: '#FFF8E1', text: '#F9A825' },
  confirmed:  { bg: '#E8F5E9', text: '#2E7D32' },
  packed:     { bg: '#E3F2FD', text: '#1565C0' },
  dispatched: { bg: '#FFF3E0', text: '#E65100' },
  delivered:  { bg: '#E8F5E9', text: '#2E7D32' },
  cancelled:  { bg: '#FFEBEE', text: '#C62828' },
};

export default function FarmerDashboardScreen({ onNavigate }: ScreenProps) {
  const todayOrders = orders.filter(o => o.date === 'Jul 24, 2026');

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex-1 overflow-y-auto hide-scroll pb-20">
        {/* Header */}
        <div
          className="px-5 pt-3 pb-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)' }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>Good morning 🌱</p>
              <h2 className="font-bold text-white" style={{ fontSize: 20, fontFamily: 'Poppins, sans-serif' }}>Kwame Mensah</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onNavigate('notifications')} className="w-9 h-9 rounded-2xl flex items-center justify-center relative" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-green-800" style={{ background: '#F9A825' }} />
              </button>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Kwame" className="w-9 h-9 rounded-2xl object-cover border-2" style={{ borderColor: 'rgba(255,255,255,0.4)' }} />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Sales', value: 'GH₵2,840', icon: '💰', change: '+12%' },
              { label: "Today's Orders", value: todayOrders.length.toString(), icon: '📦', change: '+3' },
              { label: 'Products Listed', value: '12', icon: '🌽', change: '+2' },
              { label: 'Avg. Rating', value: '4.8 ⭐', icon: '🏆', change: '+0.2' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(249,168,37,0.3)', color: '#F9A825', fontFamily: 'Inter, sans-serif' }}>
                    {s.change}
                  </span>
                </div>
                <p className="font-bold text-white" style={{ fontSize: 18, fontFamily: 'Poppins, sans-serif' }}>{s.value}</p>
                <p className="text-white/70 text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 pt-4 mb-4">
          <h3 className="font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '➕', label: 'Add Product', screen: 'add-product' as ScreenName, color: '#E8F5E9' },
              { icon: '📋', label: 'Manage Orders', screen: 'manage-orders' as ScreenName, color: '#FFF8E1' },
              { icon: '💹', label: 'Earnings', screen: 'earnings' as ScreenName, color: '#E3F2FD' },
            ].map(a => (
              <button
                key={a.label}
                onClick={() => onNavigate(a.screen)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl"
                style={{ background: a.color }}
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs font-semibold text-center" style={{ fontFamily: 'Inter, sans-serif', color: '#212121' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Recent Orders</h3>
            <button onClick={() => onNavigate('manage-orders')} className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>See all</button>
          </div>
          {orders.slice(0, 4).map(o => {
            const sc = statusColors[o.status] ?? statusColors['pending'];
            return (
              <button
                key={o.id}
                onClick={() => onNavigate('manage-orders')}
                className="w-full flex items-center gap-3 bg-white rounded-2xl p-3 mb-2 text-left"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <img src={o.buyerAvatar} alt={o.buyer} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs truncate" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{o.buyer}</p>
                  <p className="text-[10px]" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{o.products}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold capitalize" style={{ background: sc.bg, color: sc.text, fontFamily: 'Poppins, sans-serif' }}>{o.status}</span>
                  <span className="text-xs font-bold" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>GH₵{o.total.toFixed(2)}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Product overview */}
        <div className="px-5 mb-4">
          <h3 className="font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Top Products</h3>
          {[
            { name: 'Fresh Tomatoes', sold: 48, revenue: 120, img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=100&h=100&fit=crop&auto=format' },
            { name: 'Irish Potatoes', sold: 32, revenue: 48, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&auto=format' },
          ].map(p => (
            <div key={p.name} className="bg-white rounded-2xl p-3 mb-2 flex items-center gap-3" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <img src={p.img} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{p.name}</p>
                <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{p.sold} units sold</p>
                <div className="mt-1 h-1.5 rounded-full" style={{ background: '#E8F0E9' }}>
                  <div className="h-full rounded-full" style={{ width: `${(p.sold / 60) * 100}%`, background: '#2E7D32' }} />
                </div>
              </div>
              <span className="font-bold text-sm" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>GH₵{p.revenue}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="farmer-dashboard" onNavigate={onNavigate as (s: ScreenName) => void} role="farmer" />
    </div>
  );
}
