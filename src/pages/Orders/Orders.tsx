import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ordersApi } from '../../services/api/orders';
import { Order } from '../../data/orders';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart, clearCart } = useCart();

  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingProgress, setTrackingProgress] = useState<number>(0); // 0 to 4 steps

  // Simulation timer for rider location movement
  useEffect(() => {
    let interval: any;
    if (activeOrders.length > 0) {
      interval = setInterval(() => {
        setTrackingProgress(prev => {
          if (prev >= 4) {
            // Order delivered! Trigger order status update
            const activeId = activeOrders[0].id;
            ordersApi.updateStatus(activeId, 'delivered').then(() => {
              // Refresh lists
              fetchOrders();
            });
            clearInterval(interval);
            return 4;
          }
          return prev + 1;
        });
      }, 7000); // Progress step every 7 seconds for demo simulation
    } else {
      setTrackingProgress(0);
    }

    return () => clearInterval(interval);
  }, [activeOrders]);

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    const history = await ordersApi.getHistory(user.id);
    const active = await ordersApi.getActiveOrders(user.id);
    
    // Separate active and past
    setActiveOrders(active);
    setPastOrders(history.filter(o => o.status === 'delivered' || o.status === 'cancelled'));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleReorder = (order: Order) => {
    clearCart();
    order.items.forEach(item => {
      // Mock addToCart matching Item schema
      addToCart({
        id: item.itemId,
        restaurantId: order.restaurantId,
        name: item.name,
        price: item.price,
        description: 'From previous order',
        category: 'Recommended',
        isAvailable: true,
        isVeg: true
      }, order.restaurantId, order.restaurantName);
    });
    navigate('/checkout');
  };

  const getTimelineClass = (step: number) => {
    if (trackingProgress >= step) return styles.activeTimelineNode;
    return styles.timelineNode;
  };

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Orders</h1>

      {/* Active Orders Tracker */}
      {activeOrders.length > 0 && (
        <section style={styles.activeSection} className="glass-panel">
          <div style={styles.activeHeader}>
            <div>
              <span style={styles.activeStatusTag}>Active Delivery</span>
              <h2 style={styles.activeRestName}>Order from {activeOrders[0].restaurantName}</h2>
              <span style={styles.activeId}>ID: {activeOrders[0].id}</span>
            </div>
            <div style={styles.etaBox}>
              <span style={styles.etaText}>Arriving in</span>
              <span style={styles.etaTime}>{Math.max(1, 10 - trackingProgress * 2.5)} mins</span>
            </div>
          </div>

          {/* Simulated Map Visualizer */}
          <div style={styles.mapContainer}>
            <svg style={styles.mapSvg} viewBox="0 0 400 120">
              {/* Road Path */}
              <path 
                d="M 20,60 Q 110,20 200,60 T 380,60" 
                fill="none" 
                stroke="rgba(255,255,255,0.06)" 
                strokeWidth="12" 
                strokeLinecap="round"
              />
              <path 
                d="M 20,60 Q 110,20 200,60 T 380,60" 
                fill="none" 
                stroke="var(--accent)" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset={400 - (trackingProgress / 4) * 400}
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
              />

              {/* Restaurant Node */}
              <circle cx="20" cy="60" r="10" fill="var(--bg-secondary)" stroke="var(--card-border)" strokeWidth="2" />
              <text x="20" y="85" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">🍳 Restaurant</text>

              {/* Delivery Agent Rider Bike Icon */}
              <g 
                transform={`translate(${
                  // Calculate raw path coordinates matching quadratic curves
                  20 + (trackingProgress / 4) * 360
                }, ${
                  60 + Math.sin((trackingProgress / 4) * Math.PI) * -20
                })`}
                style={{ transition: 'transform 0.8s ease-in-out' }}
              >
                <circle cx="0" cy="0" r="14" fill="var(--accent)" stroke="#fff" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="14">🛵</text>
              </g>

              {/* Home Customer Node */}
              <circle cx="380" cy="60" r="10" fill="var(--bg-secondary)" stroke="var(--card-border)" strokeWidth="2" />
              <text x="380" y="85" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">🏠 You</text>
            </svg>
          </div>

          {/* Progress Milestones Timeline */}
          <div style={styles.timeline}>
            <div style={getTimelineClass(0)}>
              <span style={styles.nodePoint}>✓</span>
              <span>Accepted</span>
            </div>
            <div style={getTimelineClass(1)}>
              <span style={styles.nodePoint}>{trackingProgress >= 1 ? '✓' : '2'}</span>
              <span>Preparing</span>
            </div>
            <div style={getTimelineClass(2)}>
              <span style={styles.nodePoint}>{trackingProgress >= 2 ? '✓' : '3'}</span>
              <span>Picked Up</span>
            </div>
            <div style={getTimelineClass(3)}>
              <span style={styles.nodePoint}>{trackingProgress >= 3 ? '✓' : '4'}</span>
              <span>Rider Location</span>
            </div>
            <div style={getTimelineClass(4)}>
              <span style={styles.nodePoint}>{trackingProgress >= 4 ? '✓' : '5'}</span>
              <span>Arrived</span>
            </div>
          </div>
        </section>
      )}

      {/* Past Orders History List */}
      <section style={styles.historySection}>
        <h2 style={styles.historyTitle}>Past Orders</h2>
        
        {pastOrders.length === 0 ? (
          <div style={styles.emptyState} className="glass-panel">
            <span style={styles.emptyIcon}>🍽️</span>
            <h3>No past orders yet</h3>
            <p>Explore restaurants and place your first order.</p>
            <button onClick={() => navigate('/restaurants')} style={styles.browseBtn} className="glow-btn">
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div style={styles.historyList}>
            {pastOrders.map(order => (
              <div key={order.id} style={styles.historyCard} className="glass-panel">
                <div style={styles.histHeader}>
                  <div>
                    <h3>{order.restaurantName}</h3>
                    <p style={styles.histDate}>Ordered on: {new Date(order.orderedAt).toLocaleDateString()}</p>
                  </div>
                  <div style={styles.histTotal}>
                    <span>Total Bill: <strong>₹{order.totalAmount}</strong></span>
                    <span style={styles.orderIdTag}>ID: {order.id}</span>
                  </div>
                </div>

                <div style={styles.histItems}>
                  {order.items.map((item, idx) => (
                    <span key={idx} style={styles.histItemTag}>
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>

                <div style={styles.histFooter}>
                  <span style={styles.statusDelivered}>✓ Delivered</span>
                  <button onClick={() => handleReorder(order)} style={styles.reorderBtn} className="glow-btn">
                    Reorder Items
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    height: '60vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '40px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700
  },
  activeSection: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px'
  },
  activeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  activeStatusTag: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    border: '1px solid rgba(34, 211, 238, 0.2)',
    color: 'var(--secondary)',
    fontSize: '11px',
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '0.5px'
  },
  activeRestName: {
    fontSize: '22px',
    fontWeight: 700,
    marginTop: '8px'
  },
  activeId: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '4px',
    display: 'block'
  },
  etaBox: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '12px 20px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const
  },
  etaText: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  etaTime: {
    fontSize: '24px',
    fontWeight: 800,
    color: 'var(--accent)'
  },
  mapContainer: {
    height: '140px',
    backgroundColor: 'rgba(5, 8, 22, 0.5)',
    borderRadius: '12px',
    border: '1px solid var(--card-border)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  mapSvg: {
    width: '100%',
    height: '100%'
  },
  timeline: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '2px solid var(--card-border)',
    paddingTop: '20px',
    marginTop: '10px'
  },
  timelineNode: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--text-muted)',
    flex: 1
  },
  activeTimelineNode: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--accent)',
    fontWeight: 600,
    flex: 1
  },
  nodePoint: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-secondary)',
    border: '2px solid var(--card-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px'
  },
  historySection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  historyTitle: {
    fontSize: '24px',
    fontWeight: 600
  },
  emptyState: {
    padding: '50px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px'
  },
  emptyIcon: {
    fontSize: '48px'
  },
  browseBtn: {
    marginTop: '10px',
    width: '100%',
    maxWidth: '240px'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  historyCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  histHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  histDate: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '4px'
  },
  histTotal: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    fontSize: '14px',
    gap: '4px'
  },
  orderIdTag: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  histItems: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  histItemTag: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--card-border)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  histFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--card-border)',
    paddingTop: '16px',
    marginTop: '4px'
  },
  statusDelivered: {
    fontSize: '13px',
    color: 'var(--success)',
    fontWeight: 600
  },
  reorderBtn: {
    padding: '8px 16px',
    fontSize: '13px'
  }
};
// Add activeTimelineNode specific node point overriding color logic inside context or styled variables:
// `.activeTimelineNode .nodePoint { background-color: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 0 8px var(--accent-glow); }`
