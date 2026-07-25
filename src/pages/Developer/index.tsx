import React, { useState } from 'react';
import { DeveloperLayout } from '../../layouts/DeveloperLayout';
import { users } from '../../data/users';
import { restaurants } from '../../data/restaurants';

export const DeveloperPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // SQL Playground State
  const [selectedPreset, setSelectedPreset] = useState('browse_restaurants');
  const [customQuery, setCustomQuery] = useState('SELECT restaurant_id, name, cuisine_type, rating FROM Restaurants WHERE is_open = TRUE ORDER BY rating DESC;');
  const [queryOutput, setQueryOutput] = useState<any[] | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // Normalization Stepper State
  const [normStep, setNormStep] = useState<number>(0);

  // ER Diagram Glow Highlight State
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const presets = [
    {
      id: 'browse_restaurants',
      name: 'Browse Open Restaurants',
      sql: 'SELECT restaurant_id, name, cuisine_type, rating FROM Restaurants WHERE is_open = TRUE ORDER BY rating DESC;'
    },
    {
      id: 'order_details_join',
      name: 'Order Details with Customer & Restaurant (JOIN)',
      sql: 'SELECT o.order_id, u.name AS customer_name, r.name AS restaurant_name, o.status, o.total_amount FROM Orders o JOIN Customers c ON o.customer_id = c.customer_id JOIN Users u ON c.user_id = u.user_id JOIN Restaurants r ON o.restaurant_id = r.restaurant_id;'
    },
    {
      id: 'restaurant_sales',
      name: 'Total Revenue per Restaurant (Aggregate)',
      sql: 'SELECT r.name AS restaurant, COUNT(o.order_id) AS total_orders, SUM(o.total_amount) AS total_revenue FROM Restaurants r LEFT JOIN Orders o ON r.restaurant_id = o.restaurant_id GROUP BY r.restaurant_id, r.name ORDER BY total_revenue DESC;'
    },
    {
      id: 'agent_performance',
      name: 'Agent Performance Summary (JOIN & Group)',
      sql: 'SELECT u.name AS agent_name, COUNT(o.order_id) AS deliveries_done, SUM(o.total_amount) AS total_value_delivered FROM Delivery_Agents da JOIN Users u ON da.user_id = u.user_id JOIN Orders o ON da.agent_id = o.agent_id WHERE o.status = "delivered" GROUP BY da.agent_id, u.name;'
    }
  ];

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const p = presets.find(pr => pr.id === presetId);
    if (p) {
      setCustomQuery(p.sql);
    }
  };

  const handleRunQuery = () => {
    const start = performance.now();

    // Mock query execution based on selected query
    if (customQuery.includes('Restaurants')) {
      setQueryOutput(restaurants.map(r => ({ id: r.id, name: r.name, cuisine: r.cuisineType, rating: r.rating })));
    } else if (customQuery.includes('Users')) {
      setQueryOutput(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));
    } else if (customQuery.includes('total_revenue')) {
      setQueryOutput([
        { restaurant: 'Spice Villa', total_orders: 14, total_revenue: '₹5,320.00' },
        { restaurant: 'Burger Hub', total_orders: 12, total_revenue: '₹3,840.00' },
        { restaurant: 'Pizza Point', total_orders: 9, total_revenue: '₹4,150.00' },
        { restaurant: 'Biryani House', total_orders: 18, total_revenue: '₹6,420.00' }
      ]);
    } else {
      setQueryOutput([
        { order_id: 1, customer_name: 'Aarav Sharma', restaurant_name: 'Spice Villa', status: 'delivered', total_amount: '₹345.00' },
        { order_id: 2, customer_name: 'Priya Mehta', restaurant_name: 'Burger Hub', status: 'preparing', total_amount: '₹298.00' },
        { order_id: 3, customer_name: 'Aarav Sharma', restaurant_name: 'Burger Hub', status: 'placed', total_amount: '₹199.00' }
      ]);
    }

    const end = performance.now();
    setExecutionTime(Number((end - start).toFixed(2)));
  };

  const tablesSchema = [
    {
      name: 'Users',
      type: 'Core User Table',
      pk: 'user_id',
      columns: [
        { name: 'user_id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
        { name: 'name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
        { name: 'email', type: 'VARCHAR(150)', constraint: 'UNIQUE NOT NULL' },
        { name: 'password_hash', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
        { name: 'phone', type: 'VARCHAR(15)', constraint: 'NOT NULL' },
        { name: 'role', type: 'ENUM', constraint: "'customer','restaurant','agent','admin'" }
      ]
    },
    {
      name: 'Customers',
      type: 'Customer Attributes',
      pk: 'customer_id',
      fk: 'user_id -> Users.user_id',
      columns: [
        { name: 'customer_id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
        { name: 'user_id', type: 'INT', constraint: 'FOREIGN KEY (ON DELETE CASCADE)' },
        { name: 'address', type: 'TEXT', constraint: 'NULLABLE' },
        { name: 'loyalty_points', type: 'INT', constraint: 'DEFAULT 0' }
      ]
    },
    {
      name: 'Restaurants',
      type: 'Restaurant Outlets',
      pk: 'restaurant_id',
      fk: 'user_id -> Users.user_id',
      columns: [
        { name: 'restaurant_id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
        { name: 'user_id', type: 'INT', constraint: 'FOREIGN KEY' },
        { name: 'name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
        { name: 'cuisine_type', type: 'VARCHAR(50)', constraint: 'NULLABLE' },
        { name: 'rating', type: 'DECIMAL(2,1)', constraint: 'DEFAULT 0.0' },
        { name: 'is_open', type: 'BOOLEAN', constraint: 'DEFAULT TRUE' }
      ]
    },
    {
      name: 'Orders',
      type: 'Central Order Table',
      pk: 'order_id',
      fk: 'customer_id, restaurant_id, agent_id',
      columns: [
        { name: 'order_id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
        { name: 'customer_id', type: 'INT', constraint: 'FOREIGN KEY -> Customers' },
        { name: 'restaurant_id', type: 'INT', constraint: 'FOREIGN KEY -> Restaurants' },
        { name: 'agent_id', type: 'INT', constraint: 'FOREIGN KEY -> Delivery_Agents (NULLABLE)' },
        { name: 'status', type: 'ENUM', constraint: "'placed','confirmed','preparing','picked_up','delivered'" },
        { name: 'total_amount', type: 'DECIMAL(10,2)', constraint: 'NOT NULL' }
      ]
    }
  ];

  return (
    <DeveloperLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <h2>Project Overview</h2>
            <p style={styles.descText}>
              The Food Delivery Management System is an end-to-end relational database management system 
              (DBMS) project designed to simulate real-world food ordering, restaurant dispatch, and 
              delivery agent tracking operations.
            </p>
            <div style={styles.grid2}>
              <div style={styles.subCard}>
                <h3>Primary Objectives</h3>
                <ul style={styles.list}>
                  <li>Design a 3rd Normal Form (3NF) relational database schema.</li>
                  <li>Implement complex JOIN queries and aggregate calculations.</li>
                  <li>Simulate multi-role workflows for Customers, Restaurants, Riders, and Admins.</li>
                </ul>
              </div>
              <div style={styles.subCard}>
                <h3>System Architecture</h3>
                <ul style={styles.list}>
                  <li><strong>Frontend</strong>: HTML/CSS/TypeScript & React 19 SPA.</li>
                  <li><strong>Backend Logic</strong>: SQL Stored Procedures and Views.</li>
                  <li><strong>Database Engine</strong>: Relational MySQL / PostgreSQL.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Tab */}
      {activeTab === 'architecture' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <h2>Three-Tier Architecture & Stored Procedures</h2>
            <p style={styles.descText}>
              In this pure database project model, business logic is embedded into SQL Stored Procedures 
              (such as <code>PlaceOrder</code>) and dynamic Views (such as <code>v_customer_orders</code>).
            </p>

            <div style={styles.codeBlock} className="glass-panel">
              <pre>{`-- Stored Procedure: PlaceOrder
DELIMITER //
CREATE PROCEDURE PlaceOrder(
  IN p_customer_id INT,
  IN p_restaurant_id INT,
  IN p_address TEXT,
  IN p_total DECIMAL(10,2),
  IN p_method VARCHAR(10)
)
BEGIN
  DECLARE v_order_id INT;
  
  -- Create the order record
  INSERT INTO Orders 
  (customer_id, restaurant_id, status, total_amount, delivery_address) 
  VALUES
  (p_customer_id, p_restaurant_id, 'placed', p_total, p_address);
  
  SET v_order_id = LAST_INSERT_ID();
  
  -- Create pending payment record
  INSERT INTO Payments (order_id, amount, method, status) 
  VALUES (v_order_id, p_total, p_method, 'pending');
  
  SELECT v_order_id AS new_order_id;
END//
DELIMITER ;`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* ER Diagram Tab */}
      {activeTab === 'er_diagram' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.erHeader}>
              <h2>Entity Relationship Diagram (Crow's Foot Notation)</h2>
              <span style={styles.erTip}>Click any entity box to highlight key connections</span>
            </div>

            <div style={styles.erCanvas} className="glass-panel">
              <div 
                onClick={() => setSelectedEntity(selectedEntity === 'Users' ? null : 'Users')}
                style={{
                  ...styles.entityBox,
                  borderColor: selectedEntity === 'Users' ? 'var(--secondary)' : 'var(--card-border)',
                  boxShadow: selectedEntity === 'Users' ? '0 0 15px var(--secondary)' : 'none'
                }}
              >
                <h4>Users (Core)</h4>
                <span>PK: user_id</span>
                <span>email, password_hash, role</span>
              </div>

              <div style={styles.erConnector}>1 : 1 ───►</div>

              <div 
                onClick={() => setSelectedEntity(selectedEntity === 'Customers' ? null : 'Customers')}
                style={{
                  ...styles.entityBox,
                  borderColor: selectedEntity === 'Customers' ? 'var(--secondary)' : 'var(--card-border)',
                  boxShadow: selectedEntity === 'Customers' ? '0 0 15px var(--secondary)' : 'none'
                }}
              >
                <h4>Customers</h4>
                <span>PK: customer_id</span>
                <span>FK: user_id</span>
              </div>

              <div style={styles.erConnector}>1 : M ───►</div>

              <div 
                onClick={() => setSelectedEntity(selectedEntity === 'Orders' ? null : 'Orders')}
                style={{
                  ...styles.entityBox,
                  borderColor: selectedEntity === 'Orders' ? 'var(--accent)' : 'var(--card-border)',
                  boxShadow: selectedEntity === 'Orders' ? '0 0 15px var(--accent-glow)' : 'none'
                }}
              >
                <h4>Orders (Central)</h4>
                <span>PK: order_id</span>
                <span>FK: customer_id, restaurant_id, agent_id</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Database Explorer Tab */}
      {activeTab === 'database_explorer' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <h2>Database Explorer & Constraints</h2>
            <div style={styles.tablesGrid}>
              {tablesSchema.map(tbl => (
                <div key={tbl.name} style={styles.schemaCard} className="glass-panel">
                  <div style={styles.schemaHeader}>
                    <h3>{tbl.name}</h3>
                    <span style={styles.tableTypeBadge}>{tbl.type}</span>
                  </div>
                  {tbl.fk && <p style={styles.fkText}>FK: {tbl.fk}</p>}

                  <table style={styles.schemaTable}>
                    <thead>
                      <tr>
                        <th>Column</th>
                        <th>Type</th>
                        <th>Constraint</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tbl.columns.map(col => (
                        <tr key={col.name}>
                          <td><strong>{col.name}</strong></td>
                          <td style={{ color: '#22d3ee' }}>{col.type}</td>
                          <td style={{ color: '#94a3b8', fontSize: '12px' }}>{col.constraint}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SQL Playground Tab */}
      {activeTab === 'sql_playground' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.sqlHeader}>
              <h2>SQL Playground & Query Runner</h2>
              <select 
                value={selectedPreset} 
                onChange={e => handleSelectPreset(e.target.value)}
                style={styles.presetSelect}
              >
                {presets.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.queryEditorBox} className="glass-panel">
              <textarea
                value={customQuery}
                onChange={e => setCustomQuery(e.target.value)}
                style={styles.queryArea}
              />
              <button onClick={handleRunQuery} style={styles.runBtn} className="glow-btn">
                ▶ Run Query
              </button>
            </div>

            {queryOutput && (
              <div style={styles.outputBox}>
                <div style={styles.outputHeader}>
                  <span>Execution Output</span>
                  <span>Time: <strong>{executionTime} ms</strong> | Rows: <strong>{queryOutput.length}</strong></span>
                </div>
                <div style={styles.tableWrapper}>
                  <table style={styles.outputTable}>
                    <thead>
                      <tr>
                        {Object.keys(queryOutput[0] || {}).map(k => (
                          <th key={k}>{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryOutput.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).map((val: any, vIdx) => (
                            <td key={vIdx}>{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Normalization Tab */}
      {activeTab === 'normalization' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <h2>Data Lab: Normalization Stepper (UNF ➔ 3NF)</h2>
            <p style={styles.descText}>
              Watch how repeating groups and functional dependencies are progressively eliminated to reach 3rd Normal Form.
            </p>

            <div style={styles.stepperBar}>
              {['UNF (Raw Data)', '1NF (Atomic Values)', '2NF (No Partial Dep.)', '3NF (Production Ready)'].map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setNormStep(idx)}
                  style={normStep === idx ? styles.stepBtnActive : styles.stepBtn}
                >
                  {step}
                </button>
              ))}
            </div>

            <div style={styles.normContent} className="glass-panel">
              {normStep === 0 && (
                <div>
                  <h3>Unnormalized Form (UNF) - The Problem</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Single flat table mixing customer, restaurant, items list, and payments. High data redundancy and update anomalies.
                  </p>
                  <table style={styles.normTable}>
                    <thead>
                      <tr>
                        <th>Order_ID</th>
                        <th>Customer</th>
                        <th>Items (Repeating Group)</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Aarav</td>
                        <td>Butter Chicken, Naan, Lassi</td>
                        <td>₹345</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {normStep === 1 && (
                <div>
                  <h3>First Normal Form (1NF) - Atomic Values</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Rule: No repeating groups. Each cell holds a single atomic value.
                  </p>
                  <table style={styles.normTable}>
                    <thead>
                      <tr>
                        <th>Order_ID</th>
                        <th>Customer</th>
                        <th>Item_Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Aarav</td>
                        <td>Butter Chicken</td>
                        <td>1</td>
                        <td>₹220</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Aarav</td>
                        <td>Garlic Naan</td>
                        <td>2</td>
                        <td>₹45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {normStep === 2 && (
                <div>
                  <h3>Second Normal Form (2NF) - Split Composite Key Dependencies</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Rule: Must be in 1NF + no partial dependencies on composite keys. Split into separate Orders and Order_Items tables.
                  </p>
                </div>
              )}

              {normStep === 3 && (
                <div>
                  <h3>Third Normal Form (3NF) - Final Schema</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Rule: Must be in 2NF + no transitive dependencies. All non-key attributes depend only on the primary key.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Project Report Tab */}
      {activeTab === 'project_report' && (
        <div style={styles.tabContainer}>
          <div style={styles.card} className="glass-panel">
            <div style={styles.erHeader}>
              <h2>B.Tech Project Final Report</h2>
              <button 
                onClick={() => alert('Downloading PDF Project Report (Simulation)...')} 
                style={styles.downloadPdfBtn} 
                className="glow-btn"
              >
                📥 Download Report (PDF)
              </button>
            </div>
            <p style={styles.descText}>
              Submitted in partial fulfillment of the requirement for the degree of Bachelor of Technology 
              in Computer Science and Engineering by Chhavi (21415002724), 
              Maharaja Surajmal Institute of Technology.
            </p>
          </div>
        </div>
      )}
    </DeveloperLayout>
  );
};

const styles = {
  tabContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  descText: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  subCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  list: {
    paddingLeft: '20px',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: '1.6'
  },
  codeBlock: {
    backgroundColor: '#050816',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid var(--card-border)',
    color: '#22d3ee',
    fontFamily: 'monospace',
    fontSize: '14px',
    overflowX: 'auto' as const
  },
  erHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  erTip: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  erCanvas: {
    padding: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap' as const
  },
  entityBox: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '180px'
  },
  erConnector: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    fontWeight: 700
  },
  tablesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  schemaCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  schemaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tableTypeBadge: {
    fontSize: '11px',
    color: 'var(--secondary)',
    border: '1px solid rgba(34, 211, 238, 0.2)',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  fkText: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  schemaTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
    fontSize: '13px'
  },
  sqlHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  presetSelect: {
    padding: '8px 14px',
    borderRadius: '6px',
    border: '1px solid var(--card-border)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    color: 'var(--text-primary)',
    outline: 'none'
  },
  queryEditorBox: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px'
  },
  queryArea: {
    backgroundColor: '#050816',
    color: '#22d3ee',
    border: '1px solid var(--card-border)',
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'monospace',
    fontSize: '14px',
    height: '100px',
    outline: 'none',
    resize: 'none' as const
  },
  runBtn: {
    alignSelf: 'flex-end',
    padding: '10px 24px'
  },
  outputBox: {
    border: '1px solid var(--card-border)',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: 'rgba(255,255,255,0.01)'
  },
  outputHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginBottom: '14px'
  },
  tableWrapper: {
    overflowX: 'auto' as const
  },
  outputTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
    fontSize: '13px'
  },
  stepperBar: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const
  },
  stepBtn: {
    padding: '10px 16px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--card-border)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '14px'
  },
  stepBtnActive: {
    padding: '10px 16px',
    borderRadius: '8px',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    boxShadow: '0 0 10px var(--accent-glow)'
  },
  normContent: {
    padding: '30px',
    marginTop: '10px'
  },
  normTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const,
    marginTop: '16px',
    fontSize: '14px'
  },
  downloadPdfBtn: {
    padding: '10px 20px',
    fontSize: '14px'
  }
};
