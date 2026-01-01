import db from './schema.js';

// Insert or update event
export function upsertEvent(event) {
  const stmt = db.prepare(`
    INSERT INTO events (
      id, name, description, scheduled_start_time, 
      scheduled_end_time, status, location, image, 
      updated_at, last_synced_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      scheduled_start_time = excluded.scheduled_start_time,
      scheduled_end_time = excluded.scheduled_end_time,
      status = excluded.status,
      location = excluded.location,
      image = excluded.image,
      updated_at = datetime('now'),
      last_synced_at = datetime('now')
  `);

  return stmt.run(
    event.id,
    event.name,
    event.description || null,
    event.scheduled_start_time,
    event.scheduled_end_time || null,
    event.status,
    event.entity_metadata?.location || null,
    event.image || null
  );
}

// Get all events
export function getAllEvents() {
  const stmt = db.prepare(`
    SELECT * FROM events 
    ORDER BY scheduled_start_time DESC
  `);
  return stmt.all();
}

// Get upcoming events
export function getUpcomingEvents() {
  const stmt = db.prepare(`
    SELECT * FROM events 
    WHERE status = 1 OR datetime(scheduled_start_time) > datetime('now')
    ORDER BY scheduled_start_time ASC
  `);
  return stmt.all();
}

// Get past events
export function getPastEvents() {
  const stmt = db.prepare(`
    SELECT * FROM events 
    WHERE status != 1 AND datetime(scheduled_start_time) <= datetime('now')
    ORDER BY scheduled_start_time DESC
  `);
  return stmt.all();
}

// Get event by ID
export function getEventById(id) {
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  return stmt.get(id);
}

// Delete old events (optional - for cleanup)
export function deleteOldEvents(daysOld = 90) {
  const stmt = db.prepare(`
    DELETE FROM events 
    WHERE datetime(scheduled_start_time) < datetime('now', '-' || ? || ' days')
    AND status != 1
  `);
  return stmt.run(daysOld);
}

// Bulk upsert events
export function upsertEvents(events) {
  const transaction = db.transaction((eventsArray) => {
    for (const event of eventsArray) {
      upsertEvent(event);
    }
  });

  return transaction(events);
}

// Get sync statistics
export function getSyncStats() {
  const stats = db.prepare(`
    SELECT 
      COUNT(*) as total_events,
      SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as upcoming_count,
      SUM(CASE WHEN status != 1 THEN 1 ELSE 0 END) as past_count,
      MAX(last_synced_at) as last_sync
    FROM events
  `).get();
  
  return stats;
}
