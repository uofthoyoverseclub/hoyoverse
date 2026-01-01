import { db } from './photoSchema.js';
import { convertGoogleDriveUrl } from '../utils/googleDrive.js';

// Album operations
export function createAlbum(title, description, date, photographer, googleDriveFolderUrl = null, coverPhoto = null) {
  const stmt = db.prepare(`
    INSERT INTO albums (title, description, date, photographer, google_drive_folder_url, cover_photo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  // Normalize cover photo URL if it's a Google Drive link
  const normalizedCoverPhoto = coverPhoto ? convertGoogleDriveUrl(coverPhoto) : null;
  
  const result = stmt.run(title, description, date, photographer, googleDriveFolderUrl, normalizedCoverPhoto);
  return result.lastInsertRowid;
}

export function getAllAlbums() {
  const stmt = db.prepare(`
    SELECT *
    FROM albums
    ORDER BY date DESC
  `);
  
  return stmt.all();
}

export function getAlbumById(albumId) {
  const stmt = db.prepare(`
    SELECT *
    FROM albums
    WHERE id = ?
  `);
  
  return stmt.get(albumId);
}

export function updateAlbum(albumId, { title, description, date, photographer }) {
  const stmt = db.prepare(`
    UPDATE albums 
    SET title = ?,
        description = ?,
        date = ?,
        photographer = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  
  return stmt.run(title, description, date, photographer, albumId);
}

export function deleteAlbum(albumId) {
  const stmt = db.prepare('DELETE FROM albums WHERE id = ?');
  return stmt.run(albumId);
}

// Photo operations
export function addPhotoToAlbum(albumId, imageUrl, caption, displayOrder = 0) {
  const stmt = db.prepare(`
    INSERT INTO photos (album_id, image_url, caption, display_order)
    VALUES (?, ?, ?, ?)
  `);
  
  // Normalize Google Drive URLs to prevent thumbnail format issues
  const normalizedUrl = convertGoogleDriveUrl(imageUrl);
  
  const result = stmt.run(albumId, normalizedUrl, caption, displayOrder);
  
  // Update album photo count
  updatePhotoCount(albumId);
  
  return result.lastInsertRowid;
}

export function getAlbumPhotos(albumId) {
  const stmt = db.prepare(`
    SELECT * FROM photos
    WHERE album_id = ?
    ORDER BY display_order ASC, created_at ASC
  `);
  
  return stmt.all(albumId);
}

export function setCoverPhoto(albumId, coverPhotoUrl) {
  const stmt = db.prepare(`
    UPDATE albums
    SET cover_photo = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  
  // Normalize cover photo URL if it's a Google Drive link
  const normalizedUrl = convertGoogleDriveUrl(coverPhotoUrl);
  
  return stmt.run(normalizedUrl, albumId);
}

export function deletePhoto(photoId) {
  // Get album_id before deleting
  const photo = db.prepare('SELECT album_id FROM photos WHERE id = ?').get(photoId);
  
  if (photo) {
    db.prepare('DELETE FROM photos WHERE id = ?').run(photoId);
    updatePhotoCount(photo.album_id);
  }
}

export function updatePhotoCount(albumId) {
  const stmt = db.prepare(`
    UPDATE albums
    SET photo_count = (
      SELECT COUNT(*) FROM photos WHERE album_id = ?
    ),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  
  return stmt.run(albumId, albumId);
}

export function bulkAddPhotos(albumId, photos) {
  const insert = db.prepare(`
    INSERT INTO photos (album_id, image_url, caption, display_order)
    VALUES (?, ?, ?, ?)
  `);
  
  const transaction = db.transaction((photosArray) => {
    for (const photo of photosArray) {
      // Normalize Google Drive URLs to prevent thumbnail format issues
      const normalizedUrl = convertGoogleDriveUrl(photo.imageUrl);
      insert.run(albumId, normalizedUrl, photo.caption || null, photo.displayOrder || 0);
    }
  });
  
  transaction(photos);
  updatePhotoCount(albumId);
}
