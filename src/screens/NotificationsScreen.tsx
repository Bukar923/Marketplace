import { useState } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { notifications as initialNotifs } from '../data/mockData';

const icons: Record<string, string> = { order: '📦', delivery: '🛵', promo: '🎉', message: '💬', payment: '💰' };
const iconBg: Record<string, string> = { order: '#E8F5E9', delivery: '#FFF8E1', promo: '#F3E5F5', message: '#E3F2FD', payment: '#E8F5E9' };

export default function NotificationsScreen({ onNavigate }: ScreenProps) {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div>
            <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Notifications</h2>
            {unreadCount > 0 && <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{unreadCount} unread</p>}
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>
            Mark all read
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-20">
        {/* Today */}
        <p className="text-xs font-semibold mb-2" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>TODAY</p>
        {notifs.slice(0, 2).map(n => (
          <button
            key={n.id}
            onClick={() => {
              setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
              if (n.type === 'order' || n.type === 'delivery') onNavigate('order-tracking');
              else if (n.type === 'message') onNavigate('chat');
            }}
            className="w-full flex items-start gap-3 bg-white rounded-2xl p-4 mb-2 text-left"
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: `1.5px solid ${n.read ? 'transparent' : '#E8F5E9'}`,
              position: 'relative',
            }}
          >
            {!n.read && <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ background: '#2E7D32' }} />}
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg[n.type] }}>
              <span className="text-xl">{icons[n.type]}</span>
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{n.title}</p>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{n.body}</p>
              <p className="text-[10px] mt-1" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{n.time}</p>
            </div>
          </button>
        ))}

        <p className="text-xs font-semibold mb-2 mt-3" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>EARLIER</p>
        {notifs.slice(2).map(n => (
          <button
            key={n.id}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className="w-full flex items-start gap-3 bg-white rounded-2xl p-4 mb-2 text-left"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)', opacity: n.read ? 0.75 : 1 }}
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg[n.type] }}>
              <span className="text-xl">{icons[n.type]}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{n.title}</p>
              <p className="text-xs mt-0.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{n.body}</p>
              <p className="text-[10px] mt-1" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{n.time}</p>
            </div>
          </button>
        ))}
      </div>

      <BottomNav active="home" onNavigate={onNavigate as (s: ScreenName) => void} />
    </div>
  );
}
