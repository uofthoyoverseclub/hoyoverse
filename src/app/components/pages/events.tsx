import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { fetchDiscordEvents } from '../../api/discordEvents';

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
  startTime: number;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  // const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDiscordEvents()
      .then((discordEvents) => {
        const mappedEvents: Event[] = discordEvents.map((e) => {
          const start = new Date(e.scheduled_start_time);

          return {
            id: Number(e.id),
            title: e.name,
            description: e.description || '',
            date: start.toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            time: start.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            location: e.entity_metadata?.location || 'Discord',
            image: e.image
              ? `https://cdn.discordapp.com/guild-events/${e.id}/${e.image}.png`
              : '/logo.png',
            attendees: 0, // Discord does not expose attendee counts
            type: e.status === 1 ? 'upcoming' : 'past',
            category: 'Event',
            startTime: start.getTime(),
          };
        });

        setEvents(
          mappedEvents
            .filter(event => event.type === 'upcoming')
            .sort((a, b) => a.startTime - b.startTime)
        );
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // const filteredEvents = events
  // .filter((event) => filter === 'all' || event.type === filter)
  // .sort((a, b) => a.startTime - b.startTime);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32" style={{ backgroundImage: 'url(/Banner.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '500px' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="max-w-3xl text-right">
            <h1 className="text-5xl mb-6">Events</h1>
            <p className="text-xl text-blue-100">
              We host everything from in-person socials and events to online game nights and watch parties. Whether you’re on campus or joining remotely, there’s always something happening.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          {/* <div className="flex gap-4 mb-12">
            {(['all', 'upcoming', 'past'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {key === 'all'
                  ? 'All Events'
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div> */}

          {/* Loading / Error */}
          {loading && (
            <p className="text-center text-gray-600 py-20">
              Loading events...
            </p>
          )}

          {error && (
            <p className="text-center text-red-600 py-20">
              Failed to load events.
            </p>
          )}

          {/* Events Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
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

                      <h3 className="text-xl mb-3 text-gray-900">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>

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
                        {/* <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Users size={16} />
                          <span>{event.attendees} attendees</span>
                        </div> */}
                      </div>

                      {/* {event.type === 'upcoming' && (
                        <a
                          href={`https://discord.com/events/779003158361014372/${event.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                        >
                          View on Discord
                          <ExternalLink size={16} />
                        </a>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>

              {events.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No events found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
