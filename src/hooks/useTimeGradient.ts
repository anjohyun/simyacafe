import { useState, useEffect } from 'react';

interface GradientConfig {
  from: string;
  to: string;
  label: string;
}

export function useTimeGradient() {
  const [gradient, setGradient] = useState<GradientConfig>({
    from: '#1e1b4b',
    to: '#0f172a',
    label: '심야',
  });

  useEffect(() => {
    const updateGradient = () => {
      const hour = new Date().getHours();

      if (hour >= 16 && hour < 19) {
        // 오후 4시 ~ 7시: Orange to Purple
        setGradient({
          from: '#f97316', // Orange
          to: '#9333ea', // Purple
          label: '황혼',
        });
      } else if (hour >= 19 || hour < 0) {
        // 오후 7시 ~ 자정: Purple to Navy
        setGradient({
          from: '#9333ea', // Purple
          to: '#1e3a8a', // Navy
          label: '밤',
        });
      } else if (hour >= 0 && hour < 6) {
        // 자정 ~ 오전 6시: Navy to Deep Blue
        setGradient({
          from: '#1e3a8a', // Navy
          to: '#0c4a6e', // Deep Blue
          label: '심야',
        });
      } else {
        // 그 외 시간대 (오전 6시 ~ 오후 4시): 기본 다크 그라디언트
        setGradient({
          from: '#1e1b4b', // Deep Purple
          to: '#0f172a', // Slate
          label: '낮',
        });
      }
    };

    updateGradient();
    // 1분마다 업데이트
    const interval = setInterval(updateGradient, 60000);

    return () => clearInterval(interval);
  }, []);

  return gradient;
}
