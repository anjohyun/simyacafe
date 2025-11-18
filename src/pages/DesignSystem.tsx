import { useState } from 'react';
import { Button, Card, Input, Textarea, Modal, Loading } from '../components/common';
import { useToast } from '../contexts/ToastContext';

export default function DesignSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3) {
      setInputError('최소 3글자 이상 입력해주세요');
    } else {
      setInputError('');
    }
  };

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-electric-yellow to-mint drop-shadow-[0_0_30px_rgba(255,27,141,0.5)]">
              디자인 시스템
            </span>
          </h1>
          <p className="text-gray-200 text-xl font-semibold max-w-2xl mx-auto">
            연결실 플랫폼의 재사용 가능한 컴포넌트 라이브러리
          </p>
          <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-neon-pink to-mint rounded-full"></div>
        </div>

        {/* Color Palette */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">🎨</span> 컬러 팔레트
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="space-y-3 group">
              <div className="h-32 bg-neon-pink rounded-2xl shadow-2xl shadow-neon-pink/60 group-hover:scale-110 transition-transform duration-300 border-4 border-white/20"></div>
              <p className="text-base font-bold text-white">Neon Pink</p>
              <p className="text-sm text-neon-pink font-mono font-semibold">#FF1B8D</p>
            </div>
            <div className="space-y-3 group">
              <div className="h-32 bg-mint rounded-2xl shadow-2xl shadow-mint/60 group-hover:scale-110 transition-transform duration-300 border-4 border-white/20"></div>
              <p className="text-base font-bold text-white">Mint</p>
              <p className="text-sm text-mint font-mono font-semibold">#00FFC6</p>
            </div>
            <div className="space-y-3 group">
              <div className="h-32 bg-electric-yellow rounded-2xl shadow-2xl shadow-electric-yellow/60 group-hover:scale-110 transition-transform duration-300 border-4 border-white/20"></div>
              <p className="text-base font-bold text-white">Electric Yellow</p>
              <p className="text-sm text-electric-yellow font-mono font-semibold">#FFE400</p>
            </div>
            <div className="space-y-3 group">
              <div className="h-32 bg-dark-bg rounded-2xl border-4 border-gray-600 shadow-xl group-hover:scale-110 transition-transform duration-300"></div>
              <p className="text-base font-bold text-white">Dark BG</p>
              <p className="text-sm text-gray-400 font-mono font-semibold">#0A0A0A</p>
            </div>
            <div className="space-y-3 group">
              <div className="h-32 bg-dark-bg-secondary rounded-2xl border-4 border-gray-600 shadow-xl group-hover:scale-110 transition-transform duration-300"></div>
              <p className="text-base font-bold text-white">Dark BG Secondary</p>
              <p className="text-sm text-gray-400 font-mono font-semibold">#1A1A1A</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">🔘</span> 버튼
          </h2>

          <div className="space-y-10">
            {/* Variants */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-mint">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="primary" isLoading>Loading...</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-mint">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-mint">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">🎴</span> 카드
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Default Card</h3>
                <p className="text-gray-400">Glassmorphism 효과가 적용된 기본 카드입니다.</p>
              </div>
            </Card>

            <Card hoverable={false}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Non-hoverable</h3>
                <p className="text-gray-400">호버 효과가 없는 카드입니다.</p>
              </div>
            </Card>

            <Card glassmorphism={false}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Solid Card</h3>
                <p className="text-gray-400">글래스모피즘 효과가 없는 카드입니다.</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">📝</span> 입력 필드
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Input
              label="기본 입력"
              placeholder="텍스트를 입력하세요"
              helperText="도움말 텍스트입니다"
            />

            <Input
              type="email"
              label="이메일"
              placeholder="email@example.com"
            />

            <Input
              label="에러 상태"
              value={inputValue}
              onChange={handleInputChange}
              error={inputError}
              placeholder="3글자 이상 입력"
            />

            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호 입력"
            />
          </div>

          <div className="mt-6 max-w-4xl">
            <Textarea
              label="텍스트 영역"
              placeholder="여러 줄의 텍스트를 입력하세요..."
              helperText="최대 500자까지 입력 가능합니다"
            />
          </div>
        </section>

        {/* Modal */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">🪟</span> 모달
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsModalOpen(true)}>
              모달 열기
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="예시 모달"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-gray-300">
                이것은 예시 모달입니다. ESC 키를 누르거나 배경을 클릭하여 닫을 수 있습니다.
              </p>
              <Input placeholder="모달 내부의 입력 필드" />
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  취소
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  확인
                </Button>
              </div>
            </div>
          </Modal>
        </section>

        {/* Loading */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">⏳</span> 로딩
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <Loading size="sm" />
                <p className="mt-2 text-sm text-gray-400">Small</p>
              </div>
              <div className="text-center">
                <Loading size="md" />
                <p className="mt-2 text-sm text-gray-400">Medium</p>
              </div>
              <div className="text-center">
                <Loading size="lg" />
                <p className="mt-2 text-sm text-gray-400">Large</p>
              </div>
            </div>

            <div>
              <Loading size="md" text="데이터를 불러오는 중..." />
            </div>

            <div>
              <Button onClick={handleLoadingDemo}>
                전체 화면 로딩 데모
              </Button>
            </div>
          </div>

          {isLoading && <Loading fullScreen size="lg" text="로딩 중..." />}
        </section>

        {/* Toast */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">🔔</span> 토스트 알림
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => toast.success('성공 메시지입니다!')}>
              Success Toast
            </Button>
            <Button onClick={() => toast.error('에러가 발생했습니다!')}>
              Error Toast
            </Button>
            <Button onClick={() => toast.info('정보 메시지입니다!')}>
              Info Toast
            </Button>
            <Button onClick={() => {
              toast.success('첫 번째 알림');
              setTimeout(() => toast.info('두 번째 알림'), 500);
              setTimeout(() => toast.error('세 번째 알림'), 1000);
            }}>
              Multiple Toasts
            </Button>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-white flex items-center gap-3">
            <span className="text-5xl">📰</span> 타이포그래피
          </h2>
          <div className="space-y-8">
            <div className="p-6 bg-dark-bg-secondary/50 border-2 border-gray-700 rounded-2xl">
              <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-mint mb-2">Heading 1</h1>
              <code className="text-sm text-mint font-mono font-semibold">text-6xl font-extrabold</code>
            </div>
            <div className="p-6 bg-dark-bg-secondary/50 border-2 border-gray-700 rounded-2xl">
              <h2 className="text-5xl font-bold text-white mb-2">Heading 2</h2>
              <code className="text-sm text-electric-yellow font-mono font-semibold">text-5xl font-bold</code>
            </div>
            <div className="p-6 bg-dark-bg-secondary/50 border-2 border-gray-700 rounded-2xl">
              <h3 className="text-4xl font-bold text-white mb-2">Heading 3</h3>
              <code className="text-sm text-mint font-mono font-semibold">text-4xl font-bold</code>
            </div>
            <div className="p-6 bg-dark-bg-secondary/50 border-2 border-gray-700 rounded-2xl">
              <p className="text-xl text-white font-medium mb-2">Body Large - 본문 텍스트 라지</p>
              <code className="text-sm text-electric-yellow font-mono font-semibold">text-xl font-medium</code>
            </div>
            <div className="p-6 bg-dark-bg-secondary/50 border-2 border-gray-700 rounded-2xl">
              <p className="text-base text-white font-normal mb-2">Body - 본문 텍스트</p>
              <code className="text-sm text-mint font-mono font-semibold">text-base font-normal</code>
            </div>
            <div className="p-6 bg-dark-bg-secondary/50 border-2 border-gray-700 rounded-2xl">
              <p className="text-sm text-gray-300 mb-2">Small - 작은 텍스트</p>
              <code className="text-sm text-electric-yellow font-mono font-semibold">text-sm</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
