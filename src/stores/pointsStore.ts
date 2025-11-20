import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PointsTransaction, POINTS_CONFIG } from '../types/taste.types';

interface PointsState {
  totalPoints: number;
  transactions: PointsTransaction[];

  // Actions
  addPoints: (transaction: Omit<PointsTransaction, 'timestamp'>) => void;
  getPointsForAction: (type: 'online' | 'offline', action: string) => number;
  getTodayPoints: () => number;
  getMonthlyPoints: () => number;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      transactions: [],

      addPoints: (transaction) => {
        const newTransaction: PointsTransaction = {
          ...transaction,
          timestamp: new Date(),
        };

        set((state) => ({
          totalPoints: state.totalPoints + transaction.points,
          transactions: [...state.transactions, newTransaction],
        }));
      },

      getPointsForAction: (type, action) => {
        const config = POINTS_CONFIG[type];
        return (config as any)[action] || 0;
      },

      getTodayPoints: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return get().transactions
          .filter((t) => {
            const transactionDate = new Date(t.timestamp);
            return transactionDate >= today;
          })
          .reduce((sum, t) => sum + t.points, 0);
      },

      getMonthlyPoints: () => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return get().transactions
          .filter((t) => {
            const transactionDate = new Date(t.timestamp);
            return transactionDate >= firstDayOfMonth;
          })
          .reduce((sum, t) => sum + t.points, 0);
      },
    }),
    {
      name: 'points-storage',
    }
  )
);
