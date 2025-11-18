import { useState } from 'react';
import { Event } from '../../../types/event';
import { Modal, Button } from '../../common';
import { useToast } from '../../../contexts/ToastContext';
import { useForm } from 'react-hook-form';
import { BookingForm } from '../../../types/event';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const moodEmojis: Record<string, string> = {
  creative: '🎨',
  social: '👥',
  relaxed: '😌',
  energetic: '⚡',
  contemplative: '🤔',
};

const moodLabels: Record<string, string> = {
  creative: '창작적인',
  social: '사교적인',
  relaxed: '여유로운',
  energetic: '활동적인',
  contemplative: '사색적인',
};

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'booking' | 'comments'>('info');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingForm>();
  const toast = useToast();

  if (!event) return null;

  const onSubmit = (data: BookingForm) => {
    console.log('Booking data:', data);
    toast.success('🎉 예약이 완료되었습니다! 확인 메일을 보냈습니다.');
    reset();
    setTimeout(() => {
      setActiveTab('info');
      onClose();
    }, 1500);
  };

  const handleInviteFriend = () => {
    toast.info('친구 초대 링크가 클립보드에 복사되었습니다!');
  };

  const remainingSeats = event.maxCapacity - event.currentAttendees;
  const stageColors = {
    '1차': '#10B981',
    '2차': '#3B82F6',
    '3차': '#FF1B8D',
  };
  const stageColor = stageColors[event.stage];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div style={{ padding: '0' }}>
        {/* Header */}
        <div style={{
          padding: '32px',
          background: `linear-gradient(135deg, ${stageColor}20 0%, rgba(26,26,26,0.8) 100%)`,
          borderBottom: `2px solid ${stageColor}40`,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px',
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#FFFFFF',
              flex: 1,
            }}>
              {event.title}
            </h2>
            <div style={{
              padding: '8px 16px',
              background: `${stageColor}30`,
              border: `2px solid ${stageColor}`,
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '800',
              color: stageColor,
            }}>
              {event.stage}
            </div>
          </div>

          {/* Quick Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '20px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '24px' }}>📅</span>
              <div>
                <div style={{ fontSize: '12px', color: '#999999', fontWeight: '600' }}>날짜</div>
                <div style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '700' }}>
                  {event.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '24px' }}>⏰</span>
              <div>
                <div style={{ fontSize: '12px', color: '#999999', fontWeight: '600' }}>시간</div>
                <div style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '700' }}>
                  {event.startTime} - {event.endTime}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '24px' }}>📍</span>
              <div>
                <div style={{ fontSize: '12px', color: '#999999', fontWeight: '600' }}>장소</div>
                <div style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '700' }}>
                  {event.location}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '24px' }}>🎤</span>
              <div>
                <div style={{ fontSize: '12px', color: '#999999', fontWeight: '600' }}>호스트</div>
                <div style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '700' }}>
                  {event.host}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #333333',
          padding: '0 32px',
        }}>
          {[
            { id: 'info', label: '정보', icon: 'ℹ️' },
            { id: 'booking', label: '예약', icon: '🎫' },
            { id: 'comments', label: '댓글', icon: '💬' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: '800',
                color: activeTab === tab.id ? stageColor : '#999999',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? `3px solid ${stageColor}` : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '32px', maxHeight: '500px', overflowY: 'auto' }}>
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Description */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  이벤트 소개
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#DDDDDD',
                }}>
                  {event.description}
                </p>
              </div>

              {/* Capacity */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  참가 현황
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}>
                  <span style={{ fontSize: '14px', color: '#CCCCCC', fontWeight: '600' }}>
                    참가자
                  </span>
                  <span style={{ fontSize: '14px', color: stageColor, fontWeight: '800' }}>
                    {event.currentAttendees} / {event.maxCapacity}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '12px',
                  backgroundColor: '#1A1A1A',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '2px solid #333333',
                }}>
                  <div style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${stageColor}, ${stageColor}AA)`,
                    width: `${(event.currentAttendees / event.maxCapacity) * 100}%`,
                    boxShadow: `0 0 15px ${stageColor}66`,
                  }} />
                </div>
                {remainingSeats <= 3 && (
                  <p style={{
                    marginTop: '12px',
                    fontSize: '14px',
                    color: '#FF1B8D',
                    fontWeight: '800',
                    textAlign: 'center',
                  }}>
                    ⚡ 남은 자리 {remainingSeats}석!
                  </p>
                )}
              </div>

              {/* Attendees */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  참가자 ({event.currentAttendees}명)
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '12px',
                }}>
                  {event.attendees.slice(0, 12).map((attendee) => (
                    <div
                      key={attendee.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '16px',
                        backgroundColor: '#1A1A1A',
                        borderRadius: '12px',
                        border: '2px solid #333333',
                      }}
                    >
                      <div style={{ fontSize: '40px', marginBottom: '8px' }}>
                        {attendee.avatar}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        marginBottom: '4px',
                        textAlign: 'center',
                      }}>
                        {attendee.name}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#999999',
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                        {moodEmojis[attendee.mood]} {moodLabels[attendee.mood]}
                      </div>
                    </div>
                  ))}
                  {remainingSeats > 0 && Array.from({ length: Math.min(3, remainingSeats) }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        backgroundColor: '#0A0A0A',
                        borderRadius: '12px',
                        border: '2px dashed #444444',
                        minHeight: '100px',
                      }}
                    >
                      <span style={{ fontSize: '32px', opacity: 0.3 }}>?</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mood Distribution */}
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  무드 분포
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(event.moodDistribution).filter(([_, value]) => value > 0).map(([mood, percentage]) => (
                    <div key={mood}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}>
                        <span style={{
                          fontSize: '14px',
                          color: '#DDDDDD',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <span style={{ fontSize: '18px' }}>{moodEmojis[mood]}</span>
                          {moodLabels[mood]}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: stageColor,
                          fontWeight: '800',
                        }}>
                          {percentage}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#1A1A1A',
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${stageColor}, ${stageColor}AA)`,
                          width: `${percentage}%`,
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '2px solid #333333',
              }}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setActiveTab('booking')}
                >
                  지금 예약하기 ✨
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleInviteFriend}
                >
                  친구 초대 🔗
                </Button>
              </div>
            </div>
          )}

          {/* Booking Tab */}
          {activeTab === 'booking' && (
            <form onSubmit={handleSubmit(onSubmit)} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  예약 정보
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#999999',
                  marginBottom: '24px',
                }}>
                  이벤트 참가를 위해 정보를 입력해주세요.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#DDDDDD',
                      marginBottom: '8px',
                    }}>
                      이름 *
                    </label>
                    <input
                      {...register('name', { required: '이름을 입력해주세요' })}
                      placeholder="홍길동"
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '16px',
                        backgroundColor: '#1A1A1A',
                        border: errors.name ? '2px solid #FF1B8D' : '2px solid #333333',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                    {errors.name && (
                      <p style={{ fontSize: '12px', color: '#FF1B8D', marginTop: '6px' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#DDDDDD',
                      marginBottom: '8px',
                    }}>
                      이메일 *
                    </label>
                    <input
                      {...register('email', {
                        required: '이메일을 입력해주세요',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '올바른 이메일 형식을 입력해주세요',
                        },
                      })}
                      type="email"
                      placeholder="example@email.com"
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '16px',
                        backgroundColor: '#1A1A1A',
                        border: errors.email ? '2px solid #FF1B8D' : '2px solid #333333',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                    {errors.email && (
                      <p style={{ fontSize: '12px', color: '#FF1B8D', marginTop: '6px' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#DDDDDD',
                      marginBottom: '8px',
                    }}>
                      전화번호 *
                    </label>
                    <input
                      {...register('phone', {
                        required: '전화번호를 입력해주세요',
                        pattern: {
                          value: /^010-?\d{4}-?\d{4}$/,
                          message: '올바른 전화번호 형식을 입력해주세요 (010-XXXX-XXXX)',
                        },
                      })}
                      type="tel"
                      placeholder="010-1234-5678"
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '16px',
                        backgroundColor: '#1A1A1A',
                        border: errors.phone ? '2px solid #FF1B8D' : '2px solid #333333',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        outline: 'none',
                      }}
                    />
                    {errors.phone && (
                      <p style={{ fontSize: '12px', color: '#FF1B8D', marginTop: '6px' }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#DDDDDD',
                      marginBottom: '8px',
                    }}>
                      특별히 기대하는 점 (선택)
                    </label>
                    <textarea
                      {...register('expectations')}
                      placeholder="이 이벤트에서 무엇을 기대하시나요?"
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '16px',
                        backgroundColor: '#1A1A1A',
                        border: '2px solid #333333',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {event.requiresVipCode && (
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#DDDDDD',
                        marginBottom: '8px',
                      }}>
                        VIP 코드 *
                      </label>
                      <input
                        {...register('vipCode', {
                          required: event.requiresVipCode ? 'VIP 코드를 입력해주세요' : false,
                        })}
                        placeholder="VIP-XXXX-XXXX"
                        style={{
                          width: '100%',
                          padding: '14px',
                          fontSize: '16px',
                          backgroundColor: '#1A1A1A',
                          border: errors.vipCode ? '2px solid #FF1B8D' : '2px solid #FFE400',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          outline: 'none',
                        }}
                      />
                      <p style={{
                        fontSize: '12px',
                        color: '#FFE400',
                        marginTop: '6px',
                        fontWeight: '600',
                      }}>
                        🔒 2차 참가자에게 발급된 코드를 입력하세요
                      </p>
                      {errors.vipCode && (
                        <p style={{ fontSize: '12px', color: '#FF1B8D', marginTop: '6px' }}>
                          {errors.vipCode.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '2px solid #333333',
              }}>
                <Button type="submit" variant="primary" fullWidth>
                  예약 완료 🎉
                </Button>
                <Button type="button" variant="ghost" onClick={() => setActiveTab('info')}>
                  취소
                </Button>
              </div>
            </form>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#FFFFFF',
              }}>
                질문 & 댓글
              </h3>

              {/* Mock Comments */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { user: '🌟 별빛', time: '2시간 전', text: '처음 참가하는데 준비물이 따로 있나요?' },
                  { user: '🎨 아티스트', time: '5시간 전', text: '정말 기대되네요! 다음주 목요일 맞죠?' },
                ].map((comment, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '20px',
                      backgroundColor: '#1A1A1A',
                      borderRadius: '12px',
                      border: '2px solid #333333',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                      }}>
                        {comment.user}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: '#999999',
                        fontWeight: '600',
                      }}>
                        {comment.time}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#DDDDDD',
                      lineHeight: '1.6',
                    }}>
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div>
                <textarea
                  placeholder="질문이나 댓글을 남겨주세요..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '16px',
                    backgroundColor: '#1A1A1A',
                    border: '2px solid #333333',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '12px',
                  }}
                />
                <Button variant="primary">
                  댓글 작성
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
