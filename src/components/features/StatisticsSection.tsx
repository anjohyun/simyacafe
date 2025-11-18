import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { Card } from '../common';

interface Stat {
  id: number;
  value: number;
  label: string;
  suffix: string;
  icon: string;
  color: string;
}

const stats: Stat[] = [
  {
    id: 1,
    value: 1247,
    label: '지금까지 연결된 사람들',
    suffix: '명',
    icon: '👥',
    color: 'text-neon-pink',
  },
  {
    id: 2,
    value: 38,
    label: '이번 주 진행 중인 모임',
    suffix: '개',
    icon: '🎯',
    color: 'text-electric-yellow',
  },
  {
    id: 3,
    value: 156,
    label: '완성된 컨텐츠 프로젝트',
    suffix: '개',
    icon: '✨',
    color: 'text-mint',
  },
];

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const count = useCounterAnimation(stat.value, 2000, isVisible);

  return (
    <Card
      glassmorphism
      hoverable={false}
      className="p-8 text-center transform transition-all duration-700"
    >
      {/* Icon */}
      <div className="text-6xl mb-6 animate-pulse-neon" style={{ filter: 'drop-shadow(0 0 12px rgba(255,228,0,0.6))' }}>{stat.icon}</div>

      {/* Counter */}
      <div className={`text-6xl md:text-7xl font-black mb-4`} style={{
        color: stat.color === 'text-neon-pink' ? '#FF1B8D' : stat.color === 'text-electric-yellow' ? '#FFE400' : '#00FFC6',
        textShadow: `0 0 20px ${stat.color === 'text-neon-pink' ? 'rgba(255,27,141,0.6)' : stat.color === 'text-electric-yellow' ? 'rgba(255,228,0,0.6)' : 'rgba(0,255,198,0.6)'}`
      }}>
        {count.toLocaleString()}
        <span className="text-4xl ml-2">{stat.suffix}</span>
      </div>

      {/* Label */}
      <p className="text-white text-base md:text-lg font-semibold" style={{
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>{stat.label}</p>
    </Card>
  );
}

export default function StatisticsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  return (
    <section className="py-20 bg-dark-bg-secondary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink rounded-full blur-3xl animate-pulse-neon"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mint rounded-full blur-3xl animate-pulse-neon"></div>
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>함께 만들어가는 </span>
            <span className="bg-gradient-to-r from-[#FF1B8D] via-[#FFE400] to-[#00FFC6] bg-clip-text text-transparent font-black" style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              textShadow: '0 0 20px rgba(255,27,141,0.6)'
            }}>
              연결실
            </span>
          </h2>
          <p className="text-white text-xl font-semibold" style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.5)'
          }}>
            실시간으로 업데이트되는 커뮤니티 활동 현황
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`transition-all duration-700 delay-${index * 150} ${
                isIntersecting
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <StatCard stat={stat} isVisible={isIntersecting} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-white text-xl font-bold mb-8" style={{
            textShadow: '0 2px 6px rgba(0,0,0,0.5)'
          }}>
            지금 바로 참여하고 새로운 사람들과 연결되세요
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-[#FF1B8D] to-[#00FFC6] rounded-xl font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(255,27,141,0.4), 0 10px 30px rgba(0,0,0,0.3)',
              color: '#0A0A0A'
            }}>
              커뮤니티 둘러보기
            </button>
            <button className="px-10 py-4 border-2 rounded-xl font-bold text-lg transition-all hover:scale-105" style={{
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              활동 내역 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
