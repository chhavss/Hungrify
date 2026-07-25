import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Restaurant, restaurants as allRestaurants } from '../../data/restaurants';
import { MenuItem } from '../../data/menu';
import { restaurantsApi } from '../../services/api/restaurants';
import { ordersApi } from '../../services/api/orders';
import { Order } from '../../data/orders';

export const RestaurantDashboard: React.FC = () => {
  const { user } = useAuth();
  const restId = user?.restaurantId || 1; // default to first restaurant Spice Villa

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Menu manager edit states
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState(150);
  const [newDishVeg, setNewDishVeg] = useState(true);

  const fetchRestDetails = async () => {
    setLoading(true);
    const restDetails = await restaurantsApi.getById(restId);
    if (restDetails) setRestaurant(restDetails);

    const menuItems = await restaurantsApi.getMenu(restId);
    setMenu(menuItems);

    const activeOrders = await ordersApi.getRestaurantOrders(restId);
    setOrders(activeOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchRestDetails();
  }, [restId]);

  const handleToggleOpen = () => {
    if (!restaurant) return;
    setRestaurant(prev => prev ? { ...prev, isOpen: !prev.isOpen } : null);
  };

  const handleAcceptOrder = async (orderId: string) => {
    await ordersApi.updateStatus(orderId, 'preparing');
    fetchRestDetails();
  };

  const handleDispatchOrder = async (orderId: string) => {
    await ordersApi.updateStatus(orderId, 'picked_up');
    fetchRestDetails();
  };

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    const newItem: MenuItem = {
      id: Date.now(),
      restaurantId: restId,
      name: newDishName,
      description: 'Gourmet restaurant special freshly prepared by our chefs.',
      price: newDishPrice,
      category: 'Recommended',
      isAvailable: true,
      isVeg: newDishVeg
    };

    setMenu(prev => [...prev, newItem]);
    setNewDishName('');
    setNewDishPrice(150);
  };

  const handleDeleteMenuItem = (id: number) => {
    setMenu(prev => prev.filter(m => m.id !== id));
  };

  if (loading || !restaurant) {
    return <p>Loading restaurant dashboard data...</p>;
  }

  return (
    <div style={styles.container}>
      {/* Top row summaries */}
      <section style={styles.statsRow}>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Today's Revenue</span>
          <span style={{ ...styles.statVal, color: 'var(--success)' }}>₹8,450</span>
          <p style={styles.statSub}>+12% increase from yesterday</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Total Orders</span>
          <span style={styles.statVal}>{orders.length + 18}</span>
          <p style={styles.statSub}>18 completed deliveries</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Pending Orders</span>
          <span style={{ ...styles.statVal, color: 'var(--accent)' }}>
            {orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}
          </span>
          <p style={styles.statSub}>Need cooking dispatch</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Outlet Status</span>
          <div style={styles.statusToggleRow}>
            <span style={{ fontWeight: 700, color: restaurant.isOpen ? 'var(--success)' : 'var(--danger)' }}>
              {restaurant.isOpen ? 'OPEN' : 'CLOSED'}
            </span>
            <button onClick={handleToggleOpen} style={restaurant.isOpen ? styles.toggleBtnActive : styles.toggleBtn}>
              Toggle
            </button>
          </div>
        </div>
      </section>

      {/* Orders & Menu Layout */}
      <div style={styles.layoutGrid}>
        {/* Incoming Orders Manager */}
        <section style={styles.card} className="glass-panel">
          <h2>Active Incoming Orders Queue</h2>
          {orders.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🍳</span>
              <p>No active orders waiting in the queue.</p>
            </div>
          ) : (
            <div style={styles.ordersList}>
              {orders.map(order => (
                <div key={order.id} style={styles.orderItem} className="glass-panel">
                  <div style={styles.orderMeta}>
                    <h4>Order ID: #{order.id}</h4>
                    <p style={styles.orderAddress}>Deliver to: {order.deliveryAddress}</p>
                    <div style={styles.orderItemsList}>
                      {order.items.map((item, idx) => (
                        <span key={idx} style={styles.itemBadge}>{item.name} x{item.quantity}</span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.orderActions}>
                    {order.status === 'placed' && (
                      <button onClick={() => handleAcceptOrder(order.id)} style={styles.actionBtnAccept}>
                        Accept & Cook
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button onClick={() => handleDispatchOrder(order.id)} style={styles.actionBtnDispatch}>
                        Dispatch Partner
                      </button>
                    )}
                    {order.status === 'picked_up' && (
                      <span style={styles.statusPickedTag}>🛵 Out with Rider</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Menu Manager */}
        <section style={styles.card} className="glass-panel">
          <h2>Menu Item Manager</h2>
          
          <form onSubmit={handleAddMenuItem} style={styles.menuForm}>
            <input 
              type="text" 
              placeholder="Dish Name" 
              value={newDishName} 
              onChange={e => setNewDishName(e.target.value)} 
              required
              style={styles.input}
            />
            <div style={styles.formRow}>
              <input 
                type="number" 
                placeholder="Price" 
                value={newDishPrice} 
                onChange={e => setNewDishPrice(Number(e.target.value))} 
                required
                style={{ ...styles.input, flex: 1 }}
              />
              <select 
                value={newDishVeg ? 'veg' : 'nonveg'} 
                onChange={e => setNewDishVeg(e.target.value === 'veg')}
                style={styles.select}
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non Veg</option>
              </select>
            </div>
            <button type="submit" style={styles.addBtn} className="glow-btn">Add New Dish</button>
          </form>

          <div style={styles.menuList}>
            {menu.map(item => (
              <div key={item.id} style={styles.menuRow}>
                <div>
                  <span style={{ color: item.isVeg ? '#10B981' : '#EF4444', marginRight: '6px' }}>
                    {item.isVeg ? '🟢' : '🔴'}
                  </span>
                  <strong>{item.name}</strong>
                  <span style={styles.menuPrice}> - ₹{item.price}</span>
                </div>
                <button onClick={() => handleDeleteMenuItem(item.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px'
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px'
  },
  statCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: 500
  },
  statVal: {
    fontSize: '28px',
    fontWeight: 800
  },
  statSub: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  statusToggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '6px'
  },
  toggleBtn: {
    padding: '6px 12px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    cursor: 'pointer'
  },
  toggleBtnActive: {
    padding: '6px 12px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: '1px solid var(--success)',
    color: 'var(--success)',
    cursor: 'pointer'
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '30px',
    alignItems: 'start'
  },
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  emptyState: {
    padding: '40px',
    textAlign: 'center' as const,
    color: 'var(--text-muted)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px'
  },
  emptyIcon: {
    fontSize: '36px'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  orderItem: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px'
  },
  orderMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    flex: 1
  },
  orderAddress: {
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  orderItemsList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    marginTop: '4px'
  },
  itemBadge: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--card-border)',
    borderRadius: '4px',
    fontSize: '11px',
    padding: '2px 6px'
  },
  orderActions: {
    display: 'flex',
    alignItems: 'center'
  },
  actionBtnAccept: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  actionBtnDispatch: {
    backgroundColor: 'var(--success)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  statusPickedTag: {
    fontSize: '13px',
    color: 'var(--secondary)',
    fontWeight: 600
  },
  menuForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '20px'
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '14px'
  },
  formRow: {
    display: 'flex',
    gap: '12px'
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    outline: 'none',
    cursor: 'pointer'
  },
  addBtn: {
    width: '100%',
    padding: '10px'
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    maxHeight: '300px',
    overflowY: 'auto' as const
  },
  menuRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    borderBottom: '1px solid var(--card-border)',
    fontSize: '14px'
  },
  menuPrice: {
    color: 'var(--secondary)',
    fontWeight: 600
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    fontSize: '12px'
  }
};
