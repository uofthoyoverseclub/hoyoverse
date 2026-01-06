import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { Home } from './components/pages/home';
import { About } from './components/pages/about';
import { Events } from './components/pages/events';
import { Team } from './components/pages/team';
import { Join } from './components/pages/join';
import { Photos } from './components/pages/photos';
import { AlbumDetail } from './components/pages/album-detail';
import { PhotosAdmin } from './components/pages/photos-admin';
import { Social } from './components/pages/social';
import { Sponsors } from './components/pages/sponsors';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            {/* <Route path="/join" element={<Join />} /> */}
            <Route path="/photos" element={<Photos />} />
            <Route path="/photos/:id" element={<AlbumDetail />} />
            <Route
              path="/photos_admin"
              element={
                <ProtectedRoute>
                  <PhotosAdmin />
                </ProtectedRoute>
              }
            />
            <Route path="/social" element={<Social />} />
            <Route path="/sponsors" element={<Sponsors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
