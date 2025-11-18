export default function Cafe() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      backgroundColor: '#0A0A0A',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: 'clamp(40px, 7vw, 60px)',
        fontWeight: '900',
        marginBottom: '20px',
      }}>
        <span style={{
          color: '#FFFFFF',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}>카페 </span>
        <span style={{
          color: '#FF1B8D',
          textShadow: '0 0 25px rgba(255,27,141,0.8)',
        }}>목록</span>
      </h1>
      <p style={{
        fontSize: '20px',
        color: '#DDDDDD',
        fontWeight: '700',
        textShadow: '0 2px 6px rgba(0,0,0,0.5)',
      }}>
        다양한 카페들을 둘러보세요
      </p>

      {/* Coming Soon Section */}
      <div style={{
        marginTop: '80px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '100px',
          marginBottom: '30px',
          filter: 'drop-shadow(0 0 20px rgba(0,255,198,0.5))',
        }}>☕</div>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '900',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 25px rgba(255,27,141,0.4))',
        }}>
          Coming Soon
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#CCCCCC',
          fontWeight: '600',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}>
          심야 커뮤니티를 위한 특별한 카페 공간이 곧 공개됩니다.
          조금만 기다려주세요!
        </p>

        {/* Placeholder Cards */}
        <div style={{
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
        }}>
          {[
            { emoji: '🌙', title: '심야 카페', desc: '밤의 감성이 있는 공간' },
            { emoji: '🎨', title: '크리에이터 라운지', desc: '창작 활동을 위한 공간' },
            { emoji: '🎵', title: '뮤직 카페', desc: '음악과 함께하는 시간' },
          ].map((cafe, index) => (
            <div
              key={index}
              style={{
                padding: '40px',
                backgroundColor: 'rgba(26, 26, 26, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '2px solid #333333',
                opacity: 0.7,
              }}
            >
              <div style={{
                fontSize: '60px',
                marginBottom: '20px',
                filter: 'grayscale(0.5)',
              }}>{cafe.emoji}</div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '900',
                marginBottom: '10px',
                color: '#FFFFFF',
                textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              }}>{cafe.title}</h3>
              <p style={{
                fontSize: '14px',
                color: '#BBBBBB',
                fontWeight: '600',
              }}>{cafe.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
