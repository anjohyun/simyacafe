import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-bg-secondary border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2024 연결실 (Connection Room). All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-neon-pink transition-colors">
              Home
            </Link>
            <Link to="/contact" className="hover:text-mint transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-electric-yellow transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
