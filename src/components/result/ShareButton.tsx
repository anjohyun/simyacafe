import { useState } from 'react';
import {
  generateShareImage,
  copyImageToClipboard,
  downloadImage,
} from '../../utils/shareImageGenerator';

interface MoodProfile {
  energy: number;
  intimacy: number;
  creativity: number;
  nostalgia: number;
  depth: number;
  openness: number;
}

interface MoodDescription {
  summary: string;
  traits: string[];
  primaryDimensions: string[];
}

interface CategorySelection {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  selections: any[];
}

interface ShareButtonProps {
  moodProfile: MoodProfile;
  selections: CategorySelection[];
  moodDescription: MoodDescription;
}

export default function ShareButton({
  moodProfile,
  selections,
  moodDescription,
}: ShareButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleShare = async () => {
    setIsGenerating(true);

    try {
      // 이미지 생성
      const imageDataUrl = await generateShareImage(
        moodProfile,
        selections,
        moodDescription
      );

      // 클립보드에 복사 시도
      const copied = await copyImageToClipboard(imageDataUrl);

      if (copied) {
        showToastMessage('✅ 클립보드에 복사되었습니다!');
      } else {
        // 복사 실패 시 다운로드
        downloadImage(imageDataUrl);
        showToastMessage('📥 이미지가 다운로드되었습니다!');
      }
    } catch (error) {
      console.error('Share error:', error);
      showToastMessage('❌ 공유 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={isGenerating}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: '16px 48px',
          background: isGenerating
            ? 'rgba(255, 255, 255, 0.1)'
            : 'linear-gradient(135deg, #FF1B8D, #8B5CF6)',
          border: 'none',
          borderRadius: '9999px',
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: '800',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          boxShadow: isGenerating
            ? 'none'
            : isHovered
            ? '0 8px 30px rgba(255, 27, 141, 0.6)'
            : '0 4px 20px rgba(255, 27, 141, 0.4)',
          transition: 'all 0.3s ease',
          transform: isHovered && !isGenerating ? 'translateY(-2px)' : 'translateY(0)',
          opacity: isGenerating ? 0.6 : 1,
        }}
      >
        {isGenerating ? '생성 중...' : '🎨 내 무드 공유하기'}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: `translateX(-50%) translateY(${showToast ? '0' : '20px'})`,
            background: '#10B981',
            color: '#FFFFFF',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '800',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
            zIndex: 9999,
            opacity: showToast ? 1 : 0,
            transition: 'all 0.4s ease',
            textAlign: 'center',
          }}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
