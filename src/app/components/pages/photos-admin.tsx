import { useState } from 'react';
import { Camera, Plus, X, FolderOpen, Loader2 } from 'lucide-react';

interface PhotoUpload {
  imageUrl: string;
  caption: string;
  displayOrder: number;
}

export function PhotosAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [googleDriveFolderUrl, setGoogleDriveFolderUrl] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);
  const [fetchingFolder, setFetchingFolder] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const convertGoogleDriveUrl = (url: string): string => {
    // If already converted or not a Google Drive URL, return as-is
    if (!url.includes('drive.google.com')) return url;
    
    // Extract file ID from various Google Drive URL formats
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/, // /file/d/ID/view
      /id=([a-zA-Z0-9_-]+)/, // ?id=ID or ?id=ID&...
      /\/d\/([a-zA-Z0-9_-]+)/, // /d/ID
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        // Use the uc endpoint with export=view which works for shared files
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    
    // If pattern not matched, return original
    return url;
  };

  const fetchGoogleDriveFolder = async () => {
    if (!googleDriveFolderUrl.trim()) {
      setMessage({ type: 'error', text: 'Please enter a Google Drive folder URL' });
      return;
    }

    setFetchingFolder(true);
    setMessage(null);

    try {
      const response = await fetch('/api/albums/fetch-drive-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderUrl: googleDriveFolderUrl })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch folder');
      }

      const data = await response.json();
      
      if (data.files.length === 0) {
        setMessage({ type: 'error', text: 'No images found in the folder. Make sure it\'s publicly shared.' });
        return;
      }

      // Convert files to photo upload format
      const newPhotos = data.files.map((file: any, index: number) => ({
        imageUrl: file.url,
        caption: '',
        displayOrder: index
      }));

      setPhotos(newPhotos);
      
      // Set first image as cover photo if not already set
      if (!coverPhoto && newPhotos.length > 0) {
        setCoverPhoto(newPhotos[0].imageUrl);
      }

      setMessage({ 
        type: 'success', 
        text: `Successfully loaded ${data.files.length} image${data.files.length !== 1 ? 's' : ''} from folder` 
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to fetch folder images' });
    } finally {
      setFetchingFolder(false);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos.map((p, i) => ({ ...p, displayOrder: i })));
    
    // Clear cover photo if it was removed
    if (coverPhoto === photos[index].imageUrl) {
      setCoverPhoto(newPhotos[0]?.imageUrl || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      // Convert cover photo URL if it's a Google Drive link
      const convertedCoverPhoto = convertGoogleDriveUrl(coverPhoto);
      
      // Create album
      const albumRes = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          description, 
          date, 
          photographer, 
          coverPhoto: convertedCoverPhoto,
          googleDriveFolderUrl: googleDriveFolderUrl || null
        })
      });

      if (!albumRes.ok) throw new Error('Failed to create album');
      
      const { id: albumId } = await albumRes.json();

      // Add photos to album
      if (photos.length > 0) {
        const photosRes = await fetch(`/api/albums/${albumId}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photos })
        });

        if (!photosRes.ok) throw new Error('Failed to add photos');
      }

      setMessage({ type: 'success', text: `Album created successfully with ${photos.length} photos!` });
      
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setPhotographer('');
      setCoverPhoto('');
      setGoogleDriveFolderUrl('');
      setPhotos([]);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create album. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1d3557', minHeight: '100vh' }}>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006494' }}>
              <Camera className="text-white" size={24} />
            </div>
            <h1 className="text-4xl text-white">Photo Album Admin</h1>
          </div>

          {message && (
            <div 
              className="mb-6 p-4 rounded-lg"
              style={{ 
                backgroundColor: message.type === 'success' ? '#10b981' : '#ef4444',
                color: 'white'
              }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Album Details */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#006494' }}>
              <h2 className="text-2xl mb-6 text-white">Album Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#a8dadc' }}>
                    Album Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2"
                    style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderColor: '#a8dadc' }}
                    placeholder="e.g., Welcome Week 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: '#a8dadc' }}>
                    Description *
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 h-24"
                    style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderColor: '#a8dadc' }}
                    placeholder="Brief description of the event..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#a8dadc' }}>
                      Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-2"
                      style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderColor: '#a8dadc' }}
                      placeholder="e.g., September 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#a8dadc' }}>
                      Photographer
                    </label>
                    <input
                      type="text"
                      value={photographer}
                      onChange={(e) => setPhotographer(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-2"
                      style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderColor: '#a8dadc' }}
                      placeholder="Photographer name"
                    />
                  </div>
                </div>

                {/* Cover Photo */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#a8dadc' }}>
                    Cover Photo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={coverPhoto}
                    onChange={(e) => setCoverPhoto(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2"
                    style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderColor: '#a8dadc' }}
                    placeholder="https://example.com/cover-photo.jpg"
                  />
                  <p className="text-xs mt-1" style={{ color: '#a8dadc' }}>
                    This image will be shown on the albums page. You can paste a Google Drive link.
                  </p>
                  {coverPhoto && (
                    <div className="mt-3">
                      <img 
                        src={convertGoogleDriveUrl(coverPhoto)} 
                        alt="Cover preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/logo192.png';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add Photos */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#006494' }}>
              <h2 className="text-2xl mb-6 text-white">Photos</h2>
              
              {/* Google Drive Folder Input */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#a8dadc' }}>
                    Google Drive Folder URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={googleDriveFolderUrl}
                      onChange={(e) => setGoogleDriveFolderUrl(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border-2"
                      style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderColor: '#a8dadc' }}
                      placeholder="https://drive.google.com/drive/folders/..."
                    />
                    <button
                      type="button"
                      onClick={fetchGoogleDriveFolder}
                      disabled={!googleDriveFolderUrl || fetchingFolder}
                      className="px-6 py-2 rounded-lg text-white transition-opacity disabled:opacity-50 flex items-center gap-2"
                      style={{ backgroundColor: '#006494' }}
                    >
                      {fetchingFolder ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <FolderOpen size={20} />
                          Load Folder
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs mt-2" style={{ color: '#a8dadc' }}>
                    Share your Google Drive folder publicly (Anyone with the link can view), then paste the URL here.
                    The folder should contain only images.
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#a8dadc' }}>
                  </p>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-white mb-2">Photos Loaded ({photos.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                    {photos.map((photo, index) => (
                      <div key={`photo-${index}-${photo.imageUrl.substring(0, 20)}`} className="relative group">
                        <img 
                          src={photo.imageUrl} 
                          alt={`Photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== '/logo.png') {
                              target.src = '/logo.png';
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || !title || !description || !date || !coverPhoto}
              className="w-full py-4 rounded-lg text-white text-lg font-semibold transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#006494' }}
            >
              {submitting ? 'Creating Album...' : 'Create Album'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
