import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, type, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-gradient-to-r from-mint/30 to-mint/20',
      border: 'border-mint',
      shadow: 'shadow-mint/50',
      icon: (
        <svg className="w-7 h-7 text-mint drop-shadow-[0_0_8px_rgba(0,255,198,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500/30 to-red-500/20',
      border: 'border-red-400',
      shadow: 'shadow-red-500/50',
      icon: (
        <svg className="w-7 h-7 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-gradient-to-r from-electric-yellow/30 to-electric-yellow/20',
      border: 'border-electric-yellow',
      shadow: 'shadow-electric-yellow/50',
      icon: (
        <svg className="w-7 h-7 text-electric-yellow drop-shadow-[0_0_8px_rgba(255,228,0,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      className={`
        ${styles.bg} ${styles.border} ${styles.shadow}
        border-3 backdrop-blur-xl rounded-2xl
        p-5 shadow-2xl
        flex items-center gap-4
        animate-slide-up
        min-w-[320px] max-w-md
        transform hover:scale-105 transition-transform duration-200
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0">{styles.icon}</div>
      <p className="text-white text-base font-semibold flex-1">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-gray-400 hover:text-white transition-all duration-200 hover:rotate-90 p-1 rounded-full hover:bg-white/10"
        aria-label="Close notification"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
