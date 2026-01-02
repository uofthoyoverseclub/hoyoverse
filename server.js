import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { initializeDatabase } from './src/db/schema.js';
import { getAllEvents, getUpcomingEvents, getPastEvents, getSyncStats } from './src/db/queries.js';
import { startSyncSchedule, handleManualSync } from './src/jobs/syncEvents.js';
import { initializePhotoDatabase } from './src/db/photoSchema.js';
import { 
  createAlbum, 
  getAllAlbums, 
  getAlbumById, 
  bulkAddPhotos, 
  getAlbumPhotos,
  setCoverPhoto
} from './src/db/photoQueries.js';
import { getPublicFolderFiles, extractFolderId } from './src/utils/googleDrive.js';
import session from 'express-session';
import { DISCORD_WHITELIST } from './src/auth/whitelist.js';
import { requireAuth } from './src/auth/requireAuth.js';

dotenv.config();

const CLIENT_APP_URL = process.env.CLIENT_APP_URL || 'http://localhost:5173';

// Initialize databases
initializeDatabase();
initializePhotoDatabase();

// Start automatic sync every 15 minutes
startSyncSchedule(15);

const app = express();
app.use(express.json());


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

// ===== PHOTO ALBUM ENDPOINTS =====

// Get all albums
app.get('/api/albums', (req, res) => {
  try {
    const albums = getAllAlbums();
    res.json(albums.map(album => ({
      ...album,
      cover_image: album.cover_photo || '/logo.png'
    })));
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});

// Get album by ID with photos
app.get('/api/albums/:id', (req, res) => {
  try {
    const albumId = parseInt(req.params.id);
    const album = getAlbumById(albumId);
    
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    const photos = getAlbumPhotos(albumId);
    
    res.json({
      ...album,
      photos
    });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
});

// Create new album
app.post('/api/albums', async (req, res) => {
  try {
    const { title, description, date, photographer, coverPhoto, googleDriveFolderUrl } = req.body;
    
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Use the cover photo URL as provided (should already be in correct format)
    const albumId = createAlbum(
      title, 
      description, 
      date, 
      photographer || null,
      googleDriveFolderUrl || null,
      coverPhoto || null
    );
    
    res.json({ id: albumId, message: 'Album created successfully' });
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ error: 'Failed to create album' });
  }
});

// Add photos to album (bulk or individual)
app.post('/api/albums/:id/photos', async (req, res) => {
  try {
    const albumId = parseInt(req.params.id);
    const { photos } = req.body;
    
    if (!photos || !Array.isArray(photos)) {
      return res.status(400).json({ error: 'Photos array is required' });
    }
    
    bulkAddPhotos(albumId, photos);
    
    // Set first photo as cover if not already set
    const album = getAlbumById(albumId);
    if (!album.cover_photo && photos.length > 0) {
      // Use the first photo URL as provided (should already be in correct format)
      setCoverPhoto(albumId, photos[0].imageUrl);
    }
    
    res.json({ message: 'Photos added successfully' });
  } catch (error) {
    console.error('Error adding photos:', error);
    res.status(500).json({ error: 'Failed to add photos' });
  }
});

// Fetch images from Google Drive folder
app.post('/api/albums/fetch-drive-folder', async (req, res) => {
  try {
    const { folderUrl } = req.body;
    
    if (!folderUrl) {
      return res.status(400).json({ error: 'Folder URL is required' });
    }
    
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Google Drive API key not configured. Please add GOOGLE_DRIVE_API_KEY to your .env file.' 
      });
    }
    
    const folderId = extractFolderId(folderUrl);
    
    if (!folderId) {
      return res.status(400).json({ error: 'Invalid Google Drive folder URL' });
    }
    
    const files = await getPublicFolderFiles(folderId, apiKey);
    
    res.json({
      files,
      count: files.length
    });
  } catch (error) {
    console.error('Error fetching Drive folder:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch folder images' 
    });
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // set true in production with HTTPS
  }
}));

app.get('/api/auth/discord', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify'
  });

  res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
});

app.get('/api/auth/discord/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) return res.sendStatus(400);

  try {
    // Exchange code for token
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI
      })
    });

    const token = await tokenRes.json();

    // Fetch user
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${token.access_token}` }
    });

    const user = await userRes.json();

    // Whitelist check
    if (!DISCORD_WHITELIST.has(user.id)) {
      return res.status(403).send('Not authorized');
    }

    // Save session
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect(`${CLIENT_APP_URL}/photos_admin`);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/api/me', (req, res) => {
  res.json(req.session.user || null);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
