import { useState } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { earningsData, monthlyEarnings } from '../data/mockData';

const periods = ['Week', 'Month', 'Year'];

export default function EarningsScreen({ onNavigate }: ScreenProps) {
  const [period, setPeriod] = useState('Week');
  const data = period === 'Week' ? earningsData : period === 'Month' ? monthlyEarnings.slice(-4).map(d => ({ day: d.month, amount: d.amount })) : monthlyEarnings.map(d => ({ day: d.month, amount: d.amount }));

  const total = data.reduce((s, d) => s + d.amount, 0);
  const avg = Math.round(total / data.length);

  const transactions = [
    { id: 'ORD-2841', buyer: 'Efua Darko', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format', amount: 8.20, date: 'Jul 22', type: 'credit' },
    { id: 'ORD-2839', buyer: 'Nana Osei', avatar: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=80&h=80&fit=crop&auto=format', amount: 12.00, date: 'Jul 20', type: 'credit' },
    { id: 'Withdrawal', buyer: 'MoMo Payout', avatar: '', amount: -50.00, date: 'Jul 18', type: 'debit' },
    { id: 'ORD-2836', buyer: 'Abena Asante', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format', amount: 6.60, date: 'Jul 17', type: 'credit' },
    { id: 'ORD-2830', buyer: 'Akua Mensah', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format', amount: 4.40, date: 'Jul 15', type: 'credit' },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => onNavigate('farmer-dashboard')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Earnings</h2>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-20">
        {/* Total earnings card */}
        <div
          className="rounded-3xl p-5 mb-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
        >
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
          <p className="text-white/70 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Total Earnings · This {period}</p>
          <h2 className="font-bold text-white mb-3" style={{ fontSize: 32, fontFamily: 'Poppins, sans-serif' }}>GH₵{total.toFixed(2)}</h2>
          <div className="flex gap-4">
            <div>
              <p className="text-white/60 text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>Average/day</p>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>GH₵{avg}</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>Orders</p>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{data.length * 2}</p>
            </div>
            <div className="ml-auto">
              <span className="text-sm font-bold px-3 py-1.5 rounded-xl" style={{ background: 'rgba(249,168,37,0.25)', color: '#F9A825', fontFamily: 'Poppins, sans-serif' }}>↑ 18%</span>
            </div>
          </div>
        </div>

        {/* Period toggle */}
        <div className="flex gap-1 p-1 rounded-2xl mb-4" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: period === p ? '#2E7D32' : 'transparent',
                color: period === p ? 'white' : '#757575',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-3xl p-4 mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h3 className="font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#212121' }}>Revenue Chart</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#757575', fontFamily: 'Inter, sans-serif' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#757575', fontFamily: 'Inter, sans-serif' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#212121', border: 'none', borderRadius: 12, color: 'white', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
                cursor={{ fill: '#E8F5E9' }}
                formatter={(value) => [`GH₵${value}`, 'Revenue']}
              />
              <Bar dataKey="amount" fill="#2E7D32" radius={[8, 8, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Withdraw */}
        <button
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm mb-4 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #F57F17, #F9A825)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 20px rgba(249,168,37,0.35)' }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
          Withdraw · GH₵{(total * 0.85).toFixed(2)} available
        </button>

        {/* Transactions */}
        <h3 className="font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#212121' }}>Transactions</h3>
        {transactions.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 mb-2 flex items-center gap-3" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            {t.avatar ? (
              <img src={t.avatar} alt={t.buyer} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3E0' }}>
                <span className="text-xl">📤</span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-xs" style={{ fontFamily: 'Poppins, sans-serif', color: '#212121' }}>{t.buyer}</p>
              <p className="text-[10px]" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{t.id} · {t.date}</p>
            </div>
            <span
              className="font-bold text-sm"
              style={{
                color: t.type === 'credit' ? '#2E7D32' : '#F44336',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {t.type === 'credit' ? '+' : ''}GH₵{Math.abs(t.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <BottomNav active="earnings" onNavigate={onNavigate as (s: ScreenName) => void} role="farmer" />
    </div>
  );
}
