import { ExternalLink, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  website?: string;
  contribution?: string;
}

const sponsors: Sponsor[] = [
  // Example sponsors - replace with actual data
  {
    id: 1,
    name: 'Example Sponsor 1',
    logo: '/logo.png',
    description: 'Supporting the HoyoClub community.',
    website: 'https://example.com',
    contribution: 'Event funding and merchandise support',
  },
  {
    id: 2,
    name: 'Example Sponsor 2',
    logo: '/logo.png',
    description: 'Supporting our community events and activities.',
    website: 'https://example.com',
    contribution: 'Event sponsorship',
  },
  {
    id: 3,
    name: 'Example Sponsor 3',
    logo: '/logo.png',
    description: 'Helping us provide great experiences for our members.',
    website: 'https://example.com',
    contribution: 'Prize sponsorship',
  },
];

export function Sponsors() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative text-white py-30 bg-center"
        style={{
          backgroundImage: "url('/Anaxa.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 0%',
          backgroundRepeat: 'no-repeat',
          minHeight: '500px',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Our Sponsors</h1>
            <p className="text-xl text-white/90">
              We're grateful to our amazing sponsors who help make our events and activities possible. 
              Their support enables us to create memorable experiences for our community.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-12 text-center" style={{ color: '#a8dadc' }}>
            Our Partners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                style={{ backgroundColor: '#006494' }}
              >
                <div 
                  className="aspect-video flex items-center justify-center p-8" 
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <ImageWithFallback
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-2 text-white">{sponsor.name}</h3>
                  <p className="mb-4" style={{ color: '#a8dadc' }}>
                    {sponsor.description}
                  </p>
                  
                  {sponsor.contribution && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white mb-1">Contribution:</p>
                      <p className="text-sm" style={{ color: '#a8dadc' }}>
                        {sponsor.contribution}
                      </p>
                    </div>
                  )}

                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:underline"
                    >
                      Visit Website
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="mx-auto mb-6" size={48} style={{ color: '#a8dadc' }} />
          <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>
            Interested in Sponsoring Us?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#a8dadc' }}>
            Help us create amazing experiences for the HoyoClub community. We offer various 
            sponsorship tiers with different benefits including event presence, social media 
            promotion, and direct community engagement.
          </p>
          <a
            href="mailto:contact@hoyoclub.com"
            className="text-white px-8 py-3 rounded-lg transition-colors inline-block hover:opacity-90"
            style={{ backgroundColor: '#006494' }}
          >
            Contact Us About Sponsorship
          </a>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16" style={{ backgroundColor: '#006494' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4" style={{ color: '#a8dadc' }}>
            Thank You to All Our Sponsors
          </h2>
          <p className="text-lg" style={{ color: '#a8dadc' }}>
            Your support makes everything we do possible. We're incredibly grateful to have 
            partners who believe in our mission and help us grow our community.
          </p>
        </div>
      </section>
    </div>
  );
}
