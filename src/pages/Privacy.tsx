export default function Privacy() {
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
            🔒 개인정보 처리방침
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#DDDDDD',
              fontWeight: '600',
            }}
          >
            심야 카페는 사용자의 개인정보를 소중히 생각합니다
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '40px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
          }}
        >
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FF1B8D',
                marginBottom: '16px',
              }}
            >
              1. 수집하는 개인정보
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#DDDDDD',
                lineHeight: '1.8',
                fontWeight: '600',
              }}
            >
              심야 카페는 현재 로컬 스토리지를 사용하여 사용자의 브라우저에 데이터를 저장합니다.
              서버로 개인정보를 전송하지 않으며, 모든 데이터는 사용자의 기기에만 저장됩니다.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FFE400',
                marginBottom: '16px',
              }}
            >
              2. 개인정보의 이용 목적
            </h2>
            <ul
              style={{
                fontSize: '16px',
                color: '#DDDDDD',
                lineHeight: '2',
                fontWeight: '600',
                paddingLeft: '20px',
              }}
            >
              <li>서비스 제공 및 개선</li>
              <li>사용자 맞춤 콘텐츠 제공</li>
              <li>커뮤니티 활동 지원</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#00FFC6',
                marginBottom: '16px',
              }}
            >
              3. 개인정보의 보관 및 파기
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#DDDDDD',
                lineHeight: '1.8',
                fontWeight: '600',
              }}
            >
              로컬 스토리지에 저장된 데이터는 사용자가 브라우저 데이터를 삭제하거나
              서비스를 탈퇴할 때까지 보관됩니다. 사용자는 언제든지 브라우저 설정을
              통해 데이터를 삭제할 수 있습니다.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#8B5CF6',
                marginBottom: '16px',
              }}
            >
              4. 사용자의 권리
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#DDDDDD',
                lineHeight: '1.8',
                fontWeight: '600',
              }}
            >
              사용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있습니다.
              브라우저의 개발자 도구를 통해 로컬 스토리지를 확인하고 관리할 수 있습니다.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FF1B8D',
                marginBottom: '16px',
              }}
            >
              5. 문의
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#DDDDDD',
                lineHeight: '1.8',
                fontWeight: '600',
              }}
            >
              개인정보 처리방침에 대한 문의사항이 있으시면 Contact 페이지를 통해
              연락해 주시기 바랍니다.
            </p>
          </section>

          <div
            style={{
              marginTop: '40px',
              padding: '20px',
              background: 'rgba(0, 255, 198, 0.1)',
              border: '2px solid rgba(0, 255, 198, 0.3)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#00FFC6',
                fontWeight: '700',
              }}
            >
              시행일: 2024년 1월 1일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
