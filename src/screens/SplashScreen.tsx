import type { ScreenProps } from '../types';
import { useEffect } from 'react';
import StatusBar from '../components/StatusBar';

export default function SplashScreen({ onNavigate }: ScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => onNavigate('onboarding'), 2600);
    return () => clearTimeout(t);
  }, [onNavigate]);

  return (
    <div
      className="flex flex-col h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1B5E20 0%, #2E7D32 45%, #388E3C 80%, #4CAF50 100%)',
      }}
      onClick={() => onNavigate('onboarding')}
    >
      <StatusBar light />

      {/* Background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{ width: 320, height: 320, background: 'rgba(255,255,255,0.04)', top: -80, right: -80 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 200, height: 200, background: 'rgba(255,255,255,0.06)', bottom: 160, left: -60 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 120, height: 120, background: 'rgba(249,168,37,0.2)', bottom: 80, right: 40 }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo */}
        <div
          className="bounce-in w-24 h-24 rounded-[28px] flex items-center justify-center mb-6"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
            <path d="M32 8C20 8 12 20 12 32c0 4 1 8 3 11" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M32 8c4 6 6 14 4 22-2 6-6 11-12 14" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M32 8c-4 6-6 14-4 22 2 6 6 11 12 14" stroke="#F9A825" strokeWidth="3" strokeLinecap="round"/>
            <path d="M22 28c6 0 12 2 16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M26 36c4 0 8 1 10 4" stroke="#F9A825" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="32" cy="50" r="4" fill="#F9A825"/>
            <path d="M32 46v-8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="fade-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-white font-bold mb-1" style={{ fontSize: 32, fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>
            FarmFresh
          </h1>
          <div className="w-12 h-1 rounded-full mx-auto mb-4" style={{ background: '#F9A825' }} />
          <p className="text-white/80 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
            Fresh From Farm<br />to Your Door
          </p>
        </div>
      </div>

      {/* Nature illustration row */}
      <div className="fade-up px-6 pb-4" style={{ animationDelay: '0.5s' }}>
        <div className="rounded-3xl overflow-hidden" style={{ height: 200, background: 'rgba(255,255,255,0.08)' }}>
          <img
            src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=400&fit=crop&auto=format"
            alt="Farm landscape"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(27,94,32,0.6) 0%, transparent 60%)' }} />
        </div>
      </div>

      {/* Bottom tagline + loader */}
      <div className="pb-10 flex flex-col items-center gap-4">
        <p className="text-white/60 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
          Connecting farmers with buyers directly
        </p>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-full pulse-dot"
              style={{
                width: i === 1 ? 20 : 6,
                height: 6,
                background: i === 1 ? '#F9A825' : 'rgba(255,255,255,0.4)',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
