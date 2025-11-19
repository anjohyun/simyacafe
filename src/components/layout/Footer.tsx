import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '2px solid #333333',
        marginTop: 'auto',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div
            style={{
              color: '#BBBBBB',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            &copy; 2024 연결실 (Connection Room). All rights reserved.
          </div>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontSize: '14px',
            }}
          >
            <Link
              to="/"
              style={{
                color: '#DDDDDD',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF1B8D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#DDDDDD';
              }}
            >
              Home
            </Link>
            <Link
              to="/contact"
              style={{
                color: '#DDDDDD',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00FFC6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#DDDDDD';
              }}
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              style={{
                color: '#DDDDDD',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFE400';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#DDDDDD';
              }}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
