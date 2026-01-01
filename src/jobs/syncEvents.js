import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { upsertEvents, getSyncStats } from '../db/queries.js';

dotenv.config();

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function syncDiscordEvents() {
  console.log('🔄 Starting Discord event sync...');
  
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/scheduled-events`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status} ${response.statusText}`);
    }

    const events = await response.json();
    
    if (!Array.isArray(events)) {
      console.warn('⚠️ Unexpected response format from Discord API');
      return { success: false, synced: 0 };
    }

    // Upsert all events to database
    upsertEvents(events);
    
    const stats = getSyncStats();
    console.log('✅ Sync completed successfully');
    console.log(`📊 Stats: ${stats.total_events} total, ${stats.upcoming_count} upcoming, ${stats.past_count} past`);
    
    return { 
      success: true, 
      synced: events.length,
      stats 
    };
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    return { 
      success: false, 
      error: error.message,
      synced: 0 
    };
  }
}

// Run sync on a schedule (every 15 minutes)
export function startSyncSchedule(intervalMinutes = 15) {
  console.log(`⏰ Starting sync schedule: every ${intervalMinutes} minutes`);
  
  // Run immediately on start
  syncDiscordEvents();
  
  // Then run on interval
  setInterval(() => {
    syncDiscordEvents();
  }, intervalMinutes * 60 * 1000);
}

// Manual sync endpoint handler
export async function handleManualSync(req, res) {
  const result = await syncDiscordEvents();
  
  if (result.success) {
    res.json({
      success: true,
      message: `Synced ${result.synced} events`,
      stats: result.stats
    });
  } else {
    res.status(500).json({
      success: false,
      error: result.error
    });
  }
}
