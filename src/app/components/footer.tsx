import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

// Discord icon component (lucide-react doesn't have Discord, so we'll use an SVG)
const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// TikTok icon component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: '#1d3557', color: '#a8dadc', borderTopColor: '#a8dadc' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Hoyo Club logo"
                className="w-12 h-12 rounded-lg object-cover border border-gray-800 bg-white"
              />
              <span className="text-xl" style={{ color: '#a8dadc' }}>Hoyoverse Club</span>
            </div>
            <p className="mb-4" style={{ color: '#a8dadc' }}>
              Building a community of passionate students for all things gacha!
            </p>
          </div>

          <div>
            <h3 className="mb-4" style={{ color: '#a8dadc' }}>Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="/photos" className="hover:text-white transition-colors">Photos</a></li>
              <li><a href="https://discord.gg/xYK5CUU2zr" className="hover:text-white transition-colors">Join Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4" style={{ color: '#a8dadc' }}>Contact</h3>
            <div className="flex items-center space-x-2 mb-3">
              <Mail size={18} />
              <span>uoft.hoyo@studentorg.utoronto.ca</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://discord.gg/3De2staqpN" className="transition-colors" style={{ color: '#a8dadc' }}>
                <DiscordIcon size={20} />
              </a>
              <a href="https://www.instagram.com/uofthoyoverseclub/" className="transition-colors" style={{ color: '#a8dadc' }}>
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@uofthoyoverseclub" className="transition-colors" style={{ color: '#a8dadc' }}>
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center" style={{ borderTopColor: '#a8dadc', color: '#a8dadc' }}>
          <p className="mb-2">Special thanks to <a href="https://www.instagram.com/nobuddy_207/?hl=en" className="hover:text-white transition-colors underline">nobuddy_207</a> and <a href="https://www.instagram.com/k_liatris.art/" className="hover:text-white transition-colors underline">k_liatris.art</a> from our community for providing artwork for the website</p>
          <p>&copy; 2025 HoyoClub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
