import { forwardRef, useEffect, useState } from 'react';
import {
  ShareContent,
  ShareCardTemplate,
  ShareCardOptions,
  SHARE_CARD_DIMENSIONS,
} from '../../types/share';
import { generateQRCode, formatShareCount } from '../../utils/shareUtils';

interface ShareCardProps {
  content: ShareContent;
  template: ShareCardTemplate;
  options: ShareCardOptions;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ content, template, options }, ref) => {
    const [qrCode, setQrCode] = useState<string>('');
    const dimensions = SHARE_CARD_DIMENSIONS[template];

    useEffect(() => {
      if (options.includeQR) {
        generateQRCode(content.url).then(setQrCode);
      }
    }, [options.includeQR, content.url]);

    const renderMinimalCard = () => (
      <div
        ref={ref}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          background: content.moodColor || '#1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '24px',
              lineHeight: '1.2',
            }}
          >
            {content.title}
          </div>

          <div
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '40px',
              maxWidth: '600px',
            }}
          >
            {content.description}
          </div>

          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '32px' }}>✨</span>
            {content.creatorName}
          </div>
        </div>

        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            fontSize: '16px',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          밤사이 연결실
        </div>

        {/* QR Code */}
        {options.includeQR && qrCode && (
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              padding: '16px',
              background: '#FFFFFF',
              borderRadius: '12px',
            }}
          >
            <img src={qrCode} alt="QR Code" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
      </div>
    );

    const renderRichCard = () => (
      <div
        ref={ref}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          background: `linear-gradient(135deg, ${content.moodColor || '#1a1a1a'} 0%, #0a0a0a 100%)`,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header with Creator Info */}
        <div
          style={{
            padding: '40px 50px',
            borderBottom: '2px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {options.includeCreatorPhoto && content.creatorAvatar && (
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
              }}
            >
              {content.creatorAvatar}
            </div>
          )}
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF' }}>
              {content.creatorName}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: 'rgba(255,255,255,0.6)' }}>
              {content.type === 'book' && '책 소개'}
              {content.type === 'music' && '음악 공유'}
              {content.type === 'night' && '밤 패키지'}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '24px',
              lineHeight: '1.2',
            }}
          >
            {content.title}
          </div>

          <div
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '32px',
              lineHeight: '1.5',
            }}
          >
            {content.description}
          </div>

          {options.includeQuote && content.quote && (
            <div
              style={{
                padding: '24px 32px',
                background: 'rgba(255,255,255,0.05)',
                borderLeft: '4px solid #FF1B8D',
                borderRadius: '8px',
                fontSize: '20px',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                marginTop: 'auto',
              }}
            >
              "{content.quote}"
            </div>
          )}

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
              {content.tags.slice(0, 4).map((tag, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 20px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Stats and QR */}
        <div
          style={{
            padding: '30px 50px',
            borderTop: '2px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {options.includeStats && content.stats && (
            <div style={{ display: 'flex', gap: '32px' }}>
              {content.stats.likes && (
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>
                  ❤️ {formatShareCount(content.stats.likes)}
                </div>
              )}
              {content.stats.views && (
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>
                  👀 {formatShareCount(content.stats.views)}
                </div>
              )}
              {content.stats.shares && (
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>
                  🔗 {formatShareCount(content.stats.shares)}
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {options.includeQR && qrCode && (
              <div
                style={{
                  padding: '12px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                }}
              >
                <img src={qrCode} alt="QR" style={{ width: '80px', height: '80px' }} />
              </div>
            )}
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(255,255,255,0.5)' }}>
              밤사이 연결실
            </div>
          </div>
        </div>
      </div>
    );

    const renderStoryCard = () => (
      <div
        ref={ref}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          background: `linear-gradient(180deg, ${content.moodColor || '#1a1a1a'} 0%, #0a0a0a 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,27,141,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Top Section */}
        <div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: '800',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '16px',
            }}
          >
            {content.mood || content.type.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: '900',
              color: '#FFFFFF',
              lineHeight: '1.1',
              marginBottom: '32px',
            }}
          >
            {content.title}
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.4',
            }}
          >
            {content.description}
          </div>
        </div>

        {/* Middle Section - Quote or Tags */}
        <div>
          {options.includeQuote && content.quote && (
            <div
              style={{
                padding: '40px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '24px',
                fontSize: '32px',
                fontStyle: 'italic',
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: '1.5',
              }}
            >
              "{content.quote}"
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {options.includeCreatorPhoto && content.creatorAvatar && (
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px',
                }}
              >
                {content.creatorAvatar}
              </div>
            )}
            <div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF' }}>
                {content.creatorName}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: 'rgba(255,255,255,0.6)' }}>
                밤사이 연결실
              </div>
            </div>
          </div>

          {options.includeQR && qrCode && (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '20px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                }}
              >
                <img src={qrCode} alt="QR" style={{ width: '120px', height: '120px' }} />
              </div>
              <div
                style={{
                  marginTop: '16px',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                QR 코드를 스캔하세요
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const renderFeedCard = () => renderRichCard(); // Feed uses same as Rich
    const renderWideCard = () => (
      <div
        ref={ref}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          background: `linear-gradient(90deg, ${content.moodColor || '#1a1a1a'} 0%, #0a0a0a 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left Content */}
        <div style={{ flex: 1, maxWidth: '700px' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '12px',
            }}
          >
            {content.creatorName} • 밤사이 연결실
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '16px',
              lineHeight: '1.2',
            }}
          >
            {content.title}
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.4',
            }}
          >
            {content.description}
          </div>

          {options.includeStats && content.stats && (
            <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
              {content.stats.likes && (
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>
                  ❤️ {formatShareCount(content.stats.likes)}
                </div>
              )}
              {content.stats.views && (
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>
                  👀 {formatShareCount(content.stats.views)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right QR Code */}
        {options.includeQR && qrCode && (
          <div
            style={{
              padding: '24px',
              background: '#FFFFFF',
              borderRadius: '16px',
            }}
          >
            <img src={qrCode} alt="QR" style={{ width: '140px', height: '140px' }} />
          </div>
        )}
      </div>
    );

    switch (template) {
      case 'minimal':
        return renderMinimalCard();
      case 'rich':
        return renderRichCard();
      case 'story':
        return renderStoryCard();
      case 'feed':
        return renderFeedCard();
      case 'wide':
        return renderWideCard();
      default:
        return renderMinimalCard();
    }
  }
);

ShareCard.displayName = 'ShareCard';
