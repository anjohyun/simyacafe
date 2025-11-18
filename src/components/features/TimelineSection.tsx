import { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Modal, Card } from '../common';

interface Stage {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  color: string;
}

const stages: Stage[] = [
  {
    id: 1,
    icon: '🐾',
    title: '반려동물 & 취향 모임',
    subtitle: 'Stage 1',
    description: '같은 관심사를 가진 사람들과 소통하며 시작하세요',
    details: [
      '반려동물 집사 모임',
      '심야 독서 클럽',
      '영화/드라마 토론',
      '음악 취향 공유',
      '게임 파티',
    ],
    color: 'from-neon-pink to-neon-pink/50',
  },
  {
    id: 2,
    icon: '🎨',
    title: '소그룹 컨텐츠 제작',
    subtitle: 'Stage 2',
    description: '함께 창작하고 프로젝트를 진행해요',
    details: [
      '팟캐스트 제작',
      '사진/영상 콘텐츠',
      '디자인 협업',
      '글쓰기 모임',
      '음악 제작 크루',
    ],
    color: 'from-electric-yellow to-electric-yellow/50',
  },
  {
    id: 3,
    icon: '🌙',
    title: '심야 카페 오픈런',
    subtitle: 'Stage 3',
    description: '실제 공간에서 만나 더 깊은 연결을 경험하세요',
    details: [
      '매주 목요일 심야 카페 운영',
      '테마별 특별 이벤트',
      '소규모 전시/공연',
      '네트워킹 세션',
      '회원 전용 혜택',
    ],
    color: 'from-mint to-mint/50',
  },
];

export default function TimelineSection() {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  const stage1Observer = useIntersectionObserver({ threshold: 0.5, freezeOnceVisible: true });
  const stage2Observer = useIntersectionObserver({ threshold: 0.5, freezeOnceVisible: true });
  const stage3Observer = useIntersectionObserver({ threshold: 0.5, freezeOnceVisible: true });

  const observers = [stage1Observer, stage2Observer, stage3Observer];

  return (
    <section id="timeline" className="py-20 bg-dark-bg relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            <span style={{ color: '#FF1B8D' }}>3단계</span>
            <span className="text-white">로 시작하는 </span>
            <span style={{ color: '#00FFC6' }}>연결</span>
          </h2>
          <p className="text-white text-xl font-semibold" style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.6)'
          }}>
            온라인에서 오프라인까지, 단계별로 깊어지는 커뮤니티 경험
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    observers[index].isIntersecting
                      ? 'bg-neon-pink scale-125'
                      : 'bg-gray-600'
                  }`}
                />
                {index < stages.length - 1 && (
                  <div
                    className={`w-16 h-0.5 transition-all duration-500 ${
                      observers[index].isIntersecting
                        ? 'bg-gradient-to-r from-neon-pink to-mint'
                        : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Cards - Horizontal scroll on desktop, vertical on mobile */}
        <div className="md:overflow-x-auto md:overflow-y-hidden overflow-visible pb-8">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 md:min-w-max">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                ref={observers[index].ref}
                className={`flex-shrink-0 md:w-96 w-full transition-all duration-700 ${
                  observers[index].isIntersecting
                    ? 'opacity-100 translate-y-0 md:translate-x-0'
                    : 'opacity-0 translate-y-10 md:translate-y-0 md:translate-x-10'
                }`}
              >
                <Card
                  hoverable
                  onClick={() => setSelectedStage(stage)}
                  className="h-full p-8 cursor-pointer hover:border-neon-pink/50"
                >
                  {/* Stage Badge */}
                  <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#FF1B8D]/30 to-[#00FFC6]/30 rounded-full border-2 border-[#00FFC6]/50">
                    <span className="text-base font-bold" style={{ color: '#00FFC6', textShadow: '0 0 10px rgba(0,255,198,0.5)' }}>
                      {stage.subtitle}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="text-7xl mb-6 animate-pulse-neon" style={{ filter: 'drop-shadow(0 0 10px rgba(255,228,0,0.6))' }}>
                    {stage.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-extrabold mb-4 text-white" style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white text-base font-medium mb-6" style={{
                    textShadow: '0 1px 4px rgba(0,0,0,0.4)'
                  }}>
                    {stage.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full bg-gradient-to-r ${stage.color} transition-all duration-1000 ${
                        observers[index].isIntersecting ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>

                  {/* CTA */}
                  <button className="text-base font-bold transition-all duration-300 hover:scale-105" style={{
                    color: '#FF1B8D',
                    textShadow: '0 0 10px rgba(255,27,141,0.5)'
                  }}>
                    자세히 보기 →
                  </button>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint for desktop */}
        <div className="hidden md:block text-center mt-8 text-white text-base font-semibold" style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          ← 좌우로 스크롤하여 모든 단계를 확인하세요 →
        </div>
      </div>

      {/* Stage Detail Modal */}
      <Modal
        isOpen={!!selectedStage}
        onClose={() => setSelectedStage(null)}
        title={selectedStage?.title}
        size="md"
      >
        {selectedStage && (
          <div className="space-y-6">
            <div className="text-7xl text-center" style={{ filter: 'drop-shadow(0 0 15px rgba(255,228,0,0.6))' }}>{selectedStage.icon}</div>

            <p className="text-white text-center text-xl font-semibold" style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {selectedStage.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white" style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>포함된 활동:</h4>
              <ul className="space-y-3">
                {selectedStage.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-white font-medium text-base" style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)'
                  }}>
                    <span className="mr-3 text-2xl" style={{ color: '#00FFC6', textShadow: '0 0 10px rgba(0,255,198,0.6)' }}>✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setSelectedStage(null)}
                className="w-full py-4 bg-gradient-to-r from-[#FF1B8D] to-[#00FFC6] rounded-xl font-extrabold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-2xl"
                style={{
                  boxShadow: '0 0 30px rgba(255,27,141,0.5)',
                  color: '#0A0A0A'
                }}
              >
                참여하기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
