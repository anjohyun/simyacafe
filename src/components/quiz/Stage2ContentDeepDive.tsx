import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContentPreferences {
  music: {
    activities: string[];
    genres: string[];
    artists: string[];
  };
  books: {
    activities: string[];
    genres: string[];
    recentBook: string;
  };
  visualArts: {
    activities: string[];
    styles: string[];
  };
  food: {
    activities: string[];
    preferences: string[];
  };
}

const CONTENT_CATEGORIES = [
  {
    id: 'music',
    icon: '🎵',
    title: '음악',
    question: '음악과 관련해서 주로 뭐 해?',
    activities: [
      '그냥 감상만 해',
      '공연/페스티벌 가는 거 좋아해',
      '직접 작곡하거나 연주해',
      '노래방에서 부르는 거 좋아해',
      '플레이리스트 만드는 게 취미야',
      '음악 리뷰/비평 쓰는 거 좋아해',
    ],
    subQuestion: '어떤 장르를 좋아해?',
    chips: [
      'K-POP',
      '인디',
      '힙합',
      '재즈',
      '클래식',
      '일렉트로니카',
      'R&B',
      '포크',
      '락',
      '발라드',
      'EDM',
      '트로트',
    ],
  },
  {
    id: 'books',
    icon: '📚',
    title: '책',
    question: '책은 어떻게 즐겨?',
    activities: [
      '혼자 조용히 읽기',
      '북클럽/독서 모임 참여',
      '필사하거나 메모하면서 읽기',
      '서평 작성하거나 SNS 공유',
      '작가 강연회 가기',
    ],
    subQuestion: '주로 어떤 장르 읽어?',
    chips: [
      '소설',
      '에세이',
      '시집',
      '자기계발',
      '철학',
      '과학',
      '역사',
      '예술',
      '추리',
      '판타지',
      '로맨스',
      '공포',
    ],
  },
  {
    id: 'visualArts',
    icon: '🎨',
    title: '시각 예술',
    question: '미술이나 시각 예술은?',
    activities: [
      '전시회 자주 가',
      '작품 사진 찍어서 간직해',
      '직접 그림 그리거나 만들어',
      '아트북이나 도록 수집해',
      '전시 기획이나 큐레이션 관심 있어',
    ],
    subQuestion: '어떤 스타일이 좋아?',
    chips: [
      '추상화',
      '사실주의',
      '팝아트',
      '사진',
      '설치미술',
      '디지털아트',
      '조각',
      '일러스트',
    ],
  },
  {
    id: 'food',
    icon: '🍽️',
    title: '음식 & 음료',
    question: '먹고 마시는 거는?',
    activities: [
      '직접 요리하는 거 좋아해',
      '맛집 탐방하는 게 취미야',
      '와인/커피 페어링에 관심 많아',
      '음식 사진 찍고 리뷰 쓰는 거 좋아해',
    ],
    subQuestion: '선호하는 F&B는?',
    chips: ['와인', '커피', '칵테일', '위스키', '차(Tea)', '맥주', '디저트', '스트리트푸드'],
  },
];

interface Stage2Props {
  onComplete: (preferences: ContentPreferences) => void;
  onBack: () => void;
}

export default function Stage2ContentDeepDive({ onComplete, onBack }: Stage2Props) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [preferences, setPreferences] = useState<any>({
    music: { activities: [], genres: [], artists: [] },
    books: { activities: [], genres: [], recentBook: '' },
    visualArts: { activities: [], styles: [] },
    food: { activities: [], preferences: [] },
  });

  const currentCategory = CONTENT_CATEGORIES[currentCategoryIndex];
  const categoryId = currentCategory.id;

  const handleActivityToggle = (activity: string) => {
    const current = preferences[categoryId].activities || [];
    if (current.includes(activity)) {
      setPreferences({
        ...preferences,
        [categoryId]: {
          ...preferences[categoryId],
          activities: current.filter((a: string) => a !== activity),
        },
      });
    } else {
      setPreferences({
        ...preferences,
        [categoryId]: {
          ...preferences[categoryId],
          activities: [...current, activity],
        },
      });
    }
  };

  const handleChipToggle = (chip: string) => {
    const key = categoryId === 'music' ? 'genres' : categoryId === 'books' ? 'genres' : categoryId === 'visualArts' ? 'styles' : 'preferences';
    const current = preferences[categoryId][key] || [];

    if (current.includes(chip)) {
      setPreferences({
        ...preferences,
        [categoryId]: {
          ...preferences[categoryId],
          [key]: current.filter((c: string) => c !== chip),
        },
      });
    } else {
      if (current.length < 5) {
        setPreferences({
          ...preferences,
          [categoryId]: {
            ...preferences[categoryId],
            [key]: [...current, chip],
          },
        });
      }
    }
  };

  const handleNext = () => {
    if (currentCategoryIndex < CONTENT_CATEGORIES.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    const current = preferences[categoryId];
    return current.activities && current.activities.length > 0;
  };

  const getSelectionKey = () => {
    return categoryId === 'music' ? 'genres' : categoryId === 'books' ? 'genres' : categoryId === 'visualArts' ? 'styles' : 'preferences';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '40px 20px',
      }}
    >
      {/* Progress */}
      <div
        style={{
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#FFFFFF',
            }}
          >
            카테고리 {currentCategoryIndex + 1} / {CONTENT_CATEGORIES.length}
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#00FFC6',
            }}
          >
            {Math.round(((currentCategoryIndex + 1) / CONTENT_CATEGORIES.length) * 100)}%
          </span>
        </div>
        <div
          style={{
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((currentCategoryIndex + 1) / CONTENT_CATEGORIES.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
            }}
          />
        </div>
      </div>

      {/* Category Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{
            fontSize: '80px',
            marginBottom: '20px',
          }}
        >
          {currentCategory.icon}
        </motion.div>
        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '16px',
          }}
        >
          {currentCategory.title}
        </h2>
        <p
          style={{
            fontSize: '20px',
            color: '#BBBBBB',
            fontWeight: '700',
          }}
        >
          {currentCategory.question}
        </p>
      </div>

      {/* Activities Selection */}
      <div
        style={{
          marginBottom: '50px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          활동 선택 (복수 선택 가능)
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          {currentCategory.activities.map((activity) => {
            const isSelected = preferences[categoryId].activities?.includes(activity);

            return (
              <motion.button
                key={activity}
                onClick={() => handleActivityToggle(activity)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '20px',
                  background: isSelected
                    ? 'rgba(255, 27, 141, 0.2)'
                    : 'rgba(26, 26, 26, 0.8)',
                  border: isSelected
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: isSelected ? '#FF1B8D' : 'rgba(255, 255, 255, 0.3)',
                    background: isSelected ? '#FF1B8D' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  {isSelected && '✓'}
                </div>
                {activity}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Genres/Styles Selection */}
      <div
        style={{
          marginBottom: '50px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          {currentCategory.subQuestion}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: '#999999',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          최대 5개까지 선택 가능
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {currentCategory.chips.map((chip) => {
            const key = getSelectionKey();
            const isSelected = preferences[categoryId][key]?.includes(chip);

            return (
              <motion.button
                key={chip}
                onClick={() => handleChipToggle(chip)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  background: isSelected
                    ? 'linear-gradient(135deg, #FF1B8D, #8B5CF6)'
                    : 'rgba(26, 26, 26, 0.8)',
                  border: isSelected
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {chip}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
        }}
      >
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '16px 40px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '800',
            cursor: 'pointer',
          }}
        >
          ← 이전
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!canProceed()}
          whileHover={canProceed() ? { scale: 1.05 } : {}}
          whileTap={canProceed() ? { scale: 0.95 } : {}}
          style={{
            padding: '16px 40px',
            background: canProceed()
              ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '800',
            cursor: canProceed() ? 'pointer' : 'not-allowed',
            opacity: canProceed() ? 1 : 0.5,
          }}
        >
          {currentCategoryIndex === CONTENT_CATEGORIES.length - 1
            ? '다음 단계 →'
            : '다음 카테고리 →'}
        </motion.button>
      </div>
    </motion.div>
  );
}
