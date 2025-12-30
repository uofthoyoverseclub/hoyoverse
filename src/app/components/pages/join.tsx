import { MessageSquare, CheckCircle, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Join() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Join Our Community</h1>
            <p className="text-xl text-blue-100">
              Connect with us on Discord and become part of an amazing community of students, learners, and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white text-center">
            <MessageSquare className="mx-auto mb-6" size={64} />
            <h2 className="text-4xl mb-4">Join Our Discord Server</h2>
            <p className="text-xl text-indigo-100 mb-8">
              The heart of our community! Get instant updates, connect with members, and participate in discussions.
            </p>
            <a
              href="https://discord.gg/yourserver"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors inline-block text-lg"
            >
              Join Discord Server
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">Why Join Us?</h2>
            <p className="text-xl text-gray-600">Here's what you'll get as a member</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Free Workshops</h3>
              <p className="text-gray-600">
                Access to all our technical workshops and training sessions
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Network</h3>
              <p className="text-gray-600">
                Connect with students, faculty, and industry professionals
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Exclusive Events</h3>
              <p className="text-gray-600">
                Early access to hackathons, conferences, and special events
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Mentorship</h3>
              <p className="text-gray-600">
                Get guidance from senior members and industry mentors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">How to Join</h2>
            <p className="text-xl text-gray-600">Getting started is easy!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Join Discord</h3>
              <p className="text-gray-600">
                Click the button above to join our Discord server and introduce yourself
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Attend an Event</h3>
              <p className="text-gray-600">
                Come to one of our meetings or events to meet the team and other members
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Get Involved</h3>
              <p className="text-gray-600">
                Start participating in projects, workshops, and help grow our community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl mb-4 text-gray-900 text-center">Have Questions?</h2>
            <p className="text-center text-gray-600 mb-8">
              Feel free to reach out to us if you have any questions about joining.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
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
                  <label htmlFor="email" className="block text-gray-700 mb-2">
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
                <label htmlFor="message" className="block text-gray-700 mb-2">
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
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
