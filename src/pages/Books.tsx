import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import BookCard from '../components/features/books/BookCard';
import { mockBookCards, mockCurators } from '../data/mockBooks';
import { BookMood, DrinkingPreference, ReadingTime } from '../types/book';

const moodOptions: { id: BookMood; label: string; icon: string; color: string }[] = [
  { id: 'kpop', label: 'K-POP', icon: '🎵', color: '#FF1B8D' },
  { id: 'ballad', label: '발라드', icon: '🎸', color: '#8B5CF6' },
  { id: 'graffiti', label: '그래피티', icon: '🎨', color: '#FFE400' },
  { id: 'retro', label: '레트로', icon: '🕹️', color: '#00FFC6' },
];

const drinkingOptions: { id: DrinkingPreference; label: string; icon: string }[] = [
  { id: 'with-alcohol', label: '술과 함께', icon: '🍷' },
  { id: 'non-alcohol', label: '논알콜', icon: '☕' },
  { id: 'both', label: '상관없음', icon: '🌟' },
];

const timeOptions: { id: ReadingTime; label: string; icon: string }[] = [
  { id: 'evening', label: '저녁', icon: '🌆' },
  { id: 'late-night', label: '심야', icon: '🌙' },
  { id: 'anytime', label: '언제나', icon: '⏰' },
];

export default function Books() {
  const navigate = useNavigate();
  const [selectedMoods, setSelectedMoods] = useState<BookMood[]>([]);
  const [selectedDrinking, setSelectedDrinking] = useState<DrinkingPreference | null>(
    null
  );
  const [selectedTime, setSelectedTime] = useState<ReadingTime | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'compatible'>('recent');

  const toggleMood = (mood: BookMood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const filteredBooks = useMemo(() => {
    let books = [...mockBookCards];

    // Filter by mood
    if (selectedMoods.length > 0) {
      books = books.filter((book) =>
        book.moodTags.some((tag) => selectedMoods.includes(tag))
      );
    }

    // Filter by drinking preference
    if (selectedDrinking) {
      books = books.filter(
        (book) =>
          book.drinkingPreference === selectedDrinking ||
          book.drinkingPreference === 'both'
      );
    }

    // Filter by reading time
    if (selectedTime) {
      books = books.filter(
        (book) => book.readingTime === selectedTime || book.readingTime === 'anytime'
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        books.sort((a, b) => b.likes - a.likes);
        break;
      case 'compatible':
        // Mock compatibility - in real app, use user profile
        books.sort((a, b) => b.bookmarkCount - a.bookmarkCount);
        break;
      case 'recent':
      default:
        books.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return books;
  }, [selectedMoods, selectedDrinking, selectedTime, sortBy]);

  const trendingBooks = useMemo(() => {
    return [...mockBookCards].sort((a, b) => b.likes - a.likes).slice(0, 3);
  }, []);

  const midnightBooks = useMemo(() => {
    return mockBookCards.filter((book) => book.postedAtMidnight).slice(0, 3);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        padding: '80px 20px 40px',
        position: 'relative',
      }}
    >
      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/books/create')}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
          border: 'none',
          boxShadow: '0 8px 24px rgba(255, 27, 141, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          zIndex: 100,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 27, 141, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 27, 141, 0.4)';
        }}
        title="책 소개하기"
      >
        ✨
      </button>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
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
              background: 'linear-gradient(135deg, #FF1B8D, #FFE400, #00FFC6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}
          >
            📚 밤사이 연결실 서재
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#DDDDDD',
              fontWeight: '600',
              marginBottom: '32px',
            }}
          >
            심야 감성이 담긴 책 추천을 만나보세요
          </p>

          <button
            onClick={() => navigate('/books/create')}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(90deg, #FF1B8D, #FFE400)',
              border: 'none',
              borderRadius: '16px',
              color: '#0A0A0A',
              fontSize: '16px',
              fontWeight: '900',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(255, 27, 141, 0.4)',
            }}
          >
            ✨ 내 책 소개하기
          </button>
        </div>

        {/* Trending Section */}
        <div
          style={{
            marginBottom: '48px',
            padding: '32px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            🔥 이번 주 가장 많이 공감받은 책
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {trendingBooks.map((book) => (
              <BookCard key={book.id} bookCard={book} />
            ))}
          </div>
        </div>

        {/* Midnight Picks */}
        <div
          style={{
            marginBottom: '48px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(10, 10, 10, 0.8))',
            borderRadius: '24px',
            border: '2px solid #8B5CF6',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            🌙 새벽 감성 추천작
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {midnightBooks.map((book) => (
              <BookCard key={book.id} bookCard={book} />
            ))}
          </div>
        </div>

        {/* Curators Leaderboard */}
        <div
          style={{
            marginBottom: '48px',
            padding: '32px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            👑 이달의 책 큐레이터
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {mockCurators.map((curator) => (
              <div
                key={curator.userId}
                style={{
                  padding: '20px',
                  background:
                    curator.rank === 1
                      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(26, 26, 26, 0.8))'
                      : 'rgba(26, 26, 26, 0.6)',
                  borderRadius: '16px',
                  border:
                    curator.rank === 1 ? '2px solid #FFD700' : '2px solid #333333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background:
                      curator.rank === 1
                        ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                        : curator.rank === 2
                          ? 'linear-gradient(135deg, #C0C0C0, #808080)'
                          : 'linear-gradient(135deg, #CD7F32, #8B4513)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {curator.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: '900',
                      color: '#FFFFFF',
                      marginBottom: '4px',
                    }}
                  >
                    {curator.rank}. {curator.userName}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#999999',
                      fontWeight: '700',
                    }}
                  >
                    📚 {curator.bookCount}권 • ❤️ {curator.totalLikes}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '4px',
                      marginTop: '8px',
                    }}
                  >
                    {curator.badges.slice(0, 3).map((badge) => (
                      <span key={badge.id} style={{ fontSize: '14px' }} title={badge.name}>
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            marginBottom: '32px',
            padding: '32px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '24px',
            border: '2px solid #333333',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '20px',
            }}
          >
            🔍 필터
          </h3>

          {/* Mood Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '800',
                color: '#DDDDDD',
                marginBottom: '12px',
              }}
            >
              무드
            </label>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => toggleMood(mood.id)}
                  style={{
                    padding: '12px 24px',
                    background: selectedMoods.includes(mood.id)
                      ? `linear-gradient(135deg, ${mood.color}, ${mood.color}CC)`
                      : 'rgba(26, 26, 26, 0.8)',
                    border: selectedMoods.includes(mood.id)
                      ? `2px solid ${mood.color}`
                      : '2px solid #333333',
                    borderRadius: '16px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{mood.icon}</span>
                  {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drinking Preference Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '800',
                color: '#DDDDDD',
                marginBottom: '12px',
              }}
            >
              음주 선호
            </label>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {drinkingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setSelectedDrinking(
                      selectedDrinking === option.id ? null : option.id
                    )
                  }
                  style={{
                    padding: '12px 24px',
                    background:
                      selectedDrinking === option.id
                        ? 'linear-gradient(135deg, #FF1B8D, #FFE400)'
                        : 'rgba(26, 26, 26, 0.8)',
                    border:
                      selectedDrinking === option.id
                        ? '2px solid #FF1B8D'
                        : '2px solid #333333',
                    borderRadius: '16px',
                    color: selectedDrinking === option.id ? '#0A0A0A' : '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Filter */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '800',
                color: '#DDDDDD',
                marginBottom: '12px',
              }}
            >
              시간대
            </label>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {timeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() =>
                    setSelectedTime(selectedTime === option.id ? null : option.id)
                  }
                  style={{
                    padding: '12px 24px',
                    background:
                      selectedTime === option.id
                        ? 'linear-gradient(135deg, #8B5CF6, #00FFC6)'
                        : 'rgba(26, 26, 26, 0.8)',
                    border:
                      selectedTime === option.id
                        ? '2px solid #8B5CF6'
                        : '2px solid #333333',
                    borderRadius: '16px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '800',
                color: '#DDDDDD',
                marginBottom: '12px',
              }}
            >
              정렬
            </label>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { id: 'recent' as const, label: '최신순', icon: '🕐' },
                { id: 'popular' as const, label: '인기순', icon: '🔥' },
                { id: 'compatible' as const, label: '취향 맞춤', icon: '💫' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  style={{
                    padding: '12px 24px',
                    background:
                      sortBy === option.id
                        ? 'linear-gradient(135deg, #00FFC6, #FF1B8D)'
                        : 'rgba(26, 26, 26, 0.8)',
                    border:
                      sortBy === option.id ? '2px solid #00FFC6' : '2px solid #333333',
                    borderRadius: '16px',
                    color: sortBy === option.id ? '#0A0A0A' : '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div
          style={{
            marginBottom: '32px',
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
            모든 책 ({filteredBooks.length})
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px',
              gridAutoFlow: 'dense',
            }}
          >
            {filteredBooks.map((book) => (
              <BookCard key={book.id} bookCard={book} />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: '#666666',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>
                해당하는 책이 없어요
              </div>
              <div style={{ fontSize: '14px', marginTop: '8px' }}>
                다른 필터를 선택해보세요
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
