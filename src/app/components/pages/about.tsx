import { Target, Eye, Award } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">About Hoyo Club</h1>
            <p className="text-xl text-blue-100">
              We are a student-led organization dedicated to fostering innovation, collaboration, and excellence in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2NzA2NzI5OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Campus"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, our club started with a small group of passionate students who wanted to create a space for learning, innovation, and collaboration. Today, we've grown into a vibrant community of over 200 members.
              </p>
              <p className="text-gray-600">
                We believe in the power of collective learning and hands-on experience. Through workshops, hackathons, research projects, and networking events, we provide our members with opportunities to grow both personally and professionally.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Our Mission</h3>
              <p className="text-gray-600">
                To empower students through education, collaboration, and innovation, preparing them for success in their academic and professional journeys.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Our Vision</h3>
              <p className="text-gray-600">
                To be the premier student organization that bridges the gap between academic learning and real-world application, fostering leaders of tomorrow.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Our Values</h3>
              <p className="text-gray-600">
                Excellence, integrity, collaboration, and continuous learning are at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">What We Do</h2>
            <p className="text-xl text-gray-600">Supporting our members in multiple ways</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl mb-3 text-gray-900">Technical Workshops</h3>
              <p className="text-gray-600">
                Regular workshops on cutting-edge technologies, programming languages, and industry best practices led by experts and alumni.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl mb-3 text-gray-900">Research Support</h3>
              <p className="text-gray-600">
                Mentorship and resources for students interested in academic research and publishing papers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl mb-3 text-gray-900">Networking Events</h3>
              <p className="text-gray-600">
                Connect with industry professionals, alumni, and fellow students through our regular networking sessions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl mb-3 text-gray-900">Competitions & Hackathons</h3>
              <p className="text-gray-600">
                Participate in and organize hackathons, coding competitions, and project showcases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
