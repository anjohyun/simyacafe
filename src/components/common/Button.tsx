import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-dark-bg relative overflow-hidden';

  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink via-electric-yellow to-mint text-dark-bg font-extrabold shadow-2xl shadow-neon-pink/60 hover:shadow-neon-pink/80 hover:scale-110 hover:rotate-1 focus:ring-neon-pink border-2 border-white/20',
    secondary: 'border-3 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-dark-bg hover:scale-105 focus:ring-neon-pink shadow-lg shadow-neon-pink/30 font-bold bg-neon-pink/10 backdrop-blur-sm',
    ghost: 'text-white hover:bg-gradient-to-r hover:from-mint/20 hover:to-neon-pink/20 hover:text-mint focus:ring-mint border-2 border-transparent hover:border-mint/50 font-semibold',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
