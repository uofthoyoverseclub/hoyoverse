import { Instagram, Linkedin } from 'lucide-react';

// Discord icon component
const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// TikTok icon component
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Social() {
  const socials = [
    {
      name: 'Discord',
      description: 'Join our Discord server to connect with the community, stay updated on events, and chat with fellow members!',
      url: 'https://discord.gg/3De2staqpN',
      icon: DiscordIcon,
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
    {
      name: 'Instagram',
      description: 'Follow us on Instagram for photos, stories, and updates about our latest events and activities!',
      url: 'https://www.instagram.com/uofthoyoverseclub/',
      icon: Instagram,
      color: 'bg-pink-500 hover:bg-pink-600',
    },
    {
      name: 'TikTok',
      description: 'Check out our TikTok for fun videos, behind-the-scenes content, and highlights from our events!',
      url: 'https://www.tiktok.com/@uofthoyoverseclub',
      icon: TikTokIcon,
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'LinkedIn',
      description: 'Connect with us professionally on LinkedIn to stay informed about club activities and networking opportunities!',
      url: '#',
      icon: Linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32" style={{ backgroundImage: 'url(/socialbanner.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 40%', minHeight: '400px' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-6">Connect With Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Follow us on social media to stay updated on all our events, activities, and community news!
          </p>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socials.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  style={{ backgroundColor: '#006494' }}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 ${social.color} rounded-lg flex items-center justify-center transition-colors`}>
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{social.name}</h3>
                    </div>
                    <p className="leading-relaxed" style={{ color: '#a8dadc' }}>
                      {social.description}
                    </p>
                    <div className="mt-4 font-medium transition-colors" style={{ color: '#a8dadc' }}>
                      Visit {social.name} →
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" style={{ backgroundColor: '#1d3557' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4" style={{ color: '#a8dadc' }}>Get In Touch</h2>
          <p className="text-xl mb-8" style={{ color: '#a8dadc' }}>
            Have questions or want to collaborate? Reach out to us via email!
          </p>
          <a
            href="mailto:uoft.hoyo@studentorg.utoronto.ca"
            className="inline-block text-white px-8 py-3 rounded-lg transition-colors text-lg"
            style={{ backgroundColor: '#006494' }}
          >
            uoft.hoyo@studentorg.utoronto.ca
          </a>
        </div>
      </section>
    </div>
  );
}
