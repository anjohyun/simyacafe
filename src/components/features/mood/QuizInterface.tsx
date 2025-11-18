import { useState } from 'react';
import { useMood } from '../../../contexts/MoodContext';
import { ARTWORKS } from '../../../types/mood';
import ArtworkCard from './ArtworkCard';

interface QuizInterfaceProps {
  onComplete: () => void;
}

export default function QuizInterface({ onComplete }: QuizInterfaceProps) {
  const { selections, selectArtwork, removeSelection, calculateResult } = useMood();
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const handleArtworkClick = (artworkId: string) => {
    const artwork = ARTWORKS.find((a) => a.id === artworkId);
    if (!artwork) return;

    selectArtwork(artwork);
  };

  const handleRemoveSelection = (artworkId: string) => {
    removeSelection(artworkId);
  };

  const handleSubmit = () => {
    calculateResult();
    onComplete();
  };

  const isComplete = selections.length === 4;
  const progress = (selections.length / 4) * 100;

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#0A0A0A',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: '900',
            marginBottom: '15px',
            color: '#FFFFFF',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}>
            끌리는 순서대로 <span style={{
              color: '#FF1B8D',
              textShadow: '0 0 20px rgba(255,27,141,0.8)',
            }}>4개</span>를 선택하세요
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#CCCCCC',
            fontWeight: '600',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}>
            선택한 순서가 당신의 무드를 결정합니다
          </p>

          {/* Progress Bar */}
          <div style={{
            marginTop: '30px',
            maxWidth: '500px',
            margin: '30px auto 0 auto',
          }}>
            <div style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#1A1A1A',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '2px solid #333333',
            }}>
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
                  width: `${progress}%`,
                  transition: 'width 0.5s ease',
                  boxShadow: '0 0 20px rgba(255,27,141,0.6)',
                }}
              />
            </div>
            <p style={{
              fontSize: '14px',
              color: '#BBBBBB',
              marginTop: '10px',
              fontWeight: '700',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}>
              {selections.length} / 4 선택됨
            </p>
          </div>
        </div>

        {/* Artwork Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
          marginBottom: '50px',
        }}>
          {ARTWORKS.map((artwork) => {
            const selection = selections.find((s) => s.artwork.id === artwork.id);
            return (
              <div
                key={artwork.id}
                style={{
                  transition: 'all 0.5s ease',
                }}
              >
                <ArtworkCard
                  artwork={artwork}
                  isSelected={!!selection}
                  selectionOrder={selection?.order}
                  onClick={() => handleArtworkClick(artwork.id)}
                />
              </div>
            );
          })}
        </div>

        {/* Your Picks Section */}
        {selections.length > 0 && (
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto 50px auto',
          }}>
            <div style={{
              backgroundColor: 'rgba(26, 26, 26, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '30px',
              border: '2px solid #333333',
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '900',
                marginBottom: '25px',
                textAlign: 'center',
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}>
                Your Picks 📌
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
              }}>
                {selections
                  .sort((a, b) => a.order - b.order)
                  .map((selection) => {
                    const [isPickHovered, setIsPickHovered] = useState(false);

                    return (
                      <div
                        key={selection.artwork.id}
                        style={{
                          position: 'relative',
                        }}
                        onMouseEnter={() => setIsPickHovered(true)}
                        onMouseLeave={() => setIsPickHovered(false)}
                      >
                        <div style={{
                          backgroundColor: '#0A0A0A',
                          borderRadius: '12px',
                          padding: '20px',
                          border: isPickHovered ? '2px solid rgba(255,27,141,0.5)' : '2px solid #333333',
                          transition: 'all 0.3s ease',
                        }}>
                          {/* Order Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '-10px',
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '900',
                            fontSize: '14px',
                            color: '#0A0A0A',
                            boxShadow: '0 4px 12px rgba(255,27,141,0.6)',
                          }}>
                            {selection.order}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveSelection(selection.artwork.id)}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              width: '26px',
                              height: '26px',
                              backgroundColor: '#EF4444',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: isPickHovered ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                              color: '#FFFFFF',
                              fontSize: '14px',
                              fontWeight: '900',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 2px 10px rgba(239,68,68,0.5)',
                            }}
                            aria-label="Remove selection"
                          >
                            ✕
                          </button>

                          {/* Icon */}
                          <div style={{
                            fontSize: '48px',
                            marginBottom: '10px',
                            textAlign: 'center',
                          }}>
                            {selection.artwork.imageUrl}
                          </div>

                          {/* Title */}
                          <p style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            textAlign: 'center',
                            color: '#DDDDDD',
                            marginBottom: '6px',
                            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                          }}>
                            {selection.artwork.title}
                          </p>

                          {/* Weight */}
                          <p style={{
                            fontSize: '12px',
                            textAlign: 'center',
                            color: '#999999',
                            fontWeight: '600',
                          }}>
                            {selection.weight}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Hint */}
              <p style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#999999',
                marginTop: '25px',
                fontWeight: '600',
              }}>
                💡 카드를 다시 클릭하면 순서를 변경할 수 있어요
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div style={{
          textAlign: 'center',
        }}>
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            onMouseEnter={() => setIsSubmitHovered(true)}
            onMouseLeave={() => setIsSubmitHovered(false)}
            style={{
              fontSize: '20px',
              fontWeight: '900',
              padding: '18px 50px',
              background: isComplete
                ? 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)'
                : '#333333',
              color: isComplete ? '#0A0A0A' : '#666666',
              border: isComplete ? '3px solid rgba(255,255,255,0.3)' : '3px solid #444444',
              borderRadius: '16px',
              cursor: isComplete ? 'pointer' : 'not-allowed',
              boxShadow: isComplete
                ? '0 0 40px rgba(255,27,141,0.6), 0 10px 30px rgba(0,0,0,0.4)'
                : 'none',
              transition: 'all 0.3s ease',
              transform: isComplete && isSubmitHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1) translateY(0)',
              opacity: isComplete ? (isSubmitHovered ? 0.9 : 1) : 0.5,
            }}
          >
            {isComplete ? '결과 보기 ✨' : `${4 - selections.length}개 더 선택하세요`}
          </button>
        </div>
      </div>
    </div>
  );
}
