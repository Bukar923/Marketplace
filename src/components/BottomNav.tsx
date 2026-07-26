import type { ScreenName } from '../types';

interface BottomNavProps {
  active: string;
  onNavigate: (s: ScreenName) => void;
  role?: 'buyer' | 'farmer';
}

const buyerItems = [
  { id: 'home',      label: 'Home',     screen: 'home' as ScreenName,      icon: HomeIcon },
  { id: 'categories',label: 'Explore',  screen: 'categories' as ScreenName, icon: ExploreIcon },
  { id: 'cart',      label: 'Cart',     screen: 'cart' as ScreenName,       icon: CartIcon },
  { id: 'chat',      label: 'Chat',     screen: 'chat' as ScreenName,       icon: ChatIcon },
  { id: 'profile',   label: 'Profile',  screen: 'profile' as ScreenName,    icon: ProfileIcon },
];

const farmerItems = [
  { id: 'farmer-dashboard', label: 'Home',    screen: 'farmer-dashboard' as ScreenName, icon: HomeIcon },
  { id: 'add-product',      label: 'Add',     screen: 'add-product' as ScreenName,      icon: PlusIcon },
  { id: 'manage-orders',    label: 'Orders',  screen: 'manage-orders' as ScreenName,    icon: OrdersIcon },
  { id: 'earnings',         label: 'Earnings',screen: 'earnings' as ScreenName,         icon: EarningsIcon },
  { id: 'settings',         label: 'Settings',screen: 'settings' as ScreenName,         icon: SettingsIcon },
];

export default function BottomNav({ active, onNavigate, role = 'buyer' }: BottomNavProps) {
  const items = role === 'farmer' ? farmerItems : buyerItems;
  return (
    <div
      className="flex items-center justify-around bg-white border-t border-[#E8F0E9] px-2 pb-2 pt-2"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', flexShrink: 0 }}
    >
      {items.map(item => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <div className={`w-6 h-6 flex items-center justify-center ${isActive ? 'text-[#2E7D32]' : 'text-[#BDBDBD]'}`}>
              <Icon active={isActive} />
            </div>
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? '#2E7D32' : '#BDBDBD', fontFamily: 'Inter, sans-serif' }}
            >
              {item.label}
            </span>
            {isActive && <div className="w-4 h-0.5 rounded-full bg-[#2E7D32] mt-0.5" />}
          </button>
        );
      })}
    </div>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill={active ? '#2E7D32' : 'none'} stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function ExploreIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? '#2E7D32' : 'none'}/></svg>;
}
function CartIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>;
}
function ChatIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
}
function ProfileIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function PlusIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function OrdersIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
}
function EarningsIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
}
function SettingsIcon({ active }: { active: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke={active ? '#2E7D32' : '#BDBDBD'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
}
