import { useState } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-12 h-6 rounded-full transition-all"
      style={{ background: value ? '#2E7D32' : '#E0E0E0' }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
        style={{ left: value ? '26px' : '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
      />
    </button>
  );
}

export default function SettingsScreen({ onNavigate }: ScreenProps) {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promoAlerts: false,
    chatMessages: true,
    deliveryAlerts: true,
    twoFactor: false,
    biometric: true,
    darkMode: false,
    locationAccess: true,
  });

  const toggle = (key: keyof typeof settings) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Edit Profile', sub: 'Update name, photo, contact', action: () => {} },
        { icon: '📍', label: 'Manage Addresses', sub: '2 saved addresses', action: () => {} },
        { icon: '💳', label: 'Payment Methods', sub: 'MoMo, Visa card', action: () => onNavigate('checkout') },
        { icon: '🔑', label: 'Change Password', sub: 'Last changed 3 months ago', action: () => {} },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { icon: '📦', label: 'Order Updates', toggle: 'orderUpdates' as const },
        { icon: '🎉', label: 'Promo & Offers', toggle: 'promoAlerts' as const },
        { icon: '💬', label: 'Chat Messages', toggle: 'chatMessages' as const },
        { icon: '🛵', label: 'Delivery Alerts', toggle: 'deliveryAlerts' as const },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { icon: '🔐', label: 'Two-Factor Auth', toggle: 'twoFactor' as const },
        { icon: '👆', label: 'Biometric Login', toggle: 'biometric' as const },
        { icon: '📍', label: 'Location Access', toggle: 'locationAccess' as const },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { icon: '🌙', label: 'Dark Mode', toggle: 'darkMode' as const },
        { icon: '🌐', label: 'Language', sub: 'English', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '❓', label: 'Help Center', sub: 'FAQs and guides', action: () => {} },
        { icon: '💬', label: 'Contact Support', sub: 'Chat with us', action: () => onNavigate('chat') },
        { icon: '⭐', label: 'Rate the App', sub: 'Share your feedback', action: () => {} },
        { icon: '📄', label: 'Privacy Policy', sub: null, action: () => {} },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => onNavigate('profile')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-20">
        {/* Profile mini card */}
        <div className="flex items-center gap-3 bg-white rounded-2xl p-4 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&auto=format" alt="Profile" className="w-14 h-14 rounded-2xl object-cover" />
          <div className="flex-1">
            <p className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Efua Darko</p>
            <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>efua.darko@gmail.com</p>
            <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>+233 24 123 4567</p>
          </div>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#E8F5E9' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </div>

        {sections.map(section => (
          <div key={section.title} className="mb-4">
            <p className="text-xs font-bold mb-2 px-1" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {section.title}
            </p>
            <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < section.items.length - 1 ? '1px solid #F8FAF5' : 'none' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F8FAF5' }}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div className="flex-1" onClick={'action' in item ? item.action : undefined}>
                    <p className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{item.label}</p>
                    {'sub' in item && item.sub && <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{item.sub}</p>}
                  </div>
                  {'toggle' in item && item.toggle ? (
                    <Toggle value={settings[item.toggle]} onChange={() => item.toggle && toggle(item.toggle)} />
                  ) : (
                    <button onClick={'action' in item ? item.action : undefined}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => onNavigate('login')}
          className="w-full py-4 rounded-2xl font-bold text-sm mb-2 border-2"
          style={{ border: '2px solid #FFEBEE', color: '#F44336', fontFamily: 'Poppins, sans-serif', background: 'white' }}
        >
          🚪  Log Out
        </button>

        <p className="text-center text-xs mt-2 pb-2" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>
          FarmFresh v2.4.1 · Made with 🌿
        </p>
      </div>

      <BottomNav active="settings" onNavigate={onNavigate as (s: ScreenName) => void} role="farmer" />
    </div>
  );
}
