import React from 'react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <section style={styles.heroSection} className="glass-panel">
        <h1 style={styles.heroTitle}>Inside Hungrify</h1>
        <p style={styles.heroText}>
          Hungrify is a premium food delivery platform combining elegant interface design, 
          real-time simulations, and role-based operations panels. It serves as a comprehensive 
          demonstration of robust software architecture and relational database structures.
        </p>
      </section>

      <section style={styles.detailsGrid}>
        <div style={styles.card} className="glass-panel">
          <h2 style={styles.sectionTitle}>The Project Team</h2>
          <div style={styles.authorList}>
            <div style={styles.authorItem}>
              <span style={styles.authorIcon}>👩‍💻</span>
              <div>
                <h3>Chhavi</h3>
                <p>Roll No. 21415002724</p>
                <p>B.Tech Computer Science & Engineering</p>
              </div>
            </div>
          </div>
          <div style={styles.institution}>
            <p><strong>Maharaja Surajmal Institute of Technology</strong></p>
            <p>Affiliated to Guru Gobind Singh Indraprastha University</p>
            <p>Janakpuri, New Delhi - 110058</p>
            <p>Batch of 2024 - 2028</p>
          </div>
        </div>

        <div style={styles.card} className="glass-panel">
          <h2 style={styles.sectionTitle}>Database & Architecture</h2>
          <p style={styles.cardText}>
            The system connects multiple real-world actors—Customers, Restaurant Owners, Delivery Partners, and 
            Administrators—into a single transactional database schema designed in Third Normal Form (3NF).
          </p>
          <div style={styles.specsList}>
            <div style={styles.specItem}>
              <span style={styles.specDot}>●</span>
              <span><strong>9 Normalized Tables</strong>: Users, Customers, Restaurants, Menu, Orders, Order_Items, Payments, Delivery_Agents, and Reviews.</span>
            </div>
            <div style={styles.specItem}>
              <span style={styles.specDot}>●</span>
              <span><strong>Stored Procedures</strong>: Simulated database logic for place-order queries, transaction confirmation, and delivery status updates.</span>
            </div>
            <div style={styles.specItem}>
              <span style={styles.specDot}>●</span>
              <span><strong>Integrity Constraints</strong>: Primary key, foreign key, not null check, and cascaded updates constraints.</span>
            </div>
          </div>

          <button onClick={() => navigate('/developer')} style={styles.hubBtn} className="glow-btn">
            🔑 Access Developer Portal
          </button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px',
    padding: '20px 0'
  },
  heroSection: {
    padding: '50px 30px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px'
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: 700,
    color: 'var(--text-primary)'
  },
  heroText: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '800px'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '30px'
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 600,
    borderBottom: '1px solid var(--card-border)',
    paddingBottom: '12px',
    color: 'var(--text-primary)'
  },
  authorList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  },
  authorItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  authorIcon: {
    fontSize: '32px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--card-border)'
  },
  divider: {
    border: 'none',
    borderBottom: '1px solid var(--card-border)'
  },
  institution: {
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid var(--card-border)',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    textAlign: 'center' as const
  },
  cardText: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  specsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  specItem: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: 'var(--text-secondary)'
  },
  specDot: {
    color: 'var(--accent)',
    fontSize: '10px',
    marginTop: '2px'
  },
  hubBtn: {
    alignSelf: 'flex-start',
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    marginTop: '10px'
  }
};
