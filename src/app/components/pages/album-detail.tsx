import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Download } from 'lucide-react';
import { GoogleDriveImage } from '../figma/GoogleDriveImage';

interface Album {
  id: number;
  title: string;
  date: string;
  description: string;
  photographer: string;
  photo_count: number;
}

interface Photo {
  id: number;
  album_id: number;
  image_url: string;
  caption: string | null;
  display_order: number;
}

interface AlbumDetail extends Album {
  photos: Photo[];
}

export function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetch(`/api/albums/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Album not found');
        return res.json();
      })
      .then(data => {
        setAlbum(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1d3557' }}>
        <p className="text-xl" style={{ color: '#a8dadc' }}>Loading album...</p>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#1d3557' }}>
        <p className="text-xl mb-6" style={{ color: '#ff6b6b' }}>Album not found</p>
        <Link 
          to="/photos" 
          className="px-6 py-3 rounded-lg text-white transition-colors"
          style={{ backgroundColor: '#006494' }}
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#1d3557', minHeight: '100vh' }}>
      {/* Header */}
      <section className="py-12" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/photos" 
            className="inline-flex items-center gap-2 mb-6 hover:underline"
            style={{ color: '#a8dadc' }}
          >
            <ArrowLeft size={20} />
            Back to Gallery
          </Link>
          
          <h1 className="text-4xl md:text-5xl mb-4 text-white">{album.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2" style={{ color: '#a8dadc' }}>
              <Calendar size={18} />
              <span>{album.date}</span>
            </div>
            {album.photographer && (
              <div className="flex items-center gap-2" style={{ color: '#a8dadc' }}>
                <User size={18} />
                <span>Photos by {album.photographer}</span>
              </div>
            )}
          </div>
          
          <p className="text-lg max-w-3xl" style={{ color: '#a8dadc' }}>
            {album.description}
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {album.photos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: '#a8dadc' }}>
                No photos in this album yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="aspect-video cursor-pointer rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#006494' }}
                >
                  <GoogleDriveImage
                    src={photo.image_url}
                    alt={photo.caption || album.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption || album.title}
              className="max-w-full max-h-[85vh] mx-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {selectedPhoto.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-center">
                {selectedPhoto.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
