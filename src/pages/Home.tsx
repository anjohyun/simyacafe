import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      color: '#FFFFFF',
      fontFamily: 'Pretendard, Inter, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        padding: '40px 20px',
        position: 'relative'
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            marginBottom: '40px',
            fontSize: '16px',
            fontWeight: '700',
            color: '#FFFFFF'
          }}>
            심야 커뮤니티
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '30px',
            letterSpacing: '-0.02em'
          }}>
            <div style={{
              color: '#FFFFFF',
              marginBottom: '20px',
              textShadow: '0 0 30px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.9)'
            }}>
              당신의 밤은
            </div>
            <div style={{
              background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(255, 27, 141, 0.5))'
            }}>
              어떤 색인가요?
            </div>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: '50px',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            lineHeight: '1.5'
          }}>
            취향으로 만나고, 경험으로 깊어지는 심야 커뮤니티
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            <button
              onClick={() => navigate('/mood-matching')}
              style={{
                padding: '20px 40px',
                fontSize: '20px',
                fontWeight: '700',
                color: '#0A0A0A',
                background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(255, 27, 141, 0.5), 0 10px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 27, 141, 0.7), 0 15px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 27, 141, 0.5), 0 10px 30px rgba(0,0,0,0.3)';
              }}
            >
              내 취향 찾기 시작 ✨
            </button>

            <button
              onClick={() => {
                document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '20px 40px',
                fontSize: '20px',
                fontWeight: '700',
                color: '#FFFFFF',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '15px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
            >
              더 알아보기
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" style={{
        padding: '100px 20px',
        backgroundColor: '#0A0A0A'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 60px)',
              fontWeight: '800',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#FF1B8D' }}>3단계</span>
              <span style={{ color: '#FFFFFF' }}>로 시작하는 </span>
              <span style={{ color: '#00FFC6' }}>연결</span>
            </h2>
            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: '#FFFFFF',
              fontWeight: '600'
            }}>
              온라인에서 오프라인까지, 단계별로 깊어지는 커뮤니티 경험
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Stage 1 */}
            <div style={{
              padding: '40px',
              backgroundColor: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '20px',
              border: '2px solid rgba(100, 100, 100, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 100%)',
                border: '2px solid #22C55E',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#22C55E',
                marginBottom: '20px'
              }}>
                Stage 1
              </div>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🐾</div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '15px'
              }}>
                반려동물 & 취향 모임
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#FFFFFF',
                lineHeight: '1.6',
                opacity: 0.9
              }}>
                같은 관심사를 가진 사람들과 소통하며 시작하세요
              </p>
            </div>

            {/* Stage 2 */}
            <div style={{
              padding: '40px',
              backgroundColor: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '20px',
              border: '2px solid rgba(100, 100, 100, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 100%)',
                border: '2px solid #3B82F6',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#3B82F6',
                marginBottom: '20px'
              }}>
                Stage 2
              </div>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎨</div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '15px'
              }}>
                소그룹 컨텐츠 제작
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#FFFFFF',
                lineHeight: '1.6',
                opacity: 0.9
              }}>
                함께 창작하고 프로젝트를 진행해요
              </p>
            </div>

            {/* Stage 3 */}
            <div style={{
              padding: '40px',
              backgroundColor: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '20px',
              border: '2px solid rgba(100, 100, 100, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'linear-gradient(90deg, rgba(255, 27, 141, 0.3) 0%, rgba(255, 27, 141, 0.1) 100%)',
                border: '2px solid #FF1B8D',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#FF1B8D',
                marginBottom: '20px'
              }}>
                Stage 3
              </div>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🌙</div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '15px'
              }}>
                심야 카페 오픈런
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#FFFFFF',
                lineHeight: '1.6',
                opacity: 0.9
              }}>
                실제 공간에서 만나 더 깊은 연결을 경험하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{
        padding: '100px 20px',
        backgroundColor: '#1A1A1A'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 60px)',
              fontWeight: '800',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#FFFFFF' }}>함께 만들어가는 </span>
              <span style={{
                background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                연결실
              </span>
            </h2>
            <p style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: '#FFFFFF',
              fontWeight: '600'
            }}>
              실시간으로 업데이트되는 커뮤니티 활동 현황
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '80px'
          }}>
            {/* Stat 1 */}
            <div style={{
              padding: '40px',
              backgroundColor: 'rgba(26, 26, 26, 0.6)',
              borderRadius: '20px',
              border: '2px solid rgba(100, 100, 100, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>👥</div>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                color: '#FF1B8D',
                marginBottom: '10px',
                textShadow: '0 0 30px rgba(255, 27, 141, 0.6)'
              }}>
                1,247<span style={{ fontSize: '36px' }}>명</span>
              </div>
              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '600'
              }}>
                지금까지 연결된 사람들
              </p>
            </div>

            {/* Stat 2 */}
            <div style={{
              padding: '40px',
              backgroundColor: 'rgba(26, 26, 26, 0.6)',
              borderRadius: '20px',
              border: '2px solid rgba(100, 100, 100, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🎯</div>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                color: '#FFE400',
                marginBottom: '10px',
                textShadow: '0 0 30px rgba(255, 228, 0, 0.6)'
              }}>
                38<span style={{ fontSize: '36px' }}>개</span>
              </div>
              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '600'
              }}>
                이번 주 진행 중인 모임
              </p>
            </div>

            {/* Stat 3 */}
            <div style={{
              padding: '40px',
              backgroundColor: 'rgba(26, 26, 26, 0.6)',
              borderRadius: '20px',
              border: '2px solid rgba(100, 100, 100, 0.3)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>✨</div>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                color: '#00FFC6',
                marginBottom: '10px',
                textShadow: '0 0 30px rgba(0, 255, 198, 0.6)'
              }}>
                156<span style={{ fontSize: '36px' }}>개</span>
              </div>
              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '600'
              }}>
                완성된 컨텐츠 프로젝트
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '20px',
              color: '#FFFFFF',
              fontWeight: '600',
              marginBottom: '30px'
            }}>
              지금 바로 참여하고 새로운 사람들과 연결되세요
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => navigate('/events')}
                style={{
                  padding: '18px 36px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0A0A0A',
                  background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(255, 27, 141, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                커뮤니티 둘러보기
              </button>
              <button
                onClick={() => navigate('/mood-matching')}
                style={{
                  padding: '18px 36px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  background: 'transparent',
                  border: '2px solid #FFFFFF',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                내 취향 찾기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
