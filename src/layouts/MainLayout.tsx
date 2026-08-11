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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === 'true') {
      setIsAuthOpen(true);
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

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'RESTAURANTS', path: '/restaurants' },
    { label: 'DISCOVER', path: '/search' },
    { label: 'OFFERS', path: '/offers' },
    { label: 'OUR STORY', path: '/about' }
  ];

  return (
    <div style={styles.outerWrapper}>
      {/* Editorial Vertical Side Navigation */}
      <aside style={styles.sideNav}>
        <div style={styles.sideNavText}>HUNGRIFY CULINARY EDITION • EST 2026</div>
      </aside>

      {/* Main Enclosed Card Panel */}
      <div style={styles.innerCardPanel}>
        {/* Minimalist Top Navbar */}
        <header style={styles.navbar}>
          {/* Logo Left */}
          <div style={styles.navLeft}>
            <Link to="/" style={styles.logo}>
              HUNGR<span style={{ color: 'var(--accent-orange)' }}>IFY</span>
            </Link>
          </div>

          {/* Nav Links Middle */}
          <nav style={styles.navMiddle}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    ...styles.navLink,
                    color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 600,
                  }}
                >
                  {link.label}
                  {isActive && <span style={styles.activeDot} />}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons Right */}
          <div style={styles.navRight}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="circular-icon-btn"
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Notification Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="circular-icon-btn"
                title="Notifications"
              >
                🔔
                {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
              </button>

              {isNotifOpen && (
                <div style={styles.notifDropdown}>
                  <div style={styles.dropdownHeader}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark)' }}>Notifications</h4>
                  </div>
                  <div style={styles.notifList}>
                    {notifications.length === 0 ? (
                      <p style={styles.emptyNotif}>No unread notifications</p>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          style={{
                            ...styles.notifItem,
                            backgroundColor: notif.read ? 'transparent' : 'rgba(255, 94, 30, 0.08)'
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

            {/* Circular Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="circular-icon-btn"
              style={{ position: 'relative', border: '1.5px solid var(--accent-orange)' }}
              title="View Cart"
            >
              🛍️
              {totalCartItems > 0 && <span style={styles.badgeOrange}>{totalCartItems}</span>}
            </button>

            {/* Account / User Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleProfileClick}
                className="pill-btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                {token && user ? `Hi, ${user.name.split(' ')[0]}` : 'SIGN IN'}
              </button>

              {isProfileDropdownOpen && token && user && (
                <div style={styles.profileDropdown}>
                  <button onClick={() => { setIsProfileDropdownOpen(false); navigate('/profile'); }} style={styles.dropdownItem}>My Profile</button>
                  <button onClick={handleDashboardRedirect} style={styles.dropdownItem}>Operations Dashboard</button>
                  <button onClick={handleLogout} style={{ ...styles.dropdownItem, color: '#e63946' }}>Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main style={styles.main}>
          {children}
        </main>

        {/* Minimalist Editorial Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerGrid}>
            <div>
              <h3 style={styles.footerBrand}>HUNGR<span style={{ color: 'var(--accent-orange)' }}>IFY</span></h3>
              <p style={styles.footerTagline}>
                Curated dining experience from local culinary masters directly to your home.
              </p>
            </div>
            <div>
              <h4 style={styles.footerHeader}>EXPLORE</h4>
              <div style={styles.footerLinks}>
                <Link to="/restaurants">Curated Kitchens</Link>
                <Link to="/offers">Daily Specials</Link>
                <Link to="/about">Our Philosophy</Link>
              </div>
            </div>
            <div>
              <h4 style={styles.footerHeader}>LEGAL & TEAM</h4>
              <div style={styles.footerLinks}>
                <a href="#privacy" onClick={() => alert('Privacy Policy simulation')}>Privacy Policy</a>
                <a href="#terms" onClick={() => alert('Terms of Service simulation')}>Terms of Service</a>
                <Link to="/developer">Developer Dashboard</Link>
              </div>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <span>© 2026 Hungrify Edition. Designed & Developed by Chhavi.</span>
            <span>Crafted with React, TypeScript & Node.js</span>
          </div>
        </footer>
      </div>

      {/* Overlay Drawers */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onOpenAuth={() => setIsAuthOpen(true)} />
    </div>
  );
};

const styles = {
  outerWrapper: {
    minHeight: '100vh',
    display: 'flex',
    position: 'relative' as const,
    backgroundColor: 'var(--bg-outer)',
  },
  sideNav: {
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
    userSelect: 'none' as const,
  },
  sideNavText: {
    writingMode: 'vertical-rl' as const,
    transform: 'rotate(180deg)',
    fontSize: '0.7rem',
    letterSpacing: '0.25em',
    fontWeight: 700,
    color: 'var(--text-muted)',
    opacity: 0.6,
  },
  innerCardPanel: {
    flex: 1,
    backgroundColor: 'var(--card-main)',
    borderRadius: '32px',
    boxShadow: 'var(--shadow-main)',
    border: '1px solid var(--border-subtle)',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 'calc(100vh - 48px)',
    margin: '12px 12px 12px 0',
    overflow: 'hidden',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '28px 48px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid var(--border-subtle)',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: 800,
    color: 'var(--text-dark)',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  navMiddle: {
    display: 'flex',
    alignItems: 'center',
    gap: '36px',
  },
  navLink: {
    position: 'relative' as const,
    textDecoration: 'none',
    fontSize: '0.75rem',
    letterSpacing: '0.12em',
    transition: 'color 0.25s ease',
  },
  activeDot: {
    position: 'absolute' as const,
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-orange)',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  badge: {
    position: 'absolute' as const,
    top: '-4px',
    right: '-4px',
    backgroundColor: 'var(--accent-orange)',
    color: '#ffffff',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '0.65rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  badgeOrange: {
    position: 'absolute' as const,
    top: '-4px',
    right: '-4px',
    backgroundColor: 'var(--accent-orange)',
    color: '#ffffff',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '0.65rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
  },
  notifDropdown: {
    position: 'absolute' as const,
    right: 0,
    top: '55px',
    width: '300px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--border-subtle)',
    padding: '16px',
    zIndex: 990,
  },
  dropdownHeader: {
    borderBottom: '1px solid var(--border-subtle)',
    paddingBottom: '8px',
    marginBottom: '8px',
  },
  notifList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  emptyNotif: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    textAlign: 'center' as const,
    padding: '12px 0',
  },
  notifItem: {
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  notifTitle: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-dark)',
  },
  notifMsg: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  profileDropdown: {
    position: 'absolute' as const,
    right: 0,
    top: '55px',
    width: '200px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--border-subtle)',
    padding: '8px',
    zIndex: 990,
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    padding: '10px 14px',
    background: 'none',
    border: 'none',
    color: 'var(--text-dark)',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 0.2s ease',
  },
  main: {
    flex: 1,
    padding: '40px 48px',
  },
  footer: {
    padding: '40px 48px',
    borderTop: '1px solid var(--border-subtle)',
    backgroundColor: 'rgba(0, 0, 0, 0.015)',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '40px',
    marginBottom: '32px',
  },
  footerBrand: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    fontWeight: 800,
    marginBottom: '8px',
  },
  footerTagline: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    maxWidth: '320px',
    lineHeight: '1.5',
  },
  footerHeader: {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    color: 'var(--text-muted)',
    marginBottom: '16px',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    fontSize: '0.85rem',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-subtle)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
};
