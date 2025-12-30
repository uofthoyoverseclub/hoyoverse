import { Link } from 'react-router-dom';
import { Calendar, Users, BookOpen, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">Welcome to Hoyo Club</h1>
              <p className="text-xl text-blue-100 mb-8">
                Join a community of passionate students dedicated to innovation, learning, and making a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/join"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  Join Our Discord
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/events"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Events
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1663162550938-60f70fab5d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NjcxMTA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students collaborating"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">What We Offer</h2>
            <p className="text-xl text-gray-600">Everything you need to grow and succeed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Regular Events</h3>
              <p className="text-gray-600 mb-4">
                Join workshops, hackathons, and networking sessions to enhance your skills and meet like-minded peers.
              </p>
              <Link to="/events" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                View Events <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Amazing Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with students, faculty, and industry professionals who share your passion for excellence.
              </p>
              <Link to="/team" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Photo Gallery</h3>
              <p className="text-gray-600 mb-4">
                Browse through our collection of memorable moments from events, gaming sessions, and community gatherings.
              </p>
              <Link to="/photos" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                View Photos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-4xl text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl text-blue-600 mb-2">30+</div>
              <div className="text-gray-600">Photo Albums</div>
            </div>
            <div>
              <div className="text-4xl text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Become part of a vibrant community and unlock endless opportunities for growth and collaboration.
          </p>
          <Link
            to="/join"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Join Our Discord
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
