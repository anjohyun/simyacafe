import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Hover states for each nav item
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navLinks = [
    { path: '/', label: '홈', color: '#FFFFFF', hoverColor: '#00FFC6' },
    { path: '/mood-matching', label: '기분 매칭', color: '#FF1B8D', hoverColor: '#FF4DB8' },
    { path: '/events', label: '이벤트', color: '#FFE400', hoverColor: '#FFED4E' },
    { path: '/cafe', label: '카페', color: '#00FFC6', hoverColor: '#4DFFDB' },
    { path: '/books', label: '책 소개', color: '#8B5CF6', hoverColor: '#A78BFA' },
    { path: '/profile', label: '프로필', color: '#B794F4', hoverColor: '#D4BCFF' },
    { path: '/design-system', label: '디자인 시스템', color: '#FF1B8D', hoverColor: '#00FFC6' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: '#1A1A1A',
      borderBottom: '2px solid #333333',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: '900',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              letterSpacing: '-0.02em',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{
              color: '#FF1B8D',
              textShadow: '0 0 20px rgba(255,27,141,0.8), 0 2px 10px rgba(0,0,0,0.5)',
            }}>연결</span>
            <span style={{
              color: '#00FFC6',
              textShadow: '0 0 20px rgba(0,255,198,0.8), 0 2px 10px rgba(0,0,0,0.5)',
            }}>실</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 40px)',
          }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const hovered = hoveredItem === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredItem(link.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    color: active ? link.color : (hovered ? link.hoverColor : link.color),
                    fontSize: 'clamp(14px, 1.5vw, 18px)',
                    fontWeight: active ? '800' : '700',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    textShadow: active
                      ? `0 0 20px ${link.color}99, 0 2px 8px rgba(0,0,0,0.8)`
                      : hovered
                        ? `0 0 15px ${link.hoverColor}66, 0 2px 6px rgba(0,0,0,0.6)`
                        : '0 1px 4px rgba(0,0,0,0.5)',
                    transform: hovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: active ? `${link.color}15` : (hovered ? `${link.hoverColor}10` : 'transparent'),
                    border: active ? `2px solid ${link.color}` : '2px solid transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: window.innerWidth < 768 ? 'block' : 'none',
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              border: '2px solid #00FFC6',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isMobileMenuOpen ? '0 0 20px rgba(0,255,198,0.6)' : '0 0 10px rgba(0,255,198,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00FFC620';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={{ width: '28px', height: '28px' }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={{
            display: window.innerWidth < 768 ? 'block' : 'none',
            paddingTop: '20px',
            paddingBottom: '20px',
            borderTop: '1px solid #333333',
            animation: 'slideDown 0.3s ease',
          }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const hovered = hoveredItem === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={() => setHoveredItem(link.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: 'block',
                    color: active ? link.color : (hovered ? link.hoverColor : link.color),
                    fontSize: '18px',
                    fontWeight: active ? '800' : '700',
                    textDecoration: 'none',
                    padding: '16px 20px',
                    marginBottom: '8px',
                    borderRadius: '12px',
                    backgroundColor: active ? `${link.color}20` : (hovered ? `${link.hoverColor}15` : 'transparent'),
                    border: active ? `2px solid ${link.color}` : '2px solid transparent',
                    textShadow: active
                      ? `0 0 20px ${link.color}99, 0 2px 8px rgba(0,0,0,0.8)`
                      : hovered
                        ? `0 0 15px ${link.hoverColor}66, 0 2px 6px rgba(0,0,0,0.6)`
                        : '0 1px 4px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease',
                    transform: hovered ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
