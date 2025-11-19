import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { ISBNScanner } from '../components/scanner';
import { searchBookByISBN } from '../utils/bookApi';
import { addUserBook, getCurrentUser } from '../utils/bookStorage';
import type { NightType, ReadingTime, BookMood, BookCard } from '../types/book';

type MoodTag = BookMood;

interface BookFormData {
  // Book info
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;

  // Personal story
  whyRecommend: string;
  movingQuote: string;
  moodTags: MoodTag[];
  nightType: NightType;
  drinkingPreference: 'with-alcohol' | 'non-alcohol' | 'both';
  readingTime: ReadingTime;

  // AI generated (optional)
  aiSummary?: string;
  aiKeywords?: string[];
  recommendedFor?: string;
}

export default function BookCreate() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState<BookFormData>({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    coverImage: '',
    whyRecommend: '',
    movingQuote: '',
    moodTags: [],
    nightType: 'quiet-night',
    drinkingPreference: 'non-alcohol',
    readingTime: 'evening',
  });

  const [currentStep, setCurrentStep] = useState<'book-info' | 'story' | 'preview'>('book-info');
  const [showScanner, setShowScanner] = useState(false);
  const [isLoadingBookInfo, setIsLoadingBookInfo] = useState(false);
  const [isRecording] = useState(false); // Reserved for future voice memo feature

  const moodTagOptions: Array<{ id: MoodTag; label: string; color: string; icon: string }> = [
    { id: 'kpop', label: 'K-POP', color: '#FF1B8D', icon: '🎤' },
    { id: 'ballad', label: '발라드', color: '#8B5CF6', icon: '🎵' },
    { id: 'graffiti', label: '그래피티', color: '#00FFC6', icon: '🎨' },
    { id: 'retro', label: '레트로', color: '#FFE400', icon: '📻' },
  ];

  const nightTypeOptions: Array<{ id: NightType; label: string; icon: string }> = [
    { id: 'with-alcohol', label: '술과 함께', icon: '🍷' },
    { id: 'quiet-night', label: '조용한 밤', icon: '🌙' },
    { id: 'with-friends', label: '친구와 함께', icon: '👥' },
    { id: 'alone-time', label: '혼자만의 시간', icon: '🕯️' },
  ];

  const readingTimeOptions: Array<{ id: ReadingTime; label: string; icon: string }> = [
    { id: 'morning', label: '아침', icon: '🌅' },
    { id: 'afternoon', label: '오후', icon: '☀️' },
    { id: 'evening', label: '저녁', icon: '🌆' },
    { id: 'late-night', label: '심야', icon: '🌃' },
  ];

  const handleMoodTagToggle = (tag: MoodTag) => {
    setFormData(prev => ({
      ...prev,
      moodTags: prev.moodTags.includes(tag)
        ? prev.moodTags.filter(t => t !== tag)
        : [...prev.moodTags, tag]
    }));
  };

  const handleISBNSearch = async (isbn: string) => {
    if (!isbn || isbn.trim().length < 10) {
      toast.error('유효한 ISBN을 입력해주세요');
      return;
    }

    setIsLoadingBookInfo(true);
    toast.info('책 정보를 검색하고 있습니다...');

    try {
      const bookInfo = await searchBookByISBN(isbn);

      if (bookInfo) {
        setFormData(prev => ({
          ...prev,
          isbn: bookInfo.isbn,
          title: bookInfo.title,
          author: bookInfo.author,
          publisher: bookInfo.publisher,
          coverImage: bookInfo.coverImage,
        }));
        toast.success('책 정보를 불러왔습니다!');
      } else {
        toast.error('책 정보를 찾을 수 없습니다. 직접 입력해주세요.');
      }
    } catch (error) {
      console.error('Book search error:', error);
      toast.error('책 정보 검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingBookInfo(false);
    }
  };

  const handleISBNDetected = async (isbn: string) => {
    setShowScanner(false);
    await handleISBNSearch(isbn);
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.author) {
      toast.error('책 제목과 저자는 필수입니다');
      return;
    }
    if (!formData.whyRecommend) {
      toast.error('추천 이유를 작성해주세요');
      return;
    }

    try {
      // 새로운 BookCard 생성
      const currentUser = getCurrentUser();
      const newBookCard: BookCard = {
        id: `user-book-${Date.now()}`,
        book: {
          id: `book-${Date.now()}`,
          isbn: formData.isbn,
          title: formData.title,
          author: formData.author,
          publisher: formData.publisher,
          coverImage: formData.coverImage || 'https://via.placeholder.com/200x300?text=No+Cover',
        },
        recommender: currentUser,
        whyRecommend: formData.whyRecommend,
        movingQuote: formData.movingQuote,
        moodTags: formData.moodTags,
        nightType: formData.nightType,
        drinkingPreference: formData.drinkingPreference,
        readingTime: formData.readingTime,
        likes: 0,
        commentCount: 0,
        bookmarkCount: 0,
        shareCount: 0,
        createdAt: new Date(),
        postedAtMidnight: new Date().getHours() >= 0 && new Date().getHours() < 6,
      };

      // 로컬 스토리지에 저장
      addUserBook(newBookCard);

      toast.success('책이 성공적으로 등록되었습니다! 🎉');
      navigate('/books');
    } catch (error) {
      console.error('Failed to save book:', error);
      toast.error('책 등록 중 오류가 발생했습니다.');
    }
  };

  const renderBookInfoStep = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '32px',
        }}
      >
        📚 책 정보 입력
      </h2>

      {/* ISBN Input */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          ISBN으로 책 정보 자동 입력 (선택사항)
        </label>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            placeholder="9788954123456"
            disabled={isLoadingBookInfo}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              opacity: isLoadingBookInfo ? 0.5 : 1,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleISBNSearch(formData.isbn);
              }
            }}
          />
          <button
            onClick={() => handleISBNSearch(formData.isbn)}
            disabled={isLoadingBookInfo || !formData.isbn}
            style={{
              padding: '12px 24px',
              background: isLoadingBookInfo || !formData.isbn
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(135deg, #8B5CF6, #FF1B8D)',
              border: 'none',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '800',
              cursor: isLoadingBookInfo || !formData.isbn ? 'not-allowed' : 'pointer',
              opacity: isLoadingBookInfo || !formData.isbn ? 0.5 : 1,
            }}
          >
            🔍 검색
          </button>
          <button
            onClick={() => setShowScanner(true)}
            disabled={isLoadingBookInfo}
            style={{
              padding: '12px 24px',
              background: isLoadingBookInfo
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
              border: 'none',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '800',
              cursor: isLoadingBookInfo ? 'not-allowed' : 'pointer',
              opacity: isLoadingBookInfo ? 0.5 : 1,
            }}
          >
            📷 스캔
          </button>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: '#999999',
            fontWeight: '600',
          }}
        >
          💡 ISBN을 입력하거나 스캔하면 책 정보가 자동으로 입력됩니다
        </p>
      </div>

      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          책 제목 *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="예: 달러구트 꿈 백화점"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
          }}
        />
      </div>

      {/* Author */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          저자 *
        </label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="예: 이미예"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
          }}
        />
      </div>

      {/* Publisher */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          출판사
        </label>
        <input
          type="text"
          value={formData.publisher}
          onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
          placeholder="예: 팩토리나인"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
          }}
        />
      </div>

      {/* Cover Image URL */}
      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          표지 이미지 URL
        </label>
        <input
          type="text"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          placeholder="https://image.yes24.com/..."
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
          }}
        />
        {formData.coverImage && (
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <img
              src={formData.coverImage}
              alt="Book cover preview"
              style={{
                maxWidth: '200px',
                maxHeight: '300px',
                borderRadius: '8px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => setCurrentStep('story')}
        disabled={!formData.title || !formData.author}
        style={{
          width: '100%',
          padding: '16px',
          background: formData.title && formData.author
            ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
            : 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          borderRadius: '12px',
          color: '#FFFFFF',
          fontSize: '18px',
          fontWeight: '800',
          cursor: formData.title && formData.author ? 'pointer' : 'not-allowed',
          opacity: formData.title && formData.author ? 1 : 0.5,
        }}
      >
        다음 단계: 개인 스토리 작성 →
      </button>
    </div>
  );

  const renderStoryStep = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '32px',
        }}
      >
        ✨ 개인 스토리
      </h2>

      {/* Why Recommend */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          이 책을 왜 추천하나요? *
        </label>
        <textarea
          value={formData.whyRecommend}
          onChange={(e) => setFormData({ ...formData, whyRecommend: e.target.value })}
          placeholder="당신만의 이야기를 들려주세요..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Moving Quote */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '8px',
          }}
        >
          이 책이 나에게 준 문장
        </label>
        <input
          type="text"
          value={formData.movingQuote}
          onChange={(e) => setFormData({ ...formData, movingQuote: e.target.value })}
          placeholder="감동적이었던 구절을 적어주세요"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
          }}
        />
      </div>

      {/* Mood Tags */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '12px',
          }}
        >
          무드 태그 (최대 3개)
        </label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {moodTagOptions.map(tag => (
            <button
              key={tag.id}
              onClick={() => handleMoodTagToggle(tag.id)}
              disabled={!formData.moodTags.includes(tag.id) && formData.moodTags.length >= 3}
              style={{
                padding: '12px 20px',
                background: formData.moodTags.includes(tag.id)
                  ? `${tag.color}33`
                  : 'rgba(255, 255, 255, 0.05)',
                border: formData.moodTags.includes(tag.id)
                  ? `2px solid ${tag.color}`
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {tag.icon} {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Night Type */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '12px',
          }}
        >
          어떤 밤에 어울리나요?
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {nightTypeOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setFormData({ ...formData, nightType: option.id })}
              style={{
                padding: '16px',
                background: formData.nightType === option.id
                  ? 'rgba(255, 27, 141, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: formData.nightType === option.id
                  ? '2px solid #FF1B8D'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {option.icon} {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drinking Preference */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '12px',
          }}
        >
          음주 선호도
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['with-alcohol', 'non-alcohol', 'both'].map(pref => (
            <button
              key={pref}
              onClick={() => setFormData({ ...formData, drinkingPreference: pref as any })}
              style={{
                flex: 1,
                padding: '12px',
                background: formData.drinkingPreference === pref
                  ? 'rgba(0, 255, 198, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: formData.drinkingPreference === pref
                  ? '2px solid #00FFC6'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {pref === 'with-alcohol' ? '🍷 술과 함께' : pref === 'non-alcohol' ? '🥤 논알콜' : '🍹 상관없음'}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Time */}
      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '12px',
          }}
        >
          추천 독서 시간
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {readingTimeOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setFormData({ ...formData, readingTime: option.id })}
              style={{
                padding: '12px',
                background: formData.readingTime === option.id
                  ? 'rgba(255, 228, 0, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: formData.readingTime === option.id
                  ? '2px solid #FFE400'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '20px' }}>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Memo */}
      <div
        style={{
          marginBottom: '32px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
        }}
      >
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '700',
            color: '#DDDDDD',
            marginBottom: '12px',
          }}
        >
          🎙️ 음성 메모 (선택사항, 최대 60초)
        </label>
        <button
          onClick={() => toast.info('음성 녹음 기능 준비 중')}
          style={{
            padding: '12px 24px',
            background: isRecording
              ? 'rgba(255, 27, 141, 0.2)'
              : 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          {isRecording ? '⏹️ 녹음 중지' : '🎤 녹음 시작'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setCurrentStep('book-info')}
          style={{
            flex: 1,
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '800',
            cursor: 'pointer',
          }}
        >
          ← 이전
        </button>
        <button
          onClick={() => setCurrentStep('preview')}
          disabled={!formData.whyRecommend}
          style={{
            flex: 2,
            padding: '16px',
            background: formData.whyRecommend
              ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '800',
            cursor: formData.whyRecommend ? 'pointer' : 'not-allowed',
            opacity: formData.whyRecommend ? 1 : 0.5,
          }}
        >
          미리보기 →
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#FFFFFF',
          marginBottom: '32px',
        }}
      >
        👀 미리보기
      </h2>

      {/* Preview Card */}
      <div
        style={{
          padding: '32px',
          background: 'rgba(26, 26, 26, 0.8)',
          border: '2px solid #333333',
          borderRadius: '20px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt={formData.title}
              style={{
                width: '150px',
                height: '220px',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '900',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              {formData.title}
            </h3>
            <p
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#DDDDDD',
                marginBottom: '16px',
              }}
            >
              {formData.author} · {formData.publisher}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {formData.moodTags.map(tag => {
                const tagConfig = moodTagOptions.find(t => t.id === tag);
                return (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 12px',
                      background: `${tagConfig?.color}33`,
                      border: `2px solid ${tagConfig?.color}`,
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                    }}
                  >
                    {tagConfig?.icon} {tagConfig?.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            marginBottom: '16px',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#DDDDDD',
              lineHeight: '1.6',
            }}
          >
            {formData.whyRecommend}
          </p>
        </div>

        {formData.movingQuote && (
          <div
            style={{
              padding: '16px',
              background: 'rgba(255, 27, 141, 0.1)',
              border: '2px solid #FF1B8D',
              borderRadius: '12px',
              marginBottom: '16px',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#FF1B8D',
                fontStyle: 'italic',
              }}
            >
              " {formData.movingQuote} "
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#DDDDDD',
            }}
          >
            {nightTypeOptions.find(n => n.id === formData.nightType)?.icon}{' '}
            {nightTypeOptions.find(n => n.id === formData.nightType)?.label}
          </span>
          <span
            style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#DDDDDD',
            }}
          >
            {readingTimeOptions.find(r => r.id === formData.readingTime)?.icon}{' '}
            {readingTimeOptions.find(r => r.id === formData.readingTime)?.label}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setCurrentStep('story')}
          style={{
            flex: 1,
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '800',
            cursor: 'pointer',
          }}
        >
          ← 수정
        </button>
        <button
          onClick={handleSubmit}
          style={{
            flex: 2,
            padding: '16px',
            background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '800',
            cursor: 'pointer',
          }}
        >
          ✨ 책 등록하기
        </button>
      </div>
    </div>
  );

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
          maxWidth: '1200px',
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
            ✨ 책 소개하기
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#DDDDDD',
              fontWeight: '600',
            }}
          >
            당신의 책 이야기를 들려주세요
          </p>
        </div>

        {/* Step Indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {['book-info', 'story', 'preview'].map((step, index) => (
            <div
              key={step}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: currentStep === step
                    ? 'linear-gradient(135deg, #FF1B8D, #00FFC6)'
                    : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                }}
              >
                {index + 1}
              </div>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: currentStep === step ? '#FFFFFF' : '#666666',
                }}
              >
                {step === 'book-info' ? '책 정보' : step === 'story' ? '개인 스토리' : '미리보기'}
              </span>
              {index < 2 && (
                <span
                  style={{
                    marginLeft: '8px',
                    color: '#666666',
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 'book-info' && renderBookInfoStep()}
        {currentStep === 'story' && renderStoryStep()}
        {currentStep === 'preview' && renderPreviewStep()}
      </div>

      {/* ISBN Scanner Modal */}
      {showScanner && (
        <ISBNScanner
          onDetected={handleISBNDetected}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
