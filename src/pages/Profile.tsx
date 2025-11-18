import { useState } from 'react';
import { Button, Input, Textarea } from '../components/common';
import { useToast } from '../contexts/ToastContext';

interface UserStats {
  connections: number;
  events: number;
  projects: number;
  level: number;
}

export default function Profile() {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '심야 유저',
    email: 'user@simyacafe.com',
    bio: '밤에 활동하는 크리에이터입니다. 디자인과 음악을 사랑합니다.',
    interests: ['디자인', '음악', '영화', '독서'],
    mood: '창작적인' as string
  });

  const [stats] = useState<UserStats>({
    connections: 47,
    events: 12,
    projects: 8,
    level: 5
  });

  const handleSave = () => {
    toast.success('프로필이 저장되었습니다!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      color: '#FFFFFF',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '900',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(255, 27, 141, 0.5))'
          }}>
            내 프로필
          </h1>
          <p style={{
            color: '#CCCCCC',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            나의 활동과 취향을 관리하세요
          </p>
        </div>

        {/* Profile Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px'
        }}>
          {/* Avatar Card */}
          <div style={{
            background: 'rgba(26, 26, 26, 0.9)',
            border: '2px solid rgba(100, 100, 100, 0.5)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
                padding: '4px',
                position: 'relative',
                display: 'inline-block'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '80px' }}>🌙</span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  backgroundColor: '#00FFC6',
                  color: '#0A0A0A',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  boxShadow: '0 0 20px rgba(0, 255, 198, 0.6)'
                }}>
                  {stats.level}
                </div>
              </div>
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: '10px'
            }}>
              {profileData.name}
            </h2>
            <p style={{
              color: '#00FFC6',
              fontWeight: '700',
              fontSize: '20px',
              marginBottom: '30px',
              textShadow: '0 0 10px rgba(0, 255, 198, 0.5)'
            }}>
              {profileData.mood}
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(26, 26, 26, 0.9)',
              border: '2px solid rgba(100, 100, 100, 0.5)',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>👥</div>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#FF1B8D',
                marginBottom: '10px',
                textShadow: '0 0 20px rgba(255, 27, 141, 0.6)'
              }}>
                {stats.connections}
              </div>
              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '600'
              }}>
                연결된 사람
              </p>
            </div>

            <div style={{
              background: 'rgba(26, 26, 26, 0.9)',
              border: '2px solid rgba(100, 100, 100, 0.5)',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>🎯</div>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#FFE400',
                marginBottom: '10px',
                textShadow: '0 0 20px rgba(255, 228, 0, 0.6)'
              }}>
                {stats.events}
              </div>
              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '600'
              }}>
                참여한 이벤트
              </p>
            </div>

            <div style={{
              background: 'rgba(26, 26, 26, 0.9)',
              border: '2px solid rgba(100, 100, 100, 0.5)',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '15px' }}>✨</div>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#00FFC6',
                marginBottom: '10px',
                textShadow: '0 0 20px rgba(0, 255, 198, 0.6)'
              }}>
                {stats.projects}
              </div>
              <p style={{
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: '600'
              }}>
                완성한 프로젝트
              </p>
            </div>
          </div>

          {/* Basic Info */}
          <div style={{
            background: 'rgba(26, 26, 26, 0.9)',
            border: '2px solid rgba(100, 100, 100, 0.5)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '36px' }}>📝</span> 기본 정보
              </h3>
              {!isEditing && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </Button>
              )}
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Input
                  label="이름"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
                <Input
                  label="이메일"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
                <Textarea
                  label="자기소개"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                />
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <Button variant="ghost" onClick={handleCancel}>
                    취소
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    저장
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#999999',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    이름
                  </label>
                  <p style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    {profileData.name}
                  </p>
                </div>
                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#999999',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    이메일
                  </label>
                  <p style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    {profileData.email}
                  </p>
                </div>
                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#999999',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    자기소개
                  </label>
                  <p style={{
                    color: '#DDDDDD',
                    fontSize: '18px',
                    lineHeight: '1.7'
                  }}>
                    {profileData.bio}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interests */}
          <div style={{
            background: 'rgba(26, 26, 26, 0.9)',
            border: '2px solid rgba(100, 100, 100, 0.5)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '36px' }}>🎨</span> 관심사
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              {profileData.interests.map((interest, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(90deg, rgba(255, 27, 141, 0.2) 0%, rgba(0, 255, 198, 0.2) 100%)',
                    border: '2px solid #00FFC6',
                    borderRadius: '50px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {interest}
                </div>
              ))}
              <button
                onClick={() => toast.info('관심사 추가 기능 준비 중입니다')}
                style={{
                  padding: '12px 24px',
                  border: '2px dashed #666666',
                  borderRadius: '50px',
                  fontWeight: '700',
                  color: '#999999',
                  fontSize: '16px',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00FFC6';
                  e.currentTarget.style.color = '#00FFC6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#666666';
                  e.currentTarget.style.color = '#999999';
                }}
              >
                + 추가
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'rgba(26, 26, 26, 0.9)',
            border: '2px solid rgba(100, 100, 100, 0.5)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '36px' }}>🔥</span> 최근 활동
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '🎯', text: '심야 독서 클럽 모임 참여', time: '2시간 전', color: '#FF1B8D' },
                { icon: '✨', text: '팟캐스트 에피소드 3 완성', time: '1일 전', color: '#FFE400' },
                { icon: '👥', text: '새로운 멤버 5명과 연결', time: '3일 전', color: '#00FFC6' },
              ].map((activity, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'rgba(18, 18, 18, 0.6)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(30, 30, 30, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(18, 18, 18, 0.6)'}
                >
                  <div style={{
                    fontSize: '40px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `${activity.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: '18px',
                      marginBottom: '6px'
                    }}>
                      {activity.text}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#999999',
                      fontWeight: '500'
                    }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div style={{
            background: 'rgba(26, 26, 26, 0.9)',
            border: '2px solid rgba(100, 100, 100, 0.5)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '36px' }}>⚙️</span> 설정
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Button
                variant="ghost"
                fullWidth
                className="justify-start"
                onClick={() => toast.info('알림 설정 페이지로 이동합니다')}
              >
                <span style={{ fontSize: '24px', marginRight: '12px' }}>🔔</span>
                알림 설정
              </Button>
              <Button
                variant="ghost"
                fullWidth
                className="justify-start"
                onClick={() => toast.info('프라이버시 설정 페이지로 이동합니다')}
              >
                <span style={{ fontSize: '24px', marginRight: '12px' }}>🔒</span>
                프라이버시 설정
              </Button>
              <Button
                variant="ghost"
                fullWidth
                className="justify-start"
                onClick={() => toast.info('계정 관리 페이지로 이동합니다')}
              >
                <span style={{ fontSize: '24px', marginRight: '12px' }}>👤</span>
                계정 관리
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
