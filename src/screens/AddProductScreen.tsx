import { useState } from 'react';
import type { ScreenProps, ScreenName } from '../types';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { categories } from '../data/mockData';

export default function AddProductScreen({ onNavigate }: ScreenProps) {
  const [form, setForm] = useState({ name: '', price: '', unit: 'kg', qty: '', description: '', category: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handlePublish = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); onNavigate('farmer-dashboard'); }, 1400);
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1574323347407-f5e1c2d47474?w=400&h=400&fit=crop&auto=format',
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAF5' }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-5 py-3">
        <button onClick={() => onNavigate('farmer-dashboard')} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h2 className="font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, color: '#212121' }}>Add Product</h2>
      </div>

      <div className="flex-1 overflow-y-auto hide-scroll px-5 pb-32">
        {/* Image upload */}
        <div
          className="rounded-3xl flex flex-col items-center justify-center gap-3 mb-5 overflow-hidden relative"
          style={{ height: 180, background: imagePreview ? 'transparent' : '#E8F5E9', border: '2px dashed #A5D6A7' }}
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Product" className="w-full h-full object-cover" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(46,125,50,0.1)' }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <p className="text-sm font-semibold" style={{ color: '#2E7D32', fontFamily: 'Poppins, sans-serif' }}>Upload Product Image</p>
              <p className="text-xs" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Tap to choose or take a photo</p>
            </>
          )}
        </div>

        {/* Quick image pick */}
        <div className="flex gap-2 mb-5">
          <p className="text-xs self-center" style={{ color: '#757575', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>Quick pick:</p>
          {sampleImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setImagePreview(img)}
              className="w-12 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all"
              style={{ border: imagePreview === img ? '2px solid #2E7D32' : '2px solid transparent' }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Form */}
        {[
          { key: 'name', label: 'Product Name', placeholder: 'e.g. Fresh Tomatoes', icon: '🌿' },
          { key: 'price', label: 'Price (GH₵)', placeholder: 'e.g. 2.50', icon: '💰', type: 'number' },
          { key: 'qty', label: 'Available Quantity', placeholder: 'e.g. 50', icon: '📦', type: 'number' },
        ].map(f => (
          <div key={f.key} className="mb-4">
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">{f.icon}</span>
              <input
                type={f.type ?? 'text'}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border outline-none"
                style={{ border: '1.5px solid #E8F0E9', background: 'white', color: '#212121', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>
        ))}

        {/* Unit selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Unit</label>
          <div className="flex gap-2 flex-wrap">
            {['kg', 'gram', 'litre', 'dozen', 'cob', 'bunch', 'bag'].map(u => (
              <button
                key={u}
                onClick={() => setForm(v => ({ ...v, unit: u }))}
                className="px-4 py-2 rounded-xl text-xs font-medium border transition-all"
                style={{
                  border: `1.5px solid ${form.unit === u ? '#2E7D32' : '#E8F0E9'}`,
                  background: form.unit === u ? '#E8F5E9' : 'white',
                  color: form.unit === u ? '#2E7D32' : '#757575',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Category</label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setForm(v => ({ ...v, category: c.id }))}
                className="flex items-center gap-2 p-2.5 rounded-xl border transition-all"
                style={{
                  border: `1.5px solid ${form.category === c.id ? '#2E7D32' : '#E8F0E9'}`,
                  background: form.category === c.id ? '#E8F5E9' : 'white',
                }}
              >
                <span className="text-lg">{c.icon}</span>
                <span className="text-xs font-medium" style={{ color: form.category === c.id ? '#2E7D32' : '#757575', fontFamily: 'Inter, sans-serif' }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1.5" style={{ color: '#757575', fontFamily: 'Inter, sans-serif' }}>Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm(v => ({ ...v, description: e.target.value }))}
            placeholder="Describe your product: freshness, origin, how it was grown..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl text-sm border outline-none resize-none"
            style={{ border: '1.5px solid #E8F0E9', background: 'white', color: '#212121', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
          />
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="absolute bottom-16 left-0 right-0 px-5 pb-2 pt-3 flex gap-3" style={{ background: 'linear-gradient(to top, #F8FAF5 70%, transparent)' }}>
        <button
          className="flex-1 py-3.5 rounded-2xl font-semibold text-sm border-2"
          style={{ border: '2px solid #E8F0E9', color: '#757575', fontFamily: 'Poppins, sans-serif' }}
        >
          Save Draft
        </button>
        <button
          onClick={handlePublish}
          className="flex-1 py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            background: saved ? '#4CAF50' : 'linear-gradient(135deg, #2E7D32, #4CAF50)',
            fontFamily: 'Poppins, sans-serif',
            boxShadow: '0 6px 20px rgba(46,125,50,0.35)',
          }}
        >
          {saved ? (
            <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> Published!</>
          ) : 'Publish Now'}
        </button>
      </div>

      <BottomNav active="add-product" onNavigate={onNavigate as (s: ScreenName) => void} role="farmer" />
    </div>
  );
}
