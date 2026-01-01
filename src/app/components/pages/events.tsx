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
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
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
              ? `https://cdn.discordapp.com/guild-events/${e.id}/${e.image}.png?size=1024`
              : '/logo.png',
            attendees: 0, // Discord does not expose attendee counts
            type: e.status === 1 ? 'upcoming' : 'past',
            category: 'Event',
            startTime: start.getTime(),
          };
        });

        // Split events into upcoming and past, then sort
        const upcoming = mappedEvents
          .filter(event => event.type === 'upcoming')
          .sort((a, b) => a.startTime - b.startTime); // soonest first

        const past = mappedEvents
          .filter(event => event.type === 'past')
          .sort((a, b) => b.startTime - a.startTime); // most recent first

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const renderEventCard = (event: Event) => (
    <div
      key={event.id}
      className="rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      style={{ backgroundColor: '#006494' }}
    >
      <ImageWithFallback
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl mb-3 text-white">
          {event.title}
        </h3>

        <p className="mb-4 break-words" style={{ color: '#a8dadc' }}>
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#a8dadc' }}>
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#a8dadc' }}>
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#a8dadc' }}>
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32" style={{ backgroundImage: 'url(/wallpaper2.webp)', backgroundSize: 'cover', backgroundPosition: 'center 0%', minHeight: '400px' }}>
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
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading / Error */}
          {loading && (
            <p className="text-center py-20" style={{ color: '#a8dadc' }}>
              Loading events...
            </p>
          )}

          {error && (
            <p className="text-center py-20" style={{ color: '#ff6b6b' }}>
              Failed to load events.
            </p>
          )}

          {/* Events Sections */}
          {!loading && !error && (
            <>
              {/* Upcoming Events Section */}
              <div className="mb-16">
                <h2 className="text-3xl mb-8 text-white">Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map(renderEventCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg" style={{ color: '#a8dadc' }}>No upcoming events at this time.</p>
                  </div>
                )}
              </div>

              {/* Past Events Section */}
              <div>
                <h2 className="text-3xl mb-8 text-white">Past Events</h2>
                {pastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pastEvents.map(renderEventCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg" style={{ color: '#a8dadc' }}>No past events recorded.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
