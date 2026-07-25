import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface DeveloperLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DeveloperLayout: React.FC<DeveloperLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: '📝' },
    { id: 'architecture', name: 'Architecture', icon: '🏗️' },
    { id: 'er_diagram', name: 'ER Diagram', icon: '📊' },
    { id: 'database_explorer', name: 'Database Explorer', icon: '🗄️' },
    { id: 'sql_playground', name: 'SQL Playground', icon: '💻' },
    { id: 'normalization', name: 'Normalization', icon: '⚡' },
    { id: 'project_report', name: 'Project Report', icon: '📄' }
  ];

  // Ctrl + K Command Palette Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const paletteActions = [
    { name: 'Show Overview', action: () => { setActiveTab('overview'); setIsCommandPaletteOpen(false); } },
    { name: 'Show Architecture', action: () => { setActiveTab('architecture'); setIsCommandPaletteOpen(false); } },
    { name: 'Show ER Diagram', action: () => { setActiveTab('er_diagram'); setIsCommandPaletteOpen(false); } },
    { name: 'Show Database Explorer', action: () => { setActiveTab('database_explorer'); setIsCommandPaletteOpen(false); } },
    { name: 'Show SQL Playground', action: () => { setActiveTab('sql_playground'); setIsCommandPaletteOpen(false); } },
    { name: 'Show Normalization Lab', action: () => { setActiveTab('normalization'); setIsCommandPaletteOpen(false); } },
    { name: 'Show Project Report', action: () => { setActiveTab('project_report'); setIsCommandPaletteOpen(false); } },
    { name: 'Toggle Theme Mode', action: () => { toggleTheme(); setIsCommandPaletteOpen(false); } },
    { name: 'Exit Developer Portal', action: () => { navigate('/'); } }
  ];

  const filteredActions = paletteActions.filter(act => 
    act.name.toLowerCase().includes(paletteQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Developer Sidebar */}
      <aside style={styles.sidebar} className="glass-panel">
        <div style={styles.sidebarHeader}>
          <Link to="/" style={styles.logo}>HUNGRIFY</Link>
          <span style={styles.badge}>Developer Portal</span>
        </div>

        <div style={styles.shortcutTip}>
          Press <kbd style={styles.kbd}>Ctrl + K</kbd> for Command Palette
        </div>

        <nav style={styles.sidebarNav}>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={activeTab === item.id ? styles.linkActive : styles.link}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div style={styles.footer}>
          <Link to="/" style={styles.exitBtn}>
            &larr; Exit to Customer Portal
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div style={styles.mainWrapper}>
        <header style={styles.header} className="glass-panel">
          <div style={styles.headerLeft}>
            <h2>Technical Hub</h2>
            <span style={styles.tabIndicator}>/ {menuItems.find(i => i.id === activeTab)?.name}</span>
          </div>
          <div style={styles.headerRight}>
            <button onClick={toggleTheme} style={styles.themeBtn}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <span style={styles.dbStatus}>🟢 SQLite Core Offline Simulator</span>
          </div>
        </header>

        <main style={styles.content}>
          {children}
        </main>
      </div>

      {/* Command Palette Modal Overlay */}
      {isCommandPaletteOpen && (
        <div style={styles.paletteOverlay} onClick={() => setIsCommandPaletteOpen(false)}>
          <div style={styles.paletteModal} className="glass-panel" onClick={e => e.stopPropagation()}>
            <div style={styles.paletteHeader}>
              <span style={styles.paletteSearchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Type a command or search tabs..."
                value={paletteQuery}
                onChange={e => setPaletteQuery(e.target.value)}
                autoFocus
                style={styles.paletteInput}
              />
            </div>
            <div style={styles.paletteList}>
              {filteredActions.length === 0 ? (
                <p style={styles.paletteEmpty}>No matching actions found</p>
              ) : (
                filteredActions.map((act, index) => (
                  <button
                    key={index}
                    onClick={act.action}
                    style={styles.paletteItem}
                  >
                    <span>&gt;</span>
                    <span>{act.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#050816' // Force dark dashboard base
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
    gap: '6px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    paddingBottom: '20px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '1px'
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    color: '#22d3ee',
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(34, 211, 238, 0.2)'
  },
  shortcutTip: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '15px',
    textAlign: 'center' as const
  },
  kbd: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '3px',
    padding: '2px 5px',
    fontSize: '10px',
    fontFamily: 'monospace'
  },
  sidebarNav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginTop: '25px'
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '15px',
    padding: '12px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease'
  },
  linkActive: {
    background: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    color: '#fff',
    fontSize: '15px',
    padding: '12px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)'
  },
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '20px'
  },
  exitBtn: {
    display: 'block',
    textAlign: 'center' as const,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
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
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  tabIndicator: {
    fontSize: '16px',
    color: '#22d3ee',
    fontWeight: 500
  },
  headerRight: {
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
  dbStatus: {
    fontSize: '13px',
    color: '#10b981',
    fontWeight: 600
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const
  },
  paletteOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 22, 0.85)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    padding: '10vh 20px 0 20px'
  },
  paletteModal: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#0a0d24',
    borderRadius: '12px',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column' as const,
    maxHeight: '400px',
    overflow: 'hidden'
  },
  paletteHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)'
  },
  paletteSearchIcon: {
    fontSize: '18px',
    marginRight: '12px'
  },
  paletteInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    outline: 'none'
  },
  paletteList: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '8px'
  },
  paletteEmpty: {
    padding: '16px',
    color: '#64748b',
    textAlign: 'center' as const,
    fontSize: '14px'
  },
  paletteItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    textAlign: 'left' as const,
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.15s ease'
  }
};
// Add CSS hover style for exitBtn & paletteItem & link:
// `exitBtn:hover { border-color: rgba(255,255,255,0.25); color: #fff; }`
// `paletteItem:hover { background-color: rgba(255,255,255,0.04); color: #fff; }`
