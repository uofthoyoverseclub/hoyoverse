import { MessageSquare, CheckCircle, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Join() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Join Our Community</h1>
            <p className="text-xl" style={{ color: '#a8dadc' }}>
              Connect with us on Discord and become part of an amazing community of students, learners, and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-12 text-white text-center" style={{ backgroundColor: '#006494' }}>
            <MessageSquare className="mx-auto mb-6" size={64} />
            <h2 className="text-4xl mb-4">Join Our Discord Server</h2>
            <p className="text-xl mb-8" style={{ color: '#a8dadc' }}>
              The heart of our community! Get instant updates, connect with members, and participate in discussions.
            </p>
            <a
              href="https://discord.gg/yourserver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-8 py-4 rounded-lg transition-colors inline-block text-lg"
              style={{ backgroundColor: '#1d3557' }}
            >
              Join Discord Server
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>Why Join Us?</h2>
            <p className="text-xl" style={{ color: '#a8dadc' }}>Here's what you'll get as a member</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-white">Free Workshops</h3>
              <p style={{ color: '#a8dadc' }}>
                Access to all our technical workshops and training sessions
              </p>
            </div>

            <div className="p-8 rounded-xl shadow-sm text-center" style={{ backgroundColor: '#006494' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1d3557' }}>
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-white">Network</h3>
              <p style={{ color: '#a8dadc' }}>
                Connect with students, faculty, and industry professionals
              </p>
            </div>

            <div className="p-8 rounded-xl shadow-sm text-center" style={{ backgroundColor: '#006494' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1d3557' }}>
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-white">Exclusive Events</h3>
              <p style={{ color: '#a8dadc' }}>
                Early access to hackathons, conferences, and special events
              </p>
            </div>

            <div className="p-8 rounded-xl shadow-sm text-center" style={{ backgroundColor: '#006494' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1d3557' }}>
                <MessageSquare className="text-white" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-white">Mentorship</h3>
              <p style={{ color: '#a8dadc' }}>
                Get guidance from senior members and industry mentors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>How to Join</h2>
            <p className="text-xl" style={{ color: '#a8dadc' }}>Getting started is easy!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#006494' }}>
                1
              </div>
              <h3 className="text-xl mb-3 text-white">Join Discord</h3>
              <p style={{ color: '#a8dadc' }}>
                Click the button above to join our Discord server and introduce yourself
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#006494' }}>
                2
              </div>
              <h3 className="text-xl mb-3 text-white">Attend an Event</h3>
              <p style={{ color: '#a8dadc' }}>
                Come to one of our meetings or events to meet the team and other members
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#006494' }}>
                3
              </div>
              <h3 className="text-xl mb-3 text-white">Get Involved</h3>
              <p style={{ color: '#a8dadc' }}>
                Start participating in projects, workshops, and help grow our community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl shadow-sm p-8" style={{ backgroundColor: '#006494' }}>
            <h2 className="text-3xl mb-4 text-white text-center">Have Questions?</h2>
            <p className="text-center mb-8" style={{ color: '#a8dadc' }}>
              Feel free to reach out to us if you have any questions about joining.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2" style={{ color: '#a8dadc' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2" style={{ color: '#a8dadc' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2" style={{ color: '#a8dadc' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your question..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full text-white py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#1d3557' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
