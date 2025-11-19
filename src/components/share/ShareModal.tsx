import { useState, useRef, useCallback } from 'react';
import { Modal } from '../common';
import { ShareCard } from './ShareCard';
import {
  ShareContent,
  ShareCardTemplate,
  ShareCardOptions,
  SharePlatform,
} from '../../types/share';
import {
  elementToImage,
  downloadImage,
  copyToClipboard,
  nativeShare,
  getPlatformShareUrl,
  generateFilename,
  dataURLtoBlob,
  isWebShareSupported,
} from '../../utils/shareUtils';
import { useToast } from '../../contexts/ToastContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareContent;
}

export function ShareModal({ isOpen, onClose, content }: ShareModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ShareCardTemplate>('rich');
  const [options, setOptions] = useState<ShareCardOptions>({
    template: 'rich',
    includeQR: true,
    includeStats: true,
    includeQuote: true,
    includeCreatorPhoto: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const templates: { id: ShareCardTemplate; name: string; icon: string; desc: string }[] = [
    { id: 'minimal', name: 'Minimal', icon: '✨', desc: 'Simple & Clean' },
    { id: 'rich', name: 'Rich', icon: '🎨', desc: 'Full Details' },
    { id: 'story', name: 'Story', icon: '📱', desc: 'Instagram 9:16' },
    { id: 'feed', name: 'Feed', icon: '📷', desc: 'Square 1:1' },
    { id: 'wide', name: 'Wide', icon: '🖼️', desc: 'Landscape' },
  ];

  const handleTemplateChange = (template: ShareCardTemplate) => {
    setSelectedTemplate(template);
    setOptions({ ...options, template });
  };

  const handleOptionToggle = (key: keyof ShareCardOptions) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const generateImage = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null;

    setIsGenerating(true);
    try {
      const dataUrl = await elementToImage(cardRef.current, 'png');
      return dataUrl;
    } catch (error) {
      console.error('Image generation failed:', error);
      toast.error('이미지 생성에 실패했습니다');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (dataUrl) {
      const filename = generateFilename(content, selectedTemplate);
      downloadImage(dataUrl, filename);
      toast.success('이미지가 다운로드되었습니다!');
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(content.url);
    if (success) {
      toast.success('링크가 복사되었습니다!');
    } else {
      toast.error('링크 복사에 실패했습니다');
    }
  };

  const handleNativeShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    const blob = dataURLtoBlob(dataUrl);
    const result = await nativeShare(content, blob);

    if (result.success) {
      toast.success('공유되었습니다!');
    } else if (result.error !== 'Share cancelled') {
      toast.error('공유에 실패했습니다');
    }
  };

  const handlePlatformShare = (platform: SharePlatform) => {
    if (platform === 'copy') {
      handleCopyLink();
      return;
    }

    const url = getPlatformShareUrl(platform, content);
    window.open(url, '_blank', 'width=600,height=400');
    toast.success(`${platform}에 공유했습니다!`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          padding: '40px',
          maxWidth: '1000px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          borderRadius: '24px',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}
          >
            🔗 공유하기
          </h2>
          <p
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            카드 스타일을 선택하고 SNS에 공유하세요
          </p>
        </div>

        {/* Template Selection */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            카드 스타일
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
            }}
          >
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                style={{
                  padding: '16px',
                  background:
                    selectedTemplate === template.id
                      ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
                      : 'rgba(255,255,255,0.05)',
                  border:
                    selectedTemplate === template.id
                      ? '2px solid #FF1B8D'
                      : '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{template.icon}</div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    marginBottom: '4px',
                  }}
                >
                  {template.name}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.6)' }}>
                  {template.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            포함할 요소
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              { key: 'includeQR', label: 'QR 코드', icon: '📱' },
              { key: 'includeStats', label: '통계', icon: '📊' },
              { key: 'includeQuote', label: '인용구', icon: '💬' },
              { key: 'includeCreatorPhoto', label: '프로필', icon: '👤' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleOptionToggle(opt.key as keyof ShareCardOptions)}
                style={{
                  padding: '12px 16px',
                  background: options[opt.key as keyof ShareCardOptions]
                    ? 'rgba(255,27,141,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  border: options[opt.key as keyof ShareCardOptions]
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                  {opt.label}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '16px' }}>
                  {options[opt.key as keyof ShareCardOptions] ? '✓' : '○'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            미리보기
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.5)',
              padding: '24px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
            }}
          >
            <div style={{ transform: 'scale(0.4)', transformOrigin: 'center' }}>
              <ShareCard ref={cardRef} content={content} template={selectedTemplate} options={options} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            내보내기
          </div>

          {/* Download & Native Share */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              style={{
                flex: 1,
                padding: '16px',
                background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                cursor: isGenerating ? 'wait' : 'pointer',
                opacity: isGenerating ? 0.6 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              {isGenerating ? '⏳ 생성 중...' : '💾 이미지 다운로드'}
            </button>

            {isWebShareSupported() && (
              <button
                onClick={handleNativeShare}
                disabled={isGenerating}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: 'rgba(0,255,198,0.2)',
                  border: '2px solid #00FFC6',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '800',
                  cursor: isGenerating ? 'wait' : 'pointer',
                  opacity: isGenerating ? 0.6 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                📤 기기에서 공유
              </button>
            )}
          </div>

          {/* Platform Share Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
            }}
          >
            <button
              onClick={() => handlePlatformShare('instagram')}
              style={{
                padding: '12px',
                background: 'linear-gradient(135deg, #E1306C, #833AB4)',
                border: 'none',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Instagram
            </button>

            <button
              onClick={() => handlePlatformShare('kakaotalk')}
              style={{
                padding: '12px',
                background: '#FEE500',
                border: 'none',
                borderRadius: '10px',
                color: '#000000',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              KakaoTalk
            </button>

            <button
              onClick={() => handlePlatformShare('twitter')}
              style={{
                padding: '12px',
                background: '#1DA1F2',
                border: 'none',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Twitter
            </button>

            <button
              onClick={() => handlePlatformShare('facebook')}
              style={{
                padding: '12px',
                background: '#1877F2',
                border: 'none',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Facebook
            </button>

            <button
              onClick={() => handlePlatformShare('copy')}
              style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🔗 링크 복사
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}
