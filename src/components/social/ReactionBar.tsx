import { useState } from 'react';
import { ReactionType, ReactionSummary, REACTION_CONFIG } from '../../types/social';

interface ReactionBarProps {
  reactions: ReactionSummary;
  userReaction?: ReactionType;
  onReact: (type: ReactionType) => void;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function ReactionBar({
  reactions,
  userReaction,
  onReact,
  showLabels = false,
  size = 'medium',
}: ReactionBarProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const sizeConfig = {
    small: { iconSize: '16px', fontSize: '12px', padding: '6px 12px' },
    medium: { iconSize: '20px', fontSize: '14px', padding: '10px 16px' },
    large: { iconSize: '24px', fontSize: '16px', padding: '12px 20px' },
  };

  const config = sizeConfig[size];

  const reactionTypes: ReactionType[] = ['empathy', 'willTry', 'together', 'moved', 'fascinating'];

  const handleReact = (type: ReactionType) => {
    onReact(type);
    setShowPicker(false);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const topReactions = reactionTypes
    .map((type) => ({
      type,
      count: reactions[type === 'willTry' ? 'willTry' : type],
    }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div style={{ position: 'relative' }}>
      {/* Main Reaction Button */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setShowPicker(!showPicker)}
          onMouseEnter={() => setShowPicker(true)}
          style={{
            padding: config.padding,
            background: userReaction
              ? `linear-gradient(90deg, ${REACTION_CONFIG[userReaction].color}33, ${REACTION_CONFIG[userReaction].color}66)`
              : 'rgba(255, 255, 255, 0.1)',
            border: userReaction
              ? `2px solid ${REACTION_CONFIG[userReaction].color}`
              : '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: config.fontSize,
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ fontSize: config.iconSize }}>
            {userReaction ? REACTION_CONFIG[userReaction].icon : '❤️'}
          </span>
          {showLabels && (
            <span>{userReaction ? REACTION_CONFIG[userReaction].label : '반응 남기기'}</span>
          )}
          {reactions.total > 0 && <span>({formatCount(reactions.total)})</span>}
        </button>

        {/* Top Reactions Preview */}
        {topReactions.length > 0 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {topReactions.map((r, i) => (
              <div
                key={r.type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: config.iconSize }}>{REACTION_CONFIG[r.type].icon}</span>
                <span
                  style={{
                    fontSize: config.fontSize,
                    fontWeight: '700',
                    color: REACTION_CONFIG[r.type].color,
                  }}
                >
                  {r.count}
                </span>
                {i < topReactions.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 4px' }}>•</span>
                )}
              </div>
            ))}
          </button>
        )}
      </div>

      {/* Reaction Picker */}
      {showPicker && (
        <div
          onMouseLeave={() => setShowPicker(false)}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            border: '2px solid #333333',
            borderRadius: '16px',
            padding: '12px',
            display: 'flex',
            gap: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        >
          {reactionTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleReact(type)}
              style={{
                background:
                  userReaction === type
                    ? `${REACTION_CONFIG[type].color}33`
                    : 'rgba(255, 255, 255, 0.05)',
                border:
                  userReaction === type
                    ? `2px solid ${REACTION_CONFIG[type].color}`
                    : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '70px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = `${REACTION_CONFIG[type].color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                if (userReaction !== type) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
            >
              <span style={{ fontSize: '24px' }}>{REACTION_CONFIG[type].icon}</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                }}
              >
                {REACTION_CONFIG[type].label}
              </span>
              {reactions[type === 'willTry' ? 'willTry' : type] > 0 && (
                <span style={{ fontSize: '10px', color: REACTION_CONFIG[type].color }}>
                  {reactions[type === 'willTry' ? 'willTry' : type]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Reaction Details Modal */}
      {showDetails && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            border: '2px solid #333333',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '500px',
            maxHeight: '70vh',
            overflow: 'auto',
            zIndex: 2000,
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
              반응 {formatCount(reactions.total)}개
            </h3>
            <button
              onClick={() => setShowDetails(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reactionTypes.map((type) => {
              const count = reactions[type === 'willTry' ? 'willTry' : type];
              if (count === 0) return null;

              const percentage = ((count / reactions.total) * 100).toFixed(1);

              return (
                <div
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{REACTION_CONFIG[type].icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        marginBottom: '8px',
                      }}
                    >
                      {REACTION_CONFIG[type].label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          flex: 1,
                          height: '8px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${percentage}%`,
                            background: REACTION_CONFIG[type].color,
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: REACTION_CONFIG[type].color,
                          minWidth: '60px',
                          textAlign: 'right',
                        }}
                      >
                        {count} ({percentage}%)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showDetails && (
        <div
          onClick={() => setShowDetails(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1999,
          }}
        />
      )}
    </div>
  );
}
