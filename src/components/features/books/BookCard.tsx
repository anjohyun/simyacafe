import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookCard as BookCardType } from '../../../types/book';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface BookCardProps {
  bookCard: BookCardType;
  onLike?: (id: string) => void;
}

const moodColors = {
  kpop: '#FF1B8D',
  ballad: '#8B5CF6',
  graffiti: '#FFE400',
  retro: '#00FFC6',
};

export default function BookCard({ bookCard, onLike }: BookCardProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(bookCard.likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    if (onLike) onLike(bookCard.id);
  };

  const handleClick = () => {
    navigate(`/books/${bookCard.id}`);
  };

  const primaryMoodColor = moodColors[bookCard.moodTags[0]];

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 20px 40px ${primaryMoodColor}40`
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Background with blurred cover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bookCard.book.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          opacity: 0.3,
          transform: 'scale(1.1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, ${primaryMoodColor}20 0%, rgba(10, 10, 10, 0.95) 100%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          padding: '24px',
        }}
      >
        {/* Header: Cover + Info */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          {/* Book Cover */}
          <img
            src={bookCard.book.coverImage}
            alt={bookCard.book.title}
            style={{
              width: '100px',
              height: '140px',
              objectFit: 'cover',
              borderRadius: '12px',
              border: `3px solid ${primaryMoodColor}`,
              boxShadow: `0 8px 16px ${primaryMoodColor}40`,
            }}
          />

          {/* Book Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#FFFFFF',
                marginBottom: '8px',
                lineHeight: '1.3',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {bookCard.book.title}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#DDDDDD',
                fontWeight: '600',
                marginBottom: '4px',
              }}
            >
              {bookCard.book.author}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#999999',
                fontWeight: '600',
              }}
            >
              {bookCard.book.publisher}
            </div>

            {/* Mood Badges */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: '12px',
                flexWrap: 'wrap',
              }}
            >
              {bookCard.moodTags.map((mood) => (
                <div
                  key={mood}
                  style={{
                    padding: '4px 10px',
                    background: `${moodColors[mood]}33`,
                    border: `1.5px solid ${moodColors[mood]}`,
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: moodColors[mood],
                  }}
                >
                  #{mood}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Moving Quote */}
        <div
          style={{
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderLeft: `4px solid ${primaryMoodColor}`,
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#FFFFFF',
              lineHeight: '1.6',
              fontStyle: 'italic',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            "{bookCard.movingQuote}"
          </div>
        </div>

        {/* Recommender */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <span style={{ fontSize: '20px' }}>{bookCard.recommender.avatar}</span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: '800',
              color: '#DDDDDD',
            }}
          >
            {bookCard.recommender.name}
          </span>
          {bookCard.voiceMemoUrl && (
            <div
              style={{
                marginLeft: 'auto',
                padding: '6px 12px',
                background: 'rgba(255, 107, 107, 0.2)',
                border: '1.5px solid #FF6B6B',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '800',
                color: '#FF6B6B',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              🎙️ {bookCard.voiceMemoDuration}s
            </div>
          )}
        </div>

        {/* Social Stats */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <button
            onClick={handleLike}
            style={{
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '12px',
              background: isLiked
                ? `${primaryMoodColor}20`
                : 'rgba(255, 255, 255, 0.05)',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '16px' }}>{isLiked ? '❤️' : '🤍'}</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '800',
                color: isLiked ? primaryMoodColor : '#999999',
              }}
            >
              {likeCount}
            </span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#999999',
              fontWeight: '700',
            }}
          >
            <span>💬</span>
            {bookCard.commentCount}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#999999',
              fontWeight: '700',
            }}
          >
            <span>🔖</span>
            {bookCard.bookmarkCount}
          </div>

          <div
            style={{
              marginLeft: 'auto',
              fontSize: '12px',
              color: '#666666',
              fontWeight: '700',
            }}
          >
            {formatDistanceToNow(bookCard.createdAt, {
              addSuffix: true,
              locale: ko,
            })}
          </div>
        </div>

        {/* Midnight Badge */}
        {bookCard.postedAtMidnight && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
              border: '2px solid #FFE400',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '800',
              color: '#FFE400',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            🌙 심야
          </div>
        )}
      </div>
    </div>
  );
}
