import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MoodRadarChart from '../components/result/MoodRadarChart';
import MoodDescription from '../components/result/MoodDescription';
import CategorySummary from '../components/result/CategorySummary';
import ShareButton from '../components/result/ShareButton';
import { calculateMoodProfile, generateMoodDescription } from '../utils/tasteCalculator';

interface Option {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string | null;
  description: string;
  tags: string[];
  moodScore: {
    energy: number;
    intimacy: number;
    creativity: number;
    nostalgia: number;
    depth: number;
    openness: number;
  };
}

interface CategorySelection {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  selections: {
    option: Option;
    order: number;
    weight: number;
  }[];
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 selections 가져오기
  const selections = (location.state?.selections as CategorySelection[]) || [];

  // selections가 없으면 홈으로 리다이렉트
  if (selections.length === 0) {
    navigate('/');
    return null;
  }

  // 무드 프로필 계산
  const moodProfile = useMemo(() => calculateMoodProfile(selections), [selections]);

  // 무드 설명 생성
  const moodDescription = useMemo(
    () => generateMoodDescription(moodProfile, selections),
    [moodProfile, selections]
  );

  const handleReset = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
        paddingTop: '80px',
        paddingBottom: '60px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #FF1B8D, #8B5CF6, #00FFC6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(255, 27, 141, 0.3)',
            }}
          >
            당신의 밤 무드 프로필
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 3vw, 24px)',
              color: '#BBBBBB',
              fontWeight: '700',
            }}
          >
            6가지 차원으로 분석한 당신만의 감성 지도
          </p>
        </div>

        {/* Mood Description */}
        <MoodDescription description={moodDescription} />

        {/* Mood Radar Chart */}
        <div
          style={{
            padding: '60px 20px',
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '50px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            무드 레이더 차트
          </h2>
          <MoodRadarChart moodProfile={moodProfile} />

          {/* Dimension Scores */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
              marginTop: '50px',
              padding: '0 20px',
            }}
          >
            {[
              { key: 'energy', label: '에너지', color: '#FF1B8D' },
              { key: 'intimacy', label: '친밀도', color: '#8B5CF6' },
              { key: 'creativity', label: '창의성', color: '#00FFC6' },
              { key: 'nostalgia', label: '시간성', color: '#FFE400' },
              { key: 'depth', label: '깊이', color: '#3B82F6' },
              { key: 'openness', label: '개방성', color: '#10B981' },
            ].map((dimension) => (
              <div
                key={dimension.key}
                style={{
                  padding: '20px',
                  background: `${dimension.color}10`,
                  border: `2px solid ${dimension.color}40`,
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    color: '#CCCCCC',
                    fontWeight: '700',
                    marginBottom: '10px',
                  }}
                >
                  {dimension.label}
                </div>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: '900',
                    color: dimension.color,
                  }}
                >
                  {Math.round(
                    moodProfile[dimension.key as keyof typeof moodProfile]
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Summary */}
        <div
          style={{
            marginBottom: '50px',
          }}
        >
          <CategorySummary selections={selections} />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '60px',
          }}
        >
          <ShareButton
            moodProfile={moodProfile}
            selections={selections}
            moodDescription={moodDescription}
          />

          <button
            onClick={handleReset}
            style={{
              padding: '16px 48px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '9999px',
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            다시 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
