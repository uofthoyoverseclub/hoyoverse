import { Mail, Linkedin, Twitter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  type: 'exec' | 'associate';
  // For execs
  bio?: string;
  // For associates
  campus?: string;
  study?: string;
  year?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'President',
    bio: 'Computer Science senior passionate about building inclusive tech communities.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'sarah@clubname.com',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Vice President',
    bio: 'Engineering student focused on innovation and hands-on learning experiences.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    email: 'michael@clubname.com',
    linkedin: '#',
    type: 'exec',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Events Coordinator',
    bio: 'Organizing engaging events that bring our community together.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    email: 'emily@clubname.com',
    linkedin: '#',
    twitter: '#',
    type: 'exec',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Technical Lead',
    campus: 'St. George',
    study: 'Computer Science',
    year: '3rd Year',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    email: 'david@clubname.com',
    linkedin: '#',
    type: 'associate',
  },
  {
    id: 5,
    name: 'Jessica Williams',
    role: 'Marketing Director',
    campus: 'St. George',
    study: 'Marketing',
    year: '2nd Year',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    email: 'jessica@clubname.com',
    twitter: '#',
    type: 'associate',
  },
  {
    id: 6,
    name: 'Alex Thompson',
    role: 'Treasurer',
    campus: 'Mississauga',
    study: 'Finance',
    year: '4th Year',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    email: 'alex@clubname.com',
    linkedin: '#',
    type: 'associate',
  },
];

export function Team() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative text-white py-30 bg-center"
        style={{
          backgroundImage: "url('/flins%20lauma.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Our Team</h1>
            <p className="text-xl text-white/90">
              Meet the wonderful team of execs and associates who make this club possible!
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive Team */}
          <div className="mb-16">
            <h2 className="text-4xl mb-8 text-gray-900 text-center">Executive Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.filter(member => member.type === 'exec').map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>

                    <div className="flex gap-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                      >
                        <Mail size={18} />
                      </a>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Associates */}
          <div>
            <h2 className="text-4xl mb-8 text-gray-900 text-center">Associates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.filter(member => member.type === 'associate').map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.role}</p>
                    
                    <div className="space-y-1 mb-4">
                      {member.campus && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Campus:</span> {member.campus}
                        </p>
                      )}
                      {member.study && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Study:</span> {member.study}
                        </p>
                      )}
                      {member.year && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Year:</span> {member.year}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                      >
                        <Mail size={18} />
                      </a>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 text-gray-900">Want to Join Our Team?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for passionate individuals to help us grow our community. Applications open at the beginning of each semester.
          </p>
          <a
            href="/join"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Learn More
          </a>
        </div>
      </section>
    </div>
  );
}
