import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  attendees: number;
  type: 'upcoming' | 'past';
  category: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Web Development Workshop',
    date: 'January 15, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'Room 301, Engineering Building',
    description: 'Learn the fundamentals of modern web development with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjcwOTE5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    attendees: 45,
    type: 'upcoming',
    category: 'Workshop',
  },
  {
    id: 2,
    title: 'Spring Hackathon 2025',
    date: 'February 5-7, 2025',
    time: '48 Hours',
    location: 'Student Center',
    description: 'Join us for our annual hackathon! Build amazing projects and win prizes.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2NzEwMTk5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    attendees: 120,
    type: 'upcoming',
    category: 'Hackathon',
  },
  {
    id: 3,
    title: 'Industry Panel Discussion',
    date: 'January 25, 2025',
    time: '5:00 PM - 7:00 PM',
    location: 'Virtual Event',
    description: 'Hear from industry leaders about career paths and opportunities in tech.',
    image: 'https://images.unsplash.com/photo-1663162550938-60f70fab5d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjcxMTA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    attendees: 80,
    type: 'upcoming',
    category: 'Networking',
  },
  {
    id: 4,
    title: 'Fall Tech Conference',
    date: 'October 20, 2024',
    time: 'Full Day',
    location: 'Main Auditorium',
    description: 'A day of talks, workshops, and networking with industry professionals.',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2NzA2NzI5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    attendees: 200,
    type: 'past',
    category: 'Conference',
  },
];

export function Events() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = events.filter(
    (event) => filter === 'all' || event.type === filter
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Events</h1>
            <p className="text-xl text-blue-100">
              Join our workshops, hackathons, and networking events to learn, grow, and connect with the community.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                filter === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past Events
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                      {event.category}
                    </span>
                    {event.type === 'upcoming' && (
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl mb-3 text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users size={16} />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  {event.type === 'upcoming' && (
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2">
                      Register Now
                      <ExternalLink size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No events found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
