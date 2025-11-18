import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Artwork, MoodSelection, QuizResult, MoodProfile, SELECTION_WEIGHTS, ARTWORKS } from '../types/mood';

interface MoodContextType {
  selections: MoodSelection[];
  quizResult: QuizResult | null;
  selectArtwork: (artwork: Artwork) => void;
  removeSelection: (artworkId: string) => void;
  clearSelections: () => void;
  calculateResult: () => void;
  resetQuiz: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

const STORAGE_KEY = 'mood_quiz_result';

function calculateMoodProfile(selections: MoodSelection[]): MoodProfile {
  // Aggregate keywords based on weights
  const keywordScores: Record<string, number> = {};

  selections.forEach((selection) => {
    selection.artwork.moodKeywords.forEach((keyword) => {
      keywordScores[keyword] = (keywordScores[keyword] || 0) + selection.weight;
    });
  });

  // Sort keywords by score
  const topKeywords = Object.entries(keywordScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([keyword]) => keyword);

  const primary = selections[0].artwork.theme;
  const secondary = selections[1]?.artwork.theme || '';

  // Generate compatibility scores (mock data based on primary choice)
  const compatibilityScore: Record<string, number> = {};
  ARTWORKS.forEach((artwork) => {
    if (artwork.id === selections[0].artwork.id) {
      compatibilityScore[artwork.id] = 100;
    } else if (artwork.id === selections[1]?.artwork.id) {
      compatibilityScore[artwork.id] = 75;
    } else if (artwork.id === selections[2]?.artwork.id) {
      compatibilityScore[artwork.id] = 50;
    } else {
      compatibilityScore[artwork.id] = 25;
    }
  });

  return {
    primary,
    secondary,
    description: `${topKeywords[0]} ${topKeywords[1]} 감성`,
    keywords: topKeywords,
    compatibilityScore,
  };
}

export function MoodProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<MoodSelection[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Load saved result from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizResult(parsed);
      } catch (e) {
        console.error('Failed to load quiz result:', e);
      }
    }
  }, []);

  const selectArtwork = (artwork: Artwork) => {
    setSelections((prev) => {
      // Check if already selected
      const existingIndex = prev.findIndex((s) => s.artwork.id === artwork.id);

      if (existingIndex !== -1) {
        // Remove and re-add to update order
        const updated = prev.filter((s) => s.artwork.id !== artwork.id);
        const newOrder = updated.length + 1;

        if (newOrder > 4) return prev; // Max 4 selections

        return [
          ...updated,
          {
            artwork,
            order: newOrder,
            weight: SELECTION_WEIGHTS[newOrder as keyof typeof SELECTION_WEIGHTS],
          },
        ];
      } else {
        // Add new selection
        const newOrder = prev.length + 1;

        if (newOrder > 4) return prev; // Max 4 selections

        return [
          ...prev,
          {
            artwork,
            order: newOrder,
            weight: SELECTION_WEIGHTS[newOrder as keyof typeof SELECTION_WEIGHTS],
          },
        ];
      }
    });
  };

  const removeSelection = (artworkId: string) => {
    setSelections((prev) => {
      const filtered = prev.filter((s) => s.artwork.id !== artworkId);
      // Recalculate order and weights
      return filtered.map((selection, index) => ({
        ...selection,
        order: index + 1,
        weight: SELECTION_WEIGHTS[(index + 1) as keyof typeof SELECTION_WEIGHTS],
      }));
    });
  };

  const clearSelections = () => {
    setSelections([]);
  };

  const calculateResult = () => {
    if (selections.length !== 4) return;

    const profile = calculateMoodProfile(selections);

    // Generate mock match count (random between 20-50)
    const matchCount = Math.floor(Math.random() * 31) + 20;

    const result: QuizResult = {
      selections,
      profile,
      timestamp: Date.now(),
      matchCount,
    };

    setQuizResult(result);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  };

  const resetQuiz = () => {
    setSelections([]);
    setQuizResult(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MoodContext.Provider
      value={{
        selections,
        quizResult,
        selectArtwork,
        removeSelection,
        clearSelections,
        calculateResult,
        resetQuiz,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
