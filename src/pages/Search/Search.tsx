import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../../data/restaurants';
import { MenuItem } from '../../data/menu';
import { restaurantsApi } from '../../services/api/restaurants';
import { useWishlist } from '../../contexts/WishlistContext';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const { isRestaurantFavorite, toggleFavoriteRestaurant } = useWishlist();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Restaurant[]>([]);
  const [menuResults, setMenuResults] = useState<(MenuItem & { restaurantName: string })[]>([]);
  const [loading, setLoading] = useState(false);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('hungrify-recent-searches');
    return saved ? JSON.parse(saved) : ['Pizza', 'Biryani', 'Burgers', 'Dosa'];
  });

  const trendingSearches = ['Garlic Naan', 'Butter Chicken', 'Healthy Salad', 'Gelato', 'Waffles'];

  useEffect(() => {
    localStorage.setItem('hungrify-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setMenuResults([]);
        return;
      }
      setLoading(true);
      
      // Fetch matching restaurants
      const matchedRest = await restaurantsApi.getAll({ search: query });
      setResults(matchedRest);

      // Fetch matching menu items
      const allRest = await restaurantsApi.getAll();
      const matchedMenu: (MenuItem & { restaurantName: string })[] = [];
      
      for (const rest of allRest) {
        const menu = await restaurantsApi.getMenu(rest.id);
        const matches = menu.filter(
          item => item.name.toLowerCase().includes(query.toLowerCase()) || 
                  item.description.toLowerCase().includes(query.toLowerCase())
        );
        matches.forEach(item => {
          matchedMenu.push({
            ...item,
            restaurantName: rest.name
          });
        });
      }
      setMenuResults(matchedMenu.slice(0, 10)); // limit to top 10 items
      setLoading(false);
    };

    const timer = setTimeout(fetchResults, 300); // debounce input
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (searchVal: string) => {
    setQuery(searchVal);
    if (searchVal.trim() && !recentSearches.includes(searchVal)) {
      setRecentSearches(prev => [searchVal, ...prev.slice(0, 4)]);
    }
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('hungrify-recent-searches');
  };

  return (
    <div style={styles.container}>
      {/* Sticky Search bar wrapper */}
      <div style={styles.searchBarWrapper} className="glass-panel">
        <span style={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Search for restaurants, dishes, or cuisines..." 
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={styles.searchInput}
        />
        {query && (
          <button onClick={() => setQuery('')} style={styles.clearBtn}>&times;</button>
        )}
      </div>

      {/* Suggestion list if search empty */}
      {!query.trim() ? (
        <div style={styles.suggestionsContainer}>
          {recentSearches.length > 0 && (
            <div style={styles.suggestionBlock}>
              <div style={styles.blockHeader}>
                <h3>Recent Searches</h3>
                <button onClick={handleClearRecent} style={styles.clearRecentBtn}>Clear All</button>
              </div>
              <div style={styles.chipsRow}>
                {recentSearches.map((item, idx) => (
                  <button key={idx} onClick={() => handleSearchSubmit(item)} style={styles.chip}>
                    🕒 {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={styles.suggestionBlock}>
            <h3>Trending Searches</h3>
            <div style={styles.chipsRow}>
              {trendingSearches.map((item, idx) => (
                <button key={idx} onClick={() => handleSearchSubmit(item)} style={styles.chip}>
                  🔥 {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.resultsContainer}>
          {loading ? (
            <p style={styles.loader}>Searching...</p>
          ) : (
            <>
              {results.length === 0 && menuResults.length === 0 ? (
                <div style={styles.emptyState}>
                  <span style={styles.emptyIcon}>🔍❌</span>
                  <h3>No matches found</h3>
                  <p>Check the spelling or search for alternative cuisines.</p>
                </div>
              ) : (
                <div style={styles.resultsGrid}>
                  {/* Matching Dishes */}
                  {menuResults.length > 0 && (
                    <div style={styles.sectionBlock}>
                      <h2 style={styles.sectionTitle}>Matching Dishes</h2>
                      <div style={styles.dishList}>
                        {menuResults.map(dish => (
                          <div 
                            key={dish.id} 
                            style={styles.dishCard} 
                            className="glass-panel"
                            onClick={() => navigate(`/restaurants/${dish.restaurantId}`)}
                          >
                            <div>
                              <span style={{ color: dish.isVeg ? '#10B981' : '#EF4444', marginRight: '6px' }}>
                                {dish.isVeg ? '🟢' : '🔴'}
                              </span>
                              <span style={styles.dishName}>{dish.name}</span>
                              <p style={styles.dishRest}>From: <strong>{dish.restaurantName}</strong></p>
                            </div>
                            <span style={styles.dishPrice}>₹{dish.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Restaurants */}
                  {results.length > 0 && (
                    <div style={styles.sectionBlock}>
                      <h2 style={styles.sectionTitle}>Matching Restaurants</h2>
                      <div style={styles.restaurantsGrid}>
                        {results.map(rest => (
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
                                <span style={{ color: rest.isOpen ? 'var(--success)' : 'var(--danger)' }}>
                                  {rest.isOpen ? 'Open Now' : 'Closed'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
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
  searchBarWrapper: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    position: 'sticky' as const,
    top: '10px',
    zIndex: 10
  },
  searchIcon: {
    fontSize: '20px',
    color: 'var(--text-secondary)'
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '16px',
    outline: 'none'
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '24px',
    cursor: 'pointer'
  },
  suggestionsContainer: {
    maxWidth: '720px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  },
  suggestionBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  blockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clearRecentBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  chipsRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px'
  },
  chip: {
    padding: '8px 16px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  resultsContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%'
  },
  loader: {
    textAlign: 'center' as const,
    color: 'var(--text-secondary)',
    padding: '40px'
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
  resultsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '40px'
  },
  sectionBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '10px'
  },
  dishList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px'
  },
  dishCard: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
  dishName: {
    fontSize: '15px',
    fontWeight: 600
  },
  dishRest: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '4px'
  },
  dishPrice: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--secondary)'
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
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease'
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
// Add CSS hover classes inside global stylesheet for chip and dishCard and restCard:
// `chip:hover { border-color: var(--accent); color: var(--text-primary); }`
// `dishCard:hover { transform: translateY(-2px); }`
// `restCard:hover { transform: translateY(-4px); }`
