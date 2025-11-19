import { FeedItem } from '../../types/social';
import { ReactionBar } from '../social';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReactionType } from '../../types/social';

interface FeedCardProps {
  item: FeedItem;
  onReact: (itemId: string, type: ReactionType) => void;
  onComment: (itemId: string) => void;
  onShare: (itemId: string) => void;
  onViewContent: (itemId: string, contentType: string) => void;
}

export function FeedCard({ item, onReact, onComment, onShare, onViewContent }: FeedCardProps) {
  const contentTypeConfig = {
    book: { icon: '📚', color: '#8B5CF6', label: '책' },
    music: { icon: '🎵', color: '#FF1B8D', label: '음악' },
    night: { icon: '🌙', color: '#00FFC6', label: '밤 패키지' },
  };

  const typeConfig = contentTypeConfig[item.contentType];

  const activityLabels = {
    created: '새로운 콘텐츠를 만들었어요',
    liked: '이 콘텐츠를 좋아해요',
    commented: '댓글을 남겼어요',
    'added-to-collection': '컬렉션에 추가했어요',
  };

  return (
    <div
      style={{
        padding: '24px',
        background: 'rgba(26, 26, 26, 0.8)',
        border: '2px solid #333333',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `2px solid ${typeConfig.color}`;
        e.currentTarget.style.boxShadow = `0 8px 24px ${typeConfig.color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '2px solid #333333';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            {item.creatorAvatar}
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF' }}>
              {item.creatorName}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#999999' }}>
              {item.type === 'activity' && item.activityType && activityLabels[item.activityType]}
              {item.type === 'recommendation' && '💡 추천'}
              {item.type === 'content' && formatDistanceToNow(item.timestamp, { addSuffix: true, locale: ko })}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {item.isTrending && (
            <div
              style={{
                padding: '4px 12px',
                background: 'linear-gradient(90deg, #FF1B8D, #FFE400)',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '800',
                color: '#0A0A0A',
              }}
            >
              🔥 트렌딩
            </div>
          )}
          {item.isSponsored && (
            <div
              style={{
                padding: '4px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#999999',
              }}
            >
              광고
            </div>
          )}
        </div>
      </div>

      {/* Recommendation Reason */}
      {item.recommendationReason && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(0, 255, 198, 0.1)',
            border: '2px solid #00FFC6',
            borderRadius: '12px',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#00FFC6' }}>
            💡 {item.recommendationReason}
          </div>
        </div>
      )}

      {/* Content */}
      <div
        onClick={() => onViewContent(item.contentId, item.contentType)}
        style={{ cursor: 'pointer', marginBottom: '16px' }}
      >
        {/* Cover Image */}
        {item.coverImage && (
          <div
            style={{
              height: '280px',
              borderRadius: '16px',
              backgroundImage: `url(${item.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '20px',
              }}
            >
              <div
                style={{
                  padding: '8px 16px',
                  background: `${typeConfig.color}EE`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {typeConfig.icon} {typeConfig.label}
              </div>
            </div>
          </div>
        )}

        {/* Title & Description */}
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '8px',
            lineHeight: '1.3',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#DDDDDD',
            lineHeight: '1.5',
            marginBottom: '16px',
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          padding: '12px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#999999' }}>
          ❤️ {item.reactions.total}
        </div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#999999' }}>
          💬 {item.commentCount}
        </div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#999999' }}>
          🔗 {item.shareCount}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <ReactionBar
          reactions={item.reactions}
          userReaction={item.userReaction}
          onReact={(type) => onReact(item.id, type)}
          size="small"
        />

        <button
          onClick={() => onComment(item.id)}
          style={{
            padding: '10px 20px',
            background: item.hasCommented
              ? 'rgba(0, 255, 198, 0.2)'
              : 'rgba(255, 255, 255, 0.1)',
            border: item.hasCommented
              ? '2px solid #00FFC6'
              : '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          💬 댓글
        </button>

        <button
          onClick={() => onShare(item.id)}
          style={{
            padding: '10px 20px',
            background: item.hasShared
              ? 'rgba(255, 228, 0, 0.2)'
              : 'rgba(255, 255, 255, 0.1)',
            border: item.hasShared
              ? '2px solid #FFE400'
              : '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          🔗 공유
        </button>
      </div>
    </div>
  );
}
