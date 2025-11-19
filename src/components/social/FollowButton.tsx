import { useState } from 'react';
import { UserProfile } from '../../types/social';

interface FollowButtonProps {
  user: UserProfile;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

export function FollowButton({
  user,
  onFollow,
  onUnfollow,
  size = 'medium',
  showCount = true,
}: FollowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeConfig = {
    small: { padding: '8px 16px', fontSize: '13px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '14px 32px', fontSize: '16px' },
  };

  const config = sizeConfig[size];

  const handleClick = () => {
    if (user.isFollowing) {
      onUnfollow(user.userId);
    } else {
      onFollow(user.userId);
    }
  };

  const getButtonStyle = () => {
    if (user.isFollowing) {
      if (isHovered) {
        return {
          background: 'linear-gradient(90deg, #FF6B6B, #FF1B8D)',
          border: 'none',
          label: '팔로우 취소',
        };
      }
      return {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        label: user.isMutual ? '맞팔로우 중' : '팔로잉',
      };
    }
    return {
      background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
      border: 'none',
      label: '팔로우',
    };
  };

  const buttonStyle = getButtonStyle();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: config.padding,
          background: buttonStyle.background,
          border: buttonStyle.border,
          borderRadius: '12px',
          color: '#FFFFFF',
          fontSize: config.fontSize,
          fontWeight: '800',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {user.isFollowing ? (
          <>
            {user.isMutual && !isHovered && '🤝'}
            {isHovered ? '❌' : user.isMutual ? '' : '✓'}
          </>
        ) : (
          '+'
        )}
        <span>{buttonStyle.label}</span>
      </button>

      {showCount && (
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#FFFFFF' }}>
              {user.followerCount >= 1000
                ? `${(user.followerCount / 1000).toFixed(1)}K`
                : user.followerCount}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#999999' }}>팔로워</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#FFFFFF' }}>
              {user.followingCount >= 1000
                ? `${(user.followingCount / 1000).toFixed(1)}K`
                : user.followingCount}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#999999' }}>팔로잉</div>
          </div>
        </div>
      )}
    </div>
  );
}
