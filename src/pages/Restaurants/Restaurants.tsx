import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Restaurant } from '../../data/restaurants';
import { restaurantsApi } from '../../services/api/restaurants';
import { useWishlist } from '../../contexts/WishlistContext';
import { CUISINES, COLLECTIONS } from '../../constants';

export const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRestaurantFavorite, toggleFavoriteRestaurant } = useWishlist();

  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || 'All');
  const [selectedCollection, setSelectedCollection] = useState(searchParams.get('collection') || '');
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime' | 'costForTwo' | ''>('');
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const res = await restaurantsApi.getAll({
        cuisine: selectedCuisine,
        sortBy: sortBy || undefined,
        vegOnly,
        collectionId: selectedCollection || undefined
      });
      setRestaurantsList(res);
      setLoading(false);
    };

    fetchRestaurants();
  }, [selectedCuisine, selectedCollection, sortBy, vegOnly]);

  const handleClearFilters = () => {
    setSelectedCuisine('All');
    setSelectedCollection('');
    setSortBy('');
    setVegOnly(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Explore Restaurants</h1>
        <p style={styles.subtitle}>Order from the best kitchens and restaurants in your area.</p>
      </div>

      {/* Filter Sidebar & Layout Grid */}
      <div style={styles.layout}>
        {/* Sidebar Controls */}
        <aside style={styles.sidebar} className="glass-panel">
          <div style={styles.sidebarHeader}>
            <h3>Filters</h3>
            <button onClick={handleClearFilters} style={styles.clearBtn}>Reset All</button>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Cuisines</span>
            <div style={styles.cuisinesList}>
              {CUISINES.map(c => (
                <button
                  key={c}
                  onClick={() => { setSelectedCuisine(c); setSelectedCollection(''); }}
                  style={selectedCuisine === c ? styles.activeFilterItem : styles.filterItem}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Collections</span>
            <div style={styles.cuisinesList}>
              {COLLECTIONS.map(col => (
                <button
                  key={col.id}
                  onClick={() => { setSelectedCollection(col.id); setSelectedCuisine('All'); }}
                  style={selectedCollection === col.id ? styles.activeFilterItem : styles.filterItem}
                >
                  {col.name}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Dietary</span>
            <label style={styles.toggleRow}>
              <input 
                type="checkbox" 
                checked={vegOnly} 
                onChange={e => setVegOnly(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Pure Veg Only</span>
            </label>
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Sort By</span>
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value as any)}
              style={styles.select}
            >
              <option value="">Default Relevance</option>
              <option value="rating">Highest Rating</option>
              <option value="deliveryTime">Delivery Speed</option>
              <option value="costForTwo">Price: Low to High</option>
            </select>
          </div>
        </aside>

        {/* Restaurants Cards Grid */}
        <div style={styles.gridWrapper}>
          {loading ? (
            <div style={styles.skeletonGrid}>
              {[...Array(6)].map((_, idx) => (
                <div key={idx} style={styles.skeletonCard} className="glass-panel">
                  <div style={styles.skeletonImage} />
                  <div style={styles.skeletonTextRow} />
                  <div style={styles.skeletonTextRowShort} />
                </div>
              ))}
            </div>
          ) : restaurantsList.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🍽️</span>
              <h3>No restaurants match your filters</h3>
              <p>Try resetting some parameters or sorting preferences.</p>
              <button onClick={handleClearFilters} style={styles.resetBtn} className="glow-btn">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={styles.restaurantsGrid}>
              {restaurantsList.map(rest => (
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
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--text-secondary)'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '30px',
    alignItems: 'start'
  },
  sidebar: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '12px'
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  },
  cuisinesList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  filterItem: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    textAlign: 'left' as const,
    padding: '6px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.15s ease'
  },
  activeFilterItem: {
    background: 'rgba(124, 58, 237, 0.1)',
    border: 'none',
    color: 'var(--accent)',
    fontWeight: 600,
    textAlign: 'left' as const,
    padding: '6px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    color: 'var(--text-secondary)'
  },
  checkbox: {
    cursor: 'pointer',
    width: '16px',
    height: '16px'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '14px'
  },
  gridWrapper: {
    flex: 1
  },
  skeletonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px'
  },
  skeletonCard: {
    height: '280px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0 0 16px 0',
    gap: '12px'
  },
  skeletonImage: {
    height: '160px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    animation: 'pulse 1.5s infinite ease-in-out'
  },
  skeletonTextRow: {
    margin: '0 16px',
    height: '18px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    width: '70%',
    borderRadius: '4px',
    animation: 'pulse 1.5s infinite ease-in-out'
  },
  skeletonTextRowShort: {
    margin: '0 16px',
    height: '14px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    width: '45%',
    borderRadius: '4px',
    animation: 'pulse 1.5s infinite ease-in-out'
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px'
  },
  emptyIcon: {
    fontSize: '48px'
  },
  resetBtn: {
    marginTop: '10px'
  },
  restaurantsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
  }
};
// Add CSS keyframes for pulse inside index.css or styling:
// `@keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.3; } }`
// `filterItem:hover { background-color: rgba(255,255,255,0.02); color: var(--text-primary); }`
