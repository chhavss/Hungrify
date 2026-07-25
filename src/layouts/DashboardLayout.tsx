import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPanelTitle = () => {
    switch (role) {
      case 'restaurant':
        return 'Restaurant Operations Panel';
      case 'delivery':
        return 'Delivery Operations Panel';
      case 'admin':
        return 'Platform Administration Panel';
      default:
        return 'Customer Portal';
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar} className="glass-panel">
        <div style={styles.sidebarHeader}>
          <Link to="/" style={styles.logo}>HUNGRIFY</Link>
          <span style={styles.roleBadge}>{role?.toUpperCase()}</span>
        </div>

        <nav style={styles.sidebarNav}>
          <div style={styles.navGroup}>
            <span style={styles.groupLabel}>Navigation</span>
            <Link to="/" style={styles.sidebarLink}>🏠 Back to Home</Link>
            <Link to="/profile" style={styles.sidebarLink}>👤 My Profile</Link>
          </div>
          
          <div style={styles.navGroup}>
            <span style={styles.groupLabel}>Operations</span>
            <Link to="/dashboard" style={styles.sidebarLinkActive}>📊 Dashboard Hub</Link>
          </div>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <span style={styles.avatar}>👤</span>
            <div>
              <p style={styles.username}>{user?.name}</p>
              <p style={styles.userRole}>{role} account</p>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={styles.mainWrapper}>
        <header style={styles.header} className="glass-panel">
          <h1>{getPanelTitle()}</h1>
          <div style={styles.headerActions}>
            <button onClick={toggleTheme} style={styles.themeBtn}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <span style={styles.statusIndicator}>● System Online</span>
          </div>
        </header>

        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)'
  },
  sidebar: {
    width: '280px',
    height: 'calc(100vh - 40px)',
    position: 'sticky' as const,
    top: '20px',
    left: '20px',
    margin: '20px 0 20px 20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    zIndex: 100
  },
  sidebarHeader: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '20px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    textDecoration: 'none',
    letterSpacing: '1px'
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '0.5px'
  },
  sidebarNav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    marginTop: '30px'
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  groupLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: '4px'
  },
  sidebarLink: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontSize: '15px',
    padding: '10px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sidebarLinkActive: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'var(--accent)',
    fontSize: '15px',
    padding: '10px 12px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  sidebarFooter: {
    borderTop: '1px solid var(--card-border)',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    fontSize: '24px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--card-border)'
  },
  username: {
    fontSize: '14px',
    fontWeight: 600
  },
  userRole: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  logoutBtn: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s ease'
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px',
    gap: '20px',
    overflowX: 'hidden' as const
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    height: '70px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  themeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer'
  },
  statusIndicator: {
    fontSize: '13px',
    color: 'var(--success)',
    fontWeight: 600
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const
  }
};
