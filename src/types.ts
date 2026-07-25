export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'home'
  | 'categories'
  | 'search'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'payment-success'
  | 'order-tracking'
  | 'chat'
  | 'notifications'
  | 'profile'
  | 'farmer-dashboard'
  | 'add-product'
  | 'manage-orders'
  | 'earnings'
  | 'settings';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  farmerLocation: string;
  farmerRating: number;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  products: string;
  items: number;
  total: number;
  status: 'pending' | 'confirmed' | 'packed' | 'dispatched' | 'delivered' | 'cancelled';
  date: string;
  buyer: string;
  buyerAvatar: string;
}

export interface Farmer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  products: number;
  rating: number;
  speciality: string;
  coverBg: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'delivery' | 'message' | 'payment';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface Message {
  id: string;
  sender: 'buyer' | 'farmer';
  text: string;
  time: string;
  read: boolean;
}

export interface NavProps {
  active: string;
  onNavigate: (screen: ScreenName) => void;
}

export interface ScreenProps {
  onNavigate: (screen: ScreenName, params?: Record<string, unknown>) => void;
  params?: Record<string, unknown>;
}
