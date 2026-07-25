import React, { useState } from 'react';
import { coupons } from '../../data/coupons';

export const Offers: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDealCategory = (code: string) => {
    if (code === 'WELCOME50') return '🔥 New User Special';
    if (code === 'FREEDEL') return '🛵 Free Delivery Deal';
    if (code === 'FESTIVE20') return '🎉 Festive Offer';
    return '💳 Bank Discount Card';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Hungrify Deals & Coupons</h1>
        <p style={styles.subtitle}>Apply these coupon codes at checkout to unlock instant discounts and savings on your food orders.</p>
      </div>

      <div style={styles.grid}>
        {coupons.map(coupon => (
          <div key={coupon.code} style={styles.card} className="glass-panel">
            <div style={styles.categoryBadge}>{getDealCategory(coupon.code)}</div>
            <div style={styles.cardHeader}>
              <h2 style={styles.code}>{coupon.code}</h2>
              <button 
                onClick={() => handleCopy(coupon.code)} 
                style={copiedCode === coupon.code ? styles.copiedBtn : styles.copyBtn}
              >
                {copiedCode === coupon.code ? 'Copied! ✓' : 'Copy'}
              </button>
            </div>
            <p style={styles.description}>{coupon.description}</p>
            <div style={styles.meta}>
              <span>Min Order: <strong>₹{coupon.minOrderAmount}</strong></span>
              {coupon.maxDiscount && (
                <span>Max Discount: <strong>₹{coupon.maxDiscount}</strong></span>
              )}
            </div>
          </div>
        ))}
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
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px'
  },
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34, 211, 238, 0.08)',
    border: '1px solid rgba(34, 211, 238, 0.2)',
    color: 'var(--secondary)',
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '6px'
  },
  code: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '0.5px'
  },
  copyBtn: {
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: 'var(--text-secondary)',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  copiedBtn: {
    border: '1px solid var(--success)',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: 'var(--success)',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  description: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--text-muted)',
    borderTop: '1px solid var(--card-border)',
    paddingTop: '12px',
    marginTop: '8px'
  }
};
// Add CSS hover style for copyBtn:
// `copyBtn:hover { border-color: var(--accent); color: var(--accent); }`
