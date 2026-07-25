import React, { useState, useEffect } from 'react';
import { ordersApi } from '../../services/api/orders';
import { users as initialUsers, User } from '../../data/users';

export const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<{
    totalOrders: number;
    activeCustomers: number;
    totalRestaurants: number;
    deliveryPartners: number;
    revenue: number;
    averageRating: number;
    deliveryTime: number;
  } | null>(null);

  const [usersList, setUsersList] = useState<User[]>(initialUsers);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<'all' | 'customer' | 'restaurant' | 'delivery'>('all');

  useEffect(() => {
    ordersApi.getSystemAnalytics().then(res => setAnalytics(res));
  }, []);

  const handleRoleDelete = (id: number) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
  };

  const filteredUsers = selectedRoleFilter === 'all' 
    ? usersList 
    : usersList.filter(u => u.role === selectedRoleFilter);

  if (!analytics) return <p>Loading Admin metrics...</p>;

  return (
    <div style={styles.container}>
      {/* Analytics counter rows */}
      <section style={styles.statsRow}>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Platform Revenue</span>
          <span style={{ ...styles.statVal, color: 'var(--success)' }}>₹{analytics.revenue}</span>
          <p style={styles.statSub}>Total checkout amounts</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Active Customers</span>
          <span style={styles.statVal}>{analytics.activeCustomers}</span>
          <p style={styles.statSub}>120 registered today</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Partner Restaurants</span>
          <span style={styles.statVal}>{analytics.totalRestaurants} Outlet</span>
          <p style={styles.statSub}>Pure Veg: 8, Mix: 22</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Delivery Agents</span>
          <span style={{ ...styles.statVal, color: 'var(--secondary)' }}>{analytics.deliveryPartners} Rider</span>
          <p style={styles.statSub}>12 currently online</p>
        </div>
      </section>

      {/* User Management Panel */}
      <section style={styles.card} className="glass-panel">
        <div style={styles.cardHeader}>
          <h2>Platform User Management</h2>
          <div style={styles.filterRow}>
            <button 
              onClick={() => setSelectedRoleFilter('all')} 
              style={selectedRoleFilter === 'all' ? styles.filterBtnActive : styles.filterBtn}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedRoleFilter('customer')} 
              style={selectedRoleFilter === 'customer' ? styles.filterBtnActive : styles.filterBtn}
            >
              Customers
            </button>
            <button 
              onClick={() => setSelectedRoleFilter('restaurant')} 
              style={selectedRoleFilter === 'restaurant' ? styles.filterBtnActive : styles.filterBtn}
            >
              Restaurants
            </button>
            <button 
              onClick={() => setSelectedRoleFilter('delivery')} 
              style={selectedRoleFilter === 'delivery' ? styles.filterBtnActive : styles.filterBtn}
            >
              Riders
            </button>
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={styles.tableRow}>
                  <td style={styles.td}>#{user.id}</td>
                  <td style={styles.td}><strong>{user.name}</strong></td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phone}</td>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.roleBadge,
                        backgroundColor: user.role === 'admin' ? 'var(--accent)' : (user.role === 'restaurant' ? 'var(--secondary)' : 'rgba(255,255,255,0.03)')
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {user.role !== 'admin' && (
                      <button onClick={() => handleRoleDelete(user.id)} style={styles.deleteBtn}>
                        Remove Account
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
    color: 'var(--text-secondary)'
  },
  statVal: {
    fontSize: '28px',
    fontWeight: 800
  },
  statSub: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '16px',
    flexWrap: 'wrap' as const,
    gap: '12px'
  },
  filterRow: {
    display: 'flex',
    gap: '8px'
  },
  filterBtn: {
    padding: '6px 12px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '13px'
  },
  filterBtnActive: {
    padding: '6px 12px',
    borderRadius: '4px',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  tableWrapper: {
    overflowX: 'auto' as const
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
    fontSize: '14px'
  },
  tableHeaderRow: {
    borderBottom: '2px solid var(--card-border)'
  },
  th: {
    padding: '12px',
    color: 'var(--text-muted)',
    fontWeight: 600
  },
  tableRow: {
    borderBottom: '1px solid var(--card-border)',
    transition: 'background-color 0.2s ease'
  },
  td: {
    padding: '16px 12px'
  },
  roleBadge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '4px',
    border: '1px solid var(--card-border)'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    fontWeight: 600
  }
};
// Add CSS hover style for table row:
// `tableRow:hover { background-color: rgba(255,255,255,0.01); }`
