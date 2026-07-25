import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useTheme } from '../../contexts/ThemeContext';
import { restaurants as allRestaurants } from '../../data/restaurants';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { favoriteRestaurants, toggleFavoriteRestaurant } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments' | 'favorites' | 'rewards' | 'settings'>('profile');

  // Local settings mock
  const [language, setLanguage] = useState('English');
  const [locationPref, setLocationPref] = useState('Bangalore');
  const [notifUpdates, setNotifUpdates] = useState(true);

  if (!user) return null;

  const tabs = [
    { id: 'profile', name: 'Profile Details', icon: '👤' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'addresses', name: 'Addresses', icon: '📍' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'rewards', name: 'Rewards', icon: '🎁' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const favoriteRestsData = allRestaurants.filter(r => favoriteRestaurants.includes(r.id));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>👤</div>
        <div>
          <h1 style={styles.name}>{user.name}</h1>
          <p style={styles.roleTag}>Logged in as: {user.role.toUpperCase()}</p>
        </div>
      </div>

      <div style={styles.layout}>
        {/* Navigation Sidebar */}
        <aside style={styles.sidebar} className="glass-panel">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={activeTab === tab.id ? styles.tabActive : styles.tab}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
          <button onClick={() => { logout(); navigate('/'); }} style={styles.logoutBtn}>
            🚪 Logout Session
          </button>
        </aside>

        {/* Tab Panel Content */}
        <div style={styles.panel} className="glass-panel">
          {activeTab === 'profile' && (
            <div style={styles.subPanel}>
              <h2>Personal Information</h2>
              <div style={styles.infoGrid}>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Full Name</span>
                  <span style={styles.val}>{user.name}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Email Address</span>
                  <span style={styles.val}>{user.email}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Phone Number</span>
                  <span style={styles.val}>{user.phone}</span>
                </div>
                {user.role !== 'customer' && (
                  <div style={styles.infoRow}>
                    <span style={styles.label}>Operations Dashboard</span>
                    <button onClick={() => navigate('/dashboard')} style={styles.goDashBtn} className="glow-btn">
                      Open Dashboard Panel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div style={styles.subPanel}>
              <h2>Saved Restaurants</h2>
              {favoriteRestsData.length === 0 ? (
                <div style={styles.emptySubState}>
                  <span style={styles.emptySubIcon}>❤️</span>
                  <p>You haven't favorited any restaurants yet.</p>
                  <button onClick={() => navigate('/restaurants')} style={styles.browseMiniBtn} className="glow-btn">
                    Browse Restaurants
                  </button>
                </div>
              ) : (
                <div style={styles.favsGrid}>
                  {favoriteRestsData.map(rest => (
                    <div key={rest.id} style={styles.favCard} className="glass-panel">
                      <span style={styles.favLogo}>{rest.logo}</span>
                      <div style={styles.favMeta}>
                        <h4 onClick={() => navigate(`/restaurants/${rest.id}`)} style={styles.favName}>{rest.name}</h4>
                        <span style={styles.favRating}>★ {rest.rating} • {rest.cuisineType}</span>
                      </div>
                      <button onClick={() => toggleFavoriteRestaurant(rest.id)} style={styles.removeFavBtn}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div style={styles.subPanel}>
              <h2>Saved Addresses</h2>
              <div style={styles.addressList}>
                <div style={styles.addrRow} className="glass-panel">
                  <span>🏠 Home</span>
                  <p>12 MG Road, Indiranagar, Bangalore - 560038</p>
                </div>
                <div style={styles.addrRow} className="glass-panel">
                  <span>🏢 Office</span>
                  <p>Block C, Quantum Tech Park, Electronic City, Bangalore - 560100</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div style={styles.subPanel}>
              <h2>Payment Methods</h2>
              <div style={styles.cardList}>
                <div style={styles.payCard} className="glass-panel">
                  <span style={styles.cardType}>💳 Visa</span>
                  <span>•••• •••• •••• 4242</span>
                  <span style={styles.cardExpiry}>Expiry: 12/29</span>
                </div>
                <div style={styles.payCard} className="glass-panel">
                  <span style={styles.cardType}>📱 UPI</span>
                  <span>aaravsharma@okaxis</span>
                  <span style={styles.cardExpiry}>Primary UPI ID</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div style={styles.subPanel}>
              <h2>Rewards & Loyalty Points</h2>
              <div style={styles.pointsBox}>
                <span style={styles.pointsLabel}>Loyalty Points Balance</span>
                <span style={styles.pointsVal}>{user.loyaltyPoints || 0} Points</span>
                <p style={styles.pointsTip}>Points are earned on every order and can be applied as discounts during checkouts (10 points = ₹10).</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={styles.subPanel}>
              <h2>App Settings</h2>
              <div style={styles.settingsGrid}>
                <div style={styles.settingsRow}>
                  <span>Light / Dark Theme</span>
                  <button onClick={toggleTheme} style={styles.themeToggleBtn}>
                    {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                </div>
                <div style={styles.settingsRow}>
                  <span>Language</span>
                  <select value={language} onChange={e => setLanguage(e.target.value)} style={styles.select}>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिन्दी)</option>
                  </select>
                </div>
                <div style={styles.settingsRow}>
                  <span>Location Preference</span>
                  <select value={locationPref} onChange={e => setLocationPref(e.target.value)} style={styles.select}>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div style={styles.settingsRow}>
                  <span>Order Updates Notifications</span>
                  <input 
                    type="checkbox" 
                    checked={notifUpdates} 
                    onChange={e => setNotifUpdates(e.target.checked)} 
                    style={styles.checkbox}
                  />
                </div>
              </div>
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
    alignItems: 'center',
    gap: '20px'
  },
  avatar: {
    fontSize: '36px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--card-border)',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: '28px',
    fontWeight: 700
  },
  roleTag: {
    fontSize: '12px',
    color: 'var(--accent)',
    fontWeight: 700,
    marginTop: '4px'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gap: '30px',
    alignItems: 'start'
  },
  sidebar: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  tab: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    textAlign: 'left' as const,
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.15s ease'
  },
  tabActive: {
    backgroundColor: 'var(--accent)',
    border: 'none',
    color: '#fff',
    textAlign: 'left' as const,
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  logoutBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    cursor: 'pointer',
    fontWeight: 600,
    marginTop: '20px',
    transition: 'all 0.2s ease'
  },
  panel: {
    padding: '30px',
    minHeight: '400px'
  },
  subPanel: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--card-border)'
  },
  label: {
    fontSize: '14px',
    color: 'var(--text-muted)'
  },
  val: {
    fontSize: '16px',
    fontWeight: 600
  },
  goDashBtn: {
    padding: '8px 16px',
    fontSize: '13px'
  },
  emptySubState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px'
  },
  emptySubIcon: {
    fontSize: '36px',
    color: 'var(--text-muted)'
  },
  browseMiniBtn: {
    marginTop: '8px'
  },
  favsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px'
  },
  favCard: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative' as const
  },
  favLogo: {
    fontSize: '24px'
  },
  favMeta: {
    flex: 1
  },
  favName: {
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  favRating: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  removeFavBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  addressList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  addrRow: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  payCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    fontSize: '14px'
  },
  cardType: {
    fontWeight: 700,
    color: 'var(--accent)'
  },
  cardExpiry: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  pointsBox: {
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px'
  },
  pointsLabel: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  pointsVal: {
    fontSize: '36px',
    fontWeight: 800,
    color: 'var(--accent)'
  },
  pointsTip: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    maxWidth: '300px'
  },
  settingsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  settingsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--card-border)',
    fontSize: '14px'
  },
  themeToggleBtn: {
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600
  },
  select: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    outline: 'none',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  }
};
// Add CSS hover style for tab:
// `tab:hover { background-color: rgba(255,255,255,0.02); color: var(--text-primary); }`
// `logoutBtn:hover { background-color: var(--danger); color: #fff; }`
