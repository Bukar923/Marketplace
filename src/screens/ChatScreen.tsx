import { useState, useRef, useEffect } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { messages as initialMessages } from '../data/mockData';

export default function ChatScreen({ onNavigate }: ScreenProps) {
  const [msgs, setMsgs] = useState(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { id: `m${Date.now()}`, sender: 'buyer', text: input, time: 'Now', read: false }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b" style={{ borderColor: '#E8F0E9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <button onClick={() => onNavigate('home')} className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F8FAF5' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Kwame" className="w-10 h-10 rounded-xl object-cover" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: '#4CAF50' }} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>Kwame Mensah</p>
          <p className="text-xs" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>● Online · Farmer</p>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#F8FAF5' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 10.79a19.79 19.79 0 01-3.07-8.67A2 2 0 011.9 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto hide-scroll px-4 py-4 flex flex-col gap-3">
        {/* Date */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: '#E8F0E9' }} />
          <span className="text-[10px]" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>Today</span>
          <div className="flex-1 h-px" style={{ background: '#E8F0E9' }} />
        </div>

        {msgs.map(m => {
          const isBuyer = m.sender === 'buyer';
          return (
            <div key={m.id} className={`flex gap-2 ${isBuyer ? 'flex-row-reverse' : ''}`}>
              {!isBuyer && (
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Kwame" className="w-7 h-7 rounded-lg object-cover flex-shrink-0 self-end" />
              )}
              <div className={`max-w-[75%] ${isBuyer ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div
                  className="px-4 py-2.5 rounded-2xl text-sm"
                  style={{
                    background: isBuyer ? 'linear-gradient(135deg, #2E7D32, #4CAF50)' : 'white',
                    color: isBuyer ? 'white' : '#212121',
                    fontFamily: 'Inter, sans-serif',
                    borderRadius: isBuyer ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    boxShadow: isBuyer ? '0 4px 12px rgba(46,125,50,0.25)' : '0 2px 8px rgba(0,0,0,0.07)',
                    lineHeight: 1.5,
                  }}
                >
                  {m.text}
                </div>
                <span className="text-[10px] px-1" style={{ color: '#BDBDBD', fontFamily: 'Inter, sans-serif' }}>
                  {m.time}
                  {isBuyer && m.read && ' · Read'}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Order context chip */}
      <div className="px-4 mb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#E8F5E9' }}>
          <span className="text-base">🍅</span>
          <span className="text-xs font-medium flex-1" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>Re: Order #ORD-2841 · Fresh Tomatoes</span>
          <button onClick={() => onNavigate('order-tracking')} className="text-xs font-semibold" style={{ color: '#2E7D32', fontFamily: 'Inter, sans-serif' }}>Track</button>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 pb-20 pt-1">
        <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F8FAF5' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </button>
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: '#212121', fontFamily: 'Inter, sans-serif' }}
          />
          <button className="text-base">😊</button>
        </div>
        <button
          onClick={send}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: input ? '#2E7D32' : '#E8F0E9' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={input ? 'white' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>

      <BottomNav active="chat" onNavigate={onNavigate as (s: ScreenName) => void} />
    </div>
  );
}
