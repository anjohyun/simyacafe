import { useState } from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#0A0A0A',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {/* Icon */}
        <div style={{
          fontSize: '120px',
          marginBottom: '40px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          filter: 'drop-shadow(0 0 20px rgba(255,27,141,0.5))',
        }}>🎨</div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 80px)',
          fontWeight: '900',
          marginBottom: '30px',
          background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(255,27,141,0.5))',
        }}>
          무드 매칭
        </h1>

        {/* Instructions */}
        <div style={{ marginBottom: '50px' }}>
          <p style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: '#FFFFFF',
            fontWeight: '700',
            marginBottom: '15px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}>
            4가지 아트워크를 보고,
          </p>
          <p style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: '#FFFFFF',
            fontWeight: '700',
            marginBottom: '30px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}>
            <span style={{
              color: '#FF1B8D',
              fontWeight: '900',
              textShadow: '0 0 20px rgba(255,27,141,0.8)',
            }}>끌리는 순서대로</span> 선택해주세요
          </p>
          <p style={{
            fontSize: '18px',
            color: '#CCCCCC',
            fontWeight: '600',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}>
            취향이 비슷한 사람들과 자동으로 매칭됩니다
          </p>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px',
          maxWidth: '700px',
          margin: '0 auto 50px auto',
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            border: '2px solid #333333',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚡</div>
            <p style={{
              fontSize: '16px',
              color: '#CCCCCC',
              fontWeight: '700',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}>빠른 매칭</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            border: '2px solid #333333',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎯</div>
            <p style={{
              fontSize: '16px',
              color: '#CCCCCC',
              fontWeight: '700',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}>정확한 취향 분석</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            border: '2px solid #333333',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💫</div>
            <p style={{
              fontSize: '16px',
              color: '#CCCCCC',
              fontWeight: '700',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}>새로운 만남</p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            fontSize: '20px',
            fontWeight: '900',
            padding: '18px 50px',
            background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
            color: '#0A0A0A',
            border: '3px solid rgba(255,255,255,0.3)',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(255,27,141,0.6), 0 10px 30px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1) translateY(0)',
            opacity: isHovered ? 0.9 : 1,
          }}
        >
          시작하기 ✨
        </button>

        {/* Footer note */}
        <p style={{
          fontSize: '14px',
          color: '#999999',
          marginTop: '30px',
          fontWeight: '600',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        }}>
          소요 시간: 약 1분 | 언제든 다시 시작할 수 있어요
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
