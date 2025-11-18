import { useState } from 'react';
import { Artwork } from '../../../types/mood';

interface ArtworkCardProps {
  artwork: Artwork;
  isSelected: boolean;
  selectionOrder?: number;
  onClick: () => void;
}

export default function ArtworkCard({
  artwork,
  isSelected,
  selectionOrder,
  onClick,
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '24px',
        backgroundColor: isSelected ? '#1A1A1A' : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: isSelected
          ? `3px solid #FF1B8D`
          : isHovered
            ? `2px solid rgba(0, 255, 198, 0.5)`
            : '2px solid #333333',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isSelected
          ? 'scale(1.05)'
          : isHovered
            ? 'scale(1.02) translateY(-4px)'
            : 'scale(1) translateY(0)',
        boxShadow: isSelected
          ? '0 0 40px rgba(255,27,141,0.5), 0 10px 30px rgba(0,0,0,0.3)'
          : isHovered
            ? '0 10px 30px rgba(0,0,0,0.4)'
            : '0 4px 15px rgba(0,0,0,0.3)',
      }}
    >
      {/* Selection Badge */}
      {isSelected && selectionOrder && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '-12px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '900',
          fontSize: '18px',
          color: '#0A0A0A',
          boxShadow: '0 4px 15px rgba(255,27,141,0.6)',
          zIndex: 10,
        }}>
          {selectionOrder}
        </div>
      )}

      {/* Artwork Image/Icon */}
      <div style={{
        fontSize: '80px',
        marginBottom: '20px',
        textAlign: 'center',
        color: artwork.color,
        filter: `drop-shadow(0 0 15px ${artwork.color}66)`,
      }}>
        {artwork.imageUrl}
      </div>

      {/* Theme Badge */}
      <div style={{
        display: 'inline-block',
        marginBottom: '15px',
        padding: '6px 14px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
        borderRadius: '20px',
      }}>
        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          color: artwork.color,
          textShadow: `0 0 10px ${artwork.color}66`,
        }}>
          {artwork.theme}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '22px',
        fontWeight: '800',
        marginBottom: '10px',
        color: '#FFFFFF',
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}>
        {artwork.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '14px',
        color: '#CCCCCC',
        marginBottom: '16px',
        lineHeight: '1.5',
        fontWeight: '600',
        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
      }}>
        {artwork.description}
      </p>

      {/* Keywords */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        {artwork.moodKeywords.slice(0, 3).map((keyword, index) => (
          <span
            key={index}
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              backgroundColor: '#0A0A0A',
              borderRadius: '20px',
              color: '#BBBBBB',
              fontWeight: '600',
              border: '1px solid #333333',
            }}
          >
            #{keyword}
          </span>
        ))}
      </div>

      {/* Hover Effect Overlay */}
      {!isSelected && isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,27,141,0.1) 100%)',
          pointerEvents: 'none',
        }}></div>
      )}
    </div>
  );
}
