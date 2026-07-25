import { Restaurant, restaurants } from '../../data/restaurants';
import { MenuItem, menuItems } from '../../data/menu';
import { ReviewItem, reviews } from '../../data/reviews';

export const restaurantsApi = {
  getAll: async (filters?: {
    cuisine?: string;
    search?: string;
    sortBy?: 'rating' | 'deliveryTime' | 'costForTwo';
    vegOnly?: boolean;
    collectionId?: string;
  }): Promise<Restaurant[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let result = [...restaurants];

    if (filters) {
      const { cuisine, search, sortBy, vegOnly, collectionId } = filters;

      if (cuisine && cuisine !== 'All') {
        result = result.filter(r => r.cuisineType.toLowerCase() === cuisine.toLowerCase());
      }

      if (search) {
        const query = search.toLowerCase();
        result = result.filter(
          r => r.name.toLowerCase().includes(query) || r.cuisineType.toLowerCase().includes(query)
        );
      }

      if (vegOnly) {
        result = result.filter(r => r.isPureVeg === 'veg');
      }

      if (collectionId) {
        switch (collectionId) {
          case 'top_rated':
            result = result.filter(r => r.rating >= 4.4);
            break;
          case 'fast_delivery':
            result = result.filter(r => r.deliveryTime <= 22);
            break;
          case 'budget_meals':
            result = result.filter(r => r.costForTwo <= 300);
            break;
          case 'healthy':
            result = result.filter(r => r.cuisineType === 'Healthy');
            break;
          case 'near_you':
            result = result.filter(r => r.distance <= 2.0);
            break;
          case 'newly_added':
            result = result.filter(r => r.id % 4 === 0); // Arbitrary filter for demo
            break;
          default:
            break;
        }
      }

      if (sortBy) {
        if (sortBy === 'rating') {
          result.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'deliveryTime') {
          result.sort((a, b) => a.deliveryTime - b.deliveryTime);
        } else if (sortBy === 'costForTwo') {
          result.sort((a, b) => a.costForTwo - b.costForTwo);
        }
      }
    }

    return result;
  },

  getById: async (id: number): Promise<Restaurant | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return restaurants.find(r => r.id === id);
  },

  getMenu: async (restaurantId: number): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return menuItems.filter(m => m.restaurantId === restaurantId);
  },

  getReviews: async (restaurantId: number): Promise<ReviewItem[]> => {
    return reviews.filter(r => r.restaurantId === restaurantId);
  },

  addReview: async (review: Omit<ReviewItem, 'id' | 'createdAt'>): Promise<ReviewItem> => {
    const newReview: ReviewItem = {
      ...review,
      id: `r-new-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newReview);
    return newReview;
  }
};
