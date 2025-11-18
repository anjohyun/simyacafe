import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Home, MoodMatching, EventCalendar, Profile } from './pages';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Reservation from './pages/Reservation';
import MusicShare from './pages/MusicShare';
import { ToastProvider } from './contexts/ToastContext';
import { MoodProvider } from './contexts/MoodContext';

function App() {
  // Use base path for GitHub Pages deployment
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <ToastProvider>
        <MoodProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="mood-matching" element={<MoodMatching />} />
              <Route path="events" element={<EventCalendar />} />
              <Route path="reservation" element={<Reservation />} />
              <Route path="music" element={<MusicShare />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:id" element={<BookDetail />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </MoodProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
