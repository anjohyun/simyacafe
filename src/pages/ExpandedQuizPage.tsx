import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Stage1VisualMood from '../components/quiz/Stage1VisualMood';
import Stage2ContentDeepDive from '../components/quiz/Stage2ContentDeepDive';
import Stage3Aesthetic from '../components/quiz/Stage3Aesthetic';
import { useTasteStore } from '../stores/tasteStore';
import { usePointsStore } from '../stores/pointsStore';

export default function ExpandedQuizPage() {
  const navigate = useNavigate();
  const { completeQuiz } = useTasteStore();
  const { addPoints } = usePointsStore();

  const [currentStage, setCurrentStage] = useState(1);
  const [stage1Data, setStage1Data] = useState<any>(null);
  const [stage2Data, setStage2Data] = useState<any>(null);
  const [stage3Data, setStage3Data] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem(
      'quiz-progress',
      JSON.stringify({
        currentStage,
        stage1Data,
        stage2Data,
        stage3Data,
      })
    );
  }, [currentStage, stage1Data, stage2Data, stage3Data]);

  useEffect(() => {
    // Load saved progress
    const saved = localStorage.getItem('quiz-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.currentStage) setCurrentStage(parsed.currentStage);
        if (parsed.stage1Data) setStage1Data(parsed.stage1Data);
        if (parsed.stage2Data) setStage2Data(parsed.stage2Data);
        if (parsed.stage3Data) setStage3Data(parsed.stage3Data);
      } catch (e) {
        console.error('Failed to load quiz progress:', e);
      }
    }
  }, []);

  const handleStage1Complete = (selections: any) => {
    setStage1Data(selections);
    setCurrentStage(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage2Complete = (preferences: any) => {
    setStage2Data(preferences);
    setCurrentStage(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage3Complete = (aesthetics: any) => {
    setStage3Data(aesthetics);
    setShowConfetti(true);

    // 모든 데이터 수집 완료
    const fullProfile = {
      visualMood: stage1Data,
      contentPreferences: stage2Data,
      aestheticPreferences: aesthetics,
      timestamp: new Date(),
    };

    // Store에 저장
    completeQuiz({
      moodVector: calculateMoodVector(stage1Data),
      selections: convertToSelections(fullProfile),
      timestamp: new Date(),
    });

    // 포인트 지급
    addPoints({
      uid: 'user-123',
      type: 'online',
      action: 'moodQuizComplete',
      points: 100,
      metadata: {},
    });

    // Confetti 효과 후 결과 페이지로 이동
    setTimeout(() => {
      navigate('/result', {
        state: {
          selections: convertToSelections(fullProfile),
          fullProfile,
        },
      });

      // Clear quiz progress
      localStorage.removeItem('quiz-progress');
    }, 2000);
  };

  const calculateMoodVector = (visualMood: any) => {
    // Stage 1 데이터를 기반으로 무드 벡터 계산
    const weights = [0.5, 0.3, 0.15, 0.05];
    const moodVector = {
      energy: 0,
      intimacy: 0,
      creativity: 0,
      nostalgia: 0,
      depth: 0,
      openness: 0,
    };

    visualMood.forEach((card: any, index: number) => {
      const weight = weights[index];

      // 각 카드의 무드 점수를 가중치와 함께 합산
      if (card.id === 'kpop') {
        moodVector.energy += 95 * weight;
        moodVector.intimacy += 40 * weight;
        moodVector.creativity += 60 * weight;
        moodVector.nostalgia += 20 * weight;
        moodVector.depth += 35 * weight;
        moodVector.openness += 50 * weight;
      } else if (card.id === 'ballad') {
        moodVector.energy += 40 * weight;
        moodVector.intimacy += 85 * weight;
        moodVector.creativity += 45 * weight;
        moodVector.nostalgia += 50 * weight;
        moodVector.depth += 70 * weight;
        moodVector.openness += 35 * weight;
      } else if (card.id === 'graffiti') {
        moodVector.energy += 75 * weight;
        moodVector.intimacy += 50 * weight;
        moodVector.creativity += 95 * weight;
        moodVector.nostalgia += 30 * weight;
        moodVector.depth += 60 * weight;
        moodVector.openness += 90 * weight;
      } else if (card.id === 'retro') {
        moodVector.energy += 70 * weight;
        moodVector.intimacy += 55 * weight;
        moodVector.creativity += 40 * weight;
        moodVector.nostalgia += 95 * weight;
        moodVector.depth += 45 * weight;
        moodVector.openness += 30 * weight;
      }
    });

    return moodVector;
  };

  const convertToSelections = (fullProfile: any) => {
    // 결과 페이지에서 사용할 형식으로 변환
    const selections = [];

    // Visual Mood
    if (fullProfile.visualMood) {
      selections.push({
        categoryId: 'visual-mood',
        categoryTitle: '비주얼 무드',
        categoryIcon: '🎨',
        selections: fullProfile.visualMood.map((card: any, index: number) => ({
          option: {
            id: card.id,
            emoji: card.emoji,
            title: card.title,
            subtitle: card.description,
            description: card.activities.join(', '),
            tags: card.activities,
            moodScore: {
              energy: 0,
              intimacy: 0,
              creativity: 0,
              nostalgia: 0,
              depth: 0,
              openness: 0,
            },
          },
          order: index + 1,
          weight: [50, 30, 15, 5][index],
        })),
      });
    }

    // Content Preferences (압축)
    if (fullProfile.contentPreferences) {
      const { music, books } = fullProfile.contentPreferences;

      if (music.activities.length > 0) {
        selections.push({
          categoryId: 'music',
          categoryTitle: '음악',
          categoryIcon: '🎵',
          selections: [
            {
              option: {
                id: 'music-prefs',
                emoji: '🎵',
                title: '음악 취향',
                subtitle: music.genres.slice(0, 3).join(', '),
                description: music.activities.join(' / '),
                tags: music.genres,
                moodScore: {
                  energy: 70,
                  intimacy: 60,
                  creativity: 75,
                  nostalgia: 50,
                  depth: 60,
                  openness: 70,
                },
              },
              order: 1,
              weight: 100,
            },
          ],
        });
      }

      if (books.activities.length > 0) {
        selections.push({
          categoryId: 'books',
          categoryTitle: '독서',
          categoryIcon: '📚',
          selections: [
            {
              option: {
                id: 'books-prefs',
                emoji: '📚',
                title: '독서 취향',
                subtitle: books.genres.slice(0, 3).join(', '),
                description: books.activities.join(' / '),
                tags: books.genres,
                moodScore: {
                  energy: 40,
                  intimacy: 80,
                  creativity: 70,
                  nostalgia: 60,
                  depth: 85,
                  openness: 65,
                },
              },
              order: 1,
              weight: 100,
            },
          ],
        });
      }
    }

    return selections;
  };

  const progressPercentage = (currentStage / 3) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
        paddingTop: '80px',
        paddingBottom: '60px',
      }}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              fontSize: '120px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: '20px' }}>🎉</div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #FF1B8D, #FFE400, #00FFC6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              완료!
            </div>
          </motion.div>
        </motion.div>
      )}

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* Overall Progress */}
        <div
          style={{
            marginBottom: '40px',
            padding: '20px',
            background: 'rgba(26, 26, 26, 0.6)',
            borderRadius: '16px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
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
            <div>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                }}
              >
                단계 {currentStage} / 3
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: '#999999',
                  marginLeft: '12px',
                  fontWeight: '600',
                }}
              >
                약 {3 - currentStage + 2}분 남음
              </span>
            </div>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#00FFC6',
              }}
            >
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div
            style={{
              height: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #FF1B8D, #FFE400, #00FFC6)',
                borderRadius: '6px',
              }}
            />
          </div>

          {/* Stage Indicators */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
              gap: '12px',
            }}
          >
            {[
              { id: 1, label: '비주얼 무드', icon: '🎨' },
              { id: 2, label: '콘텐츠 취향', icon: '📚' },
              { id: 3, label: '미학 & 사회', icon: '✨' },
            ].map((stage) => (
              <div
                key={stage.id}
                style={{
                  flex: 1,
                  padding: '12px',
                  background:
                    currentStage === stage.id
                      ? 'rgba(255, 27, 141, 0.2)'
                      : currentStage > stage.id
                      ? 'rgba(0, 255, 198, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                  border:
                    currentStage === stage.id
                      ? '2px solid #FF1B8D'
                      : currentStage > stage.id
                      ? '2px solid #00FFC6'
                      : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stage.icon}</div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color:
                      currentStage === stage.id
                        ? '#FF1B8D'
                        : currentStage > stage.id
                        ? '#00FFC6'
                        : '#666666',
                  }}
                >
                  {stage.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Stages */}
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <Stage1VisualMood key="stage1" onComplete={handleStage1Complete} />
          )}
          {currentStage === 2 && (
            <Stage2ContentDeepDive
              key="stage2"
              onComplete={handleStage2Complete}
              onBack={() => setCurrentStage(1)}
            />
          )}
          {currentStage === 3 && (
            <Stage3Aesthetic
              key="stage3"
              onComplete={handleStage3Complete}
              onBack={() => setCurrentStage(2)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
