import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, loginAsDemoRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  const handleDemoSelect = async (role: 'customer' | 'restaurant' | 'delivery' | 'admin') => {
    setLoading(true);
    await loginAsDemoRole(role);
    setLoading(false);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal} className="glass-panel">
        <div style={styles.header}>
          <h2>Sign In to Hungrify</h2>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {!isDemoOpen ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="email@example.com"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                style={styles.input}
              />
            </div>
            
            <div style={styles.forgotPass}>
              <button type="button" onClick={() => alert('Forgot Password simulation: Demo accounts are available.')} style={styles.linkBtn}>
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn} className="glow-btn">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerText}>or</span>
            </div>

            <button type="button" onClick={() => setIsDemoOpen(true)} style={styles.demoTriggerBtn}>
              Use Demo Account
            </button>

            <button type="button" onClick={onClose} style={styles.guestBtn}>
              Continue as Guest
            </button>
          </form>
        ) : (
          <div style={styles.demoContainer}>
            <p style={styles.demoSubtitle}>Select a pre-configured role to test the platform dashboards:</p>
            <div style={styles.demoGrid}>
              <button onClick={() => handleDemoSelect('customer')} style={styles.demoRoleCard}>
                <span style={styles.roleIcon}>😋</span>
                <h3>Customer</h3>
                <p>Browse, wishlist, checkout, and track orders</p>
              </button>
              <button onClick={() => handleDemoSelect('restaurant')} style={styles.demoRoleCard}>
                <span style={styles.roleIcon}>🍳</span>
                <h3>Restaurant Owner</h3>
                <p>Manage menus, accept orders, view revenue</p>
              </button>
              <button onClick={() => handleDemoSelect('delivery')} style={styles.demoRoleCard}>
                <span style={styles.roleIcon}>🛵</span>
                <h3>Delivery Partner</h3>
                <p>Accept deliveries, view routing maps, track earnings</p>
              </button>
              <button onClick={() => handleDemoSelect('admin')} style={styles.demoRoleCard}>
                <span style={styles.roleIcon}>👑</span>
                <h3>Administrator</h3>
                <p>Platform analytics, metrics, and configurations</p>
              </button>
            </div>
            <button onClick={() => setIsDemoOpen(false)} style={styles.backBtn}>
              &larr; Back to standard login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 22, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
    border: '1px solid var(--card-border)',
    maxHeight: '90vh',
    overflowY: 'auto' as const
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '28px',
    cursor: 'pointer',
    padding: '0 5px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--card-border)',
    color: 'var(--text-primary)',
    fontSize: '16px',
    outline: 'none'
  },
  forgotPass: {
    textAlign: 'right' as const
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    marginTop: '8px'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '16px 0',
    borderBottom: '1px solid var(--card-border)',
    lineHeight: '0.1em'
  },
  dividerText: {
    background: 'var(--bg-secondary)',
    padding: '0 10px',
    color: 'var(--text-muted)',
    fontSize: '14px'
  },
  demoTriggerBtn: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--accent)',
    color: 'var(--accent)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  guestBtn: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer'
  },
  demoContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  demoSubtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '8px'
  },
  demoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  demoRoleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    textAlign: 'center' as const,
    transition: 'transform 0.2s ease, border-color 0.2s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px'
  },
  roleIcon: {
    fontSize: '28px'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    marginTop: '16px',
    alignSelf: 'center',
    fontSize: '14px'
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: 'var(--danger)',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  }
};
