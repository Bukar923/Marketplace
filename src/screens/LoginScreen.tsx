import { useState } from 'react';
import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';

export default function LoginScreen({ onNavigate }: ScreenProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<'buyer' | 'farmer'>('buyer');

  const handleLogin = () => {
    if (role === 'farmer') onNavigate('farmer-dashboard');
    else onNavigate('home');
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      {/* Header illustration */}
      <div className="relative" style={{ height: 180 }}>
        <img
          src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&h=400&fit=crop&auto=format"
          alt="Fresh produce"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(27,94,32,0.5) 0%, rgba(248,250,245,1) 100%)' }}
        />
        <div className="absolute top-4 left-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
              <span className="text-lg">🌿</span>
            </div>
            <span className="font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>FarmFresh</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 overflow-y-auto hide-scroll" style={{ marginTop: -24 }}>
        <div className="bg-white rounded-3xl p-6" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <h2 className="font-bold mb-1" style={{ fontSize: 22, fontFamily: 'Poppins, sans-serif', color: '#212121' }}>
            Welcome back 👋
          </h2>
          <p className="text-sm mb-5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
            Sign in to continue
          </p>

          {/* Role toggle */}
          <div className="flex rounded-2xl p-1 mb-5" style={{ background: '#F1F8F2' }}>
            {(['buyer', 'farmer'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: role === r ? '#2E7D32' : 'transparent',
                  color: role === r ? 'white' : '#757575',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow: role === r ? '0 4px 12px rgba(46,125,50,0.3)' : 'none',
                }}
              >
                {r === 'buyer' ? '🛒 Buyer' : '🌾 Farmer'}
              </button>
            ))}
          </div>

          {/* Email */}
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
            Email Address
          </label>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">📧</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border outline-none"
              style={{
                border: '1.5px solid #E8F0E9',
                background: '#F8FAF5',
                color: '#212121',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          {/* Password */}
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
            Password
          </label>
          <div className="relative mb-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">🔒</span>
            <input
              type={showPass ? 'text' : 'password'}
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-3 rounded-2xl text-sm border outline-none"
              style={{
                border: '1.5px solid #E8F0E9',
                background: '#F8FAF5',
                color: '#212121',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base"
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="flex justify-end mb-5">
            <button className="text-xs font-medium" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>
              Forgot Password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 24px rgba(46,125,50,0.35)' }}
          >
            Sign In
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: '#E8F0E9' }} />
            <span className="text-xs" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: '#E8F0E9' }} />
          </div>

          <div className="flex gap-3">
            {['🅖 Google', '🅕 Facebook'].map(s => (
              <button
                key={s}
                className="flex-1 py-3 rounded-2xl text-sm font-medium border"
                style={{ border: '1.5px solid #E8F0E9', color: '#212121', fontFamily: 'Inter, sans-serif', background: 'white' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm mt-5 mb-6" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
          Don't have an account?{' '}
          <button onClick={() => onNavigate('signup')} className="font-semibold" style={{ color: '#2E7D32' }}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
