import { MusicGenre } from '../../data/genres';

interface GenreCardProps {
  genre: MusicGenre;
  isSelected: boolean;
  selectionOrder?: number;
  onClick: () => void;
}

export default function GenreCard({ genre, isSelected, selectionOrder, onClick }: GenreCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        padding: '24px',
        background: isSelected
          ? `linear-gradient(135deg, ${genre.color}30, ${genre.color}10)`
          : 'rgba(26, 26, 26, 0.8)',
        border: isSelected
          ? `3px solid ${genre.color}`
          : '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: isSelected ? 1 : 0.9,
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected
          ? `0 0 30px ${genre.color}60, 0 8px 24px rgba(0,0,0,0.4)`
          : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
          e.currentTarget.style.borderColor = `${genre.color}80`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
      }}
    >
      {/* 선택 순서 뱃지 */}
      {isSelected && selectionOrder !== undefined && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${genre.color}, #FFFFFF)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '900',
            color: '#0A0A0A',
            boxShadow: `0 4px 12px ${genre.color}80`,
            border: '3px solid #0A0A0A',
          }}
        >
          {selectionOrder}
        </div>
      )}

      {/* 이모지 */}
      <div
        style={{
          fontSize: '48px',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        {genre.emoji}
      </div>

      {/* 타이틀 */}
      <h3
        style={{
          fontSize: '20px',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '8px',
          textAlign: 'center',
        }}
      >
        {genre.title}
      </h3>

      {/* 서브타이틀 */}
      <p
        style={{
          fontSize: '14px',
          color: genre.color,
          fontWeight: '700',
          marginBottom: '12px',
          textAlign: 'center',
        }}
      >
        {genre.subtitle}
      </p>

      {/* 설명 */}
      <p
        style={{
          fontSize: '13px',
          color: '#BBBBBB',
          fontWeight: '600',
          marginBottom: '16px',
          textAlign: 'center',
          lineHeight: '1.5',
        }}
      >
        {genre.description}
      </p>

      {/* 태그 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '12px',
          justifyContent: 'center',
        }}
      >
        {genre.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 10px',
              background: `${genre.color}20`,
              border: `1px solid ${genre.color}40`,
              borderRadius: '12px',
              fontSize: '11px',
              color: genre.color,
              fontWeight: '700',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 아티스트 */}
      <div
        style={{
          fontSize: '11px',
          color: '#888888',
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {genre.artists.join(' · ')}
      </div>
    </div>
  );
}
