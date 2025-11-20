import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicGenres, MusicGenre } from '../data/genres';
import { GenreCard } from '../components/taste';
import { calculateMoodProfile, generateMoodDescription, getWeightPercentages } from '../utils/moodCalculator';
import { useToast } from '../contexts/ToastContext';

export default function MoodMatching() {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<MusicGenre[]>([]);
  const [showResult, setShowResult] = useState(false);

  const MAX_SELECTIONS = 4;

  const handleGenreClick = (genre: MusicGenre) => {
    const isAlreadySelected = selectedGenres.some((g) => g.id === genre.id);

    if (isAlreadySelected) {
      // 선택 해제
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    } else {
      // 선택 추가
      if (selectedGenres.length < MAX_SELECTIONS) {
        setSelectedGenres([...selectedGenres, genre]);

        // 4개 선택 완료 시 알림
        if (selectedGenres.length === MAX_SELECTIONS - 1) {
          toast.success('4개 장르 선택 완료! 결과 보기 버튼을 눌러주세요 🎉');
        }
      } else {
        toast.error('최대 4개까지만 선택할 수 있어요');
      }
    }
  };

  const handleShowResult = () => {
    if (selectedGenres.length === MAX_SELECTIONS) {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error(`${MAX_SELECTIONS - selectedGenres.length}개 더 선택해주세요`);
    }
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExpandedQuiz = () => {
    // ExpandedQuizPage로 이동
    navigate('/expanded-quiz');
  };

  const moodProfile = selectedGenres.length === MAX_SELECTIONS
    ? calculateMoodProfile(selectedGenres)
    : null;

  const moodDescription = selectedGenres.length === MAX_SELECTIONS && moodProfile
    ? generateMoodDescription(moodProfile, selectedGenres)
    : '';

  const weights = getWeightPercentages();

  if (showResult && moodProfile) {
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
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              🎵 당신의 음악 무드
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#DDDDDD',
                fontWeight: '600',
              }}
            >
              선택한 장르를 바탕으로 분석한 당신만의 음악 취향
            </p>
          </div>

          {/* 무드 프로필 차트 */}
          <div
            style={{
              padding: '40px',
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '24px',
              border: '2px solid #333333',
              marginBottom: '32px',
            }}
          >
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              무드 프로필
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              {[
                { key: 'energy', label: '에너지', emoji: '⚡', color: '#FF1B8D' },
                { key: 'intimacy', label: '친밀도', emoji: '💕', color: '#8B5CF6' },
                { key: 'creativity', label: '창의성', emoji: '🎨', color: '#00FFC6' },
                { key: 'nostalgia', label: '향수', emoji: '🌙', color: '#FFE400' },
              ].map((dimension) => (
                <div
                  key={dimension.key}
                  style={{
                    padding: '24px',
                    background: `${dimension.color}15`,
                    border: `2px solid ${dimension.color}40`,
                    borderRadius: '16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                    {dimension.emoji}
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#DDDDDD',
                      fontWeight: '700',
                      marginBottom: '8px',
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
                    {Math.round(moodProfile[dimension.key as keyof typeof moodProfile])}
                  </div>
                  <div
                    style={{
                      marginTop: '12px',
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${moodProfile[dimension.key as keyof typeof moodProfile]}%`,
                        height: '100%',
                        background: dimension.color,
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 설명 텍스트 */}
            <div
              style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  color: '#DDDDDD',
                  lineHeight: '1.8',
                  fontWeight: '600',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}
              >
                {moodDescription}
              </p>
            </div>
          </div>

          {/* 선택한 장르 리스트 */}
          <div
            style={{
              padding: '40px',
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '24px',
              border: '2px solid #333333',
              marginBottom: '32px',
            }}
          >
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              선택한 장르
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              {selectedGenres.map((genre, index) => (
                <div
                  key={genre.id}
                  style={{
                    padding: '20px',
                    background: `${genre.color}15`,
                    border: `2px solid ${genre.color}`,
                    borderRadius: '16px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '-12px',
                      padding: '8px 16px',
                      background: genre.color,
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '900',
                      color: '#0A0A0A',
                      boxShadow: `0 4px 12px ${genre.color}80`,
                    }}
                  >
                    {weights[index]}%
                  </div>

                  <div style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>
                    {genre.emoji}
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: '#FFFFFF',
                      marginBottom: '8px',
                      textAlign: 'center',
                    }}
                  >
                    {genre.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14px',
                      color: genre.color,
                      fontWeight: '700',
                      textAlign: 'center',
                    }}
                  >
                    {genre.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handleReset}
              style={{
                padding: '16px 40px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '18px',
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
              다시 선택하기
            </button>

            <button
              onClick={() => toast.success('공유 기능 준비 중입니다!')}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(255, 27, 141, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 27, 141, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 27, 141, 0.4)';
              }}
            >
              🔗 결과 공유하기
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            🎵 음악 취향 매칭
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#DDDDDD',
              fontWeight: '600',
              marginBottom: '12px',
            }}
          >
            당신의 음악 취향을 4가지 장르로 표현해보세요
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#999999',
              fontWeight: '600',
              marginBottom: '24px',
            }}
          >
            선택 순서가 중요해요! (1순위 50% → 2순위 30% → 3순위 15% → 4순위 5%)
          </p>

          {/* Expanded Quiz Button */}
          <button
            onClick={handleStartExpandedQuiz}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #8B5CF6, #00FFC6)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
              marginTop: '10px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.4)';
            }}
          >
            ✨ 확장된 무드 퀴즈 체험하기
          </button>
        </div>

        {/* 선택 진행 상태 */}
        <div
          style={{
            padding: '24px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '20px',
            border: '2px solid #333333',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#FFFFFF',
              }}
            >
              선택 진행 상황
            </h3>
            <div
              style={{
                fontSize: '24px',
                fontWeight: '900',
                color: selectedGenres.length === MAX_SELECTIONS ? '#00FFC6' : '#FF1B8D',
              }}
            >
              {selectedGenres.length} / {MAX_SELECTIONS}
            </div>
          </div>

          {/* 프로그레스 바 */}
          <div
            style={{
              height: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: `${(selectedGenres.length / MAX_SELECTIONS) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
                borderRadius: '6px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* 선택된 장르 썸네일 */}
          {selectedGenres.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {selectedGenres.map((genre, index) => (
                <div
                  key={genre.id}
                  style={{
                    padding: '12px 20px',
                    background: `${genre.color}20`,
                    border: `2px solid ${genre.color}`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: genre.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '900',
                      color: '#0A0A0A',
                    }}
                  >
                    {index + 1}
                  </div>
                  <span style={{ fontSize: '18px' }}>{genre.emoji}</span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                    }}
                  >
                    {genre.title}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 결과 보기 버튼 */}
          {selectedGenres.length === MAX_SELECTIONS && (
            <button
              onClick={handleShowResult}
              style={{
                width: '100%',
                padding: '16px',
                marginTop: '20px',
                background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: '900',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255, 27, 141, 0.5)',
                animation: 'pulse 2s infinite',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✨ 결과 보기 ✨
            </button>
          )}
        </div>

        {/* 장르 카드 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {musicGenres.map((genre) => {
            const selectionIndex = selectedGenres.findIndex((g) => g.id === genre.id);
            const isSelected = selectionIndex !== -1;

            return (
              <GenreCard
                key={genre.id}
                genre={genre}
                isSelected={isSelected}
                selectionOrder={isSelected ? selectionIndex + 1 : undefined}
                onClick={() => handleGenreClick(genre)}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(255, 27, 141, 0.5);
          }
          50% {
            box-shadow: 0 4px 30px rgba(255, 27, 141, 0.8), 0 0 40px rgba(0, 255, 198, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
