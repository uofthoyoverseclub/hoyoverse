# Photo Album Setup Guide

## Google Drive API Configuration

To enable uploading entire Google Drive folders at once, you need to set up a Google Drive API key.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**:
   - Click on "Enable APIs and Services"
   - Search for "Google Drive API"
   - Click "Enable"

### Step 2: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the generated API key
4. (Recommended) Click on your API key to restrict it:
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Drive API" from the dropdown
   - Save

### Step 3: Add API Key to Environment

Create or update your `.env` file in the root directory:

```env
GOOGLE_DRIVE_API_KEY=your_api_key_here
```

## How to Use Photo Albums

### Creating an Album with Google Drive

1. **Prepare Your Photos in Google Drive**:
   - Create a folder in Google Drive
   - Upload all your event photos to this folder
   - **Important**: Right-click the folder → Share → Change to "Anyone with the link can view"
   - **Critical**: After sharing the folder, open it and select all files (Ctrl+A), right-click → Share, and ensure they also say "Anyone with the link can view" - folder permissions don't always cascade to files
   - Alternatively, use "Anyone on the internet with this link can view" for more reliable access

2. **Go to Photos Admin Page** (`/photos-admin`):
   - Fill in album details (title, description, date, photographer)
   - Paste the Google Drive folder URL (e.g., `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`)
   - Click "Load Folder"
   - All images from the folder will be automatically loaded
   - The first image will be set as the cover photo (you can change this)
   - Click "Create Album"

3. **View on Photos Page**:
   - Go to `/photos` to see all albums
   - Click on an album to view all photos in a grid
   - Click any photo to open it in lightbox view

## Folder URL Format

The Google Drive folder URL should look like one of these:
- `https://drive.google.com/drive/folders/FOLDER_ID`
- `https://drive.google.com/drive/u/0/folders/FOLDER_ID`

## Important Notes

- **Public Sharing Required**: The Google Drive folder MUST be shared publicly ("Anyone with the link can view") for the API to access it
- **Images Only**: The folder should contain only image files (JPG, PNG, GIF, etc.)
- **API Quota**: Google Drive API has usage limits. For typical use (a few albums per week), you'll be well within the free tier
- **File Order**: Photos are loaded in the order they appear in the Drive folder

## Troubleshooting

### "Failed to fetch folder images"
- Verify the folder is shared publicly
- Check that your API key is correctly added to `.env`
- Make sure the API key has Google Drive API enabled
- Restart your server after adding the API key

### "No images found in the folder"
- Ensure the folder contains actual image files
- Check that the folder is not empty
- Verify you're using a folder URL, not a file URL

### Images not displaying
- Check that the images are not too large (Google Drive may limit direct viewing of very large files)
- Verify the folder sharing settings allow public viewing
- Try opening one of the image URLs directly in a browser

## Database Schema

Albums are stored with the following fields:
- `id`: Unique identifier
- `title`: Album name
- `description`: Album description
- `date`: Event date (free text)
- `photographer`: Photographer name (optional)
- `google_drive_folder_url`: Original folder URL (for reference)
- `cover_photo`: URL of the cover image
- `photo_count`: Number of photos in the album
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

Photos are stored separately with:
- `id`: Unique identifier
- `album_id`: Reference to parent album
- `image_url`: Direct image URL
- `caption`: Photo caption (optional)
- `display_order`: Order in the album
- `created_at`: Creation timestamp
