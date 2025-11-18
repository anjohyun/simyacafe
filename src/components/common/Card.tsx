import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  glassmorphism?: boolean;
}

export default function Card({
  children,
  hoverable = true,
  glassmorphism = true,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-300';

  const glassStyles = glassmorphism
    ? 'bg-dark-bg-secondary/60 backdrop-blur-xl border-2 border-gray-700/80 shadow-xl shadow-black/50'
    : 'bg-dark-bg-secondary border-2 border-gray-700 shadow-lg';

  const hoverStyles = hoverable
    ? 'hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-pink/30 hover:border-neon-pink/60 hover:scale-105 cursor-pointer hover:bg-dark-bg-secondary/80'
    : '';

  return (
    <div
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
