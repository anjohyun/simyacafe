import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Home, MoodMatching, EventCalendar, Cafe, Profile, DesignSystem } from './pages';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
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
              <Route path="cafe" element={<Cafe />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:id" element={<BookDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="design-system" element={<DesignSystem />} />
            </Route>
          </Routes>
        </MoodProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
