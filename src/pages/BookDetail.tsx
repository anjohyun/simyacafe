import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockBookCards, mockComments } from '../data/mockBooks';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import BookCard from '../components/features/books/BookCard';
import { ShareModal } from '../components/share';
import { ShareContent } from '../types/share';
import { ReactionBar } from '../components/social';
import { ReactionType, ReactionSummary } from '../types/social';
import { useToast } from '../contexts/ToastContext';

const moodColors = {
  kpop: '#FF1B8D',
  ballad: '#8B5CF6',
  graffiti: '#FFE400',
  retro: '#00FFC6',
};

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(mockComments.filter((c) => c.bookCardId === id));
  const [showShareModal, setShowShareModal] = useState(false);

  // Reaction state
  const [userReaction, setUserReaction] = useState<ReactionType | undefined>(undefined);
  const [reactions, setReactions] = useState<ReactionSummary>({
    empathy: 0,
    willTry: 0,
    together: 0,
    moved: 0,
    fascinating: 0,
    total: 0,
  });

  const bookCard = useMemo(() => {
    const book = mockBookCards.find((b) => b.id === id);
    if (book) {
      // Initialize reactions based on book likes
      setReactions({
        empathy: Math.floor(book.likes * 0.5),
        willTry: Math.floor(book.likes * 0.2),
        together: Math.floor(book.likes * 0.15),
        moved: Math.floor(book.likes * 0.1),
        fascinating: Math.floor(book.likes * 0.05),
        total: book.likes,
      });
      setBookmarkCount(book.bookmarkCount);
    }
    return book;
  }, [id]);

  const relatedBooks = useMemo(() => {
    if (!bookCard) return [];
    return mockBookCards
      .filter(
        (b) =>
          b.id !== bookCard.id &&
          b.moodTags.some((tag) => bookCard.moodTags.includes(tag))
      )
      .slice(0, 3);
  }, [bookCard]);

  if (!bookCard) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📚</div>
          <div style={{ fontSize: '24px', fontWeight: '900' }}>책을 찾을 수 없어요</div>
          <button
            onClick={() => navigate('/books')}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: 'linear-gradient(90deg, #FF1B8D, #FFE400)',
              border: 'none',
              borderRadius: '12px',
              color: '#0A0A0A',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            서재로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const primaryMoodColor = moodColors[bookCard.moodTags[0]];

  const shareContent: ShareContent = {
    id: bookCard.id,
    type: 'book',
    title: bookCard.book.title,
    description: bookCard.whyRecommend,
    creatorName: bookCard.recommender.name,
    creatorAvatar: bookCard.recommender.avatar,
    mood: bookCard.moodTags[0],
    moodColor: primaryMoodColor,
    tags: bookCard.moodTags,
    quote: bookCard.movingQuote,
    stats: {
      likes: reactions.total,
      shares: bookCard.shareCount,
    },
    url: `${window.location.origin}/books/${bookCard.id}`,
  };

  const handleReaction = (type: ReactionType) => {
    // Toggle off if same reaction
    if (userReaction === type) {
      setUserReaction(undefined);
      setReactions((prev) => ({
        ...prev,
        [type === 'willTry' ? 'willTry' : type]: Math.max(0, prev[type === 'willTry' ? 'willTry' : type] - 1),
        total: Math.max(0, prev.total - 1),
      }));
      toast.success('반응을 취소했습니다');
    } else {
      // Remove previous reaction
      if (userReaction) {
        setReactions((prev) => ({
          ...prev,
          [userReaction === 'willTry' ? 'willTry' : userReaction]: Math.max(0, prev[userReaction === 'willTry' ? 'willTry' : userReaction] - 1),
        }));
      }

      // Add new reaction
      setUserReaction(type);
      setReactions((prev) => ({
        ...prev,
        [type === 'willTry' ? 'willTry' : type]: prev[type === 'willTry' ? 'willTry' : type] + 1,
        total: userReaction ? prev.total : prev.total + 1,
      }));

      const reactionLabels: Record<ReactionType, string> = {
        empathy: '공감해요',
        willTry: '따라해볼게요',
        together: '같이해요',
        moved: '눈물나요',
        fascinating: '신기해요',
      };
      toast.success(`${reactionLabels[type]}!`);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkCount(isBookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      bookCardId: bookCard.id,
      userId: 'current-user',
      userName: '나',
      userAvatar: '😊',
      content: commentText,
      createdAt: new Date(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        paddingTop: '80px',
      }}
    >
      {/* Hero Section with Cover */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          overflow: 'hidden',
        }}
      >
        {/* Blurred Background */}
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
            filter: 'blur(40px)',
            opacity: 0.3,
            transform: 'scale(1.1)',
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(180deg, ${primaryMoodColor}20 0%, #0A0A0A 100%)`,
          }}
        />

        {/* Book Cover */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={bookCard.book.coverImage}
            alt={bookCard.book.title}
            style={{
              height: '320px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '16px',
              boxShadow: `0 20px 60px ${primaryMoodColor}60`,
              border: `4px solid ${primaryMoodColor}`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Book Info */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            {bookCard.book.title}
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#DDDDDD',
              fontWeight: '700',
              marginBottom: '8px',
            }}
          >
            {bookCard.book.author}
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#999999',
              fontWeight: '600',
            }}
          >
            {bookCard.book.publisher}
          </p>

          {/* Mood Tags */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '24px',
            }}
          >
            {bookCard.moodTags.map((mood) => (
              <div
                key={mood}
                style={{
                  padding: '8px 20px',
                  background: `${moodColors[mood]}33`,
                  border: `2px solid ${moodColors[mood]}`,
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '800',
                  color: moodColors[mood],
                }}
              >
                #{mood}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '32px',
              flexWrap: 'wrap',
            }}
          >
            <ReactionBar
              reactions={reactions}
              userReaction={userReaction}
              onReact={handleReaction}
              showLabels={true}
              size="large"
            />

            <button
              onClick={handleBookmark}
              style={{
                padding: '14px 32px',
                background: isBookmarked
                  ? `linear-gradient(90deg, #FFE400, #FF1B8D)`
                  : 'rgba(255, 255, 255, 0.1)',
                border: isBookmarked ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: isBookmarked ? '#0A0A0A' : '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              {isBookmarked ? '🔖' : '📑'} 읽고 싶어요 ({bookmarkCount})
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(90deg, #00FFC6, #FF1B8D)',
                border: 'none',
                borderRadius: '16px',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              🔗 공유하기
            </button>
          </div>
        </div>

        {/* Recommender Info */}
        <div
          style={{
            padding: '32px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${primaryMoodColor}, #00FFC6)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
              }}
            >
              {bookCard.recommender.avatar}
            </div>
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                }}
              >
                {bookCard.recommender.name}님의 추천
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#999999',
                  fontWeight: '600',
                }}
              >
                {formatDistanceToNow(bookCard.createdAt, {
                  addSuffix: true,
                  locale: ko,
                })}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              marginBottom: '20px',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: primaryMoodColor,
                marginBottom: '12px',
              }}
            >
              왜 이 책을 추천하나요?
            </h3>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#DDDDDD',
                fontWeight: '600',
              }}
            >
              {bookCard.whyRecommend}
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              background: `linear-gradient(135deg, ${primaryMoodColor}15, rgba(0, 0, 0, 0.3))`,
              borderLeft: `4px solid ${primaryMoodColor}`,
              borderRadius: '16px',
              marginBottom: '20px',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: primaryMoodColor,
                marginBottom: '12px',
              }}
            >
              이 책이 나에게 준 문장
            </h3>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#FFFFFF',
                fontWeight: '700',
                fontStyle: 'italic',
              }}
            >
              "{bookCard.movingQuote}"
            </p>
          </div>

          {bookCard.aiSummary && (
            <div
              style={{
                padding: '24px',
                background: 'rgba(0, 255, 198, 0.05)',
                border: '2px solid #00FFC6',
                borderRadius: '16px',
                marginBottom: '20px',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#00FFC6',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🤖 AI 요약
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#DDDDDD',
                  fontWeight: '600',
                }}
              >
                {bookCard.aiSummary}
              </p>
              {bookCard.aiKeywords && (
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  {bookCard.aiKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(0, 255, 198, 0.1)',
                        border: '1px solid rgba(0, 255, 198, 0.3)',
                        borderRadius: '12px',
                        fontSize: '13px',
                        color: '#00FFC6',
                        fontWeight: '700',
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {bookCard.recommendedFor && (
            <div
              style={{
                padding: '20px',
                background: 'rgba(255, 27, 141, 0.05)',
                borderRadius: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#FF1B8D',
                  marginBottom: '8px',
                }}
              >
                이런 사람에게 추천해요
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#DDDDDD',
                  fontWeight: '600',
                }}
              >
                {bookCard.recommendedFor}
              </p>
            </div>
          )}
        </div>

        {/* CTA to Cafe */}
        <div
          style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #FF1B8D, #FFE400)',
            borderRadius: '24px',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#0A0A0A',
              marginBottom: '16px',
            }}
          >
            🌙 이 책을 카페에서 만나보세요
          </h3>
          <p
            style={{
              fontSize: '16px',
              color: '#1A1A1A',
              fontWeight: '700',
              marginBottom: '24px',
            }}
          >
            심야 연결실에서 책과 음악, 그리고 사람들을 만나요
          </p>
          <button
            onClick={() => navigate('/cafe')}
            style={{
              padding: '16px 40px',
              background: '#0A0A0A',
              border: 'none',
              borderRadius: '16px',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '900',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            카페 방문하기 →
          </button>
        </div>

        {/* Comments Section */}
        <div
          style={{
            padding: '32px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}
          >
            💬 댓글 ({comments.length})
          </h3>

          {/* Comment Input */}
          <div
            style={{
              marginBottom: '32px',
            }}
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="이 책에 대한 생각을 나눠주세요..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid #333333',
                borderRadius: '16px',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '600',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={handleSubmitComment}
              style={{
                marginTop: '12px',
                padding: '12px 32px',
                background: `linear-gradient(90deg, ${primaryMoodColor}, #00FFC6)`,
                border: 'none',
                borderRadius: '12px',
                color: '#0A0A0A',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              댓글 작성
            </button>
          </div>

          {/* Comments List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: '20px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{comment.userAvatar}</span>
                  <div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                      }}
                    >
                      {comment.userName}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666666',
                        fontWeight: '600',
                      }}
                    >
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#DDDDDD',
                    fontWeight: '600',
                  }}
                >
                  {comment.content}
                </p>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div
                    style={{
                      marginTop: '16px',
                      marginLeft: '40px',
                      paddingLeft: '20px',
                      borderLeft: '2px solid #333333',
                    }}
                  >
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        style={{
                          padding: '16px',
                          background: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: '12px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                          }}
                        >
                          <span style={{ fontSize: '20px' }}>{reply.userAvatar}</span>
                          <span
                            style={{
                              fontSize: '14px',
                              fontWeight: '800',
                              color: '#FFFFFF',
                            }}
                          >
                            {reply.userName}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: '#DDDDDD',
                            fontWeight: '600',
                          }}
                        >
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {comments.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666666',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
                <div style={{ fontSize: '16px', fontWeight: '700' }}>
                  첫 댓글을 남겨보세요
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}
            >
              🔗 비슷한 무드의 책
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedBooks.map((book) => (
                <BookCard key={book.id} bookCard={book} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        content={shareContent}
      />
    </div>
  );
}
