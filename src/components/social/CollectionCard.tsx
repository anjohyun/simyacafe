import { Collection } from '../../types/social';

interface CollectionCardProps {
  collection: Collection;
  onView: (collectionId: string) => void;
  onSubscribe?: (collectionId: string) => void;
  compact?: boolean;
}

export function CollectionCard({
  collection,
  onView,
  onSubscribe,
  compact = false,
}: CollectionCardProps) {
  const contentTypeConfig = {
    book: { icon: '📚', color: '#8B5CF6' },
    music: { icon: '🎵', color: '#FF1B8D' },
    night: { icon: '🌙', color: '#00FFC6' },
    mixed: { icon: '✨', color: '#FFE400' },
  };

  const typeConfig = contentTypeConfig[collection.contentType];

  if (compact) {
    return (
      <div
        onClick={() => onView(collection.id)}
        style={{
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = `2px solid ${typeConfig.color}`;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${typeConfig.color}33, ${typeConfig.color}66)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            {typeConfig.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
              {collection.name}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#999999' }}>
              {collection.itemCount}개 항목
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '24px',
        background: 'rgba(26, 26, 26, 0.8)',
        border: '2px solid #333333',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => onView(collection.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `2px solid ${typeConfig.color}`;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${typeConfig.color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '2px solid #333333';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Cover Image or Icon */}
      <div
        style={{
          height: '160px',
          borderRadius: '12px',
          background: collection.coverImage
            ? `url(${collection.coverImage}) center/cover`
            : `linear-gradient(135deg, ${typeConfig.color}33 0%, ${typeConfig.color}66 100%)`,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px',
        }}
      >
        {!collection.coverImage && typeConfig.icon}
      </div>

      {/* Header */}
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: `${typeConfig.color}33`,
            border: `2px solid ${typeConfig.color}`,
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '800',
            color: typeConfig.color,
            marginBottom: '12px',
          }}
        >
          {typeConfig.icon} {collection.contentType.toUpperCase()}
        </div>

        <h3
          style={{
            fontSize: '20px',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '8px',
            lineHeight: '1.3',
          }}
        >
          {collection.name}
        </h3>

        <p
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#DDDDDD',
            lineHeight: '1.5',
            marginBottom: '12px',
          }}
        >
          {collection.description}
        </p>
      </div>

      {/* Creator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          {collection.creatorAvatar}
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>
            {collection.creatorName}
          </div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#999999' }}>
            {collection.isCollaborative && `+${collection.collaborators?.length || 0} 협업자`}
          </div>
        </div>
      </div>

      {/* Stats & Tags */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#999999' }}>
            📦 {collection.itemCount}개 항목
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#999999' }}>
            👥 {collection.subscribers}명 구독
          </div>
          {!collection.isPublic && (
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFE400' }}>🔒 비공개</div>
          )}
        </div>

        {collection.tags && collection.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {collection.tags.slice(0, 3).map((tag, i) => (
              <div
                key={i}
                style={{
                  padding: '4px 10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(collection.id);
          }}
          style={{
            flex: 1,
            padding: '12px',
            background: `linear-gradient(90deg, ${typeConfig.color}, ${typeConfig.color}CC)`,
            border: 'none',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          보기
        </button>

        {onSubscribe && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe(collection.id);
            }}
            style={{
              padding: '12px 20px',
              background: collection.isSubscribed
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 255, 198, 0.2)',
              border: collection.isSubscribed
                ? '2px solid rgba(255, 255, 255, 0.2)'
                : '2px solid #00FFC6',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {collection.isSubscribed ? '✓' : '+'}
          </button>
        )}
      </div>
    </div>
  );
}
