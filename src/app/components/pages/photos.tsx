import { Camera, Calendar, User, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GoogleDriveImage } from '../figma/GoogleDriveImage';
import { Link } from 'react-router-dom';

interface Album {
  id: number;
  title: string;
  date: string;
  description: string;
  photographer: string;
  cover_photo: string;
  photo_count: number;
}

export function Photos() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/albums')
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32" style={{ backgroundImage: 'url(/Photowallpaper.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 00%', minHeight: '700px' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Photo Gallery</h1>
            <p className="text-xl" style={{ color: '#a8dadc' }}>
              Explore memories from our events, gaming sessions, and community gatherings.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading */}
          {loading && (
            <p className="text-center py-20" style={{ color: '#a8dadc' }}>
              Loading albums...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center py-20" style={{ color: '#ff6b6b' }}>
              Failed to load albums.
            </p>
          )}

          {/* Albums Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  to={`/photos/${album.id}`}
                  className="rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group block"
                  style={{ backgroundColor: '#006494' }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <GoogleDriveImage
                      src={album.cover_photo || '/logo.png'}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs" style={{ color: '#1d3557' }}>
                      {album.photo_count} {album.photo_count === 1 ? 'photo' : 'photos'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl mb-2 text-white group-hover:underline">
                      {album.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm mb-2" style={{ color: '#a8dadc' }}>
                      <Calendar size={16} />
                      <span>{album.date}</span>
                    </div>
                    {album.photographer && (
                      <div className="flex items-center gap-2 text-sm mb-3" style={{ color: '#a8dadc' }}>
                        <User size={16} />
                        <span>{album.photographer}</span>
                      </div>
                    )}
                    <p className="text-sm mb-3" style={{ color: '#a8dadc' }}>
                      {album.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <span>View Album</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No albums */}
          {!loading && !error && albums.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: '#a8dadc' }}>
                No photo albums yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#006494' }}>
            <Camera className="text-white" size={32} />
          </div>
          <h2 className="text-4xl mb-4 text-white">Thank You</h2>
          <p className="text-xl mb-8" style={{ color: '#a8dadc' }}>
            A big thank you to our amazing Hoyoverse Club photographers! Check out our talented team in the{' '}
            <a 
              href="/team" 
              className="underline hover:text-white transition-colors"
              style={{ color: '#a8dadc' }}
            >
              Team section
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
