import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserTasteProfile, QuizResult, CategorySelection } from '../types/taste.types';

interface TasteState {
  // Current taste profile
  tasteProfile: UserTasteProfile | null;

  // Quiz state
  currentQuiz: {
    currentStep: number;
    totalSteps: number;
    selections: CategorySelection[];
    isComplete: boolean;
  };

  // Quiz result
  quizResult: QuizResult | null;

  // Actions
  setTasteProfile: (profile: UserTasteProfile) => void;
  updateMoodVector: (vector: QuizResult['moodVector']) => void;

  // Quiz actions
  startQuiz: (totalSteps: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  addSelection: (selection: CategorySelection) => void;
  completeQuiz: (result: QuizResult) => void;
  resetQuiz: () => void;

  // Behavioral tracking
  addLikedContent: (contentId: string) => void;
  addCreatedContent: (contentId: string) => void;
  addAttendedEvent: (eventId: string) => void;
}

export const useTasteStore = create<TasteState>()(
  persist(
    (set, get) => ({
      tasteProfile: null,
      currentQuiz: {
        currentStep: 0,
        totalSteps: 6,
        selections: [],
        isComplete: false,
      },
      quizResult: null,

      setTasteProfile: (profile) => set({ tasteProfile: profile }),

      updateMoodVector: (vector) =>
        set((state) => ({
          tasteProfile: state.tasteProfile
            ? { ...state.tasteProfile, moodVector: vector }
            : null,
        })),

      startQuiz: (totalSteps) =>
        set({
          currentQuiz: {
            currentStep: 0,
            totalSteps,
            selections: [],
            isComplete: false,
          },
        }),

      nextStep: () =>
        set((state) => ({
          currentQuiz: {
            ...state.currentQuiz,
            currentStep: Math.min(
              state.currentQuiz.currentStep + 1,
              state.currentQuiz.totalSteps - 1
            ),
          },
        })),

      prevStep: () =>
        set((state) => ({
          currentQuiz: {
            ...state.currentQuiz,
            currentStep: Math.max(state.currentQuiz.currentStep - 1, 0),
          },
        })),

      addSelection: (selection) =>
        set((state) => {
          const existingIndex = state.currentQuiz.selections.findIndex(
            (s) => s.categoryId === selection.categoryId
          );

          const newSelections = [...state.currentQuiz.selections];
          if (existingIndex >= 0) {
            newSelections[existingIndex] = selection;
          } else {
            newSelections.push(selection);
          }

          return {
            currentQuiz: {
              ...state.currentQuiz,
              selections: newSelections,
            },
          };
        }),

      completeQuiz: (result) =>
        set({
          quizResult: result,
          currentQuiz: {
            ...get().currentQuiz,
            isComplete: true,
          },
        }),

      resetQuiz: () =>
        set({
          currentQuiz: {
            currentStep: 0,
            totalSteps: 6,
            selections: [],
            isComplete: false,
          },
          quizResult: null,
        }),

      addLikedContent: (contentId) =>
        set((state) => ({
          tasteProfile: state.tasteProfile
            ? {
                ...state.tasteProfile,
                behaviorHistory: {
                  ...state.tasteProfile.behaviorHistory,
                  likedContent: [
                    ...state.tasteProfile.behaviorHistory.likedContent,
                    contentId,
                  ],
                },
              }
            : null,
        })),

      addCreatedContent: (contentId) =>
        set((state) => ({
          tasteProfile: state.tasteProfile
            ? {
                ...state.tasteProfile,
                behaviorHistory: {
                  ...state.tasteProfile.behaviorHistory,
                  createdContent: [
                    ...state.tasteProfile.behaviorHistory.createdContent,
                    contentId,
                  ],
                },
              }
            : null,
        })),

      addAttendedEvent: (eventId) =>
        set((state) => ({
          tasteProfile: state.tasteProfile
            ? {
                ...state.tasteProfile,
                behaviorHistory: {
                  ...state.tasteProfile.behaviorHistory,
                  attendedEvents: [
                    ...state.tasteProfile.behaviorHistory.attendedEvents,
                    eventId,
                  ],
                },
              }
            : null,
        })),
    }),
    {
      name: 'taste-storage',
    }
  )
);
