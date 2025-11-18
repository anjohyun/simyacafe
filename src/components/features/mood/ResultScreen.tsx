import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMood } from '../../../contexts/MoodContext';
import { useToast } from '../../../contexts/ToastContext';
import { ARTWORKS } from '../../../types/mood';

interface ResultScreenProps {
  onReset: () => void;
}

export default function ResultScreen({ onReset }: ResultScreenProps) {
  const navigate = useNavigate();
  const { quizResult, resetQuiz } = useMood();
  const toast = useToast();

  const [eventHovered, setEventHovered] = useState(false);
  const [shareHovered, setShareHovered] = useState(false);
  const [resetHovered, setResetHovered] = useState(false);

  if (!quizResult) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
      }}>
        <p style={{
          fontSize: '18px',
          color: '#CCCCCC',
          fontWeight: '700',
          marginBottom: '20px',
        }}>결과를 찾을 수 없습니다.</p>
        <button
          onClick={onReset}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
            color: '#0A0A0A',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          다시 시작하기
        </button>
      </div>
    );
  }

  const { profile, matchCount, selections } = quizResult;

  const handleShare = () => {
    const shareText = `나의 무드: ${profile.description}\n연결실에서 내 취향의 사람들을 만나보세요! 🎨`;

    if (navigator.share) {
      navigator
        .share({
          title: '연결실 무드 매칭 결과',
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {
          // User cancelled
        });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
      toast.success('결과가 클립보드에 복사되었습니다!');
    }
  };

  const handleReset = () => {
    resetQuiz();
    onReset();
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#0A0A0A',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Success Animation */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            fontSize: '120px',
            marginBottom: '20px',
            animation: 'bounce 1s ease infinite',
          }}>🎉</div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 50px)',
            fontWeight: '900',
            marginBottom: '10px',
            color: '#FFFFFF',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}>
            무드 분석 완료!
          </h2>
        </div>

        {/* Main Result Card */}
        <div style={{
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: 'clamp(30px, 5vw, 60px)',
          marginBottom: '40px',
          border: '2px solid #333333',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }}>
          {/* Profile Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            <div style={{
              display: 'inline-block',
              marginBottom: '20px',
              padding: '10px 24px',
              background: 'linear-gradient(90deg, rgba(255,27,141,0.2), rgba(0,255,198,0.2))',
              borderRadius: '30px',
              border: '2px solid rgba(0,255,198,0.3)',
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '800',
                color: '#00FFC6',
                textShadow: '0 0 15px rgba(0,255,198,0.6)',
              }}>Your Mood Profile</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255,27,141,0.5))',
            }}>
              {profile.description}
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '16px',
              color: '#CCCCCC',
              fontWeight: '700',
            }}>
              <span>{profile.primary}</span>
              <span>+</span>
              <span>{profile.secondary}</span>
            </div>
          </div>

          {/* Keywords */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}>
            {profile.keywords.map((keyword, index) => (
              <span
                key={index}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(90deg, #0A0A0A, #1A1A1A)',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '700',
                  border: '2px solid #333333',
                  color: '#FFFFFF',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                #{keyword}
              </span>
            ))}
          </div>

          {/* Match Count */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '30px',
            background: 'linear-gradient(90deg, rgba(255,27,141,0.15), rgba(0,255,198,0.15))',
            borderRadius: '16px',
            border: '2px solid rgba(255,27,141,0.3)',
          }}>
            <p style={{
              fontSize: '18px',
              marginBottom: '10px',
              color: '#FFFFFF',
              fontWeight: '700',
            }}>
              <span style={{
                fontSize: '42px',
                fontWeight: '900',
                color: '#FF1B8D',
                textShadow: '0 0 20px rgba(255,27,141,0.8)',
              }}>{matchCount}명</span>의 비슷한 무드를 가진 사람들이
            </p>
            <p style={{
              fontSize: '18px',
              color: '#DDDDDD',
              fontWeight: '700',
            }}>
              지금 대기 중입니다! 💫
            </p>
          </div>

          {/* Your Selections Review */}
          <div style={{
            marginBottom: '40px',
          }}>
            <h4 style={{
              fontSize: '24px',
              fontWeight: '900',
              marginBottom: '25px',
              textAlign: 'center',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>당신의 선택</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
            }}>
              {selections
                .sort((a, b) => a.order - b.order)
                .map((selection) => (
                  <div
                    key={selection.artwork.id}
                    style={{
                      backgroundColor: '#1A1A1A',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '2px solid #333333',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '900',
                        color: '#FF1B8D',
                        textShadow: '0 0 10px rgba(255,27,141,0.6)',
                      }}>
                        {selection.order}순위
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: '#999999',
                        fontWeight: '700',
                      }}>
                        {selection.weight}%
                      </span>
                    </div>
                    <div style={{
                      fontSize: '50px',
                      marginBottom: '10px',
                      textAlign: 'center',
                    }}>
                      {selection.artwork.imageUrl}
                    </div>
                    <p style={{
                      fontSize: '13px',
                      textAlign: 'center',
                      fontWeight: '700',
                      color: '#DDDDDD',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    }}>
                      {selection.artwork.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Compatibility Chart */}
          <div style={{
            marginBottom: '20px',
          }}>
            <h4 style={{
              fontSize: '24px',
              fontWeight: '900',
              marginBottom: '25px',
              textAlign: 'center',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>무드 호환도</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}>
              {ARTWORKS.map((artwork) => {
                const score = profile.compatibilityScore[artwork.id];
                return (
                  <div key={artwork.id}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}>
                      <span style={{
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#FFFFFF',
                        fontWeight: '700',
                      }}>
                        <span style={{ fontSize: '24px' }}>{artwork.imageUrl}</span>
                        <span>{artwork.title}</span>
                      </span>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '900',
                        color: artwork.color,
                        textShadow: `0 0 10px ${artwork.color}66`,
                      }}>
                        {score}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      backgroundColor: '#1A1A1A',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #333333',
                    }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${score}%`,
                          background: `linear-gradient(90deg, ${artwork.color}, ${artwork.color}80)`,
                          transition: 'width 1s ease',
                          boxShadow: `0 0 15px ${artwork.color}66`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 640 ? 'column' : 'row',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '40px',
        }}>
          <button
            onClick={() => navigate('/events')}
            onMouseEnter={() => setEventHovered(true)}
            onMouseLeave={() => setEventHovered(false)}
            style={{
              fontSize: '18px',
              fontWeight: '900',
              padding: '18px 40px',
              background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
              color: '#0A0A0A',
              border: '3px solid rgba(255,255,255,0.3)',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(255,27,141,0.6), 0 10px 30px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease',
              transform: eventHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1) translateY(0)',
              opacity: eventHovered ? 0.9 : 1,
              flex: window.innerWidth < 640 ? '1' : 'initial',
            }}
          >
            1차 행사 신청하기 🎪
          </button>
          <button
            onClick={handleShare}
            onMouseEnter={() => setShareHovered(true)}
            onMouseLeave={() => setShareHovered(false)}
            style={{
              fontSize: '18px',
              fontWeight: '800',
              padding: '18px 40px',
              background: '#1A1A1A',
              color: '#FF1B8D',
              border: '3px solid #FF1B8D',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: shareHovered ? '0 0 30px rgba(255,27,141,0.4)' : 'none',
              transition: 'all 0.3s ease',
              transform: shareHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1) translateY(0)',
              flex: window.innerWidth < 640 ? '1' : 'initial',
            }}
          >
            내 결과 공유하기 📤
          </button>
          <button
            onClick={handleReset}
            onMouseEnter={() => setResetHovered(true)}
            onMouseLeave={() => setResetHovered(false)}
            style={{
              fontSize: '18px',
              fontWeight: '700',
              padding: '18px 40px',
              background: 'transparent',
              color: '#FFFFFF',
              border: '3px solid #FFFFFF',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: resetHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1) translateY(0)',
              backgroundColor: resetHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
              flex: window.innerWidth < 640 ? '1' : 'initial',
            }}
          >
            다시 하기 🔄
          </button>
        </div>

        {/* Additional Info */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#999999',
          fontWeight: '600',
        }}>
          <p>💡 결과는 브라우저에 자동 저장되어 언제든 다시 볼 수 있어요</p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
