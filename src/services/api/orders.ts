import { Order, staticOrders, generateMockOrderHistory } from '../../data/orders';

// In-memory orders database for simulation persistence within current session
let sessionOrders: Order[] = [];

export const ordersApi = {
  getHistory: async (customerId: number): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Merge session created orders with seed orders history
    const seedHistory = generateMockOrderHistory(customerId);
    const userSessionOrders = sessionOrders.filter(o => o.customerId === customerId);
    
    // Ensure uniqueness
    const all = [...userSessionOrders, ...seedHistory];
    const uniqueMap = new Map<string, Order>();
    all.forEach(o => uniqueMap.set(o.id, o));
    
    return Array.from(uniqueMap.values()).sort(
      (a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime()
    );
  },

  getActiveOrders: async (customerId: number): Promise<Order[]> => {
    const active = sessionOrders.filter(
      o => o.customerId === customerId && o.status !== 'delivered' && o.status !== 'cancelled'
    );
    return active;
  },

  placeOrder: async (orderData: Omit<Order, 'id' | 'status' | 'orderedAt'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newOrder: Order = {
      ...orderData,
      id: `ord${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'placed',
      orderedAt: new Date().toISOString()
    };
    
    sessionOrders.unshift(newOrder);
    return newOrder;
  },

  updateStatus: async (orderId: string, status: Order['status']): Promise<Order | undefined> => {
    const order = sessionOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'delivered') {
        order.deliveredAt = new Date().toISOString();
      }
      return order;
    }
    
    const staticOrder = staticOrders.find(o => o.id === orderId);
    if (staticOrder) {
      staticOrder.status = status;
      return staticOrder;
    }
    
    return undefined;
  },
  
  getRestaurantOrders: async (restaurantId: number): Promise<Order[]> => {
    // Filter active session orders or simulate random active ones for dashboards
    const currentSession = sessionOrders.filter(o => o.restaurantId === restaurantId);
    return currentSession;
  },

  getSystemAnalytics: async (): Promise<{
    totalOrders: number;
    activeCustomers: number;
    totalRestaurants: number;
    deliveryPartners: number;
    revenue: number;
    averageRating: number;
    deliveryTime: number;
  }> => {
    return {
      totalOrders: 1845,
      activeCustomers: 1250,
      totalRestaurants: 30,
      deliveryPartners: 15,
      revenue: 84500,
      averageRating: 4.8,
      deliveryTime: 28
    };
  }
};
