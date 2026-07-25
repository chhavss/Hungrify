import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOpenAuth }) => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, coupon, applyCoupon, removeCoupon, getBillSummary } = useCart();
  const { token } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponCode('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckout = () => {
    onClose();
    if (!token) {
      onOpenAuth();
    } else {
      navigate('/checkout');
    }
  };

  const bill = getBillSummary();

  return (
    <div style={styles.overlay}>
      <div style={styles.backdrop} onClick={onClose} />
      <div style={styles.drawer} className="glass-panel">
        <div style={styles.header}>
          <h2>Shopping Cart</h2>
          <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        </div>

        {cart.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Start exploring Hungrify by placing your first order.</p>
            <button onClick={() => { onClose(); navigate('/restaurants'); }} style={styles.browseBtn} className="glow-btn">
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div style={styles.content}>
            <div style={styles.restaurantTag}>
              Ordering from: <strong>{cart[0].restaurantName}</strong>
            </div>

            <div style={styles.itemsList}>
              {cart.map(item => (
                <div key={item.id} style={styles.itemRow}>
                  <div style={styles.itemMeta}>
                    <span style={{ color: item.isVeg ? '#10B981' : '#EF4444', marginRight: '6px' }}>
                      {item.isVeg ? '🟢' : '🔴'}
                    </span>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemPrice}>₹{item.price}</span>
                  </div>
                  <div style={styles.itemActions}>
                    <div style={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>-</button>
                      <span style={styles.qtyVal}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Section */}
            <div style={styles.couponSection}>
              {coupon ? (
                <div style={styles.appliedCoupon}>
                  <div>
                    <span style={styles.couponTag}>Code applied: {coupon.code}</span>
                    <p style={styles.couponDesc}>{coupon.description}</p>
                  </div>
                  <button onClick={removeCoupon} style={styles.removeCouponBtn}>Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code" 
                    value={couponCode} 
                    onChange={e => setCouponCode(e.target.value)}
                    style={styles.couponInput}
                  />
                  <button type="submit" style={styles.couponBtn}>Apply</button>
                </form>
              )}
              {couponError && <p style={styles.errorText}>{couponError}</p>}
              {couponSuccess && <p style={styles.successText}>{couponSuccess}</p>}
            </div>

            {/* Bill Summary */}
            <div style={styles.billBox}>
              <div style={styles.billRow}>
                <span>Items Total</span>
                <span>₹{bill.itemsTotal}</span>
              </div>
              <div style={styles.billRow}>
                <span>Delivery Fee</span>
                <span>{bill.deliveryFee === 0 ? 'FREE' : `₹${bill.deliveryFee}`}</span>
              </div>
              <div style={styles.billRow}>
                <span>Platform Fee</span>
                <span>₹{bill.platformFee}</span>
              </div>
              <div style={styles.billRow}>
                <span>Taxes & GST (5%)</span>
                <span>₹{bill.taxes}</span>
              </div>
              {bill.discount > 0 && (
                <div style={{ ...styles.billRow, color: 'var(--success)' }}>
                  <span>Discount</span>
                  <span>-₹{bill.discount}</span>
                </div>
              )}
              <hr style={styles.divider} />
              <div style={{ ...styles.billRow, fontWeight: 700, fontSize: '18px' }}>
                <span>Total Amount</span>
                <span>₹{bill.netTotal}</span>
              </div>
            </div>

            <button onClick={handleCheckout} style={styles.checkoutBtn} className="glow-btn">
              Proceed to Checkout &rarr;
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
    zIndex: 999,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  backdrop: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 22, 0.7)',
    backdropFilter: 'blur(4px)'
  },
  drawer: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '440px',
    height: '100%',
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '30px',
    animation: 'slideIn 0.3s ease-out',
    borderRadius: '16px 0 0 16px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '15px'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '28px',
    cursor: 'pointer'
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textAlign: 'center' as const
  },
  emptyIcon: {
    fontSize: '48px'
  },
  browseBtn: {
    marginTop: '12px',
    width: '100%'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflowY: 'auto' as const,
    gap: '20px'
  },
  restaurantTag: {
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  itemsList: {
    flex: 1,
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    paddingRight: '4px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--card-border)'
  },
  itemMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  itemName: {
    fontSize: '15px',
    fontWeight: 600
  },
  itemPrice: {
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--card-border)',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  qtyBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600
  },
  qtyVal: {
    padding: '0 8px',
    fontSize: '14px',
    fontWeight: 600
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  couponSection: {
    border: '1px solid var(--card-border)',
    borderRadius: '8px',
    padding: '12px'
  },
  couponForm: {
    display: 'flex',
    gap: '8px'
  },
  couponInput: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '14px'
  },
  couponBtn: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  appliedCoupon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  couponTag: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--success)'
  },
  couponDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  removeCouponBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    fontSize: '13px'
  },
  errorText: {
    color: 'var(--danger)',
    fontSize: '12px',
    marginTop: '6px'
  },
  successText: {
    color: 'var(--success)',
    fontSize: '12px',
    marginTop: '6px'
  },
  billBox: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  billRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  divider: {
    border: 'none',
    borderBottom: '1px solid var(--card-border)',
    margin: '6px 0'
  },
  checkoutBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    marginTop: '10px'
  }
};
