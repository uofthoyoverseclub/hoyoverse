import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database in persistent data directory
const dbPath = path.join('/app/data', 'events.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create events table
const createEventsTable = `
  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    scheduled_start_time TEXT NOT NULL,
    scheduled_end_time TEXT,
    status INTEGER NOT NULL,
    location TEXT,
    image TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    is_synced INTEGER DEFAULT 1,
    last_synced_at TEXT DEFAULT (datetime('now'))
  )
`;

// Create index for faster queries
const createIndexes = `
  CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
  CREATE INDEX IF NOT EXISTS idx_events_start_time ON events(scheduled_start_time);
  CREATE INDEX IF NOT EXISTS idx_events_synced ON events(last_synced_at);
`;

export function initializeDatabase() {
  try {
    db.exec(createEventsTable);
    db.exec(createIndexes);
    console.log('✅ Database initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

export function getDatabase() {
  return db;
}

export default db;
