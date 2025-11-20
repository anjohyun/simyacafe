import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';

interface MoodCard {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  activities: string[];
  colorPalette: string[];
}

const MOOD_CARDS: MoodCard[] = [
  {
    id: 'kpop',
    title: 'K-POP',
    emoji: '🎤',
    color: '#FF1B8D',
    description: '에너지 넘치는 메인스트림',
    activities: ['공연 관람', '친구와 공유', '춤추기'],
    colorPalette: ['#FF1B8D', '#FF69B4', '#FFB6C1'],
  },
  {
    id: 'ballad',
    title: '발라드',
    emoji: '🎹',
    color: '#8B5CF6',
    description: '감성 가득한 보컬 중심',
    activities: ['혼자 듣기', '감상하기', '위로받기'],
    colorPalette: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
  },
  {
    id: 'graffiti',
    title: '그래피티',
    emoji: '🎨',
    color: '#00FFC6',
    description: '자유로운 스트리트 아트',
    activities: ['창작하기', '탐험하기', '표현하기'],
    colorPalette: ['#00FFC6', '#34D399', '#6EE7B7'],
  },
  {
    id: 'retro',
    title: '레트로',
    emoji: '📻',
    color: '#FFE400',
    description: '추억 속 그 시절',
    activities: ['추억하기', '수집하기', '공유하기'],
    colorPalette: ['#FFE400', '#FCD34D', '#FDE68A'],
  },
];

interface Stage1Props {
  onComplete: (selections: MoodCard[]) => void;
}

export default function Stage1VisualMood({ onComplete }: Stage1Props) {
  const [selectedCards, setSelectedCards] = useState<MoodCard[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (card: MoodCard) => {
    const isSelected = selectedCards.some((c) => c.id === card.id);

    if (isSelected) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else {
      if (selectedCards.length < 4) {
        setSelectedCards([...selectedCards, card]);
      }
    }
  };

  const handleNext = () => {
    if (selectedCards.length === 4) {
      onComplete(selectedCards);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #FF1B8D, #FFE400, #00FFC6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
          }}
        >
          당신의 무드를 선택하세요
        </motion.h1>
        <p
          style={{
            fontSize: '18px',
            color: '#BBBBBB',
            fontWeight: '600',
            marginBottom: '10px',
          }}
        >
          끌리는 순서대로 4개를 선택해주세요
        </p>
        <p
          style={{
            fontSize: '14px',
            color: '#999999',
            fontWeight: '600',
          }}
        >
          선택 순서가 당신의 무드를 결정합니다
        </p>
      </div>

      {/* Selected Cards Preview */}
      {selectedCards.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          style={{
            marginBottom: '40px',
            padding: '20px',
            background: 'rgba(26, 26, 26, 0.6)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: '900',
                color: selectedCards.length === 4 ? '#00FFC6' : '#FF1B8D',
              }}
            >
              {selectedCards.length} / 4 선택됨
            </span>
          </div>

          <Reorder.Group
            axis="x"
            values={selectedCards}
            onReorder={setSelectedCards}
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {selectedCards.map((card, index) => (
              <Reorder.Item
                key={card.id}
                value={card}
                style={{
                  padding: '16px 24px',
                  background: `${card.color}20`,
                  border: `2px solid ${card.color}`,
                  borderRadius: '16px',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '900',
                    color: '#0A0A0A',
                  }}
                >
                  {index + 1}
                </div>
                <span style={{ fontSize: '24px' }}>{card.emoji}</span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                  }}
                >
                  {card.title}
                </span>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <p
            style={{
              textAlign: 'center',
              fontSize: '13px',
              color: '#999999',
              marginTop: '16px',
              fontWeight: '600',
            }}
          >
            💡 드래그해서 순서를 바꿀 수 있어요
          </p>
        </motion.div>
      )}

      {/* Mood Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '50px',
        }}
      >
        {MOOD_CARDS.map((card) => {
          const isSelected = selectedCards.some((c) => c.id === card.id);
          const selectionOrder = selectedCards.findIndex((c) => c.id === card.id);

          return (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card)}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '40px 30px',
                background: isSelected
                  ? `linear-gradient(135deg, ${card.color}30, ${card.color}10)`
                  : 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(20px)',
                border: isSelected
                  ? `3px solid ${card.color}`
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'left',
              }}
            >
              {/* Glow Effect */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at center, ${card.color}20, transparent)`,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Selection Badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '-12px',
                    width: '48px',
                    height: '48px',
                    background: card.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '900',
                    color: '#0A0A0A',
                    boxShadow: `0 4px 20px ${card.color}80`,
                  }}
                >
                  {selectionOrder + 1}
                </motion.div>
              )}

              {/* Emoji */}
              <motion.div
                animate={hoveredCard === card.id ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  fontSize: '64px',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                {card.emoji}
              </motion.div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  marginBottom: '10px',
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#BBBBBB',
                  marginBottom: '20px',
                  fontWeight: '600',
                }}
              >
                {card.description}
              </p>

              {/* Activities */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '20px',
                }}
              >
                {card.activities.map((activity, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#999999',
                      fontWeight: '600',
                    }}
                  >
                    {activity}
                  </span>
                ))}
              </div>

              {/* Color Palette */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {card.colorPalette.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: color,
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <motion.button
          onClick={handleNext}
          disabled={selectedCards.length !== 4}
          whileHover={selectedCards.length === 4 ? { scale: 1.05 } : {}}
          whileTap={selectedCards.length === 4 ? { scale: 0.95 } : {}}
          style={{
            padding: '18px 60px',
            background:
              selectedCards.length === 4
                ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
                : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '16px',
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: '900',
            cursor: selectedCards.length === 4 ? 'pointer' : 'not-allowed',
            opacity: selectedCards.length === 4 ? 1 : 0.5,
            boxShadow:
              selectedCards.length === 4 ? '0 4px 30px rgba(255, 27, 141, 0.5)' : 'none',
          }}
        >
          {selectedCards.length === 4 ? '다음 단계 →' : `${4 - selectedCards.length}개 더 선택하세요`}
        </motion.button>
      </div>
    </motion.div>
  );
}
