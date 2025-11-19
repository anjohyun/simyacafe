import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FeedCard } from '../components/feed';
import { mockFeedItems, trendingTopics } from '../data/mockFeed';
import { ReactionType } from '../types/social';
import { useToast } from '../contexts/ToastContext';

type FeedTab = 'for-you' | 'following' | 'trending' | 'nearby';
type ContentFilter = 'all' | 'book' | 'music' | 'night';

export default function Discover() {
  const [activeTab, setActiveTab] = useState<FeedTab>('for-you');
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');
  const [feedItems, setFeedItems] = useState(mockFeedItems);
  const navigate = useNavigate();
  const toast = useToast();

  const tabs = [
    { id: 'for-you' as FeedTab, label: 'For You', icon: '✨', description: '당신을 위한 추천' },
    { id: 'following' as FeedTab, label: 'Following', icon: '👥', description: '팔로잉' },
    { id: 'trending' as FeedTab, label: 'Trending', icon: '🔥', description: '트렌딩' },
    { id: 'nearby' as FeedTab, label: 'Nearby', icon: '📍', description: '주변' },
  ];

  const contentFilters = [
    { id: 'all' as ContentFilter, label: '전체', icon: '🌟' },
    { id: 'book' as ContentFilter, label: '책', icon: '📚' },
    { id: 'music' as ContentFilter, label: '음악', icon: '🎵' },
    { id: 'night' as ContentFilter, label: '밤 패키지', icon: '🌙' },
  ];

  const handleReact = (itemId: string, type: ReactionType) => {
    setFeedItems(
      feedItems.map((item) => {
        if (item.id !== itemId) return item;

        // Toggle reaction
        if (item.userReaction === type) {
          return {
            ...item,
            userReaction: undefined,
            reactions: {
              ...item.reactions,
              [type]: Math.max(0, item.reactions[type] - 1),
              total: Math.max(0, item.reactions.total - 1),
            },
          };
        }

        // Change reaction
        const prevReaction = item.userReaction;
        return {
          ...item,
          userReaction: type,
          reactions: {
            ...item.reactions,
            [type]: item.reactions[type] + 1,
            ...(prevReaction && { [prevReaction]: Math.max(0, item.reactions[prevReaction] - 1) }),
            total: prevReaction ? item.reactions.total : item.reactions.total + 1,
          },
        };
      })
    );
  };

  const handleComment = (itemId: string) => {
    const item = feedItems.find((i) => i.id === itemId);
    toast.success(`"${item?.title}" 댓글 작성 화면으로 이동`);
  };

  const handleShare = (itemId: string) => {
    const item = feedItems.find((i) => i.id === itemId);
    toast.success(`"${item?.title}" 공유하기`);
  };

  const handleViewContent = (contentId: string, contentType: string) => {
    if (contentType === 'book') {
      navigate(`/books/${contentId}`);
    } else {
      toast.success(`${contentType} 상세 페이지로 이동`);
    }
  };

  const filteredItems = feedItems.filter((item) => {
    if (contentFilter === 'all') return true;
    return item.contentType === contentFilter;
  });

  // Filter by tab
  let displayItems = filteredItems;
  if (activeTab === 'trending') {
    displayItems = filteredItems.filter((item) => item.isTrending);
  } else if (activeTab === 'following') {
    // Mock: show items from followed users
    displayItems = filteredItems.slice(0, 5);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        paddingTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #FF1B8D, #FFE400, #00FFC6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}
          >
            🔍 Discover
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#DDDDDD',
              fontWeight: '600',
            }}
          >
            당신을 위한 새로운 발견
          </p>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar */}
          <div
            style={{
              width: '280px',
              flexShrink: 0,
              position: 'sticky',
              top: '100px',
              alignSelf: 'flex-start',
            }}
          >
            {/* Tabs */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}
              >
                피드
              </h3>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    marginBottom: '8px',
                    background:
                      activeTab === tab.id
                        ? 'linear-gradient(90deg, #FF1B8D33, #00FFC633)'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      activeTab === tab.id
                        ? '2px solid #FF1B8D'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{tab.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div>{tab.label}</div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#999999' }}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Content Filters */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}
              >
                콘텐츠 타입
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {contentFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setContentFilter(filter.id)}
                    style={{
                      padding: '12px 16px',
                      background:
                        contentFilter === filter.id
                          ? 'rgba(0, 255, 198, 0.2)'
                          : 'rgba(255, 255, 255, 0.05)',
                      border:
                        contentFilter === filter.id
                          ? '2px solid #00FFC6'
                          : '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div
              style={{
                padding: '20px',
                background: 'rgba(26, 26, 26, 0.8)',
                border: '2px solid #333333',
                borderRadius: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}
              >
                🔥 트렌딩 토픽
              </h3>
              {trendingTopics.map((topic, index) => (
                <div
                  key={topic.tag}
                  style={{
                    padding: '12px 0',
                    borderBottom:
                      index < trendingTopics.length - 1
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => toast.success(`${topic.tag} 검색`)}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: topic.color,
                      marginBottom: '4px',
                    }}
                  >
                    {topic.tag}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#999999' }}>
                    {topic.count.toLocaleString()} 게시물
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Feed */}
          <div style={{ flex: 1 }}>
            {displayItems.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  background: 'rgba(26, 26, 26, 0.8)',
                  border: '2px solid #333333',
                  borderRadius: '20px',
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', marginBottom: '8px' }}>
                  콘텐츠가 없어요
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#999999' }}>
                  다른 필터를 선택해보세요
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {displayItems.map((item) => (
                  <FeedCard
                    key={item.id}
                    item={item}
                    onReact={handleReact}
                    onComment={handleComment}
                    onShare={handleShare}
                    onViewContent={handleViewContent}
                  />
                ))}

                {/* Load More */}
                <button
                  style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => toast.success('더 많은 콘텐츠 불러오기')}
                >
                  더 보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
