import { useState } from 'react';
import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';

export default function SignUpScreen({ onNavigate }: ScreenProps) {
  const [role, setRole] = useState<'buyer' | 'farmer'>('buyer');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => onNavigate('login')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Create Account</h2>
      </div>

      <div className="flex-1 px-5 overflow-y-auto hide-scroll pb-8">
        {/* Role selection */}
        <p className="text-xs font-semibold mb-2 mt-1" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>I want to</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {([
            { key: 'buyer', emoji: '🛒', title: 'Buy Produce', sub: 'Shop fresh from farmers' },
            { key: 'farmer', emoji: '🌾', title: 'Sell Products', sub: 'List and sell your crops' },
          ] as const).map(r => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              className="p-4 rounded-2xl border-2 text-left transition-all"
              style={{
                border: `2px solid ${role === r.key ? '#2E7D32' : '#E8F0E9'}`,
                background: role === r.key ? '#F1F8F2' : 'white',
                boxShadow: role === r.key ? '0 4px 16px rgba(46,125,50,0.15)' : 'none',
              }}
            >
              <div className="text-2xl mb-1">{r.emoji}</div>
              <div className="font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{r.title}</div>
              <div className="text-xs mt-0.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{r.sub}</div>
              {role === r.key && (
                <div className="mt-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#2E7D32' }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Form fields */}
        {[
          { label: 'Full Name', placeholder: 'Kofi Mensah', icon: '👤', type: 'text' },
          { label: 'Email Address', placeholder: 'kofi@example.com', icon: '📧', type: 'email' },
          { label: 'Phone Number', placeholder: '+233 24 000 0000', icon: '📱', type: 'tel' },
          ...(role === 'farmer' ? [{ label: 'Farm Location', placeholder: 'Kumasi, Ashanti Region', icon: '📍', type: 'text' }] : []),
          { label: 'Password', placeholder: '••••••••', icon: '🔒', type: 'password' },
          { label: 'Confirm Password', placeholder: '••••••••', icon: '🔒', type: 'password' },
        ].map(f => (
          <div key={f.label} className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">{f.icon}</span>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border outline-none"
                style={{ border: '1.5px solid #E8F0E9', background: '#F8FAF5', color: '#212121', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>
        ))}

        {/* Terms */}
        <div className="flex items-start gap-3 mb-5">
          <button
            onClick={() => setAgreed(v => !v)}
            className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
            style={{ background: agreed ? '#2E7D32' : 'white', border: `2px solid ${agreed ? '#2E7D32' : '#BDBDBD'}` }}
          >
            {agreed && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
          </button>
          <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
            I agree to FarmFresh's{' '}
            <span style={{ color: '#2E7D32', fontWeight: 600 }}>Terms of Service</span> and{' '}
            <span style={{ color: '#2E7D32', fontWeight: 600 }}>Privacy Policy</span>
          </p>
        </div>

        <button
          onClick={() => role === 'farmer' ? onNavigate('farmer-dashboard') : onNavigate('home')}
          className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(46,125,50,0.35)' }}
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-4" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="font-semibold" style={{ color: '#2E7D32' }}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
