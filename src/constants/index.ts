export const CUISINES = [
  'All',
  'Indian',
  'Fast Food',
  'Italian',
  'Biryani',
  'Healthy',
  'Chinese',
  'Coffee',
  'Desserts',
  'South Indian',
  'Asian'
];

export const COLLECTIONS = [
  { id: 'top_rated', name: 'Top Rated', description: 'Highest rated meals in your city' },
  { id: 'fast_delivery', name: 'Fast Delivery', description: 'Delivered in under 25 mins' },
  { id: 'budget_meals', name: 'Budget Meals', description: 'Delicious options under ₹200' },
  { id: 'healthy', name: 'Healthy', description: 'Fresh, organic, and diet friendly' },
  { id: 'late_night', name: 'Late Night', description: 'Satisfy midnight cravings' },
  { id: 'near_you', name: 'Near You', description: 'Closest kitchens to your location' },
  { id: 'newly_added', name: 'Newly Added', description: 'Fresh new tastes to explore' }
];

export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI (Paytm/GPay/PhonePe)', icon: '📱' },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
  { id: 'wallet', name: 'Hungrify Wallet', icon: '👛' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' }
];

export const APP_ROUTES = {
  HOME: '/',
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAILS: '/restaurants/:id',
  SEARCH: '/search',
  OFFERS: '/offers',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  PROFILE: '/profile',
  ABOUT: '/about',
  DEVELOPER_PORTAL: '/developer',
  DEVELOPER_LOGIN: '/developer/login',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};
