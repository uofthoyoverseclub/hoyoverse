import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Photos', path: '/photos' },
    { name: 'Social', path: '/social' },
    // { name: 'Join', path: '/join' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-950 via-blue-950 to-purple-950 border-b border-indigo-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Hoyo Club logo"
              className="w-12 h-12 rounded-lg object-cover border border-indigo-400/30 bg-white"
            />
            <span className="text-xl text-white font-semibold">HoyoClub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600/40 text-white border border-indigo-400/30'
                    : 'text-indigo-100 hover:bg-indigo-800/40 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Join Discord Button */}
            <a
              href="https://discord.gg/xYK5CUU2zr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-md bg-indigo-600 text-white font-semibold
                        hover:bg-indigo-500 transition-colors shadow-md"
            >
              Join Discord
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-indigo-100 hover:bg-indigo-800/40"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600/40 text-white border border-indigo-400/30'
                    : 'text-indigo-100 hover:bg-indigo-800/40 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Join Discord Button */}
            <a
              href="https://discord.gg/xYK5CUU2zr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-2 text-center px-4 py-2 rounded-md
                        bg-indigo-600 text-white font-semibold hover:bg-indigo-500"
            >
              Join Discord
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
