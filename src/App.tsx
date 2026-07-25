import { useState, useRef, useEffect } from 'react';
import type { ScreenName } from './types';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import SearchScreen from './screens/SearchScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import ChatScreen from './screens/ChatScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import FarmerDashboardScreen from './screens/FarmerDashboardScreen';
import AddProductScreen from './screens/AddProductScreen';
import ManageOrdersScreen from './screens/ManageOrdersScreen';
import EarningsScreen from './screens/EarningsScreen';
import SettingsScreen from './screens/SettingsScreen';

const screens: { id: ScreenName; label: string; icon: string; category: string }[] = [
  { id: 'splash',           label: 'Splash',           icon: '🌿', category: 'Intro' },
  { id: 'onboarding',       label: 'Onboarding',        icon: '👋', category: 'Intro' },
  { id: 'login',            label: 'Login',             icon: '🔐', category: 'Auth' },
  { id: 'signup',           label: 'Sign Up',           icon: '📝', category: 'Auth' },
  { id: 'home',             label: 'Home',              icon: '🏠', category: 'Buyer' },
  { id: 'categories',       label: 'Categories',        icon: '🗂️', category: 'Buyer' },
  { id: 'search',           label: 'Search',            icon: '🔍', category: 'Buyer' },
  { id: 'product-details',  label: 'Product Details',   icon: '🍅', category: 'Buyer' },
  { id: 'cart',             label: 'Cart',              icon: '🛒', category: 'Buyer' },
  { id: 'checkout',         label: 'Checkout',          icon: '💳', category: 'Buyer' },
  { id: 'payment-success',  label: 'Payment Success',   icon: '✅', category: 'Buyer' },
  { id: 'order-tracking',   label: 'Order Tracking',    icon: '📍', category: 'Buyer' },
  { id: 'chat',             label: 'Chat',              icon: '💬', category: 'Buyer' },
  { id: 'notifications',    label: 'Notifications',     icon: '🔔', category: 'Buyer' },
  { id: 'profile',          label: 'Profile',           icon: '👤', category: 'Buyer' },
  { id: 'farmer-dashboard', label: 'Farmer Dashboard',  icon: '📊', category: 'Farmer' },
  { id: 'add-product',      label: 'Add Product',       icon: '➕', category: 'Farmer' },
  { id: 'manage-orders',    label: 'Manage Orders',     icon: '📋', category: 'Farmer' },
  { id: 'earnings',         label: 'Earnings',          icon: '💰', category: 'Farmer' },
  { id: 'settings',         label: 'Settings',          icon: '⚙️',  category: 'Farmer' },
];

const categories = ['Intro', 'Auth', 'Buyer', 'Farmer'];
const catColors: Record<string, string> = { Intro: '#4CAF50', Auth: '#F9A825', Buyer: '#2E7D32', Farmer: '#1B5E20' };

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [params, setParams] = useState<Record<string, unknown>>({});
  const [animKey, setAnimKey] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);

  const navigate = (screen: ScreenName, p?: Record<string, unknown>) => {
    setCurrentScreen(screen);
    setParams(p ?? {});
    setAnimKey(k => k + 1);
    if (screenRef.current) screenRef.current.scrollTop = 0;
  };

  const currentIdx = screens.findIndex(s => s.id === currentScreen);
  const prev = screens[currentIdx - 1];
  const next = screens[currentIdx + 1];

  useEffect(() => {
    document.title = 'FarmFresh — UI/UX Case Study';
  }, []);

  const screenProps = { onNavigate: navigate, params };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':            return <SplashScreen {...screenProps} />;
      case 'onboarding':        return <OnboardingScreen {...screenProps} />;
      case 'login':             return <LoginScreen {...screenProps} />;
      case 'signup':            return <SignUpScreen {...screenProps} />;
      case 'home':              return <HomeScreen {...screenProps} />;
      case 'categories':        return <CategoriesScreen {...screenProps} />;
      case 'search':            return <SearchScreen {...screenProps} />;
      case 'product-details':   return <ProductDetailsScreen {...screenProps} />;
      case 'cart':              return <CartScreen {...screenProps} />;
      case 'checkout':          return <CheckoutScreen {...screenProps} />;
      case 'payment-success':   return <PaymentSuccessScreen {...screenProps} />;
      case 'order-tracking':    return <OrderTrackingScreen {...screenProps} />;
      case 'chat':              return <ChatScreen {...screenProps} />;
      case 'notifications':     return <NotificationsScreen {...screenProps} />;
      case 'profile':           return <ProfileScreen {...screenProps} />;
      case 'farmer-dashboard':  return <FarmerDashboardScreen {...screenProps} />;
      case 'add-product':       return <AddProductScreen {...screenProps} />;
      case 'manage-orders':     return <ManageOrdersScreen {...screenProps} />;
      case 'earnings':          return <EarningsScreen {...screenProps} />;
      case 'settings':          return <SettingsScreen {...screenProps} />;
      default:                  return null;
    }
  };

  const info = screens.find(s => s.id === currentScreen);

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0A1A0A', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Left sidebar — screen navigator */}
      <aside
        className="w-56 flex-shrink-0 border-r overflow-y-auto hide-scroll"
        style={{ background: '#0D1F0D', borderColor: '#1B3A1B' }}
      >
        {/* Brand */}
        <div className="px-4 py-5 border-b" style={{ borderColor: '#1B3A1B' }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#2E7D32' }}>
              <span className="text-sm">🌿</span>
            </div>
            <span className="font-bold text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>FarmFresh</span>
          </div>
          <p className="text-xs" style={{ color: '#4CAF50' }}>UI/UX Case Study</p>
        </div>

        {/* Screen list by category */}
        <div className="py-3">
          {categories.map(cat => (
            <div key={cat}>
              <p
                className="text-[10px] font-bold px-4 py-1 mb-1"
                style={{ color: catColors[cat], fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                {cat}
              </p>
              {screens.filter(s => s.category === cat).map((s) => {
                const isActive = s.id === currentScreen;
                const idx = screens.findIndex(x => x.id === s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => navigate(s.id)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left transition-all"
                    style={{
                      background: isActive ? 'rgba(46,125,50,0.2)' : 'transparent',
                      borderRight: isActive ? '3px solid #2E7D32' : '3px solid transparent',
                    }}
                  >
                    <span className="text-sm w-5 text-center">{s.icon}</span>
                    <span
                      className="text-xs font-medium flex-1"
                      style={{ color: isActive ? '#81C784' : '#6B8A6B', fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: '#1B3A1B', color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}
                    >
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
              <div className="mx-4 my-2 h-px" style={{ background: '#1B3A1B' }} />
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="px-4 pb-4">
          <p className="text-[10px] mb-1.5" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>
            {currentIdx + 1} of {screens.length} screens
          </p>
          <div className="h-1.5 rounded-full" style={{ background: '#1B3A1B' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / screens.length) * 100}%`, background: 'linear-gradient(to right, #2E7D32, #4CAF50)' }}
            />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto hide-scroll py-8 px-6">
        {/* Case study header */}
        <div className="text-center mb-8 max-w-lg">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ background: 'rgba(46,125,50,0.15)', border: '1px solid rgba(46,125,50,0.3)' }}
          >
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#4CAF50' }} />
            <span className="text-xs font-semibold" style={{ color: '#81C784', fontFamily: 'Inter, sans-serif' }}>Interactive Prototype</span>
          </div>
          <h1 className="font-bold text-white mb-2" style={{ fontSize: 26, fontFamily: 'Poppins, sans-serif', lineHeight: 1.2 }}>
            Farmers' Produce Marketplace
          </h1>
          <p className="text-sm" style={{ color: '#6B8A6B', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
            A complete UI/UX case study connecting farmers directly with buyers. 20 screens · Mobile-first · Nature-inspired design.
          </p>
        </div>

        {/* Screen info badge */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-lg">{info?.icon}</span>
          <div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full mr-2"
              style={{ background: `${catColors[info?.category ?? 'Buyer']}30`, color: catColors[info?.category ?? 'Buyer'], fontFamily: 'Poppins, sans-serif' }}
            >
              {info?.category}
            </span>
            <span className="text-sm font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{info?.label}</span>
          </div>
          <span className="text-xs ml-2" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>
            {currentIdx + 1}/{screens.length}
          </span>
        </div>

        {/* Phone + nav row */}
        <div className="flex items-center gap-6">
          {/* Prev button */}
          <button
            onClick={() => prev && navigate(prev.id)}
            disabled={!prev}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{
              background: prev ? 'rgba(46,125,50,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${prev ? 'rgba(46,125,50,0.4)' : 'rgba(255,255,255,0.08)'}`,
              cursor: prev ? 'pointer' : 'not-allowed',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={prev ? '#81C784' : '#2D4A2D'} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {/* iPhone frame */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: 390,
              height: 844,
              background: '#000',
              borderRadius: 52,
              boxShadow: '0 0 0 1px #333, 0 0 0 3px #222, 0 32px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            {/* Side buttons */}
            <div className="absolute left-0 top-[140px] w-1 h-10 rounded-r-full" style={{ background: '#333', left: -1 }} />
            <div className="absolute left-0 top-[190px] w-1 h-10 rounded-r-full" style={{ background: '#333', left: -1 }} />
            <div className="absolute right-0 top-[160px] w-1 h-14 rounded-l-full" style={{ background: '#333', right: -1 }} />

            {/* Dynamic island */}
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3"
              style={{ width: 120, height: 34, background: '#000', borderRadius: 20 }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1A1A1A' }} />
              <div className="flex-1 h-2.5 rounded-full" style={{ background: '#1A1A1A' }} />
            </div>

            {/* Screen content */}
            <div
              ref={screenRef}
              key={animKey}
              className="screen-slide h-full w-full"
              style={{ background: '#F8FAF5', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {renderScreen()}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full z-50" style={{ background: 'rgba(0,0,0,0.3)' }} />
          </div>

          {/* Next button */}
          <button
            onClick={() => next && navigate(next.id)}
            disabled={!next}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
            style={{
              background: next ? 'rgba(46,125,50,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${next ? 'rgba(46,125,50,0.4)' : 'rgba(255,255,255,0.08)'}`,
              cursor: next ? 'pointer' : 'not-allowed',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={next ? '#81C784' : '#2D4A2D'} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Screen dot indicator */}
        <div className="flex gap-1.5 mt-6 flex-wrap justify-center max-w-xs">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              title={s.label}
              className="transition-all"
              style={{
                width: s.id === currentScreen ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: s.id === currentScreen ? '#4CAF50' : '#1B3A1B',
              }}
            />
          ))}
        </div>

        {/* Design system info */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4">
            {[
              { label: 'Screens', value: '20', icon: '📱' },
              { label: 'Components', value: '40+', icon: '🧩' },
              { label: 'Design Tokens', value: '24', icon: '🎨' },
              { label: 'User Flows', value: '8', icon: '🔄' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1B3A1B' }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-white" style={{ fontSize: 20, fontFamily: 'Poppins, sans-serif' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Color palette */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1B3A1B' }}>
            <p className="text-xs font-bold mb-3" style={{ color: '#81C784', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Color System</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { color: '#2E7D32', label: 'Primary' },
                { color: '#4CAF50', label: 'Success' },
                { color: '#F9A825', label: 'Secondary' },
                { color: '#F8FAF5', label: 'Background' },
                { color: '#FFFFFF', label: 'Surface' },
                { color: '#212121', label: 'Text' },
                { color: '#757575', label: 'Muted' },
              ].map(c => (
                <div key={c.color} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl border" style={{ background: c.color, borderColor: '#1B3A1B' }} />
                  <span className="text-[10px]" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1B3A1B' }}>
            <p className="text-xs font-bold mb-3" style={{ color: '#81C784', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Typography</p>
            <div className="flex gap-6">
              <div>
                <p className="font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18 }}>Poppins</p>
                <p className="text-xs" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>Headings · Display</p>
              </div>
              <div>
                <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontSize: 16 }}>Inter</p>
                <p className="text-xs" style={{ color: '#4CAF50', fontFamily: 'Inter, sans-serif' }}>Body · UI Text</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: '#2D4A2D', fontFamily: 'Inter, sans-serif' }}>
          FarmFresh · Farmers' Produce Marketplace · UI/UX Portfolio Case Study · 2026
        </p>
      </main>
    </div>
  );
}
