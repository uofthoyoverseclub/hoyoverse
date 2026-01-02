import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use same database file as events in persistent data directory
const dbPath = path.join('/app/data', 'events.db');
const db = new Database(dbPath);

// Create albums table
function createAlbumsTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      photographer TEXT,
      google_drive_folder_url TEXT,
      cover_photo TEXT,
      photo_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.prepare(createTableSQL).run();
  console.log('✅ Albums table ready');
}

// Create photos table
function createPhotosTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_id INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      caption TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
    )
  `;
  
  db.prepare(createTableSQL).run();
  console.log('✅ Photos table ready');
}

// Create indexes for better query performance
function createIndexes() {
  db.prepare('CREATE INDEX IF NOT EXISTS idx_photos_album_id ON photos(album_id)').run();
  db.prepare('CREATE INDEX IF NOT EXISTS idx_albums_date ON albums(date DESC)').run();
  console.log('✅ Indexes created');
}

export function initializePhotoDatabase() {
  console.log('📸 Initializing photo database...');
  
  createAlbumsTable();
  createPhotosTable();
  createIndexes();
  
  console.log('✅ Photo database initialized successfully');
}

export { db };
