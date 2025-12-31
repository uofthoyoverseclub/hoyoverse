import { Target, Eye, Award } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32" style={{ backgroundImage: 'url(/Banner.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '500px' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="max-w-3xl text-right">
            <h1 className="text-5xl mb-6">About HoyoClub</h1>
            <p className="text-xl text-blue-100">
              We are a student-led organization dedicated to fostering innovation, collaboration, and excellence in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
            <div className="relative h-[600px]">
              <ImageWithFallback
                src="/About3.jpg"
                alt="HoyoClub event 1"
                className="absolute top-0 left-0 w-72 h-52 object-cover rounded-lg shadow-lg transform -rotate-6 z-10"
              />
              <ImageWithFallback
                src="/about2.png"
                alt="HoyoClub event 2"
                className="absolute top-16 right-8 w-64 h-48 object-cover rounded-lg shadow-lg transform rotate-3 z-20"
              />
              <ImageWithFallback
                src="/About1.jpg"
                alt="HoyoClub event 3"
                className="absolute bottom-32 left-12 w-68 h-56 object-cover rounded-lg shadow-lg transform rotate-6 z-30"
              />
              <ImageWithFallback
                src="/About4.jpg"
                alt="HoyoClub event 4"
                className="absolute bottom-16 right-4 w-60 h-44 object-cover rounded-lg shadow-lg transform -rotate-3 z-40"
              />
              <ImageWithFallback
                src="/About5.jpg"
                alt="HoyoClub event 5"
                className="absolute top-48 left-28 w-64 h-52 object-cover rounded-lg shadow-lg transform rotate-12 z-50"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6" style={{ color: '#a8dadc' }}>Our Founding</h2>
              <p className="text-lg mb-4" style={{ color: '#a8dadc' }}>
                Our club started as a idea in April of 2025, when our founder Mashal realized that there didn't exist a community for gacha enthusiasts at the University of Toronto. From then on, the idea of HoyoClub grew as the foundation was established to bring together like-minded students. Since September 2025, Hoyoverse Club has grown from a team of 6 students to a 25 large team, and over 300 members of the club. 
              </p>
              <p className="text-lg" style={{ color: '#a8dadc' }}>
                In Hoyoverse Club, we believe in having fun. Hoyoclub is a for fun club that gives students a community to interact with others who share the same passion for gacha games. We host a variety of events, both online and in-person, to bring our members together and create lasting memories. Check out our photos page to see some of the fun we've had so far!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* What We Do */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>What We Offer</h2>
            <p className="text-xl" style={{ color: '#a8dadc' }}>Having fun and more fun!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#006494' }}>
              <ImageWithFallback
                src="/Pulling Party.png"
                alt="Pulling Party event"
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">Pulling Parties!</h3>
                <p className="text-white/90">
                  Regular pulling parties online or inperson where members can gather to stream their pulls to the whole club!
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#006494' }}>
              <ImageWithFallback
                src="/workshop.jpg"
                alt="Workshop event"
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">Workshops!</h3>
                <p className="text-white/90">
                  Hosting various events about game strategies, cosplaying, arts, etc. to help members find a sense of community. 
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#006494' }}>
              <ImageWithFallback
                src="/field trips.jpg"
                alt="Field trips event"
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">Field Trips!</h3>
                <p className="text-white/90">
                  Our clubs hosts trips for upcoming anime conventions, food spots, and other exciting locations!
                </p>
              </div>
            </div>


            <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#006494' }}>
              <ImageWithFallback
                src="/Online Events.png"
                alt="Online events"
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">Online Events!</h3>
                <p className="text-white/90">
                  Can't make it to campus? No problem! We host regular online events including game nights, watch parties, and virtual meetups so you can join the fun from anywhere.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#006494' }}>
              <ImageWithFallback
                src="/Events.jpg"
                alt="In-person events"
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">In-Person Events!</h3>
                <p className="text-white/90">
                  Join us on campus for exciting in-person gatherings, game sessions, and social events where you can meet fellow club members face-to-face and build lasting friendships!
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#006494' }}>
              <ImageWithFallback
                src="/more.jpg"
                alt="More activities"
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">And so MUCH MORE!</h3>
                <p className="text-white/90">
                  Join our Discord to stay updated on all the fun events we have planned throughout the year, including competitions with prizes, conventions, and social hangouts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
