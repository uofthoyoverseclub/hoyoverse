import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/db/schema.js';
import { getAllEvents, getUpcomingEvents, getPastEvents, getSyncStats } from './src/db/queries.js';
import { startSyncSchedule, handleManualSync } from './src/jobs/syncEvents.js';

dotenv.config();

// Initialize database
initializeDatabase();

// Start automatic sync every 15 minutes
startSyncSchedule(15);

const app = express();

// Get all events from database
app.get('/api/discord-events', async (req, res) => {
  try {
    const filter = req.query.filter || 'all';
    let events;

    switch (filter) {
      case 'upcoming':
        events = getUpcomingEvents();
        break;
      case 'past':
        events = getPastEvents();
        break;
      default:
        events = getAllEvents();
    }

    res.json(events);
  } catch (error) {
    console.error('Error fetching events from database:', error);
    res.status(500).json({ error: 'Failed to fetch events from database' });
  }
});

// Manual sync endpoint (for admin use)
app.post('/api/sync-events', handleManualSync);

// Get sync statistics
app.get('/api/sync-stats', (req, res) => {
  try {
    const stats = getSyncStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching sync stats:', error);
    res.status(500).json({ error: 'Failed to fetch sync stats' });
  }
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
