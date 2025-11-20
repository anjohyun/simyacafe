import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasteStore } from '../stores/tasteStore';
import { usePointsStore } from '../stores/pointsStore';
// @ts-ignore
import { tasteCategories } from '../data/tasteCategories';
import { calculateMoodProfile, generateMoodDescription, getWeightPercentages } from '../utils/tasteCalculator';

export default function TasteQuizPage() {
  const navigate = useNavigate();
  const { currentQuiz, addSelection, completeQuiz, nextStep, prevStep } = useTasteStore();
  const { addPoints } = usePointsStore();

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentCategory = tasteCategories[currentCategoryIndex];
  const weights = getWeightPercentages();
  const progress = ((currentCategoryIndex + 1) / tasteCategories.length) * 100;

  useEffect(() => {
    // 퀴즈 시작
    if (currentQuiz.currentStep === 0 && currentQuiz.selections.length === 0) {
      // Initialize if needed
    }
  }, []);

  const handleOptionClick = (optionId: string) => {
    const isSelected = selectedOptions.includes(optionId);

    if (isSelected) {
      // 선택 해제
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      // 선택 추가 (최대 4개)
      if (selectedOptions.length < 4) {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const handleNext = () => {
    if (selectedOptions.length !== 4) {
      return;
    }

    // 현재 카테고리의 선택 저장
    const categorySelection = {
      categoryId: currentCategory.id,
      categoryTitle: currentCategory.title,
      categoryIcon: currentCategory.icon,
      selections: selectedOptions.map((optionId, index) => {
        const option = currentCategory.options.find((o: any) => o.id === optionId)!;
        return {
          option,
          order: index + 1,
          weight: weights[index],
        };
      }),
    };

    addSelection(categorySelection);

    // 다음 카테고리로
    if (currentCategoryIndex < tasteCategories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setSelectedOptions([]);
      nextStep();
    } else {
      // 퀴즈 완료
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setSelectedOptions([]);
      prevStep();
    }
  };

  const handleComplete = () => {
    // 모든 선택 수집
    const allSelections = [
      ...currentQuiz.selections,
      {
        categoryId: currentCategory.id,
        categoryTitle: currentCategory.title,
        categoryIcon: currentCategory.icon,
        selections: selectedOptions.map((optionId, index) => {
          const option = currentCategory.options.find((o: any) => o.id === optionId)!;
          return {
            option,
            order: index + 1,
            weight: weights[index],
          };
        }),
      },
    ];

    // 무드 프로필 계산
    const moodProfile = calculateMoodProfile(allSelections);
    generateMoodDescription(moodProfile, allSelections);

    // 퀴즈 완료 처리
    const result = {
      moodVector: moodProfile,
      selections: allSelections,
      timestamp: new Date(),
    };

    completeQuiz(result);

    // 포인트 지급
    addPoints({
      uid: 'user-123',
      type: 'online',
      action: 'moodQuizComplete',
      points: 100,
      metadata: {},
    });

    // 결과 페이지로 이동
    navigate('/result', {
      state: {
        selections: allSelections,
      },
    });
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
        {/* Progress Bar */}
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
              marginBottom: '16px',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#FFFFFF',
              }}
            >
              {currentCategoryIndex + 1} / {tasteCategories.length}
            </h2>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#00FFC6',
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>
          <div
            style={{
              height: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
                borderRadius: '6px',
                transition: 'width 0.5s ease',
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
          <div
            style={{
              fontSize: '80px',
              marginBottom: '20px',
            }}
          >
            {currentCategory.icon}
          </div>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            {currentCategory.title}
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#BBBBBB',
              fontWeight: '600',
              marginBottom: '10px',
            }}
          >
            {currentCategory.subtitle}
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#999999',
              fontWeight: '600',
            }}
          >
            {currentCategory.instruction}
          </p>
        </div>

        {/* Selection Counter */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: selectedOptions.length === 4 ? '#00FFC6' : '#FF1B8D',
            }}
          >
            {selectedOptions.length} / 4 선택됨
          </div>
        </div>

        {/* Selected Options Preview */}
        {selectedOptions.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            {selectedOptions.map((optionId, index) => {
              const option = currentCategory.options.find((o: any) => o.id === optionId);
              if (!option) return null;

              return (
                <div
                  key={optionId}
                  style={{
                    padding: '12px 20px',
                    background: 'rgba(255, 27, 141, 0.2)',
                    border: '2px solid #FF1B8D',
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
                      background: '#FF1B8D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '900',
                      color: '#FFFFFF',
                    }}
                  >
                    {index + 1}
                  </div>
                  <span style={{ fontSize: '20px' }}>{option.emoji}</span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                    }}
                  >
                    {option.title}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#FF1B8D',
                    }}
                  >
                    ({weights[index]}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Options Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '50px',
          }}
        >
          {currentCategory.options.map((option: any) => {
            const isSelected = selectedOptions.includes(option.id);
            const selectionOrder = selectedOptions.indexOf(option.id);

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                style={{
                  padding: '30px',
                  background: isSelected
                    ? 'rgba(255, 27, 141, 0.15)'
                    : 'rgba(26, 26, 26, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: isSelected
                    ? '3px solid #FF1B8D'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.border = '2px solid rgba(255, 27, 141, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {/* Selection Badge */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '-12px',
                      width: '40px',
                      height: '40px',
                      background: '#FF1B8D',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '900',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(255, 27, 141, 0.6)',
                    }}
                  >
                    {selectionOrder + 1}
                  </div>
                )}

                {/* Emoji */}
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '16px',
                    textAlign: 'center',
                  }}
                >
                  {option.emoji}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}
                >
                  {option.title}
                </h3>

                {/* Subtitle */}
                {option.subtitle && (
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#AAAAAA',
                      fontWeight: '600',
                      marginBottom: '12px',
                    }}
                  >
                    {option.subtitle}
                  </p>
                )}

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#CCCCCC',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                  }}
                >
                  {option.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {option.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      style={{
                        padding: '4px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#999999',
                        fontWeight: '600',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {currentCategoryIndex > 0 && (
            <button
              onClick={handlePrevious}
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ← 이전
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={selectedOptions.length !== 4}
            style={{
              padding: '16px 40px',
              background:
                selectedOptions.length === 4
                  ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
                  : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '800',
              cursor: selectedOptions.length === 4 ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              opacity: selectedOptions.length === 4 ? 1 : 0.5,
              boxShadow:
                selectedOptions.length === 4
                  ? '0 4px 20px rgba(255, 27, 141, 0.5)'
                  : 'none',
            }}
            onMouseEnter={(e) => {
              if (selectedOptions.length === 4) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOptions.length === 4) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {currentCategoryIndex === tasteCategories.length - 1
              ? '결과 보기 ✨'
              : '다음 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
