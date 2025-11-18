import { useState } from 'react';
import { Button, Card, Input, Textarea } from '../components/common';
import { useToast } from '../contexts/ToastContext';

interface UserStats {
  connections: number;
  events: number;
  projects: number;
  level: number;
}

export default function Profile() {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '심야 유저',
    email: 'user@simyacafe.com',
    bio: '밤에 활동하는 크리에이터입니다. 디자인과 음악을 사랑합니다.',
    interests: ['디자인', '음악', '영화', '독서'],
    mood: '창작적인' as string
  });

  const [stats] = useState<UserStats>({
    connections: 47,
    events: 12,
    projects: 8,
    level: 5
  });

  const handleSave = () => {
    toast.success('프로필이 저장되었습니다!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-electric-yellow to-mint drop-shadow-[0_0_30px_rgba(255,27,141,0.5)]">
              내 프로필
            </span>
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            나의 활동과 취향을 관리하세요
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Avatar & Stats */}
          <div className="space-y-6">
            {/* Avatar */}
            <Card>
              <div className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-pink via-electric-yellow to-mint p-1">
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                      <span className="text-6xl">🌙</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-mint text-dark-bg rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg shadow-mint/50">
                    {stats.level}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{profileData.name}</h2>
                <p className="text-mint font-semibold mb-4">{profileData.mood}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full"
                  onClick={() => toast.info('아바타 변경 기능 준비 중입니다')}
                >
                  아바타 변경
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span> 활동 통계
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neon-pink/20 flex items-center justify-center">
                        <span className="text-xl">👥</span>
                      </div>
                      <span className="text-gray-300 font-medium">연결된 사람</span>
                    </div>
                    <span className="text-2xl font-bold text-neon-pink">{stats.connections}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-electric-yellow/20 flex items-center justify-center">
                        <span className="text-xl">🎯</span>
                      </div>
                      <span className="text-gray-300 font-medium">참여한 이벤트</span>
                    </div>
                    <span className="text-2xl font-bold text-electric-yellow">{stats.events}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
                        <span className="text-xl">✨</span>
                      </div>
                      <span className="text-gray-300 font-medium">완성한 프로젝트</span>
                    </div>
                    <span className="text-2xl font-bold text-mint">{stats.projects}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-3xl">📝</span> 기본 정보
                  </h3>
                  {!isEditing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                    >
                      수정
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-5">
                    <Input
                      label="이름"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                    <Input
                      label="이메일"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                    <Textarea
                      label="자기소개"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                    />
                    <div className="flex gap-3 justify-end">
                      <Button variant="ghost" onClick={handleCancel}>
                        취소
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        저장
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-1 block">이름</label>
                      <p className="text-white text-lg font-medium">{profileData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-1 block">이메일</label>
                      <p className="text-white text-lg font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-1 block">자기소개</label>
                      <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Interests */}
            <Card>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-3xl">🎨</span> 관심사
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="px-5 py-2.5 bg-gradient-to-r from-neon-pink/20 to-mint/20 rounded-full border-2 border-mint/50 font-semibold text-white hover:scale-105 transition-transform cursor-pointer"
                    >
                      {interest}
                    </div>
                  ))}
                  <button
                    onClick={() => toast.info('관심사 추가 기능 준비 중입니다')}
                    className="px-5 py-2.5 border-2 border-dashed border-gray-600 rounded-full font-semibold text-gray-400 hover:border-mint hover:text-mint transition-colors"
                  >
                    + 추가
                  </button>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-3xl">🔥</span> 최근 활동
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: '🎯', text: '심야 독서 클럽 모임 참여', time: '2시간 전', color: 'neon-pink' },
                    { icon: '✨', text: '팟캐스트 에피소드 3 완성', time: '1일 전', color: 'electric-yellow' },
                    { icon: '👥', text: '새로운 멤버 5명과 연결', time: '3일 전', color: 'mint' },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-dark-bg-secondary/50 hover:bg-dark-bg-secondary transition-colors"
                    >
                      <div className={`text-3xl w-12 h-12 rounded-full bg-${activity.color}/20 flex items-center justify-center flex-shrink-0`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium mb-1">{activity.text}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Settings */}
            <Card>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-3xl">⚙️</span> 설정
                </h3>
                <div className="space-y-4">
                  <Button
                    variant="ghost"
                    fullWidth
                    className="justify-start"
                    onClick={() => toast.info('알림 설정 페이지로 이동합니다')}
                  >
                    <span className="text-xl mr-3">🔔</span>
                    알림 설정
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    className="justify-start"
                    onClick={() => toast.info('프라이버시 설정 페이지로 이동합니다')}
                  >
                    <span className="text-xl mr-3">🔒</span>
                    프라이버시 설정
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    className="justify-start"
                    onClick={() => toast.info('계정 관리 페이지로 이동합니다')}
                  >
                    <span className="text-xl mr-3">👤</span>
                    계정 관리
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
