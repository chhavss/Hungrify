export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  role: 'customer' | 'restaurant' | 'delivery' | 'admin';
  address?: string;
  loyaltyPoints?: number;
  vehicleType?: string;
  licenseNo?: string;
  restaurantId?: number;
}

export const users: User[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@mail.com',
    passwordHash: 'hash123',
    phone: '9812345670',
    role: 'customer',
    address: '12 MG Road, Bangalore',
    loyaltyPoints: 120
  },
  {
    id: 2,
    name: 'Priya Mehta',
    email: 'priya@mail.com',
    passwordHash: 'hash456',
    phone: '9823456781',
    role: 'customer',
    address: '45 Park Street, Mumbai',
    loyaltyPoints: 45
  },
  {
    id: 3,
    name: 'Spice Villa Owner',
    email: 'spice@villa.com',
    passwordHash: 'hash789',
    phone: '9834567892',
    role: 'restaurant',
    restaurantId: 1
  },
  {
    id: 4,
    name: 'Burger Hub Owner',
    email: 'burger@hub.com',
    passwordHash: 'hashABC',
    phone: '9845678903',
    role: 'restaurant',
    restaurantId: 2
  },
  {
    id: 5,
    name: 'Rahul Verma',
    email: 'rahul@agent.com',
    passwordHash: 'hashDEF',
    phone: '9856789014',
    role: 'delivery',
    vehicleType: 'Bike',
    licenseNo: 'KA05AB1234'
  },
  {
    id: 6,
    name: 'Admin User',
    email: 'admin@foodapp.com',
    passwordHash: 'hashGHI',
    phone: '9867890125',
    role: 'admin'
  }
];
