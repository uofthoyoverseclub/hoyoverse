import Database from 'better-sqlite3';

const db = new Database('events.db');

console.log('\n🔍 Finding photos with non-standard URLs...\n');

// Get all photos that don't have the standard direct view format
const badUrls = db.prepare(`
  SELECT id, album_id, image_url 
  FROM photos 
  WHERE image_url NOT LIKE '%uc?export=view%'
  AND image_url NOT LIKE '%/file/d/%'
  AND image_url NOT LIKE '%=s220%'
  LIMIT 20
`).all();

if (badUrls.length === 0) {
  console.log('✅ All URLs are in standard format!');
} else {
  console.log(`Found ${badUrls.length} photos with unusual URLs:\n`);
  
  badUrls.forEach((photo, index) => {
    console.log(`${index + 1}. Photo ID ${photo.id} (Album ${photo.album_id}):`);
    console.log(`   ${photo.image_url}`);
    console.log('');
  });
  
  // Try to analyze the pattern
  const sample = badUrls[0].image_url;
  console.log('📋 Sample URL analysis:');
  console.log(`   Full URL: ${sample}`);
  console.log(`   Contains 'drive.google.com': ${sample.includes('drive.google.com')}`);
  console.log(`   Contains 'http': ${sample.startsWith('http')}`);
}

db.close();
