export interface BookApiResult {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  coverImage: string;
  description?: string;
}

/**
 * Kakao Book API로 도서 정보 검색
 */
async function searchKakaoBook(isbn: string): Promise<BookApiResult | null> {
  // Kakao API는 REST API 키가 필요합니다.
  // 실제 사용 시 환경 변수로 설정하거나 사용자가 입력해야 합니다.
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

  if (!KAKAO_API_KEY) {
    console.warn('Kakao API key not found, skipping Kakao search');
    return null;
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${isbn}&target=isbn`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Kakao API request failed');
    }

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      const book = data.documents[0];
      return {
        isbn,
        title: book.title,
        author: book.authors.join(', '),
        publisher: book.publisher,
        coverImage: book.thumbnail,
        description: book.contents,
      };
    }

    return null;
  } catch (error) {
    console.error('Kakao API error:', error);
    return null;
  }
}

/**
 * Google Books API로 도서 정보 검색
 */
async function searchGoogleBook(isbn: string): Promise<BookApiResult | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );

    if (!response.ok) {
      throw new Error('Google Books API request failed');
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;

      return {
        isbn,
        title: book.title,
        author: book.authors?.join(', ') || '저자 미상',
        publisher: book.publisher || '출판사 미상',
        coverImage: book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || '',
        description: book.description,
      };
    }

    return null;
  } catch (error) {
    console.error('Google Books API error:', error);
    return null;
  }
}

/**
 * ISBN으로 도서 정보 검색
 * Kakao API를 먼저 시도하고, 실패하면 Google Books API로 fallback
 */
export async function searchBookByISBN(isbn: string): Promise<BookApiResult | null> {
  // Remove any dashes or spaces from ISBN
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  // Try Kakao API first
  const kakaoResult = await searchKakaoBook(cleanISBN);
  if (kakaoResult) {
    return kakaoResult;
  }

  // Fallback to Google Books API
  const googleResult = await searchGoogleBook(cleanISBN);
  if (googleResult) {
    return googleResult;
  }

  return null;
}

/**
 * 책 제목으로 검색 (자동완성용)
 */
export async function searchBooksByTitle(title: string, limit = 5): Promise<BookApiResult[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=${limit}`
    );

    if (!response.ok) {
      throw new Error('Google Books API request failed');
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => {
        const book = item.volumeInfo;
        const industryIdentifiers = book.industryIdentifiers || [];
        const isbn = industryIdentifiers.find((id: any) => id.type === 'ISBN_13')?.identifier ||
                     industryIdentifiers.find((id: any) => id.type === 'ISBN_10')?.identifier ||
                     '';

        return {
          isbn,
          title: book.title,
          author: book.authors?.join(', ') || '저자 미상',
          publisher: book.publisher || '출판사 미상',
          coverImage: book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || '',
          description: book.description,
        };
      });
    }

    return [];
  } catch (error) {
    console.error('Google Books API error:', error);
    return [];
  }
}
