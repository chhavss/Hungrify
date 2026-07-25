import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Restaurant } from '../../data/restaurants';
import { MenuItem } from '../../data/menu';
import { ReviewItem, reviews as allReviews } from '../../data/reviews';
import { restaurantsApi } from '../../services/api/restaurants';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

export const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurantId = Number(id);

  const { cart, addToCart, forceAddToCart, updateQuantity } = useCart();
  const { isRestaurantFavorite, toggleFavoriteRestaurant, isMenuItemFavorite, toggleFavoriteMenuItem } = useWishlist();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [similarRestaurants, setSimilarRestaurants] = useState<Restaurant[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Recommended');

  // Conflict Modal State
  const [conflictModal, setConflictModal] = useState<{
    isOpen: boolean;
    item?: MenuItem;
    conflictRestaurant?: string;
  }>({ isOpen: false });

  // Add Review State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const restData = await restaurantsApi.getById(restaurantId);
      if (!restData) {
        navigate('/404');
        return;
      }
      setRestaurant(restData);

      const menuData = await restaurantsApi.getMenu(restaurantId);
      setMenu(menuData);

      const reviewsData = await restaurantsApi.getReviews(restaurantId);
      setReviews(reviewsData);

      const allRest = await restaurantsApi.getAll();
      const matches = allRest.filter(
        r => r.cuisineType === restData.cuisineType && r.id !== restData.id
      );
      setSimilarRestaurants(matches.slice(0, 3));
      setLoading(false);
    };

    fetchData();
  }, [restaurantId, navigate]);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <p>Loading Restaurant Menu...</p>
      </div>
    );
  }

  if (!restaurant) return null;

  const handleAddItem = (item: MenuItem) => {
    const res = addToCart(item, restaurant.id, restaurant.name);
    if (!res.success && res.showConflictModal) {
      setConflictModal({
        isOpen: true,
        item,
        conflictRestaurant: res.conflictRestaurant
      });
    }
  };

  const handleConfirmConflict = () => {
    if (conflictModal.item) {
      forceAddToCart(conflictModal.item, restaurant.id, restaurant.name);
    }
    setConflictModal({ isOpen: false });
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const added = await restaurantsApi.addReview({
      restaurantId: restaurant.id,
      customerName: 'Aarav Sharma', // Mock user profile name
      rating: newRating,
      comment: newComment
    });
    setReviews(prev => [added, ...prev]);
    setNewComment('');
    setNewRating(5);
  };

  // Filter menu items
  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesSearch && matchesVeg;
  });

  const categories = ['Recommended', 'Best Sellers', 'Veg', 'Non Veg', 'Beverages', 'Desserts'];

  return (
    <div style={styles.container}>
      {/* Cover Banner */}
      <div style={styles.banner}>
        <img 
          src={restaurant.coverImage} 
          alt={restaurant.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div style={styles.bannerOverlay}>
          <div style={styles.bannerContent}>
            <div style={styles.logoBadge}>{restaurant.logo}</div>
            <div>
              <h1 style={styles.name}>{restaurant.name}</h1>
              <p style={styles.cuisine}>{restaurant.cuisineType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div style={styles.infoCard} className="glass-panel">
        <div style={styles.infoRow}>
          <div style={styles.infoBlock}>
            <span style={styles.ratingVal}>★ {restaurant.rating}</span>
            <span style={styles.subtext}>{restaurant.reviewsCount}+ ratings</span>
          </div>
          <div style={styles.verticalDivider} />
          <div style={styles.infoBlock}>
            <span style={styles.infoVal}>{restaurant.deliveryTime} mins</span>
            <span style={styles.subtext}>Delivery Time</span>
          </div>
          <div style={styles.verticalDivider} />
          <div style={styles.infoBlock}>
            <span style={styles.infoVal}>₹{restaurant.costForTwo}</span>
            <span style={styles.subtext}>Cost for Two</span>
          </div>
        </div>
        
        <hr style={styles.divider} />
        
        <div style={styles.detailsGrid}>
          <span>🚗 Delivery Fee: <strong>{restaurant.deliveryTime > 20 ? '₹40' : 'FREE'}</strong></span>
          <span>🕒 Hours: <strong>{restaurant.openingHours}</strong></span>
          <span>📦 Min Order: <strong>₹{restaurant.minOrder}</strong></span>
          <span>🛡️ Verified License: <strong style={{ color: 'var(--success)' }}>Yes ✓</strong></span>
          <span>🥗 Food Type: <strong>{restaurant.isPureVeg === 'veg' ? 'Pure Veg' : (restaurant.isPureVeg === 'non-veg' ? 'Non Veg Only' : 'Veg & Non Veg')}</strong></span>
          <button 
            onClick={() => toggleFavoriteRestaurant(restaurant.id)} 
            style={isRestaurantFavorite(restaurant.id) ? styles.favBtnActive : styles.favBtn}
          >
            {isRestaurantFavorite(restaurant.id) ? '❤️ In Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>

      {/* Offers Slider */}
      {restaurant.offerBadge && (
        <div style={styles.offerBanner} className="glass-panel">
          <span style={styles.offerIcon}>🎟️</span>
          <div>
            <h3>Active Coupon Deal</h3>
            <p>{restaurant.offerBadge} - applicable on checkouts.</p>
          </div>
        </div>
      )}

      {/* Filter and Sticky Navigation Bar */}
      <div style={styles.menuLayout}>
        <div style={styles.menuContent}>
          <div style={styles.filterBar} className="glass-panel">
            <div style={styles.searchBox}>
              <span>🔍</span>
              <input 
                type="text" 
                placeholder="Search items in menu..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <label style={styles.vegToggle}>
              <input 
                type="checkbox" 
                checked={vegOnly} 
                onChange={e => setVegOnly(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span>Veg Only Filter</span>
            </label>
          </div>

          {/* Categories Grid Header */}
          <div style={styles.categoryTabs} className="glass-panel">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={activeCategory === cat ? styles.activeTab : styles.tab}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items List */}
          <div style={styles.menuItemsList}>
            {filteredMenu.filter(i => activeCategory === 'Recommended' || i.category === activeCategory).length === 0 ? (
              <p style={styles.emptyMenu}>No items match selected filters in this category.</p>
            ) : (
              filteredMenu.filter(i => activeCategory === 'Recommended' || i.category === activeCategory).map(item => {
                const cartMatch = cart.find(ci => ci.id === item.id);
                return (
                  <div key={item.id} style={styles.itemCard} className="glass-panel">
                    <div style={styles.itemMeta}>
                      <span style={{ color: item.isVeg ? '#10B981' : '#EF4444', fontSize: '13px' }}>
                        {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                      </span>
                      <div style={styles.itemNameRow}>
                        <h3 style={styles.itemName}>{item.name}</h3>
                        <button 
                          onClick={() => toggleFavoriteMenuItem(item.id)}
                          style={styles.itemHeartBtn}
                        >
                          {isMenuItemFavorite(item.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                      <span style={styles.itemPrice}>₹{item.price}</span>
                      <p style={styles.itemDesc}>{item.description}</p>
                    </div>

                    <div style={styles.itemActionWrapper}>
                      {cartMatch ? (
                        <div style={styles.qtyBox}>
                          <button onClick={() => updateQuantity(item.id, cartMatch.quantity - 1)} style={styles.qtyBtn}>-</button>
                          <span style={styles.qtyVal}>{cartMatch.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, cartMatch.quantity + 1)} style={styles.qtyBtn}>+</button>
                        </div>
                      ) : (
                        <button onClick={() => handleAddItem(item)} style={styles.addBtn} className="glow-btn">
                          Add +
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Similar Kitchens Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard} className="glass-panel">
            <h3>Similar Kitchens</h3>
            <div style={styles.similarList}>
              {similarRestaurants.map(sr => (
                <div key={sr.id} style={styles.similarRow} onClick={() => navigate(`/restaurants/${sr.id}`)}>
                  <span style={styles.similarLogo}>{sr.logo}</span>
                  <div>
                    <h4 style={styles.similarName}>{sr.name}</h4>
                    <span style={styles.similarRating}>★ {sr.rating} • {sr.cuisineType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback reviews block */}
          <div style={styles.sidebarCard} className="glass-panel">
            <h3>Customer Reviews</h3>
            
            {/* Add Review */}
            <form onSubmit={handleAddReview} style={styles.reviewForm}>
              <select value={newRating} onChange={e => setNewRating(Number(e.target.value))} style={styles.ratingSelect}>
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4)</option>
                <option value="3">★★★☆☆ (3)</option>
                <option value="2">★★☆☆☆ (2)</option>
                <option value="1">★☆☆☆☆ (1)</option>
              </select>
              <textarea 
                placeholder="Share your food experience..." 
                value={newComment} 
                onChange={e => setNewComment(e.target.value)}
                required
                style={styles.reviewArea}
              />
              <button type="submit" style={styles.submitReviewBtn} className="glow-btn">Submit Rating</button>
            </form>

            <div style={styles.reviewsList}>
              {reviews.map(rev => (
                <div key={rev.id} style={styles.reviewRow}>
                  <div style={styles.revMeta}>
                    <strong>{rev.customerName}</strong>
                    <span style={styles.revStars}>{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p style={styles.revComment}>{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Cart Conflict Alert Modal Overlay */}
      {conflictModal.isOpen && (
        <div style={styles.conflictOverlay}>
          <div style={styles.conflictModal} className="glass-panel">
            <h2>Discard current cart?</h2>
            <p>
              Your cart contains active items from <strong>{conflictModal.conflictRestaurant}</strong>. 
              Discard these items and start a new order from <strong>{restaurant.name}</strong>?
            </p>
            <div style={styles.conflictActions}>
              <button onClick={() => setConflictModal({ isOpen: false })} style={styles.cancelConflictBtn}>
                Cancel
              </button>
              <button onClick={handleConfirmConflict} style={styles.confirmConflictBtn}>
                Discard & Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    height: '60vh',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },
  container: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  },
  banner: {
    height: '240px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '16px',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  bannerOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 22, 0.65)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '30px'
  },
  bannerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  logoBadge: {
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '50%',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    border: '2px solid var(--card-border)'
  },
  name: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#fff'
  },
  cuisine: {
    fontSize: '15px',
    color: '#94a3b8',
    marginTop: '4px'
  },
  infoCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center' as const
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  ratingVal: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#F59E0B'
  },
  subtext: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  infoVal: {
    fontSize: '18px',
    fontWeight: 700
  },
  verticalDivider: {
    width: '1px',
    height: '40px',
    backgroundColor: 'var(--card-border)'
  },
  divider: {
    border: 'none',
    borderBottom: '1px solid var(--card-border)'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  favBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s ease'
  },
  favBtnActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid var(--accent)',
    color: 'var(--accent)',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 600
  },
  offerBanner: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    border: '1px solid rgba(124, 58, 237, 0.2)'
  },
  offerIcon: {
    fontSize: '28px'
  },
  menuLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '30px',
    alignItems: 'start'
  },
  menuContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    gap: '12px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '15px',
    width: '100%'
  },
  vegToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    color: 'var(--text-secondary)'
  },
  categoryTabs: {
    padding: '8px',
    display: 'flex',
    overflowX: 'auto' as const,
    gap: '8px',
    position: 'sticky' as const,
    top: '10px',
    zIndex: 5
  },
  tab: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    whiteSpace: 'nowrap' as const
  },
  activeTab: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  menuItemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  emptyMenu: {
    padding: '30px',
    textAlign: 'center' as const,
    color: 'var(--text-muted)'
  },
  itemCard: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  itemMeta: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  itemNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 600
  },
  itemHeartBtn: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--secondary)'
  },
  itemDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    marginTop: '4px'
  },
  itemActionWrapper: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center'
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--card-border)',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  qtyBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 600
  },
  qtyVal: {
    padding: '0 6px',
    fontWeight: 600,
    fontSize: '14px'
  },
  addBtn: {
    width: '100%',
    padding: '10px'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  sidebarCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  similarList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  similarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease'
  },
  similarLogo: {
    fontSize: '24px'
  },
  similarName: {
    fontSize: '14px',
    fontWeight: 600
  },
  similarRating: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  reviewForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  ratingSelect: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    outline: 'none'
  },
  reviewArea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    height: '80px',
    outline: 'none',
    fontSize: '14px',
    resize: 'none' as const
  },
  submitReviewBtn: {
    padding: '8px',
    fontSize: '14px'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    maxHeight: '300px',
    overflowY: 'auto' as const
  },
  reviewRow: {
    padding: '10px',
    borderBottom: '1px solid var(--card-border)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  revMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px'
  },
  revStars: {
    color: '#F59E0B'
  },
  revComment: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
  },
  conflictOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 22, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  conflictModal: {
    width: '100%',
    maxWidth: '440px',
    padding: '30px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '16px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  conflictActions: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px'
  },
  cancelConflictBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: 600
  },
  confirmConflictBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow: '0 0 10px var(--accent-glow)'
  }
};
// Add CSS hover classes inside global stylesheet for similarRow:
// `similarRow:hover { background-color: rgba(255,255,255,0.03); }`
