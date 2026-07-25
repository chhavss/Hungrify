import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container} className="glass-panel">
      <span style={styles.icon}>🍕🔍</span>
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>Looks like you're lost.</p>
      <p style={styles.desc}>Let's get you back to something delicious.</p>
      <div style={styles.actions}>
        <button onClick={() => navigate('/')} style={styles.homeBtn} className="glow-btn">
          Go Home
        </button>
        <button onClick={() => navigate('/restaurants')} style={styles.browseBtn}>
          Explore Restaurants
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '540px',
    margin: '80px auto',
    padding: '50px 30px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px'
  },
  icon: {
    fontSize: '64px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '72px',
    fontWeight: 800,
    color: 'var(--accent)',
    lineHeight: '1'
  },
  subtitle: {
    fontSize: '22px',
    fontWeight: 600
  },
  desc: {
    fontSize: '15px',
    color: 'var(--text-secondary)'
  },
  actions: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px',
    width: '100%',
    justifyContent: 'center'
  },
  homeBtn: {
    flex: 1,
    padding: '12px'
  },
  browseBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s ease'
  }
};
// Add CSS hover overrides in global stylesheet for browseBtn:
// `browseBtn:hover { border-color: var(--text-primary); color: var(--text-primary); }`
