import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ordersApi } from '../../services/api/orders';
import { useNotifications } from '../../contexts/NotificationContext';
import { PAYMENT_METHODS } from '../../constants';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, coupon, applyCoupon, removeCoupon, getBillSummary, clearCart } = useCart();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Addresses State
  const [addresses, setAddresses] = useState([
    { id: 'addr-1', type: 'Home', address: '12 MG Road, Indiranagar, Bangalore - 560038' },
    { id: 'addr-2', type: 'Office', address: 'Block C, Quantum Tech Park, Electronic City, Bangalore - 560100' }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [newAddrText, setNewAddrText] = useState('');
  const [isAddingAddr, setIsAddingAddr] = useState(false);

  // Checkout Params State
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  if (cart.length === 0 && !showSuccessAnim) {
    return (
      <div style={styles.emptyContainer} className="glass-panel">
        <span style={styles.emptyIcon}>🛒</span>
        <h3>Your checkout is empty</h3>
        <p>Explore restaurants and add items to your cart first.</p>
        <button onClick={() => navigate('/restaurants')} style={styles.backBtn} className="glow-btn">
          Explore Restaurants
        </button>
      </div>
    );
  }

  const bill = getBillSummary();

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

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrText.trim()) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      type: 'Other',
      address: newAddrText
    };
    setAddresses(prev => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    setNewAddrText('');
    setIsAddingAddr(false);
  };

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    const chosenAddress = addresses.find(a => a.id === selectedAddressId)?.address || '';
    
    try {
      const itemsRecord = cart.map(i => ({
        itemId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity
      }));

      await ordersApi.placeOrder({
        customerId: user?.id || 1,
        restaurantId: cart[0].restaurantId,
        restaurantName: cart[0].restaurantName,
        items: itemsRecord,
        totalAmount: bill.netTotal,
        deliveryAddress: chosenAddress,
        paymentMethod: selectedPayment
      });

      addNotification(
        'Order Placed Successfully',
        `Your order from ${cart[0].restaurantName} has been placed. Payment via ${selectedPayment.toUpperCase()}.`,
        'order'
      );

      // Trigger Success Animation screen
      setIsOrdering(false);
      setShowSuccessAnim(true);
      clearCart();

      // Delay redirect to Orders tracking timeline
      setTimeout(() => {
        navigate('/orders');
      }, 2500);

    } catch (err) {
      setIsOrdering(false);
      alert('Failed to place order. Please try again.');
    }
  };

  if (showSuccessAnim) {
    return (
      <div style={styles.successOverlay}>
        <div style={styles.successCard} className="glass-panel">
          <div style={styles.successRing}>
            <span style={styles.checkIcon}>✓</span>
          </div>
          <h1 style={styles.successTitle}>Order Placed!</h1>
          <p style={styles.successSub}>Your food is on the way.</p>
          <p style={styles.successRedirect}>Redirecting to order tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Secure Checkout</h1>

      <div style={styles.layout}>
        {/* Left Checkout steps */}
        <div style={styles.steps}>
          {/* Address Step */}
          <div style={styles.card} className="glass-panel">
            <div style={styles.cardHeader}>
              <span style={styles.stepNum}>1</span>
              <h2>Delivery Address</h2>
            </div>

            <div style={styles.addressesList}>
              {addresses.map(addr => (
                <label 
                  key={addr.id} 
                  style={{
                    ...styles.addrCard,
                    borderColor: selectedAddressId === addr.id ? 'var(--accent)' : 'var(--card-border)',
                    backgroundColor: selectedAddressId === addr.id ? 'rgba(124,58,237,0.03)' : 'transparent'
                  }}
                >
                  <input 
                    type="radio" 
                    name="address" 
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    style={styles.radio}
                  />
                  <div>
                    <span style={styles.addrType}>{addr.type}</span>
                    <p style={styles.addrText}>{addr.address}</p>
                  </div>
                </label>
              ))}
            </div>

            {!isAddingAddr ? (
              <button onClick={() => setIsAddingAddr(true)} style={styles.addAddrBtn}>
                + Add New Address
              </button>
            ) : (
              <form onSubmit={handleAddAddress} style={styles.addAddrForm}>
                <textarea 
                  placeholder="Enter full delivery coordinates..." 
                  value={newAddrText} 
                  onChange={e => setNewAddrText(e.target.value)}
                  required
                  style={styles.addrArea}
                />
                <div style={styles.formActions}>
                  <button type="button" onClick={() => setIsAddingAddr(false)} style={styles.cancelBtn}>Cancel</button>
                  <button type="submit" style={styles.saveBtn} className="glow-btn">Save Address</button>
                </div>
              </form>
            )}
          </div>

          {/* Payment Step */}
          <div style={styles.card} className="glass-panel">
            <div style={styles.cardHeader}>
              <span style={styles.stepNum}>2</span>
              <h2>Payment Method</h2>
            </div>

            <div style={styles.paymentsGrid}>
              {PAYMENT_METHODS.map(pay => (
                <label 
                  key={pay.id} 
                  style={{
                    ...styles.payCard,
                    borderColor: selectedPayment === pay.id ? 'var(--accent)' : 'var(--card-border)',
                    backgroundColor: selectedPayment === pay.id ? 'rgba(124,58,237,0.03)' : 'transparent'
                  }}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={selectedPayment === pay.id}
                    onChange={() => setSelectedPayment(pay.id)}
                    style={styles.radio}
                  />
                  <div style={styles.payMeta}>
                    <span style={styles.payIcon}>{pay.icon}</span>
                    <span>{pay.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Bill Invoice Sidebar */}
        <aside style={styles.sidebar}>
          {/* Order Summary */}
          <div style={styles.sidebarCard} className="glass-panel">
            <h3>Order Summary</h3>
            <div style={styles.summaryList}>
              {cart.map(item => (
                <div key={item.id} style={styles.summaryItem}>
                  <span>{item.name} <strong>x{item.quantity}</strong></span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coupon Codes applicator */}
          <div style={styles.sidebarCard} className="glass-panel">
            <h3>Promo Code</h3>
            {coupon ? (
              <div style={styles.appliedBox}>
                <div>
                  <span style={styles.couponTag}>{coupon.code} Applied</span>
                  <p style={styles.couponDesc}>{coupon.description}</p>
                </div>
                <button onClick={removeCoupon} style={styles.removeCouponBtn}>Remove</button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                <input 
                  type="text" 
                  placeholder="Enter Code" 
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

          {/* Invoice Bill Breakdown */}
          <div style={styles.sidebarCard} className="glass-panel">
            <h3>Bill Details</h3>
            <div style={styles.billBox}>
              <div style={styles.billRow}>
                <span>Items Total</span>
                <span>₹{bill.itemsTotal}</span>
              </div>
              <div style={styles.billRow}>
                <span>Delivery Partner Fee</span>
                <span>{bill.deliveryFee === 0 ? 'FREE' : `₹${bill.deliveryFee}`}</span>
              </div>
              <div style={styles.billRow}>
                <span>Platform Fee</span>
                <span>₹{bill.platformFee}</span>
              </div>
              <div style={styles.billRow}>
                <span>GST & Restaurant Taxes (5%)</span>
                <span>₹{bill.taxes}</span>
              </div>
              {bill.discount > 0 && (
                <div style={{ ...styles.billRow, color: 'var(--success)' }}>
                  <span>Discount Code</span>
                  <span>-₹{bill.discount}</span>
                </div>
              )}
              <hr style={styles.divider} />
              <div style={{ ...styles.billRow, fontWeight: 700, fontSize: '18px' }}>
                <span>Total bill</span>
                <span>₹{bill.netTotal}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} disabled={isOrdering} style={styles.placeBtn} className="glow-btn">
              {isOrdering ? 'Processing Order...' : 'Place Secure Order'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const styles = {
  emptyContainer: {
    maxWidth: '540px',
    margin: '80px auto',
    padding: '50px 30px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px'
  },
  emptyIcon: {
    fontSize: '54px'
  },
  backBtn: {
    width: '100%',
    padding: '12px',
    marginTop: '10px'
  },
  container: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '30px',
    alignItems: 'start'
  },
  steps: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '16px'
  },
  stepNum: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  addressesList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  addrCard: {
    border: '1px solid var(--card-border)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    cursor: 'pointer',
    alignItems: 'flex-start',
    transition: 'all 0.2s ease'
  },
  radio: {
    marginTop: '4px',
    cursor: 'pointer'
  },
  addrType: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--text-primary)'
  },
  addrText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
    lineHeight: '1.4'
  },
  addAddrBtn: {
    alignSelf: 'flex-start',
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    fontWeight: 600,
    cursor: 'pointer'
  },
  addAddrForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  addrArea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    height: '80px',
    outline: 'none',
    fontSize: '14px',
    resize: 'none' as const
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer'
  },
  saveBtn: {
    padding: '8px 16px'
  },
  paymentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  payCard: {
    border: '1px solid var(--card-border)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  payMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600
  },
  payIcon: {
    fontSize: '20px'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  sidebarCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px'
  },
  summaryList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  appliedBox: {
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
    borderBottom: '1px solid var(--card-border)'
  },
  placeBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    marginTop: '10px'
  },
  successOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px'
  },
  successCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px'
  },
  successRing: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '4px solid var(--success)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
    animation: 'scaleUp 0.5s ease-out'
  },
  checkIcon: {
    fontSize: '40px',
    color: 'var(--success)',
    fontWeight: 'bold'
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: 700
  },
  successSub: {
    fontSize: '15px',
    color: 'var(--text-secondary)'
  },
  successRedirect: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginTop: '10px'
  }
};
// Add CSS keyframes inside global stylesheet for success ring scale:
// `@keyframes scaleUp { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`
