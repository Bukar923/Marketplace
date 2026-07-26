import { useState } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { orders } from '../data/mockData';

const tabs = ['All', 'Pending', 'Confirmed', 'Dispatched', 'Delivered'];

const statusColors: Record<string, { bg: string; text: string }> = {
  pending:    { bg: '#FFF8E1', text: '#F9A825' },
  confirmed:  { bg: '#E8F5E9', text: '#2E7D32' },
  packed:     { bg: '#E3F2FD', text: '#1565C0' },
  dispatched: { bg: '#FFF3E0', text: '#E65100' },
  delivered:  { bg: '#E8F5E9', text: '#4CAF50' },
  cancelled:  { bg: '#FFEBEE', text: '#C62828' },
};

const actionMap: Record<string, string> = {
  pending:    'Confirm Order',
  confirmed:  'Mark Packed',
  packed:     'Dispatch',
  dispatched: 'Mark Delivered',
  delivered:  'Delivered',
};

export default function ManageOrdersScreen({ onNavigate }: ScreenProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeTab === 'All'
    ? orders
    : orders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => onNavigate('farmer-dashboard')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Manage Orders</h2>
          <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{orders.length} total orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 overflow-x-auto hide-scroll mb-3">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-semibold transition-all"
            style={{
              background: activeTab === t ? '#2E7D32' : 'white',
              color: activeTab === t ? 'white' : '#757575',
              fontFamily: 'Inter, sans-serif',
              boxShadow: activeTab === t ? '0 4px 12px rgba(46,125,50,0.3)' : '0 2px 6px rgba(0,0,0,0.06)',
            }}
          >
            {t} {t !== 'All' && <span className="ml-1 opacity-70">{orders.filter(o => o.status.toLowerCase() === t.toLowerCase()).length}</span>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <span className="text-4xl">📭</span>
            <p className="text-sm font-medium" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>No {activeTab.toLowerCase()} orders</p>
          </div>
        ) : (
          filtered.map(order => {
            const sc = statusColors[order.status] ?? statusColors['pending'];
            const isExpanded = expanded === order.id;
            return (
              <div key={order.id} className="bg-white rounded-2xl mb-3 overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <img src={order.buyerAvatar} alt={order.buyer} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xs" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{order.id}</p>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold capitalize" style={{ background: sc.bg, color: sc.text, fontFamily: 'Poppins, sans-serif' }}>{order.status}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{order.buyer} · {order.products}</p>
                    <p className="text-[10px]" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{order.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-sm" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>GH₵{order.total.toFixed(2)}</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2.5" strokeLinecap="round" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }}><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t" style={{ borderColor: '#F8FAF5' }}>
                    <div className="grid grid-cols-2 gap-2 mb-3 pt-3">
                      {[['Items', `${order.items} products`], ['Date', order.date], ['Payment', 'Mobile Money'], ['Delivery', 'Standard']].map(([l, v]) => (
                        <div key={l}>
                          <p className="text-[10px]" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>{l}</p>
                          <p className="text-xs font-medium" style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onNavigate('chat')}
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold border"
                        style={{ border: '1.5px solid #E8F0E9', color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}
                      >
                        Message Buyer
                      </button>
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button
                          className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white"
                          style={{ background: '#2E7D32', fontFamily: 'Inter, sans-serif' }}
                        >
                          {actionMap[order.status]}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <BottomNav active="manage-orders" onNavigate={onNavigate as (s: ScreenName) => void} role="farmer" />
    </div>
  );
}
