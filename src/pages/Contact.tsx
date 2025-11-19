import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('모든 필수 항목을 입력해주세요');
      return;
    }

    // TODO: 실제 이메일 전송 기능 구현
    toast.success('문의가 성공적으로 전송되었습니다!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        paddingTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #FF1B8D, #FFE400, #00FFC6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}
          >
            💬 문의하기
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#DDDDDD',
              fontWeight: '600',
            }}
          >
            궁금한 점이나 제안사항이 있으시면 언제든지 연락주세요
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Contact Info Card */}
          <div
            style={{
              padding: '32px',
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '24px',
              border: '2px solid #333333',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}
            >
              연락처 정보
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>📧</span>
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#999999',
                      fontWeight: '600',
                    }}
                  >
                    이메일
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#00FFC6',
                      fontWeight: '700',
                    }}
                  >
                    contact@simyacafe.com
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>🌙</span>
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#999999',
                      fontWeight: '600',
                    }}
                  >
                    운영 시간
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#FFE400',
                      fontWeight: '700',
                    }}
                  >
                    평일 22:00 - 03:00
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>📍</span>
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#999999',
                      fontWeight: '600',
                    }}
                  >
                    위치
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#FF1B8D',
                      fontWeight: '700',
                    }}
                  >
                    온라인 (추후 오프라인 공간 오픈 예정)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div
            style={{
              padding: '32px',
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '24px',
              border: '2px solid #333333',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}
            >
              소셜 미디어
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: 'rgba(255, 27, 141, 0.1)',
                  border: '2px solid rgba(255, 27, 141, 0.3)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 27, 141, 0.2)';
                  e.currentTarget.style.borderColor = '#FF1B8D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 27, 141, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 27, 141, 0.3)';
                }}
              >
                <span style={{ fontSize: '24px' }}>📸</span>
                <span
                  style={{
                    fontSize: '16px',
                    color: '#FFFFFF',
                    fontWeight: '700',
                  }}
                >
                  Instagram
                </span>
              </a>

              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: 'rgba(0, 255, 198, 0.1)',
                  border: '2px solid rgba(0, 255, 198, 0.3)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 198, 0.2)';
                  e.currentTarget.style.borderColor = '#00FFC6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 198, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 198, 0.3)';
                }}
              >
                <span style={{ fontSize: '24px' }}>💬</span>
                <span
                  style={{
                    fontSize: '16px',
                    color: '#FFFFFF',
                    fontWeight: '700',
                  }}
                >
                  카카오톡 오픈채팅
                </span>
              </a>

              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  background: 'rgba(255, 228, 0, 0.1)',
                  border: '2px solid rgba(255, 228, 0, 0.3)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 228, 0, 0.2)';
                  e.currentTarget.style.borderColor = '#FFE400';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 228, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 228, 0, 0.3)';
                }}
              >
                <span style={{ fontSize: '24px' }}>🐦</span>
                <span
                  style={{
                    fontSize: '16px',
                    color: '#FFFFFF',
                    fontWeight: '700',
                  }}
                >
                  Twitter
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            padding: '40px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '32px',
            }}
          >
            메시지 보내기
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#DDDDDD',
                  marginBottom: '8px',
                }}
              >
                이름 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#DDDDDD',
                  marginBottom: '8px',
                }}
              >
                이메일 *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#DDDDDD',
                  marginBottom: '8px',
                }}
              >
                제목
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="문의 제목"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#DDDDDD',
                  marginBottom: '8px',
                }}
              >
                메시지 *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="문의 내용을 입력해주세요..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '600',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 27, 141, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
