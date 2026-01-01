import Database from 'better-sqlite3';

const db = new Database('events.db');

console.log('\n🔧 Fixing photo URLs in database...\n');

// Get all photos with thumbnail URLs
const thumbnailPhotos = db.prepare(`
  SELECT id, image_url 
  FROM photos 
  WHERE image_url LIKE '%thumbnail?id=%'
`).all();

console.log(`Found ${thumbnailPhotos.length} photos with thumbnail URLs`);

if (thumbnailPhotos.length === 0) {
  console.log('✅ No photos need fixing!');
  db.close();
  process.exit(0);
}

// Prepare update statement
const updateStmt = db.prepare('UPDATE photos SET image_url = ? WHERE id = ?');

// Convert thumbnail URLs to direct view URLs
const transaction = db.transaction(() => {
  let converted = 0;
  
  for (const photo of thumbnailPhotos) {
    const url = photo.image_url;
    
    // Extract file ID from thumbnail URL
    // Format: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
    const match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    
    if (match) {
      const fileId = match[1];
      const newUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      
      updateStmt.run(newUrl, photo.id);
      converted++;
      
      if (converted <= 5) {
        console.log(`\n  Photo ID ${photo.id}:`);
        console.log(`    Old: ${url}`);
        console.log(`    New: ${newUrl}`);
      }
    }
  }
  
  return converted;
});

const convertedCount = transaction();

console.log(`\n✅ Successfully converted ${convertedCount} photo URLs!`);

// Also fix cover photos in albums
const thumbnailAlbums = db.prepare(`
  SELECT id, title, cover_photo 
  FROM albums 
  WHERE cover_photo LIKE '%thumbnail?id=%'
`).all();

if (thumbnailAlbums.length > 0) {
  console.log(`\n🔧 Fixing ${thumbnailAlbums.length} album cover photos...`);
  
  const updateAlbumStmt = db.prepare('UPDATE albums SET cover_photo = ? WHERE id = ?');
  
  const albumTransaction = db.transaction(() => {
    let converted = 0;
    
    for (const album of thumbnailAlbums) {
      const url = album.cover_photo;
      const match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      
      if (match) {
        const fileId = match[1];
        const newUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        
        updateAlbumStmt.run(newUrl, album.id);
        converted++;
        
        console.log(`  ✓ Album: ${album.title}`);
      }
    }
    
    return converted;
  });
  
  const albumsConverted = albumTransaction();
  console.log(`✅ Successfully converted ${albumsConverted} album cover photos!`);
}

db.close();
console.log('\n🎉 Database migration complete!\n');
