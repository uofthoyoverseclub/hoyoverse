import Database from 'better-sqlite3';

const db = new Database('events.db');

console.log('\n🔍 Checking album cover photos...\n');

const albums = db.prepare('SELECT id, title, cover_photo FROM albums').all();

console.log(`Found ${albums.length} albums:\n`);

albums.forEach(album => {
  console.log(`Album ID ${album.id}: ${album.title}`);
  console.log(`  Cover Photo: ${album.cover_photo || 'None'}`);
  
  if (album.cover_photo) {
    // Check if it's a valid Google Drive URL
    const isGoogleDrive = album.cover_photo.includes('drive.google.com');
    const isCorrectFormat = album.cover_photo.includes('uc?export=view');
    const isThumbnail = album.cover_photo.includes('thumbnail?');
    
    console.log(`  Type: ${isGoogleDrive ? 'Google Drive' : 'Other'}`);
    if (isGoogleDrive) {
      console.log(`  Format: ${isCorrectFormat ? '✅ Direct View' : isThumbnail ? '❌ Thumbnail' : '⚠️  Other'}`);
    }
  }
  console.log('');
});

db.close();
