import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useTheme } from '../contexts/ThemeContext';
import { AuthModal } from '../components/layout/AuthModal';
import { CartDrawer } from '../components/layout/CartDrawer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useAuth();
  const { cart } = useCart();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { theme, toggleTheme } = useTheme();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Trigger login modal open automatically if '?login=true' query parameter is present (used by ProtectedRoute guard)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === 'true') {
      setIsAuthOpen(true);
      // Clean query params
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProfileClick = () => {
    if (!token) {
      setIsAuthOpen(true);
    } else {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    }
  };

  const handleDashboardRedirect = () => {
    setIsProfileDropdownOpen(false);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar} className="glass-panel">
        <div style={styles.navLeft}>
          <Link to="/" style={styles.logo}>HUNGRIFY</Link>
          <span style={styles.tagline}>Crave. Click. Delivered.</span>
        </div>

        <nav style={styles.navMiddle}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/restaurants" style={styles.navLink}>Restaurants</Link>
          <Link to="/search" style={styles.navLink}>Search</Link>
          <Link to="/offers" style={styles.navLink}>Offers</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
        </nav>

        <div style={styles.navRight}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={styles.iconBtn} title="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Notifications Center */}
          <div style={styles.notifWrapper}>
            <button onClick={() => setIsNotifOpen(!isNotifOpen)} style={styles.iconBtn}>
              🔔
              {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
            </button>
            
            {isNotifOpen && (
              <div style={styles.notifDropdown} className="glass-panel">
                <div style={styles.dropdownHeader}>
                  <h3>Notifications</h3>
                </div>
                <div style={styles.notifList}>
                  {notifications.length === 0 ? (
                    <p style={styles.emptyNotif}>No new notifications</p>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        onClick={() => markAsRead(notif.id)}
                        style={{
                          ...styles.notifItem,
                          backgroundColor: notif.read ? 'transparent' : 'rgba(124, 58, 237, 0.08)'
                        }}
                      >
                        <span style={styles.notifTitle}>{notif.title}</span>
                        <p style={styles.notifMsg}>{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button onClick={() => setIsCartOpen(true)} style={styles.cartBtn} className="glow-btn">
            🛒 Cart ({totalCartItems})
          </button>

          {/* Profile Action */}
          <div style={styles.profileWrapper}>
            <button onClick={handleProfileClick} style={styles.profileBtn}>
              {token && user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign In'}
            </button>
            {isProfileDropdownOpen && token && user && (
              <div style={styles.profileDropdown} className="glass-panel">
                <button onClick={() => { setIsProfileDropdownOpen(false); navigate('/profile'); }} style={styles.dropdownItem}>My Profile</button>
                <button onClick={handleDashboardRedirect} style={styles.dropdownItem}>Operations Dashboard</button>
                <button onClick={handleLogout} style={styles.dropdownItem}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <footer style={styles.footer} className="glass-panel">
        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerHeader}>Company</h3>
            <div style={styles.footerLinks}>
              <Link to="/about">About Us</Link>
              <a href="#careers" onClick={() => alert('Careers section coming soon!')}>Careers</a>
              <a href="#contact" onClick={() => alert('Contact us at support@hungrify.com')}>Contact</a>
            </div>
          </div>
          <div>
            <h3 style={styles.footerHeader}>Legal</h3>
            <div style={styles.footerLinks}>
              <a href="#privacy" onClick={() => alert('Privacy Policy Simulation')}>Privacy Policy</a>
              <a href="#terms" onClick={() => alert('Terms of Service Simulation')}>Terms of Service</a>
            </div>
          </div>
          <div>
            <h3 style={styles.footerHeader}>Social</h3>
            <div style={styles.footerLinks}>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <hr style={styles.footerLine} />
        <div style={styles.footerBottom}>
          <p style={styles.footerCredits}>Designed & Developed by Chhavi</p>
          <p style={styles.footerTech}>Built with React • TypeScript • Node.js • MySQL</p>
          <div style={styles.footerLastLine}>
            <span>© 2026 Hungrify. All rights reserved.</span>
            <Link to="/developer" style={styles.developerLink}>Developer Portal</Link>
          </div>
        </div>
      </footer>

      {/* Overlay Drawer Components */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onOpenAuth={() => setIsAuthOpen(true)} />
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 30px',
    margin: '20px auto 0 auto',
    width: 'calc(100% - 40px)',
    maxWidth: '1200px',
    zIndex: 900
  },
  navLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px'
  },
  logo: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    textDecoration: 'none',
    letterSpacing: '1px'
  },
  tagline: {
    fontSize: '10px',
    color: 'var(--text-secondary)',
    letterSpacing: '0.5px'
  },
  navMiddle: {
    display: 'flex',
    gap: '24px'
  },
  navLink: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontSize: '15px',
    fontWeight: 500,
    transition: 'color 0.2s ease'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    position: 'relative' as const
  },
  badge: {
    position: 'absolute' as const,
    top: '-6px',
    right: '-6px',
    backgroundColor: 'var(--danger)',
    color: '#fff',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700
  },
  cartBtn: {
    padding: '8px 16px',
    fontSize: '14px'
  },
  profileWrapper: {
    position: 'relative' as const
  },
  profileBtn: {
    background: 'none',
    color: 'var(--text-primary)',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--card-border)'
  },
  profileDropdown: {
    position: 'absolute' as const,
    right: 0,
    top: '45px',
    width: '200px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    padding: '8px',
    zIndex: 950
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '10px 12px',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  notifWrapper: {
    position: 'relative' as const
  },
  notifDropdown: {
    position: 'absolute' as const,
    right: '-50px',
    top: '40px',
    width: '320px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    padding: '16px',
    zIndex: 950,
    maxHeight: '400px',
    overflowY: 'auto' as const
  },
  dropdownHeader: {
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '10px',
    marginBottom: '10px'
  },
  notifList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  emptyNotif: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    textAlign: 'center' as const,
    padding: '10px'
  },
  notifItem: {
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: '1px solid transparent'
  },
  notifTitle: {
    fontSize: '13px',
    fontWeight: 600
  },
  notifMsg: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '4px'
  },
  main: {
    flex: 1,
    padding: '40px 20px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  },
  footer: {
    padding: '40px 30px',
    marginTop: 'auto',
    width: 'calc(100% - 40px)',
    maxWidth: '1200px',
    margin: '40px auto 20px auto'
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    marginBottom: '30px'
  },
  footerHeader: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px'
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  footerLine: {
    border: 'none',
    borderBottom: '1px solid var(--card-border)',
    marginBottom: '20px'
  },
  footerBottom: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center' as const
  },
  footerCredits: {
    fontSize: '14px',
    fontWeight: 600
  },
  footerTech: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  footerLastLine: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '8px'
  },
  developerLink: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    opacity: 0.5,
    transition: 'opacity 0.2s ease'
  }
};
// Add CSS hover style overrides inside global stylesheet for navLink hover:
// `navLink:hover { color: var(--text-primary); }`
// `developerLink:hover { opacity: 1; }`
