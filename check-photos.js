import Database from 'better-sqlite3';

const db = new Database('events.db');

console.log('\n📸 Checking Photos Database...\n');

// Get all photos with their URLs
const photos = db.prepare('SELECT id, album_id, image_url, caption FROM photos ORDER BY id').all();

if (photos.length === 0) {
  console.log('No photos found in database.');
} else {
  console.log(`Found ${photos.length} photos:\n`);
  
  photos.forEach((photo, index) => {
    console.log(`Photo #${index + 1}:`);
    console.log(`  ID: ${photo.id}`);
    console.log(`  Album ID: ${photo.album_id}`);
    console.log(`  URL: ${photo.image_url}`);
    if (photo.caption) console.log(`  Caption: ${photo.caption}`);
    console.log('');
  });
  
  // Analyze URL patterns
  const patterns = {
    directView: photos.filter(p => p.image_url?.includes('uc?export=view')).length,
    fileD: photos.filter(p => p.image_url?.includes('/file/d/')).length,
    thumbnailSize: photos.filter(p => p.image_url?.includes('=s220')).length,
    other: 0
  };
  
  patterns.other = photos.length - patterns.directView - patterns.fileD - patterns.thumbnailSize;
  
  console.log('\n📊 URL Pattern Analysis:');
  console.log(`  Direct view URLs (uc?export=view): ${patterns.directView}`);
  console.log(`  File/d/ URLs: ${patterns.fileD}`);
  console.log(`  Thumbnail URLs (=s220): ${patterns.thumbnailSize}`);
  console.log(`  Other formats: ${patterns.other}`);
}

// Get albums info
const albums = db.prepare('SELECT id, title, google_drive_folder_url, photo_count FROM albums').all();

console.log(`\n📁 Albums (${albums.length}):\n`);
albums.forEach(album => {
  console.log(`  Album ID ${album.id}: ${album.title}`);
  console.log(`    Folder URL: ${album.google_drive_folder_url || 'None'}`);
  console.log(`    Photo Count: ${album.photo_count}`);
  console.log('');
});

db.close();
