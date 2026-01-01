# Discord Events Database Setup

## Installation

1. Install the required dependency:
```bash
npm install better-sqlite3
```

2. The database will be automatically created at `events.db` in your project root when you start the server.

## How It Works

### Database Schema
- **Table**: `events`
- **Primary Key**: Discord event ID
- **Stores**: All event data including name, description, dates, status, location, and images
- **Indexes**: Optimized for fast queries on status and start time

### Automatic Sync
- Syncs with Discord API every **15 minutes** (configurable)
- Runs immediately on server start
- Updates existing events if they change
- Keeps historical data even after events complete

### API Endpoints

#### Get Events
```
GET /api/discord-events?filter={all|upcoming|past}
```
- `filter=all` - All events (default)
- `filter=upcoming` - Only upcoming events
- `filter=past` - Only past events

#### Manual Sync (Admin)
```
POST /api/sync-events
```
Manually trigger a sync with Discord

#### Sync Stats
```
GET /api/sync-stats
```
Get database statistics (total events, upcoming, past, last sync time)

## Benefits

✅ **No more rate limits** - Frontend reads from local database
✅ **Past events preserved** - Historical event data retained
✅ **Fast loading** - No waiting for Discord API
✅ **Automatic updates** - Background sync keeps data fresh
✅ **Offline capability** - Works even if Discord API is temporarily down

## Configuration

To change sync interval, modify `server.js`:
```javascript
startSyncSchedule(30); // Sync every 30 minutes instead of 15
```

## Database Location

The SQLite database file is created at:
```
/events.db
```

Add this to `.gitignore` if you don't want to commit the database:
```
events.db
```

## Frontend Usage

No changes needed! The frontend will automatically get events from the database.
You can now add filter support:

```typescript
// In events.tsx
const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

// Then fetch with filter
fetch(`/api/discord-events?filter=${filter}`)
```
