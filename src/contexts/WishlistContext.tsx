import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  favoriteRestaurants: number[];
  favoriteMenuItems: number[];
  toggleFavoriteRestaurant: (id: number) => void;
  toggleFavoriteMenuItem: (id: number) => void;
  isRestaurantFavorite: (id: number) => boolean;
  isMenuItemFavorite: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>(() => {
    const saved = localStorage.getItem('hungrify-fav-restaurants');
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteMenuItems, setFavoriteMenuItems] = useState<number[]>(() => {
    const saved = localStorage.getItem('hungrify-fav-menuitems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hungrify-fav-restaurants', JSON.stringify(favoriteRestaurants));
  }, [favoriteRestaurants]);

  useEffect(() => {
    localStorage.setItem('hungrify-fav-menuitems', JSON.stringify(favoriteMenuItems));
  }, [favoriteMenuItems]);

  const toggleFavoriteRestaurant = (id: number) => {
    setFavoriteRestaurants(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleFavoriteMenuItem = (id: number) => {
    setFavoriteMenuItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isRestaurantFavorite = (id: number) => favoriteRestaurants.includes(id);
  const isMenuItemFavorite = (id: number) => favoriteMenuItems.includes(id);

  return (
    <WishlistContext.Provider value={{
      favoriteRestaurants,
      favoriteMenuItems,
      toggleFavoriteRestaurant,
      toggleFavoriteMenuItem,
      isRestaurantFavorite,
      isMenuItemFavorite
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
