import { useState } from 'react';
import { motion } from 'framer-motion';

interface AestheticPreferences {
  colors: string[];
  tone: { warmth: number; brightness: number };
  moodKeywords: string[];
  trendSensitivity: number;
  groupSize: 'solo' | 'pair' | 'small' | 'party';
  alcoholPreference: 'yes' | 'no' | 'occasional' | 'no-matter';
  timeSlots: string[];
  spacePreference: string[];
}

const COLOR_PRESETS = [
  { name: '네온 핑크', hex: '#FF1B8D' },
  { name: '일렉트릭 민트', hex: '#00FFC6' },
  { name: '일렉트릭 옐로우', hex: '#FFE400' },
  { name: '딥 퍼플', hex: '#8B5CF6' },
  { name: '미드나잇 블루', hex: '#1E3A8A' },
  { name: '선셋 오렌지', hex: '#FF6B35' },
  { name: '포레스트 그린', hex: '#10B981' },
  { name: '로즈 골드', hex: '#F9A8D4' },
  { name: '다크 그레이', hex: '#374151' },
  { name: '화이트', hex: '#F9FAFB' },
];

const TIME_SLOTS = [
  { id: 'evening', label: '저녁 (18-21시)', emoji: '🌆' },
  { id: 'night', label: '밤 (21-24시)', emoji: '🌃' },
  { id: 'latenight', label: '심야 (00-03시)', emoji: '🌙' },
  { id: 'dawn', label: '새벽 (03-06시)', emoji: '🌅' },
];

const SPACE_OPTIONS = [
  { id: 'window', label: '창가', emoji: '🪟', description: '밖을 보며' },
  { id: 'corner', label: '구석', emoji: '📐', description: '조용히' },
  { id: 'bar', label: '바', emoji: '🍸', description: '활기차게' },
  { id: 'terrace', label: '테라스', emoji: '🌿', description: '개방적으로' },
];

interface Stage3Props {
  onComplete: (preferences: AestheticPreferences) => void;
  onBack: () => void;
}

export default function Stage3Aesthetic({ onComplete, onBack }: Stage3Props) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [warmth, setWarmth] = useState(50);
  const [brightness, setBrightness] = useState(50);
  const [moodKeywords, setMoodKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [trendSensitivity, setTrendSensitivity] = useState(50);
  const [groupSize, setGroupSize] = useState<'solo' | 'pair' | 'small' | 'party'>('pair');
  const [alcoholPreference, setAlcoholPreference] = useState<'yes' | 'no' | 'occasional' | 'no-matter'>('occasional');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [spacePreference, setSpacePreference] = useState<string[]>([]);

  const handleColorToggle = (hex: string) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(selectedColors.filter((c) => c !== hex));
    } else {
      if (selectedColors.length < 3) {
        setSelectedColors([...selectedColors, hex]);
      }
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && moodKeywords.length < 3) {
      setMoodKeywords([...moodKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setMoodKeywords(moodKeywords.filter((k) => k !== keyword));
  };

  const handleTimeSlotToggle = (slotId: string) => {
    if (timeSlots.includes(slotId)) {
      setTimeSlots(timeSlots.filter((s) => s !== slotId));
    } else {
      setTimeSlots([...timeSlots, slotId]);
    }
  };

  const handleSpaceToggle = (spaceId: string) => {
    if (spacePreference.includes(spaceId)) {
      setSpacePreference(spacePreference.filter((s) => s !== spaceId));
    } else {
      setSpacePreference([...spacePreference, spaceId]);
    }
  };

  const handleComplete = () => {
    onComplete({
      colors: selectedColors,
      tone: { warmth, brightness },
      moodKeywords,
      trendSensitivity,
      groupSize,
      alcoholPreference,
      timeSlots,
      spacePreference,
    });
  };

  const canProceed = selectedColors.length === 3 && moodKeywords.length === 3 && timeSlots.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '40px 20px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ fontSize: '80px', marginBottom: '20px' }}
        >
          ✨
        </motion.div>
        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '16px',
          }}
        >
          당신의 미학과 취향
        </h2>
        <p style={{ fontSize: '18px', color: '#BBBBBB', fontWeight: '600' }}>
          마지막 단계예요! 거의 다 왔어요 🎉
        </p>
      </div>

      {/* Color Selection */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          당신의 밤을 색으로 표현한다면? (3가지 선택)
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          {COLOR_PRESETS.map((color) => {
            const isSelected = selectedColors.includes(color.hex);
            return (
              <motion.button
                key={color.hex}
                onClick={() => handleColorToggle(color.hex)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: color.hex,
                    border: isSelected ? '4px solid #FFFFFF' : '2px solid rgba(255,255,255,0.2)',
                    boxShadow: isSelected ? `0 0 20px ${color.hex}` : 'none',
                    position: 'relative',
                  }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        width: '28px',
                        height: '28px',
                        background: '#00FFC6',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '900',
                      }}
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#CCCCCC',
                    fontWeight: '600',
                  }}
                >
                  {color.name}
                </span>
              </motion.button>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {selectedColors.map((color) => (
            <div
              key={color}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: color,
                border: '2px solid #FFFFFF',
              }}
            />
          ))}
        </div>
      </section>

      {/* Tone Sliders */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          어떤 톤이 좋아?
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#00FFC6', fontWeight: '700' }}>
                차가운
              </span>
              <span style={{ fontSize: '14px', color: '#FF1B8D', fontWeight: '700' }}>
                따뜻한
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={warmth}
              onChange={(e) => setWarmth(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: `linear-gradient(to right, #00FFC6, #FF1B8D)`,
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#374151', fontWeight: '700' }}>
                어두운
              </span>
              <span style={{ fontSize: '14px', color: '#F9FAFB', fontWeight: '700' }}>
                밝은
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: `linear-gradient(to right, #374151, #F9FAFB)`,
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </section>

      {/* Mood Keywords */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          당신의 무드를 3단어로
        </h3>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            placeholder="예: 몽환적, 강렬한, 빈티지..."
            disabled={moodKeywords.length >= 3}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              outline: 'none',
            }}
          />
          <button
            onClick={handleAddKeyword}
            disabled={moodKeywords.length >= 3 || !keywordInput.trim()}
            style={{
              padding: '14px 28px',
              background:
                moodKeywords.length >= 3 || !keywordInput.trim()
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #FF1B8D, #8B5CF6)',
              border: 'none',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '800',
              cursor:
                moodKeywords.length >= 3 || !keywordInput.trim()
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            추가
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {moodKeywords.map((keyword, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #FF1B8D, #8B5CF6)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF' }}>
                #{keyword}
              </span>
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#FFFFFF',
                }}
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trend Sensitivity */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          최신 트렌드 얼마나 신경 써?
        </h3>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#FF1B8D',
            }}
          >
            {trendSensitivity}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={trendSensitivity}
          onChange={(e) => setTrendSensitivity(Number(e.target.value))}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: `linear-gradient(to right, #999999, #FF1B8D)`,
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '12px',
          }}
        >
          <span style={{ fontSize: '13px', color: '#999999', fontWeight: '600' }}>
            유행 안 탐
          </span>
          <span style={{ fontSize: '13px', color: '#FF1B8D', fontWeight: '600' }}>
            얼리어답터
          </span>
        </div>
      </section>

      {/* Social Context */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          주로 몇 명이서 시간 보내는 거 좋아해?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {[
            { id: 'solo', label: '혼자', emoji: '🧘' },
            { id: 'pair', label: '1-2명', emoji: '👥' },
            { id: 'small', label: '소그룹 (3-5)', emoji: '👨‍👩‍👧' },
            { id: 'party', label: '파티 (6+)', emoji: '🎉' },
          ].map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setGroupSize(option.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '20px',
                background:
                  groupSize === option.id
                    ? 'rgba(255, 27, 141, 0.2)'
                    : 'rgba(26, 26, 26, 0.8)',
                border:
                  groupSize === option.id
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '32px' }}>{option.emoji}</span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Alcohol Preference */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          술은 어때?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          {[
            { id: 'yes', label: '좋아해', emoji: '🍷' },
            { id: 'occasional', label: '가끔', emoji: '🥂' },
            { id: 'no', label: '안 마셔', emoji: '🚫' },
            { id: 'no-matter', label: '상관없어', emoji: '😊' },
          ].map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setAlcoholPreference(option.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px',
                background:
                  alcoholPreference === option.id
                    ? 'rgba(255, 27, 141, 0.2)'
                    : 'rgba(26, 26, 26, 0.8)',
                border:
                  alcoholPreference === option.id
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '28px' }}>{option.emoji}</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Time Slots */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          주로 어느 시간대가 좋아? (복수 선택)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {TIME_SLOTS.map((slot) => {
            const isSelected = timeSlots.includes(slot.id);
            return (
              <motion.button
                key={slot.id}
                onClick={() => handleTimeSlotToggle(slot.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '20px',
                  background: isSelected
                    ? 'rgba(255, 27, 141, 0.2)'
                    : 'rgba(26, 26, 26, 0.8)',
                  border: isSelected
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '32px' }}>{slot.emoji}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                  {slot.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Space Preference */}
      <section style={{ marginBottom: '60px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          카페에서 어디 앉는 거 좋아해? (복수 선택)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
          {SPACE_OPTIONS.map((space) => {
            const isSelected = spacePreference.includes(space.id);
            return (
              <motion.button
                key={space.id}
                onClick={() => handleSpaceToggle(space.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '24px',
                  background: isSelected
                    ? 'rgba(255, 27, 141, 0.2)'
                    : 'rgba(26, 26, 26, 0.8)',
                  border: isSelected
                    ? '2px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '40px' }}>{space.emoji}</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
                  {space.label}
                </span>
                <span style={{ fontSize: '12px', color: '#AAAAAA', fontWeight: '600' }}>
                  {space.description}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <motion.button
          onClick={onBack}
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
          onClick={handleComplete}
          disabled={!canProceed}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
          style={{
            padding: '16px 60px',
            background: canProceed
              ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: '900',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            opacity: canProceed ? 1 : 0.5,
            boxShadow: canProceed ? '0 4px 30px rgba(255, 27, 141, 0.6)' : 'none',
          }}
        >
          결과 보기 🎉
        </motion.button>
      </div>
    </motion.div>
  );
}
