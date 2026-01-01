import Database from 'better-sqlite3';

const db = new Database('events.db');

console.log('\n🗑️  Clearing photo database...\n');

// Get counts before deletion
const photoCount = db.prepare('SELECT COUNT(*) as count FROM photos').get().count;
const albumCount = db.prepare('SELECT COUNT(*) as count FROM albums').get().count;

console.log(`Current data:`);
console.log(`  Albums: ${albumCount}`);
console.log(`  Photos: ${photoCount}`);
console.log('');

// Ask for confirmation (just informative, will proceed)
console.log('Deleting all photos and albums...\n');

// Delete all photos first (due to foreign key constraint)
db.prepare('DELETE FROM photos').run();
console.log('✅ Deleted all photos');

// Delete all albums
db.prepare('DELETE FROM albums').run();
console.log('✅ Deleted all albums');

// Reset auto-increment counters
db.prepare("DELETE FROM sqlite_sequence WHERE name IN ('photos', 'albums')").run();
console.log('✅ Reset ID counters');

// Verify deletion
const newPhotoCount = db.prepare('SELECT COUNT(*) as count FROM photos').get().count;
const newAlbumCount = db.prepare('SELECT COUNT(*) as count FROM albums').get().count;

console.log('\n📊 Final counts:');
console.log(`  Albums: ${newAlbumCount}`);
console.log(`  Photos: ${newPhotoCount}`);

db.close();
console.log('\n🎉 Database cleared successfully!\n');
