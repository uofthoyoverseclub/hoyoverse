
  # Club Website UI/UX Prototype

  This is a code bundle for Hoyoclub Website

  ## Running the code

  Run `npm install` to install the dependencies.

  Run `npm run dev` and `node server.js` in two separate terminals to start the development server.
  
  ## Configuration

  Create a `.env` file based on `.env.example`:
  
  ```bash
  cp .env.example .env
  ```
  
  Then fill in your API keys:
  - `DISCORD_BOT_TOKEN` and `DISCORD_GUILD_ID` for Discord event sync
  - `GOOGLE_DRIVE_API_KEY` for photo album uploads (see PHOTO_ALBUM_SETUP.md)

  ## Photo Albums

  The website now supports photo albums with Google Drive integration. See [PHOTO_ALBUM_SETUP.md](./PHOTO_ALBUM_SETUP.md) for detailed setup instructions.

  ### Quick Start for Photo Albums:
  
  1. Set up Google Drive API key (see PHOTO_ALBUM_SETUP.md)
  2. Add the API key to your `.env` file
  3. Navigate to `/photos-admin` to create albums
  4. Paste a Google Drive folder URL to automatically import all images
  5. View albums at `/photos` and individual album details at `/photos/:id`
  
