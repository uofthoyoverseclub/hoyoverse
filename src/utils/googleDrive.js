/**
 * Extract folder ID from various Google Drive folder URL formats
 */
export function extractFolderId(url) {
  if (!url || !url.includes('drive.google.com')) {
    return null;
  }
  
  // Pattern: https://drive.google.com/drive/folders/FOLDER_ID
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) {
    return folderMatch[1];
  }
  
  // Pattern: https://drive.google.com/drive/u/0/folders/FOLDER_ID
  const uFolderMatch = url.match(/\/u\/\d+\/folders\/([a-zA-Z0-9_-]+)/);
  if (uFolderMatch) {
    return uFolderMatch[1];
  }
  
  return null;
}

/**
 * Convert individual Google Drive file URL to direct image URL
 */
export function convertGoogleDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/, // /file/d/ID/view
    /id=([a-zA-Z0-9_-]+)/, // ?id=ID or ?id=ID&...
    /\/d\/([a-zA-Z0-9_-]+)/, // /d/ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  
  return url;
}

/**
 * Fetch all image URLs from a Google Drive folder
 * Note: This requires the folder to be publicly accessible with link sharing enabled
 */
export async function fetchGoogleDriveFolderImages(folderUrl) {
  const folderId = extractFolderId(folderUrl);
  
  if (!folderId) {
    throw new Error('Invalid Google Drive folder URL');
  }
  
  try {
    // Use the Google Drive folder viewer page to extract file IDs
    // This is a workaround that works for publicly shared folders
    const viewerUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}`;
    const response = await fetch(viewerUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch folder contents. Make sure the folder is publicly shared.');
    }
    
    const html = await response.text();
    
    // Extract file IDs from the HTML
    // The embedded folder view contains file IDs in specific patterns
    const fileIdPattern = /"(https:\/\/drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)[^"]*)"/g;
    const matches = [...html.matchAll(fileIdPattern)];
    
    if (matches.length === 0) {
      // Try alternative pattern for direct file IDs
      const altPattern = /\["([a-zA-Z0-9_-]{25,})",/g;
      const altMatches = [...html.matchAll(altPattern)];
      
      const imageUrls = altMatches
        .map(match => `https://drive.google.com/uc?export=view&id=${match[1]}`)
        .filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates
      
      return imageUrls;
    }
    
    // Extract unique image URLs
    const imageUrls = matches
      .map(match => match[1])
      .filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates
    
    return imageUrls;
  } catch (error) {
    console.error('Error fetching Google Drive folder:', error);
    throw new Error(`Failed to fetch images from folder: ${error.message}`);
  }
}

/**
 * Alternative method: Parse folder sharing page for file links
 * This is more reliable for publicly shared folders
 */
export async function extractImagesFromSharedFolder(folderUrl) {
  const folderId = extractFolderId(folderUrl);
  
  if (!folderId) {
    throw new Error('Invalid Google Drive folder URL');
  }
  
  // For a simpler approach, we'll generate URLs based on common patterns
  // Users will need to ensure images are in the folder and publicly accessible
  
  // Return the folder URL and ID for now - we'll enhance this with actual file listing
  return {
    folderId,
    folderUrl: `https://drive.google.com/drive/folders/${folderId}`,
    embedUrl: `https://drive.google.com/embeddedfolderview?id=${folderId}`
  };
}

/**
 * Get all file IDs from a publicly shared Google Drive folder
 * This uses the Google Drive API v3 without authentication for public folders
 */
export async function getPublicFolderFiles(folderId, apiKey) {
  if (!apiKey) {
    throw new Error('Google Drive API key is required');
  }
  
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink,thumbnailLink,webViewLink)`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to fetch folder files from Google Drive API');
    }
    
    const data = await response.json();
    
    if (!data.files || data.files.length === 0) {
      throw new Error('No files found in folder. Make sure the folder is publicly shared.');
    }
    
    // Filter for image files and convert to direct URLs
    const imageFiles = data.files
      .filter(file => file.mimeType && file.mimeType.startsWith('image/'))
      .map(file => ({
        id: file.id,
        name: file.name,
        // Use thumbnail API which is more reliable for public access
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        directUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
        thumbnailUrl: file.thumbnailLink || `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`
      }));
    
    return imageFiles;
  } catch (error) {
    console.error('Error fetching public folder files:', error);
    throw error;
  }
}
