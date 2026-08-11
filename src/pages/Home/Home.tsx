import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../../data/restaurants';
import { MenuItem } from '../../data/menu';
import { coupons } from '../../data/coupons';
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
  const [activeOfferSlide, setActiveOfferSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allRest = await restaurantsApi.getAll();
      setRestaurants(allRest.slice(0, 8));

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
    { name: 'Aarav Sharma', rating: '5.0', comment: 'The artisanal presentation and rapid delivery exceed every expectation.', role: 'Food Critic' },
    { name: 'Sophia Chen', rating: '5.0', comment: 'Hungrify brings fine dining standard directly to our studio.', role: 'Architect' },
    { name: 'Rohan Mehta', rating: '4.9', comment: 'Real-time rider map tracking with verified kitchen safety standards.', role: 'Design Director' }
  ];

  return (
    <div style={styles.container}>
      {/* Editorial Asymmetrical Hero Section */}
      <section style={styles.heroSection}>
        {/* Left Typography & Content */}
        <div style={styles.heroLeft}>
          <div style={styles.smallUpperLabel}>
            <span style={styles.orangeDot} />
            EXQUISITE CULINARY DIRECTORY
          </div>
          
          <h1 style={styles.heroHeadline} className="font-serif">
            Artisanal Meals, <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent-orange)' }}>Effortlessly</span> Delivered.
          </h1>

          <p style={styles.heroSubtext}>
            Order directly from award-winning kitchens and verified master chefs. Experience real-time order tracking with uncompromising culinary standards.
          </p>

          <div style={styles.heroCtaGroup}>
            <button onClick={() => navigate('/restaurants')} className="pill-btn-primary">
              EXPLORE KITCHENS <span>→</span>
            </button>
            <button onClick={() => navigate('/search')} className="pill-btn-outline">
              SEARCH CUISINES
            </button>
          </div>

          {/* Minimal Typography Statistics */}
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <span style={styles.statNumber} className="font-display">250+</span>
              <span style={styles.statLabel}>CURATED KITCHENS</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statNumber} className="font-display">18 MIN</span>
              <span style={styles.statLabel}>AVG. DELIVERY</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statNumber} className="font-display">4.9★</span>
              <span style={styles.statLabel}>USER RATING</span>
            </div>
          </div>
        </div>

        {/* Right Floating 3D Imagery & Widgets */}
        <div style={styles.heroRight}>
          {/* Main 3D Floating Dish Image */}
          <div style={styles.heroImageWrapper}>
            <img 
              src="/gourmet_dish_3d.png" 
              alt="Artisanal Gourmet Salad Dish" 
              style={styles.heroDishImg}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Overlapping Floating Social Proof Widget */}
            <div style={styles.floatingWidgetUser}>
              <div style={styles.avatarGroup}>
                <div style={{ ...styles.avatarCircle, backgroundColor: '#ffe5d9' }}>👨‍🍳</div>
                <div style={{ ...styles.avatarCircle, backgroundColor: '#d8e5d7', marginLeft: '-12px' }}>👩‍💼</div>
                <div style={{ ...styles.avatarCircle, backgroundColor: '#fff3b0', marginLeft: '-12px' }}>👨‍💻</div>
              </div>
              <div>
                <div style={styles.widgetRatingText}>★ 4.9 (12k+ Reviews)</div>
                <div style={styles.widgetSubText}>Top Michelin Partnered Kitchens</div>
              </div>
            </div>

            {/* Overlapping Floating Delivery Badge Widget */}
            <div style={styles.floatingWidgetBadge}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <div>
                <div style={styles.widgetTitle}>Live Express</div>
                <div style={styles.widgetSubText}>Guaranteed Hot Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-login Loyalty Banner */}
      {token && user && (
        <section style={styles.welcomeBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '2rem' }}>💎</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>Welcome back, {user.name}</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                You have <strong style={{ color: 'var(--accent-orange)' }}>{user.loyaltyPoints || 150} Loyalty Credits</strong> ready for checkout redemption.
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/restaurants')} className="pill-btn-orange" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            Redeem Points
          </button>
        </section>
      )}

      {/* Cuisine Categories */}
      <section style={styles.sectionMargin}>
        <div style={styles.sectionHeaderRow}>
          <div>
            <span style={styles.smallUpperLabel}>CUISINE SELECTION</span>
            <h2 style={styles.sectionTitle} className="font-serif">What's on your mind?</h2>
          </div>
        </div>

        <div style={styles.categoriesRow}>
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              style={styles.catCard} 
              onClick={() => navigate(`/restaurants?cuisine=${cat.name}`)}
            >
              <span style={styles.catIcon}>{cat.icon}</span>
              <span style={styles.catName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <section style={styles.sectionMargin}>
        <div style={styles.sectionHeaderRow}>
          <div>
            <span style={styles.smallUpperLabel}>CURATED GUIDES</span>
            <h2 style={styles.sectionTitle} className="font-serif">Featured Collections</h2>
          </div>
        </div>

        <div style={styles.collectionsGrid}>
          {COLLECTIONS.map(col => (
            <div 
              key={col.id} 
              style={styles.colCard}
              onClick={() => navigate(`/restaurants?collection=${col.id}`)}
            >
              <div style={styles.colHeader}>
                <span style={styles.colBadge}>COLLECTION</span>
                <span style={{ color: 'var(--accent-orange)' }}>→</span>
              </div>
              <h3 style={styles.colTitle} className="font-serif">{col.name}</h3>
              <p style={styles.colDesc}>{col.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section style={styles.sectionMargin}>
        <div style={styles.sectionHeaderRow}>
          <div>
            <span style={styles.smallUpperLabel}>VERIFIED KITCHENS</span>
            <h2 style={styles.sectionTitle} className="font-serif">Popular Restaurants</h2>
          </div>
          <button onClick={() => navigate('/restaurants')} className="pill-btn-outline" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
            VIEW ALL
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading culinary directory...</div>
        ) : (
          <div style={styles.restaurantsGrid}>
            {restaurants.map(rest => (
              <div key={rest.id} style={styles.restCard}>
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
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavoriteRestaurant(rest.id); }}
                    style={styles.favBtn}
                  >
                    {isRestaurantFavorite(rest.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                
                <div style={styles.cardContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 
                      style={styles.restName}
                      className="font-serif"
                      onClick={() => navigate(`/restaurants/${rest.id}`)}
                    >
                      {rest.name}
                    </h3>
                    <span style={styles.ratingBadge}>★ {rest.rating}</span>
                  </div>
                  
                  <p style={styles.restMetaText}>
                    {rest.deliveryTime} mins • {rest.distance} km • ₹{rest.costForTwo} for two
                  </p>
                  
                  <div style={styles.cardFooterRow}>
                    <span style={styles.openTag}>
                      {rest.isOpen ? '🟢 Open Now' : '🔴 Closed'}
                    </span>
                    {rest.offerBadge && <span style={styles.offerBadgeTag}>{rest.offerBadge}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Prominent Coupons Banner */}
      <section style={styles.couponBanner}>
        <div style={styles.couponLeft}>
          <span style={styles.smallUpperLabel} className="color-orange">EXCLUSIVE PROMOTIONS</span>
          <h2 style={styles.couponTitle} className="font-serif">
            {coupons[activeOfferSlide].code}
          </h2>
          <p style={styles.couponDesc}>{coupons[activeOfferSlide].description}</p>
          <span style={styles.couponMin}>Min. order ₹{coupons[activeOfferSlide].minOrderAmount}</span>
        </div>

        <div style={styles.couponRight}>
          <button 
            onClick={() => setActiveOfferSlide((prev) => (prev + 1) % coupons.length)} 
            className="pill-btn-orange"
          >
            CLAIM PROMO CODE
          </button>
          <div style={styles.indicatorGroup}>
            {coupons.slice(0, 4).map((_, idx) => (
              <span 
                key={idx}
                onClick={() => setActiveOfferSlide(idx)}
                style={{
                  ...styles.dotIndicator,
                  backgroundColor: activeOfferSlide === idx ? 'var(--accent-orange)' : 'rgba(0,0,0,0.15)',
                  width: activeOfferSlide === idx ? '24px' : '8px'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Dishes Section */}
      <section style={styles.sectionMargin}>
        <div style={styles.sectionHeaderRow}>
          <div>
            <span style={styles.smallUpperLabel}>CHEF RECOMMENDATIONS</span>
            <h2 style={styles.sectionTitle} className="font-serif">Trending Culinary Creations</h2>
          </div>
        </div>

        <div style={styles.trendingGrid}>
          {trendingFoods.map(food => (
            <div 
              key={food.id} 
              style={styles.trendCard}
              onClick={() => navigate(`/restaurants/${food.restaurantId}`)}
            >
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: food.isVeg ? '#10B981' : '#EF4444' }}>
                  {food.isVeg ? '🟢 VEGETARIAN' : '🔴 NON-VEG'}
                </span>
                <h4 style={styles.trendFoodTitle} className="font-serif">{food.name}</h4>
                <p style={styles.trendPrice}>₹{food.price}</p>
              </div>
              <button className="pill-btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                ADD
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Floating 2nd Banner / Download Mobile Experience */}
      <section style={styles.appBanner}>
        <div style={styles.appBannerLeft}>
          <span style={styles.smallUpperLabel}>MOBILE EXPERIENCE</span>
          <h2 style={styles.appBannerTitle} className="font-serif">Hungrify Anywhere.</h2>
          <p style={styles.appBannerSub}>
            Download our native iOS and Android application to unlock live rider tracking, customized chef requests, and instant notifications.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="pill-btn-primary">App Store</button>
            <button className="pill-btn-outline">Google Play</button>
          </div>
        </div>
        <div style={styles.appBannerRight}>
          <img 
            src="/gourmet_burger_3d.png" 
            alt="3D Floating Burger"
            style={styles.burgerImg} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '60px',
  },
  heroSection: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '40px',
    alignItems: 'center',
    minHeight: '540px',
    paddingTop: '20px',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  smallUpperLabel: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    fontWeight: 700,
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  orangeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-orange)',
    display: 'inline-block',
  },
  heroHeadline: {
    fontSize: '3.6rem',
    lineHeight: '1.1',
    fontWeight: 700,
    color: 'var(--text-dark)',
    letterSpacing: '-0.02em',
  },
  heroSubtext: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    maxWidth: '480px',
  },
  heroCtaGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '8px',
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginTop: '28px',
    paddingTop: '28px',
    borderTop: '1px solid var(--border-subtle)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  statNumber: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: 'var(--text-dark)',
  },
  statLabel: {
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    fontWeight: 600,
    color: 'var(--text-muted)',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'var(--border-subtle)',
  },
  heroRight: {
    position: 'relative' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageWrapper: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '460px',
  },
  heroDishImg: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain' as const,
    filter: 'drop-shadow(0 25px 35px rgba(25, 45, 28, 0.18))',
    transform: 'scale(1.05)',
  },
  floatingWidgetUser: {
    position: 'absolute' as const,
    top: '10%',
    left: '-20px',
    backgroundColor: '#ffffff',
    padding: '12px 18px',
    borderRadius: '999px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--border-subtle)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    border: '2px solid #ffffff',
  },
  widgetRatingText: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
  },
  widgetSubText: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)',
  },
  floatingWidgetBadge: {
    position: 'absolute' as const,
    bottom: '10%',
    right: '-10px',
    backgroundColor: '#ffffff',
    padding: '12px 20px',
    borderRadius: '20px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--border-subtle)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  widgetTitle: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
  },
  welcomeBanner: {
    backgroundColor: '#ffffff',
    padding: '24px 36px',
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--border-subtle)',
  },
  sectionMargin: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  sectionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginTop: '4px',
  },
  categoriesRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '16px',
  },
  catCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    border: '1px solid var(--border-subtle)',
    transition: 'all 0.25s ease',
  },
  catIcon: {
    fontSize: '2rem',
  },
  catName: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-dark)',
  },
  collectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  colCard: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '28px',
    border: '1px solid var(--border-subtle)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  colHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colBadge: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    fontWeight: 700,
    color: 'var(--text-muted)',
  },
  colTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
  },
  colDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },
  restaurantsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px',
  },
  restCard: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid var(--border-subtle)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
    transition: 'all 0.3s ease',
  },
  cardImageWrapper: {
    position: 'relative' as const,
    height: '180px',
    cursor: 'pointer',
  },
  restImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  cuisineBadge: {
    position: 'absolute' as const,
    bottom: '12px',
    left: '12px',
    backgroundColor: 'rgba(23, 28, 24, 0.8)',
    color: '#ffffff',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '0.7rem',
    fontWeight: 600,
    backdropFilter: 'blur(4px)',
  },
  favBtn: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    backgroundColor: '#ffffff',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  restName: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
    cursor: 'pointer',
  },
  ratingBadge: {
    fontSize: '0.8rem',
    fontWeight: 700,
    backgroundColor: 'rgba(255, 94, 30, 0.1)',
    color: 'var(--accent-orange)',
    padding: '4px 8px',
    borderRadius: '8px',
  },
  restMetaText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  cardFooterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    paddingTop: '10px',
    borderTop: '1px solid var(--border-subtle)',
    fontSize: '0.75rem',
  },
  openTag: {
    fontWeight: 600,
    color: 'var(--text-dark)',
  },
  offerBadgeTag: {
    color: 'var(--accent-orange)',
    fontWeight: 700,
  },
  couponBanner: {
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    padding: '40px 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-card)',
  },
  couponLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  couponTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: 'var(--accent-orange)',
    letterSpacing: '0.04em',
  },
  couponDesc: {
    fontSize: '1rem',
    color: 'var(--text-dark)',
    fontWeight: 600,
  },
  couponMin: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  couponRight: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '20px',
  },
  indicatorGroup: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  dotIndicator: {
    height: '8px',
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  trendingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  trendCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '20px',
    border: '1px solid var(--border-subtle)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  trendFoodTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginTop: '4px',
  },
  trendPrice: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--accent-orange)',
    marginTop: '2px',
  },
  appBanner: {
    backgroundColor: '#ffffff',
    borderRadius: '32px',
    padding: '48px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'center',
    border: '1px solid var(--border-subtle)',
  },
  appBannerLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  appBannerTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'var(--text-dark)',
  },
  appBannerSub: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
  },
  appBannerRight: {
    display: 'flex',
    justifyContent: 'center',
  },
  burgerImg: {
    maxWidth: '300px',
    width: '100%',
    height: 'auto',
    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
  },
};
