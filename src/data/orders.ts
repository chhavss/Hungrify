export interface OrderItemRecord {
  itemId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: number;
  restaurantId: number;
  restaurantName: string;
  agentId?: number;
  agentName?: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'picked_up' | 'delivered' | 'cancelled';
  items: OrderItemRecord[];
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: string;
  orderedAt: string;
  deliveredAt?: string;
}

export const staticOrders: Order[] = [
  {
    id: 'ord101',
    customerId: 1,
    restaurantId: 1,
    restaurantName: 'Spice Villa',
    agentId: 5,
    agentName: 'Rahul Verma',
    status: 'delivered',
    items: [
      { itemId: 1, name: 'Butter Chicken', price: 280, quantity: 1 },
      { itemId: 2, name: 'Garlic Naan', price: 50, quantity: 2 }
    ],
    totalAmount: 380,
    deliveryAddress: '12 MG Road, Bangalore',
    paymentMethod: 'upi',
    orderedAt: '2026-07-25T11:30:00Z',
    deliveredAt: '2026-07-25T11:55:00Z'
  },
  {
    id: 'ord102',
    customerId: 1,
    restaurantId: 2,
    restaurantName: 'Burger Hub',
    agentId: 5,
    agentName: 'Rahul Verma',
    status: 'delivered',
    items: [
      { itemId: 7, name: 'Classic Cheeseburger', price: 180, quantity: 2 },
      { itemId: 9, name: 'Peri Peri French Fries', price: 110, quantity: 1 }
    ],
    totalAmount: 470,
    deliveryAddress: '12 MG Road, Bangalore',
    paymentMethod: 'card',
    orderedAt: '2026-07-24T19:00:00Z',
    deliveredAt: '2026-07-24T19:25:00Z'
  },
  {
    id: 'ord103',
    customerId: 2,
    restaurantId: 3,
    restaurantName: 'Pizza Point',
    agentId: 5,
    agentName: 'Rahul Verma',
    status: 'delivered',
    items: [
      { itemId: 14, name: 'Farmhouse Pizza', price: 380, quantity: 1 }
    ],
    totalAmount: 380,
    deliveryAddress: '45 Park Street, Mumbai',
    paymentMethod: 'wallet',
    orderedAt: '2026-07-25T12:00:00Z',
    deliveredAt: '2026-07-25T12:30:00Z'
  }
];

// Helper to generate a realistic large order history set programmatically
export const generateMockOrderHistory = (customerId: number): Order[] => {
  const generated: Order[] = [...staticOrders.filter(o => o.customerId === customerId)];
  const restaurantNames = ['Spice Villa', 'Burger Hub', 'Pizza Point', 'Biryani House', 'Healthy Greens', 'Szechuan Dragon'];
  const paymentMethods = ['upi', 'card', 'wallet', 'cod'];
  
  // Create 50 historical mock orders for the customer to populate profile history cleanly
  for (let i = 1; i <= 57; i++) {
    const rIdx = i % restaurantNames.length;
    const daysAgo = i + 1;
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - daysAgo);
    
    generated.push({
      id: `ordHist-${100 + i}`,
      customerId,
      restaurantId: rIdx + 1,
      restaurantName: restaurantNames[rIdx],
      agentId: 5,
      agentName: 'Rahul Verma',
      status: 'delivered',
      items: [
        { itemId: rIdx * 5 + 1, name: 'Popular Combo Item', price: 150 + (i * 2) % 100, quantity: 1 + (i % 2) }
      ],
      totalAmount: 180 + (i * 5) % 300,
      deliveryAddress: customerId === 1 ? '12 MG Road, Bangalore' : '45 Park Street, Mumbai',
      paymentMethod: paymentMethods[i % paymentMethods.length],
      orderedAt: orderDate.toISOString(),
      deliveredAt: new Date(orderDate.getTime() + 25 * 60 * 1000).toISOString()
    });
  }
  
  return generated.sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
};
