import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeGradient } from '../../hooks/useTimeGradient';
import { Button } from '../common';

export default function HeroSection() {
  const navigate = useNavigate();
  const gradient = useTimeGradient();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect: background moves slower than scroll
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Time-Based Gradient Background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Animated noise texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent animate-pulse-neon"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Time Label Badge */}
        <div className="inline-block mb-8 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full border-2 border-white/40 shadow-2xl">
          <span className="text-base font-bold text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{gradient.label} 시간대</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 leading-tight">
          <span className="block text-white font-black" style={{
            textShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9)'
          }}>
            당신의 밤은
          </span>
          <span className="block font-black bg-gradient-to-r from-[#FF1B8D] via-[#FFE400] to-[#00FFC6] bg-clip-text text-transparent" style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
            textShadow: '0 0 30px rgba(255,27,141,0.8), 0 0 60px rgba(0,255,198,0.6)'
          }}>
            어떤 색인가요?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-bold mb-16 max-w-3xl mx-auto" style={{
          color: '#FFFFFF',
          textShadow: '0 0 15px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)'
        }}>
          취향으로 만나고, 경험으로 깊어지는 심야 커뮤니티
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/mood-matching')}
            className="text-lg shadow-2xl shadow-neon-pink/50"
          >
            내 취향 찾기 시작 ✨
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              color: '#FFFFFF',
              borderColor: 'rgba(255,255,255,0.6)',
              borderWidth: '2px',
              fontWeight: '700',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}
          >
            더 알아보기
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
