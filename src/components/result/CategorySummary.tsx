import { useState } from 'react';

interface Option {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string | null;
  description: string;
  tags: string[];
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

interface CategorySummaryProps {
  selections: CategorySelection[];
}

export default function CategorySummary({ selections }: CategorySummaryProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    selections.length > 0 ? selections[0].categoryId : null
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getWeightColor = (weight: number) => {
    if (weight >= 50) return '#FF1B8D';
    if (weight >= 30) return '#8B5CF6';
    if (weight >= 15) return '#00FFC6';
    return '#FFE400';
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <h3
        style={{
          fontSize: '28px',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '24px',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        카테고리별 선택
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {selections.map((category) => {
          const isExpanded = expandedCategory === category.categoryId;

          return (
            <div
              key={category.categoryId}
              style={{
                background: 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '2px solid #333333',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.categoryId)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{category.categoryIcon}</span>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: '800',
                      color: '#FFFFFF',
                    }}
                  >
                    {category.categoryTitle}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '24px',
                    color: '#999999',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Category Content */}
              <div
                style={{
                  maxHeight: isExpanded ? '1000px' : '0',
                  opacity: isExpanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  style={{
                    padding: '0 24px 24px 24px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {category.selections
                    .sort((a, b) => a.order - b.order)
                    .map((selection) => (
                      <div
                        key={selection.option.id}
                        style={{
                          padding: '20px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '16px',
                          border: `2px solid ${getWeightColor(selection.weight)}40`,
                          position: 'relative',
                        }}
                      >
                        {/* Weight Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            padding: '6px 12px',
                            background: getWeightColor(selection.weight),
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '900',
                            color: '#FFFFFF',
                            boxShadow: `0 4px 12px ${getWeightColor(selection.weight)}60`,
                          }}
                        >
                          {selection.weight}%
                        </div>

                        {/* Order Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '-10px',
                            width: '28px',
                            height: '28px',
                            background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '13px',
                            fontWeight: '900',
                            color: '#0A0A0A',
                            boxShadow: '0 4px 12px rgba(255, 27, 141, 0.5)',
                          }}
                        >
                          {selection.order}
                        </div>

                        {/* Emoji */}
                        <div
                          style={{
                            fontSize: '40px',
                            textAlign: 'center',
                            marginBottom: '12px',
                          }}
                        >
                          {selection.option.emoji}
                        </div>

                        {/* Title */}
                        <h4
                          style={{
                            fontSize: '16px',
                            fontWeight: '800',
                            color: '#FFFFFF',
                            marginBottom: '8px',
                            textAlign: 'center',
                          }}
                        >
                          {selection.option.title}
                        </h4>

                        {/* Subtitle */}
                        {selection.option.subtitle && (
                          <p
                            style={{
                              fontSize: '13px',
                              color: '#AAAAAA',
                              fontWeight: '600',
                              textAlign: 'center',
                              marginBottom: '10px',
                            }}
                          >
                            {selection.option.subtitle}
                          </p>
                        )}

                        {/* Tags */}
                        <div
                          style={{
                            display: 'flex',
                            gap: '6px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: '12px',
                          }}
                        >
                          {selection.option.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              style={{
                                padding: '4px 10px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                fontSize: '11px',
                                color: '#BBBBBB',
                                fontWeight: '600',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
