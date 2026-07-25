export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  description: string;
}

export const coupons: Coupon[] = [
  {
    code: 'WELCOME50',
    discountType: 'percentage',
    value: 50,
    minOrderAmount: 150,
    maxDiscount: 100,
    description: '50% off up to ₹100 on your first order'
  },
  {
    code: 'HUNGRY100',
    discountType: 'fixed',
    value: 100,
    minOrderAmount: 399,
    description: 'Flat ₹100 off on orders above ₹399'
  },
  {
    code: 'FESTIVE20',
    discountType: 'percentage',
    value: 20,
    minOrderAmount: 250,
    maxDiscount: 150,
    description: '20% off up to ₹150 on festive specials'
  },
  {
    code: 'BIGBITE',
    discountType: 'percentage',
    value: 15,
    minOrderAmount: 500,
    description: '15% off with no maximum discount limit on orders above ₹500'
  },
  {
    code: 'HEALTHY10',
    discountType: 'percentage',
    value: 10,
    minOrderAmount: 120,
    maxDiscount: 50,
    description: '10% off up to ₹50 on healthy collections'
  },
  {
    code: 'SUPER60',
    discountType: 'percentage',
    value: 60,
    minOrderAmount: 100,
    maxDiscount: 120,
    description: 'Super 60% off up to ₹120 for selected partners'
  },
  {
    code: 'DAILYDEAL',
    discountType: 'percentage',
    value: 10,
    minOrderAmount: 150,
    maxDiscount: 75,
    description: '10% off up to ₹75 on everyday orders'
  },
  {
    code: 'FREEDEL',
    discountType: 'percentage',
    value: 100,
    minOrderAmount: 200,
    maxDiscount: 40, // covers delivery fee
    description: 'Free delivery on orders above ₹200'
  }
];
