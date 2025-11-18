export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const LoadingSpinner = () => (
    <div className="relative">
      {/* Outer ring */}
      <div className={`${sizes[size]} rounded-full border-[6px] border-gray-700 relative shadow-2xl shadow-neon-pink/40`}>
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-neon-pink border-r-electric-yellow border-b-mint animate-spin-retro drop-shadow-[0_0_15px_rgba(255,27,141,0.8)]"></div>
      </div>
      {/* Inner pulse */}
      <div className={`absolute inset-0 flex items-center justify-center`}>
        <div className="w-4 h-4 bg-electric-yellow rounded-full animate-pulse-neon shadow-lg shadow-electric-yellow/60"></div>
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/20 to-mint/20 blur-xl animate-pulse-neon"></div>
    </div>
  );

  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      <LoadingSpinner />
      {text && (
        <p className={`${textSizes[size]} text-white font-bold animate-pulse-neon drop-shadow-[0_0_10px_rgba(255,228,0,0.6)] tracking-wide`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
