import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">C</span>
              </div>
              <span className="text-xl text-white">Club Name</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building a community of passionate students dedicated to innovation, collaboration, and excellence.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="/papers" className="hover:text-white transition-colors">Research</a></li>
              <li><a href="/join" className="hover:text-white transition-colors">Join Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <div className="flex items-center space-x-2 mb-3">
              <Mail size={18} />
              <span>contact@clubname.com</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Club Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
