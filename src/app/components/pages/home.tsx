import { Link } from 'react-router-dom';
import { Calendar, Users, BookOpen, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white min-h-screen flex items-center" style={{ backgroundImage: 'url(/HuTao.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 20%' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">Welcome to Hoyoverse Club!</h1>
              <p className="text-xl text-blue-100 mb-8">
                We are a university club at the University of Toronto devoted to gacha gaming! Join us for events and a vibrant community of fellow enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="https://discord.gg/xYK5CUU2zr"
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
          </div>
        </div>
      </section>


    </div>
  );
}
