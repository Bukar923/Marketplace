import { useState } from 'react';
import type { ScreenProps } from '../types';
import StatusBar from '../components/StatusBar';

const slides = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&h=500&fit=crop&auto=format',
    title: 'Buy Fresh Produce',
    subtitle: 'Browse hundreds of fresh fruits, vegetables, grains and more — sourced directly from local farmers near you.',
    accent: '#2E7D32',
    bg: '#F1F8F2',
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&h=500&fit=crop&auto=format',
    title: 'Sell Farm Products',
    subtitle: 'List your crops and connect with buyers directly. Manage your store, track orders and grow your farm income.',
    accent: '#F9A825',
    bg: '#FFF8E1',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=700&h=500&fit=crop&auto=format',
    title: 'Fast & Secure Delivery',
    subtitle: 'Real-time order tracking, secure payments and reliable delivery right to your doorstep — every time.',
    accent: '#2E7D32',
    bg: '#F1F8F2',
  },
];

export default function OnboardingScreen({ onNavigate }: ScreenProps) {
  const [step, setStep] = useState(0);
  const slide = slides[step];

  const next = () => {
    if (step < 2) setStep(s => s + 1);
    else onNavigate('login');
  };

  return (
    <div className="flex flex-col h-full" style={{ background: slide.bg, transition: 'background 0.4s ease' }}>
      <StatusBar />

      {/* Skip */}
      <div className="flex justify-end px-5 pt-2">
        <button
          onClick={() => onNavigate('login')}
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-6 pt-2">
        <div className="w-full rounded-3xl overflow-hidden" style={{ height: 280, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover screen-slide"
            key={step}
          />
        </div>
      </div>

      {/* Text */}
      <div className="px-6 pt-6 pb-4" key={`text-${step}`} style={{ animation: 'fadeUp 0.4s ease-out both' }}>
        <h2 className="font-bold mb-3" style={{ fontSize: 26, fontFamily: 'Poppins, sans-serif', color: '#212121' }}>
          {slide.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>
          {slide.subtitle}
        </p>
      </div>

      {/* Dots + button */}
      <div className="px-6 pb-10 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              className="rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                background: i === step ? slide.accent : '#E0E0E0',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-sm text-white"
          style={{ background: slide.accent, fontFamily: 'Poppins, sans-serif', boxShadow: `0 8px 24px ${slide.accent}40` }}
        >
          {step < 2 ? 'Next' : "Get Started"}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
