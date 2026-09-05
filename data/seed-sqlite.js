const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(process.cwd(), 'dev.db');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE merchants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE customers (
    id TEXT PRIMARY KEY,
    merchant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    total_spend INTEGER NOT NULL,
    successful_payments INTEGER NOT NULL,
    failed_payments INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES merchants(id)
  );

  CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    merchant_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    failure_reason TEXT,
    retry_count INTEGER DEFAULT 0,
    recovery_score REAL,
    recovery_status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES merchants(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE recovery_actions (
    id TEXT PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    action_type TEXT NOT NULL,
    reason TEXT NOT NULL,
    expected_recovery INTEGER NOT NULL,
    confidence REAL NOT NULL,
    status TEXT NOT NULL,
    approved_at DATETIME,
    executed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
  );

  CREATE TABLE audit_events (
    id TEXT PRIMARY KEY,
    transaction_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    actor TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
  );

  CREATE TABLE recovery_rules (
    id TEXT PRIMARY KEY,
    merchant_id TEXT NOT NULL,
    max_attempts INTEGER NOT NULL,
    min_amount INTEGER NOT NULL,
    max_discount INTEGER NOT NULL,
    cooldown_hours INTEGER NOT NULL,
    require_approval BOOLEAN NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES merchants(id)
  );
`);

// Insert Demo Merchant
const merchantId = 'merchant-123';
db.prepare('INSERT INTO merchants (id, name, email) VALUES (?, ?, ?)').run(merchantId, 'Demo Merchant', 'demo@merchant.com');
db.prepare('INSERT INTO recovery_rules (id, merchant_id, max_attempts, min_amount, max_discount, cooldown_hours, require_approval) VALUES (?, ?, ?, ?, ?, ?, ?)').run('rule-1', merchantId, 2, 100, 10, 24, 1);

// Insert Customers
const insertCustomer = db.prepare('INSERT INTO customers (id, merchant_id, name, email, phone, total_spend, successful_payments, failed_payments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
const customers = [];
for (let i = 0; i < 30; i++) {
  const id = `cust-${i}`;
  customers.push(id);
  insertCustomer.run(id, merchantId, `Customer ${i}`, `customer${i}@example.com`, `+15550000${i.toString().padStart(2, '0')}`, (10 + i) * 1000, 2 + (i % 5), i % 3);
}

// Insert Transactions
const insertTx = db.prepare('INSERT INTO transactions (id, merchant_id, customer_id, amount, currency, status, failure_reason, retry_count, recovery_score, recovery_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
const failureReasons = ['insufficient funds', 'expired card', 'bank/network issue', 'authentication failure', 'temporary payment degradation', 'repeated failure'];

let amountCounter = 2000;
for (let i = 0; i < 100; i++) {
  const isRecoverable = i % 3 === 0;
  insertTx.run(
    `tx-${i}`,
    merchantId,
    customers[i % customers.length],
    amountCounter + (i * 100),
    'INR',
    'failed',
    failureReasons[i % failureReasons.length],
    isRecoverable ? 0 : 2,
    isRecoverable ? 0.8 + (i % 10) * 0.01 : 0.2 + (i % 10) * 0.01,
    'pending'
  );
}

console.log('Database seeded with better-sqlite3 successfully!');
