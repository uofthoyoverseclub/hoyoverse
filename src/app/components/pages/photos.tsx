import { Camera, Calendar } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Photo {
  id: number;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'Welcome Week 2024',
    date: 'September 2024',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZXZlbnR8ZW58MXx8fHwxNzY3MTEwODc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Our amazing welcome week event with new members!',
  },
  {
    id: 2,
    title: 'Gaming Tournament',
    date: 'October 2024',
    category: 'Gaming',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmd8ZW58MXx8fHwxNzY3MTEwODc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Intense gaming competition between club members',
  },
  {
    id: 3,
    title: 'Team Bonding Night',
    date: 'November 2024',
    category: 'Social',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwaGFuZ2luZ3xlbnwxfHx8fDE3NjcxMTA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Quality time with the team outside of regular meetings',
  },
  {
    id: 4,
    title: 'Character Cosplay Contest',
    date: 'December 2024',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NwbGF5fGVufDF8fHx8MTc2NzExMDg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Members showing off their amazing cosplay skills',
  },
  {
    id: 5,
    title: 'Study Session',
    date: 'November 2024',
    category: 'Academic',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeWluZyUyMGdyb3VwfGVufDF8fHx8MTc2NzExMDg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Group study sessions during exam season',
  },
  {
    id: 6,
    title: 'Community Meetup',
    date: 'October 2024',
    category: 'Social',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMG1lZXRpbmd8ZW58MXx8fHwxNzY3MTEwODc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Weekly community gathering and discussions',
  },
  {
    id: 7,
    title: 'Workshop Day',
    date: 'September 2024',
    category: 'Academic',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcHxlbnwxfHx8fDE3NjcxMTA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Learning new skills together at our workshop',
  },
  {
    id: 8,
    title: 'Game Night Marathon',
    date: 'December 2024',
    category: 'Gaming',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBuaWdodHxlbnwxfHx8fDE3NjcxMTA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'All-night gaming session with the crew',
  },
  {
    id: 9,
    title: 'End of Year Celebration',
    date: 'December 2024',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eXxlbnwxfHx8fDE3NjcxMTA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Celebrating another successful year together!',
  },
];

const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))];

export function Photos() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPhotos =
    selectedCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-white'
                }`}
                style={{ backgroundColor: selectedCategory === category ? '#006494' : '#1d3557' }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                style={{ backgroundColor: '#006494' }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-white rounded-full text-xs" style={{ backgroundColor: '#1d3557' }}>
                      {photo.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl mb-2 text-white">{photo.title}</h3>
                  <div className="flex items-center gap-2 text-sm mb-3" style={{ color: '#a8dadc' }}>
                    <Calendar size={16} />
                    <span>{photo.date}</span>
                  </div>
                  <p className="text-sm" style={{ color: '#a8dadc' }}>{photo.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: '#a8dadc' }}>
                No photos found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Photo CTA */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#006494' }}>
            <Camera className="text-white" size={32} />
          </div>
          <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>Share Your Moments</h2>
          <p className="text-xl mb-8" style={{ color: '#a8dadc' }}>
            Have photos from our events? We'd love to feature them in our gallery! Share your favorite moments with the community.
          </p>
          <a
            href="mailto:photos@hoyoclub.com"
            className="text-white px-8 py-3 rounded-lg transition-colors inline-block"
            style={{ backgroundColor: '#006494' }}
          >
            Submit Your Photos
          </a>
        </div>
      </section>
    </div>
  );
}
