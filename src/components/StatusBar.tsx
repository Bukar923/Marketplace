interface StatusBarProps {
  light?: boolean;
}

export default function StatusBar({ light = false }: StatusBarProps) {
  const c = light ? 'text-white' : 'text-[#212121]';
  return (
    <div className={`flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold ${c}`} style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}>
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.4"/>
          <rect x="4" y="4" width="3" height="8" rx="0.5" opacity="0.6"/>
          <rect x="8" y="2" width="3" height="10" rx="0.5" opacity="0.8"/>
          <rect x="12" y="0" width="3" height="12" rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 24 12" fill="currentColor">
          <path d="M1 4.5C4.134 1.5 8.134 0 12 0s7.866 1.5 11 4.5" strokeWidth="1.5" stroke="currentColor" fill="none" opacity="0.3"/>
          <path d="M4 7.5C6.4 5.2 9.1 4 12 4s5.6 1.2 8 3.5" strokeWidth="1.5" stroke="currentColor" fill="none" opacity="0.6"/>
          <path d="M7 10.5c1.4-1.3 3-2 5-2s3.6.7 5 2" strokeWidth="1.5" stroke="currentColor" fill="none" opacity="0.9"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor"/>
          <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
