import { useState, useEffect } from 'react';

interface MoodDescriptionType {
  summary: string;
  traits: string[];
  primaryDimensions: string[];
}

interface MoodDescriptionProps {
  description: MoodDescriptionType;
}

export default function MoodDescription({ description }: MoodDescriptionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out',
        textAlign: 'center',
        marginBottom: '40px',
      }}
    >
      {/* Summary Text */}
      <h2
        style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '30px',
          lineHeight: '1.4',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {description.summary}
      </h2>

      {/* Traits Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        {description.traits.slice(0, 5).map((trait, index) => (
          <span
            key={index}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #FF1B8D, #8B5CF6)',
              color: '#FFFFFF',
              borderRadius: '30px',
              fontSize: '15px',
              fontWeight: '800',
              boxShadow: '0 4px 15px rgba(255, 27, 141, 0.3)',
              animation: `fadeInUp ${0.5 + index * 0.1}s ease-out`,
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            #{trait}
          </span>
        ))}
      </div>

      {/* Primary Dimensions */}
      {description.primaryDimensions && description.primaryDimensions.length > 0 && (
        <div
          style={{
            marginTop: '25px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: '#999999',
              fontWeight: '600',
              marginBottom: '10px',
            }}
          >
            주요 특성
          </p>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {description.primaryDimensions.map((dim, index) => (
              <span
                key={index}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  color: '#DDDDDD',
                  fontWeight: '700',
                }}
              >
                {dim}
              </span>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
