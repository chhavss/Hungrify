export interface NotificationItem {
  id: string;
  userId: number;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'reward';
  createdAt: string;
  read: boolean;
}

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    userId: 1,
    title: 'Order Confirmed',
    message: 'Your order #101 from Spice Villa has been accepted by the restaurant.',
    type: 'order',
    createdAt: '2026-07-25T11:45:00Z',
    read: true
  },
  {
    id: 'n2',
    userId: 1,
    title: 'Reward Points Added',
    message: 'Congratulations! You earned 25 Loyalty Points from your last order.',
    type: 'reward',
    createdAt: '2026-07-25T12:00:00Z',
    read: false
  },
  {
    id: 'n3',
    userId: 1,
    title: 'Special Coupon Unlocked',
    message: 'Use coupon code HUNGRY100 to get flat ₹100 off on your next delicious meal!',
    type: 'offer',
    createdAt: '2026-07-25T13:00:00Z',
    read: false
  }
];
