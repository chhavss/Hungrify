import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menu';
import { Coupon, coupons } from '../data/coupons';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  restaurantName: string;
  isVeg: boolean;
}

export interface BillSummary {
  itemsTotal: number;
  deliveryFee: number;
  platformFee: number;
  taxes: number;
  discount: number;
  netTotal: number;
}

interface CartContextType {
  cart: CartItem[];
  coupon: Coupon | null;
  selectedRestaurantId: number | null;
  selectedRestaurantName: string | null;
  addToCart: (item: MenuItem, restaurantId: number, restaurantName: string) => { success: boolean; showConflictModal?: boolean; conflictRestaurant?: string };
  forceAddToCart: (item: MenuItem, restaurantId: number, restaurantName: string) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getBillSummary: () => BillSummary;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('hungrify-cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [coupon, setCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('hungrify-coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('hungrify-cart', JSON.stringify(cart));
    if (cart.length === 0) {
      localStorage.removeItem('hungrify-coupon');
      setCoupon(null);
    }
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('hungrify-coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('hungrify-coupon');
    }
  }, [coupon]);

  const selectedRestaurantId = cart.length > 0 ? cart[0].restaurantId : null;
  const selectedRestaurantName = cart.length > 0 ? cart[0].restaurantName : null;

  const addToCart = (item: MenuItem, rId: number, rName: string) => {
    if (cart.length > 0 && cart[0].restaurantId !== rId) {
      return {
        success: false,
        showConflictModal: true,
        conflictRestaurant: cart[0].restaurantName
      };
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        restaurantId: rId,
        restaurantName: rName,
        isVeg: item.isVeg
      }];
    });

    return { success: true };
  };

  const forceAddToCart = (item: MenuItem, rId: number, rName: string) => {
    setCart([
      {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        restaurantId: rId,
        restaurantName: rName,
        isVeg: item.isVeg
      }
    ]);
    setCoupon(null);
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code' };
    }

    const summary = getBillSummary();
    if (summary.itemsTotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order amount to apply this coupon is ₹${found.minOrderAmount}`
      };
    }

    setCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const getBillSummary = (): BillSummary => {
    const itemsTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = itemsTotal > 0 ? (itemsTotal > 500 ? 0 : 40) : 0;
    const platformFee = itemsTotal > 0 ? 5 : 0;
    const taxes = Math.round(itemsTotal * 0.05); // 5% GST

    let discount = 0;
    if (coupon && itemsTotal >= coupon.minOrderAmount) {
      if (coupon.discountType === 'percentage') {
        discount = Math.round((itemsTotal * coupon.value) / 100);
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      } else {
        discount = coupon.value;
      }
    }

    const netTotal = Math.max(0, itemsTotal + deliveryFee + platformFee + taxes - discount);

    return {
      itemsTotal,
      deliveryFee,
      platformFee,
      taxes,
      discount,
      netTotal
    };
  };

  return (
    <CartContext.Provider value={{
      cart,
      coupon,
      selectedRestaurantId,
      selectedRestaurantName,
      addToCart,
      forceAddToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      getBillSummary
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
