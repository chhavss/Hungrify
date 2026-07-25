import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const DeliveryDashboard: React.FC = () => {
  const { user } = useAuth();

  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState<{
    id: string;
    restName: string;
    restAddress: string;
    custAddress: string;
    status: 'assigned' | 'accepted' | 'picked_up';
  } | null>({
    id: 'ord104',
    restName: 'Burger Hub',
    restAddress: '9 FC Road, Pune',
    custAddress: '12 MG Road, Bangalore',
    status: 'assigned'
  });

  const [earnings, setEarnings] = useState(650);
  const [totalJobs, setTotalJobs] = useState(12);

  const handleAcceptJob = () => {
    if (!activeJob) return;
    setActiveJob(prev => prev ? { ...prev, status: 'accepted' } : null);
  };

  const handlePickJob = () => {
    if (!activeJob) return;
    setActiveJob(prev => prev ? { ...prev, status: 'picked_up' } : null);
  };

  const handleDeliverJob = () => {
    if (!activeJob) return;
    setEarnings(prev => prev + 60); // Earn ₹60 per delivery
    setTotalJobs(prev => prev + 1);
    setActiveJob(null);
    alert('Delivery completed successfully! Earning credited.');
  };

  return (
    <div style={styles.container}>
      {/* Top summary row */}
      <section style={styles.statsRow}>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Today's Earnings</span>
          <span style={{ ...styles.statVal, color: 'var(--success)' }}>₹{earnings}</span>
          <p style={styles.statSub}>₹60 base fee per order</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Total Deliveries</span>
          <span style={styles.statVal}>{totalJobs} Done</span>
          <p style={styles.statSub}>No cancellations today</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Agent Rating</span>
          <span style={{ ...styles.statVal, color: '#F59E0B' }}>★ 4.9</span>
          <p style={styles.statSub}>Based on 54 customer reviews</p>
        </div>
        <div style={styles.statCard} className="glass-panel">
          <span style={styles.statLabel}>Rider Status</span>
          <div style={styles.statusToggleRow}>
            <span style={{ fontWeight: 700, color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
            <button onClick={() => setIsOnline(!isOnline)} style={isOnline ? styles.toggleBtnActive : styles.toggleBtn}>
              Toggle
            </button>
          </div>
        </div>
      </section>

      {/* Assigned Delivery & Map simulator layout */}
      <div style={styles.layoutGrid}>
        {/* Active Job card */}
        <section style={styles.card} className="glass-panel">
          <h2>Assigned Deliveries</h2>
          {!isOnline ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📴</span>
              <p>You are currently offline. Switch status online to receive delivery requests.</p>
            </div>
          ) : !activeJob ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🛵</span>
              <p>No active delivery requests assigned at the moment. Waiting for restaurants...</p>
            </div>
          ) : (
            <div style={styles.jobBox}>
              <div style={styles.jobHeader}>
                <span style={styles.jobId}>Job Request ID: #{activeJob.id}</span>
                <span style={styles.jobStatusTag}>{activeJob.status.toUpperCase()}</span>
              </div>

              <div style={styles.addressBlock}>
                <div style={styles.addressRow}>
                  <span style={styles.dot}>🟢</span>
                  <div>
                    <strong>Pickup Restaurant: {activeJob.restName}</strong>
                    <p style={styles.addrText}>{activeJob.restAddress}</p>
                  </div>
                </div>
                <div style={styles.verticalLine} />
                <div style={styles.addressRow}>
                  <span style={styles.dot}>🔴</span>
                  <div>
                    <strong>Drop Location: Customer Home</strong>
                    <p style={styles.addrText}>{activeJob.custAddress}</p>
                  </div>
                </div>
              </div>

              <div style={styles.jobActions}>
                {activeJob.status === 'assigned' && (
                  <button onClick={handleAcceptJob} style={styles.acceptBtn} className="glow-btn">
                    Accept Delivery Request
                  </button>
                )}
                {activeJob.status === 'accepted' && (
                  <button onClick={handlePickJob} style={styles.pickupBtn}>
                    Confirm Restaurant Pickup
                  </button>
                )}
                {activeJob.status === 'picked_up' && (
                  <button onClick={handleDeliverJob} style={styles.deliverBtn}>
                    Confirm Delivery Completed
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Route Map simulation */}
        <section style={styles.card} className="glass-panel">
          <h2>Rider Route Navigator</h2>
          {activeJob ? (
            <div style={styles.mapContainer}>
              <svg style={styles.mapSvg} viewBox="0 0 300 200">
                <path 
                  d="M 40,40 H 260 V 160 H 40 Z" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.06)" 
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                
                {/* Simulated Rider Marker */}
                <circle 
                  cx={activeJob.status === 'assigned' ? 40 : (activeJob.status === 'accepted' ? 260 : 150)} 
                  cy={activeJob.status === 'assigned' ? 40 : (activeJob.status === 'accepted' ? 40 : 160)} 
                  r="10" 
                  fill="var(--accent)" 
                  stroke="#fff" 
                  strokeWidth="2"
                />
                <text 
                  x={activeJob.status === 'assigned' ? 40 : (activeJob.status === 'accepted' ? 260 : 150)} 
                  y={activeJob.status === 'assigned' ? 45 : (activeJob.status === 'accepted' ? 45 : 165)} 
                  textAnchor="middle" 
                  fontSize="10"
                >
                  🛵
                </text>

                {/* Nodes */}
                <circle cx="40" cy="40" r="6" fill="var(--danger)" />
                <text x="40" y="25" textAnchor="middle" fill="var(--text-secondary)" fontSize="8">Restaurant</text>

                <circle cx="260" cy="160" r="6" fill="var(--success)" />
                <text x="260" y="180" textAnchor="middle" fill="var(--text-secondary)" fontSize="8">Delivery Drop</text>
              </svg>
              <p style={styles.mapTip}>Rider GPS Simulator routes automatically between points.</p>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p>Navigator offline. No active route loading.</p>
            </div>
          )}
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
  jobBox: {
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '12px'
  },
  jobId: {
    fontSize: '14px',
    fontWeight: 600
  },
  jobStatusTag: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    color: 'var(--accent)',
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '4px'
  },
  addressBlock: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  addressRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  dot: {
    fontSize: '12px',
    marginTop: '2px'
  },
  addrText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '2px'
  },
  verticalLine: {
    width: '1px',
    height: '24px',
    borderLeft: '1px dashed var(--card-border)',
    marginLeft: '6px',
    margin: '4px 6px'
  },
  jobActions: {
    marginTop: '10px'
  },
  acceptBtn: {
    width: '100%',
    padding: '12px'
  },
  pickupBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'var(--success)',
    color: '#fff',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer'
  },
  deliverBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'var(--secondary)',
    color: '#fff',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer'
  },
  mapContainer: {
    backgroundColor: 'rgba(5, 8, 22, 0.5)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  mapSvg: {
    width: '100%',
    height: '160px'
  },
  mapTip: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textAlign: 'center' as const
  }
};
