import { BookCard, BookAuthor } from '../types/book';

const STORAGE_KEY = 'simyacafe_user_books';

/**
 * 로컬 스토리지에 저장된 사용자가 등록한 책 목록 가져오기
 */
export function getUserBooks(): BookCard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const books = JSON.parse(stored);
    // Date 객체로 변환
    return books.map((book: any) => ({
      ...book,
      createdAt: new Date(book.createdAt),
    }));
  } catch (error) {
    console.error('Failed to load user books:', error);
    return [];
  }
}

/**
 * 로컬 스토리지에 새로운 책 추가
 */
export function addUserBook(bookCard: BookCard): void {
  try {
    const books = getUserBooks();
    books.unshift(bookCard); // 최신 책을 앞에 추가
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Failed to save user book:', error);
    throw error;
  }
}

/**
 * 특정 책 삭제
 */
export function deleteUserBook(bookId: string): void {
  try {
    const books = getUserBooks();
    const filtered = books.filter(book => book.id !== bookId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete user book:', error);
    throw error;
  }
}

/**
 * 특정 책 정보 업데이트
 */
export function updateUserBook(bookId: string, updates: Partial<BookCard>): void {
  try {
    const books = getUserBooks();
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
      books[index] = { ...books[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  } catch (error) {
    console.error('Failed to update user book:', error);
    throw error;
  }
}

/**
 * 현재 사용자 정보 가져오기 (임시 구현)
 */
export function getCurrentUser(): BookAuthor {
  // TODO: 실제 사용자 인증 구현 시 업데이트
  return {
    name: '나',
    avatar: '😊',
    userId: 'current-user',
    moodProfile: 'kpop',
  };
}
