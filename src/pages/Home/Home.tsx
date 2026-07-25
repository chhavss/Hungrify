import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../../data/restaurants';
import { MenuItem } from '../../data/menu';
import { Coupon, coupons } from '../../data/coupons';
import { restaurantsApi } from '../../services/api/restaurants';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { COLLECTIONS } from '../../constants';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { isRestaurantFavorite, toggleFavoriteRestaurant } = useWishlist();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [trendingFoods, setTrendingFoods] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Local Carousel Slides
  const [activeOfferSlide, setActiveOfferSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allRest = await restaurantsApi.getAll();
      setRestaurants(allRest.slice(0, 8)); // top 8 popular

      // Pull sample trending foods from menu data
      const allMenu: MenuItem[] = [];
      for (const r of allRest.slice(0, 4)) {
        const menu = await restaurantsApi.getMenu(r.id);
        allMenu.push(...menu.slice(0, 2));
      }
      setTrendingFoods(allMenu);
      setLoading(false);
    };

    fetchData();
  }, []);

  const categories = [
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burger', icon: '🍔' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'South Indian', icon: '🥞' },
    { name: 'Chinese', icon: '🥡' },
    { name: 'Healthy', icon: '🥗' },
    { name: 'Coffee', icon: '☕' },
    { name: 'Biryani', icon: '🍲' }
  ];

  const testimonials = [
    { name: 'Amit Roy', rating: 5, comment: 'Hungrify is extremely fast! The live rider map tracker updates smoothly.', avatar: '👨' },
    { name: 'Sneha Rao', rating: 5, comment: 'Clean checkout layout and verified coupons work instantly.', avatar: '👩' },
    { name: 'Vikram Singh', rating: 4, comment: 'The restaurant menu vege toggles make finding dishes so easy.', avatar: '👨' }
  ];

  const handleCollectionSelect = (colId: string) => {
    navigate(`/restaurants?collection=${colId}`);
  };

  const handleCategorySelect = (catName: string) => {
    navigate(`/restaurants?cuisine=${catName}`);
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero} className="glass-panel">
        <h1 style={styles.heroTitle}>HUNGRIFY</h1>
        <p style={styles.heroTagline}>Crave. Click. Delivered.</p>
        <p style={styles.heroDesc}>
          Order delicious meals from the finest verified kitchens, track delivery in real time, 
          and experience seamless premium food delivery.
        </p>
        <div style={styles.heroActions}>
          <button onClick={() => navigate('/restaurants')} style={styles.heroBtn1} className="glow-btn">
            Order Now
          </button>
          <button onClick={() => navigate('/search')} style={styles.heroBtn2}>
            Explore Restaurants
          </button>
        </div>
      </section>

      {/* Post-login special widgets */}
      {token && user && (
        <section style={styles.dashboardWidget} className="glass-panel">
          <h3>Welcome back, {user.name}!</h3>
          <p>You have <strong>{user.loyaltyPoints || 0} Loyalty Points</strong> available. Apply them for discount redemptions.</p>
        </section>
      )}

      {/* Cuisines Categories Carousel */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What's on your mind?</h2>
        <div style={styles.categoriesRow}>
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              style={styles.catCard} 
              className="glass-panel"
              onClick={() => handleCategorySelect(cat.name)}
            >
              <span style={styles.catIcon}>{cat.icon}</span>
              <span style={styles.catName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Collections Grid */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Explore Collections</h2>
        <div style={styles.collectionsGrid}>
          {COLLECTIONS.map(col => (
            <div 
              key={col.id} 
              style={styles.colCard} 
              className="glass-panel"
              onClick={() => handleCollectionSelect(col.id)}
            >
              <h3>{col.name}</h3>
              <p>{col.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Popular Restaurants</h2>
        {loading ? (
          <p>Loading kitchens...</p>
        ) : (
          <div style={styles.restaurantsGrid}>
            {restaurants.map(rest => (
              <div key={rest.id} style={styles.restCard} className="glass-panel">
                <div 
                  style={styles.cardImageWrapper}
                  onClick={() => navigate(`/restaurants/${rest.id}`)}
                >
                  <img 
                    src={rest.coverImage} 
                    alt={rest.name} 
                    style={styles.restImage} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div style={styles.cuisineBadge}>{rest.cuisineType}</div>
                  <span style={styles.logoBadge}>{rest.logo}</span>
                  {rest.offerBadge && <div style={styles.offerTag}>{rest.offerBadge}</div>}
                </div>
                
                <div style={styles.cardContent}>
                  <div style={styles.cardTitleRow}>
                    <h3 
                      style={styles.restName}
                      onClick={() => navigate(`/restaurants/${rest.id}`)}
                    >
                      {rest.name}
                    </h3>
                    <button 
                      onClick={() => toggleFavoriteRestaurant(rest.id)}
                      style={styles.favBtn}
                    >
                      {isRestaurantFavorite(rest.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  
                  <div style={styles.restMeta}>
                    <span style={styles.rating}>★ {rest.rating}</span>
                    <span>•</span>
                    <span>{rest.deliveryTime} mins</span>
                    <span>•</span>
                    <span>{rest.distance} km</span>
                  </div>
                  
                  <div style={styles.cardFooter}>
                    <span>₹{rest.costForTwo} for two</span>
                    <span style={{ color: rest.isOpen ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                      {rest.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Offers Slider Carousel */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Offers & Discount Coupons</h2>
        <div style={styles.offerSlideWrapper} className="glass-panel">
          <div style={styles.offerSlideContent}>
            <span style={styles.offerBadge}>🎟️ {coupons[activeOfferSlide].code}</span>
            <h3>{coupons[activeOfferSlide].description}</h3>
            <p>Minimum Order: ₹{coupons[activeOfferSlide].minOrderAmount}</p>
          </div>
          <div style={styles.carouselIndicators}>
            {coupons.slice(0, 4).map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveOfferSlide(idx)}
                style={activeOfferSlide === idx ? styles.indicatorActive : styles.indicator}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Foods List */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Trending Dishes Near You</h2>
        <div style={styles.trendingGrid}>
          {trendingFoods.map(food => (
            <div 
              key={food.id} 
              style={styles.trendCard} 
              className="glass-panel"
              onClick={() => navigate(`/restaurants/${food.restaurantId}`)}
            >
              <div style={styles.trendMeta}>
                <span style={{ color: food.isVeg ? '#10B981' : '#EF4444', fontSize: '12px' }}>
                  {food.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                </span>
                <h4>{food.name}</h4>
                <p style={styles.trendPrice}>₹{food.price}</p>
              </div>
              <button style={styles.trendOrderBtn} className="glow-btn">Order</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Hungrify */}
      <section style={styles.section} className="glass-panel">
        <h2 style={{ ...styles.sectionTitle, textAlign: 'center' }}>Why You'll Love Hungrify ⭐</h2>
        <div style={styles.whyGrid}>
          <div style={styles.whyCard}>
            <span style={styles.whyIcon}>🚀</span>
            <h3>Superfast Delivery</h3>
            <p>Simulate delivery agent routes and watch order arrivals in minutes.</p>
          </div>
          <div style={styles.whyCard}>
            <span style={styles.whyIcon}>🍲</span>
            <h3>Curated Premium Menus</h3>
            <p>Access 150+ food items from 30+ highly-rated local restaurants.</p>
          </div>
          <div style={styles.whyCard}>
            <span style={styles.whyIcon}>🔐</span>
            <h3>Secure Mock Payments</h3>
            <p>Checkout securely using UPI, Credit Cards, or Wallet balances.</p>
          </div>
          <div style={styles.whyCard}>
            <span style={styles.whyIcon}>🤖</span>
            <h3>Interactive DBMS Sandbox</h3>
            <p>Explore normalization engines, SQL editors, and visual ER diagrams inside.</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews testimonials */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Food Lovers Say</h2>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((test, idx) => (
            <div key={idx} style={styles.testCard} className="glass-panel">
              <div style={styles.testHeader}>
                <span style={styles.testAvatar}>{test.avatar}</span>
                <div>
                  <h4>{test.name}</h4>
                  <span style={styles.ratingStars}>{'★'.repeat(test.rating)}</span>
                </div>
              </div>
              <p style={styles.testComment}>"{test.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download app banner */}
      <section style={styles.downloadBanner} className="glass-panel">
        <div style={styles.downloadLeft}>
          <h2>Hungrify in your pocket</h2>
          <p>Download our simulated mobile app to place orders and track delivery on the go.</p>
          <div style={styles.downloadApps}>
            <button onClick={() => alert('App Store integration coming soon')} style={styles.downloadBtn}> App Store</button>
            <button onClick={() => alert('Play Store integration coming soon')} style={styles.downloadBtn}>▶ Google Play</button>
          </div>
        </div>
        <div style={styles.downloadRight}>
          <span style={styles.phoneMock}>📱</span>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '50px'
  },
  hero: {
    padding: '80px 40px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
    background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(5,8,22,0.1) 100%)',
    border: '1px solid var(--card-border)'
  },
  heroTitle: {
    fontSize: '54px',
    fontWeight: 800,
    letterSpacing: '4px',
    color: 'var(--text-primary)',
    background: 'linear-gradient(to right, #7C3AED, #22D3EE)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroTagline: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--secondary)',
    letterSpacing: '1px'
  },
  heroDesc: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '700px'
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px'
  },
  heroBtn1: {
    padding: '12px 30px',
    fontSize: '16px'
  },
  heroBtn2: {
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s ease'
  },
  dashboardWidget: {
    padding: '20px 30px',
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)'
  },
  categoriesRow: {
    display: 'flex',
    overflowX: 'auto' as const,
    gap: '16px',
    paddingBottom: '8px'
  },
  catCard: {
    minWidth: '110px',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  catIcon: {
    fontSize: '36px'
  },
  catName: {
    fontSize: '14px',
    fontWeight: 600
  },
  collectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px'
  },
  colCard: {
    padding: '24px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  restaurantsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
    gap: '24px'
  },
  restCard: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'transform 0.2s ease'
  },
  cardImageWrapper: {
    height: '160px',
    position: 'relative' as const,
    cursor: 'pointer',
    overflow: 'hidden'
  },
  restImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  cuisineBadge: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(5, 8, 22, 0.75)',
    color: '#fff',
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '4px',
    backdropFilter: 'blur(4px)'
  },
  logoBadge: {
    position: 'absolute' as const,
    bottom: '12px',
    right: '12px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    border: '1px solid var(--card-border)'
  },
  offerTag: {
    position: 'absolute' as const,
    bottom: '12px',
    left: '12px',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  cardTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  restName: {
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  favBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer'
  },
  restMeta: {
    display: 'flex',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  rating: {
    color: '#F59E0B',
    fontWeight: 600
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-muted)',
    borderTop: '1px solid var(--card-border)',
    paddingTop: '10px',
    marginTop: '6px'
  },
  offerSlideWrapper: {
    padding: '40px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    position: 'relative' as const
  },
  offerSlideContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  offerBadge: {
    alignSelf: 'center',
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '0.5px'
  },
  carouselIndicators: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px'
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--card-border)',
    border: 'none',
    cursor: 'pointer'
  },
  indicatorActive: {
    width: '24px',
    height: '8px',
    borderRadius: '4px',
    backgroundColor: 'var(--accent)',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 5px var(--accent-glow)'
  },
  trendingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px'
  },
  trendCard: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  trendMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  trendPrice: {
    fontWeight: 700,
    color: 'var(--secondary)',
    fontSize: '15px'
  },
  trendOrderBtn: {
    padding: '8px 16px'
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '30px',
    padding: '20px 0'
  },
  whyCard: {
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px'
  },
  whyIcon: {
    fontSize: '40px'
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  testCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px'
  },
  testHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  testAvatar: {
    fontSize: '24px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--card-border)'
  },
  ratingStars: {
    color: '#F59E0B'
  },
  testComment: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    fontStyle: 'italic'
  },
  downloadBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '50px 40px',
    gap: '30px'
  },
  downloadLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
    flex: 1
  },
  downloadApps: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px'
  },
  downloadBtn: {
    padding: '12px 24px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  downloadRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  phoneMock: {
    fontSize: '120px'
  }
};
// Add CSS hover classes inside global stylesheet for catCard, colCard, restCard, trendCard, downloadBtn, heroBtn2:
// `catCard:hover { transform: translateY(-4px); }`
// `colCard:hover { transform: translateY(-4px); border-color: var(--accent); }`
// `restCard:hover { transform: translateY(-4px); }`
// `trendCard:hover { transform: translateY(-2px); }`
// `downloadBtn:hover { border-color: var(--text-primary); }`
// `heroBtn2:hover { border-color: var(--text-primary); color: var(--text-primary); }`
