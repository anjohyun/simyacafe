import { useState } from 'react';
import { Event, EventStage } from '../types/event';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/features/events/EventCard';
import EventDetailModal from '../components/features/events/EventDetailModal';

type ViewMode = 'list' | 'myevents';

export default function EventCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState<EventStage | 'all'>('all');

  const filteredEvents = mockEvents.filter((event) => {
    if (stageFilter === 'all') return true;
    return event.stage === stageFilter;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      paddingTop: '80px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
      }}>
      {/* Header */}
      <div style={{
        marginBottom: '40px',
      }}>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 56px)',
          fontWeight: '900',
          marginBottom: '15px',
          background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(255,27,141,0.5))',
        }}>
          이벤트 캘린더
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#CCCCCC',
          fontWeight: '600',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}>
          1차, 2차, 3차 단계별 이벤트를 확인하고 예약하세요
        </p>
      </div>

      {/* View Tabs */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '40px',
        borderBottom: '2px solid #333333',
      }}>
        <button
          onClick={() => setViewMode('list')}
          style={{
            paddingBottom: '16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            fontWeight: '800',
            fontSize: '16px',
            transition: 'color 0.3s ease',
            color: viewMode === 'list' ? '#FF1B8D' : '#CCCCCC',
            position: 'relative',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textShadow: viewMode === 'list' ? '0 0 15px rgba(255,27,141,0.6)' : 'none',
          }}
        >
          이벤트 목록
          {viewMode === 'list' && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: '#FF1B8D',
              boxShadow: '0 0 10px rgba(255,27,141,0.6)',
            }} />
          )}
        </button>
        <button
          onClick={() => setViewMode('myevents')}
          style={{
            paddingBottom: '16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            fontWeight: '800',
            fontSize: '16px',
            transition: 'color 0.3s ease',
            color: viewMode === 'myevents' ? '#00FFC6' : '#CCCCCC',
            position: 'relative',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textShadow: viewMode === 'myevents' ? '0 0 15px rgba(0,255,198,0.6)' : 'none',
          }}
        >
          내 이벤트
          {viewMode === 'myevents' && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: '#00FFC6',
              boxShadow: '0 0 10px rgba(0,255,198,0.6)',
            }} />
          )}
        </button>
      </div>

      {/* Event List View */}
      {viewMode === 'list' && (
        <>
          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}>
            {[
              { id: 'all', label: '전체', color: '#FF1B8D' },
              { id: '1차', label: '1차 모임', color: '#10B981' },
              { id: '2차', label: '2차 워크샵', color: '#3B82F6' },
              { id: '3차', label: '3차 오픈런', color: '#FF1B8D' },
            ].map((filter) => {
              const isActive = stageFilter === filter.id;
              const [isHovered, setIsHovered] = useState(false);

              return (
                <button
                  key={filter.id}
                  onClick={() => setStageFilter(filter.id as EventStage | 'all')}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '800',
                    background: isActive
                      ? 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)'
                      : 'transparent',
                    color: isActive ? '#0A0A0A' : filter.color,
                    border: isActive ? '2px solid rgba(255,255,255,0.3)' : `2px solid ${filter.color}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 0 20px rgba(255,27,141,0.4)' : 'none',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Events Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '25px',
          }}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
            }}>
              <p style={{
                fontSize: '18px',
                color: '#999999',
                fontWeight: '700',
              }}>해당 조건의 이벤트가 없습니다.</p>
            </div>
          )}
        </>
      )}

      {/* My Events View */}
      {viewMode === 'myevents' && (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {/* Progress Card */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(255,27,141,0.15), rgba(0,255,198,0.15))',
            border: '2px solid rgba(255,27,141,0.3)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '900',
              marginBottom: '20px',
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>진행 상황</h3>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <span style={{
                  fontSize: '16px',
                  color: '#DDDDDD',
                  fontWeight: '700',
                }}>다음 단계까지</span>
                <span style={{
                  fontSize: '16px',
                  color: '#FF1B8D',
                  fontWeight: '900',
                  textShadow: '0 0 15px rgba(255,27,141,0.6)',
                }}>1회 남음</span>
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
                  background: 'linear-gradient(90deg, #FF1B8D 0%, #00FFC6 100%)',
                  width: '66%',
                  boxShadow: '0 0 20px rgba(255,27,141,0.6)',
                }} />
              </div>
              <p style={{
                fontSize: '14px',
                color: '#BBBBBB',
                marginTop: '15px',
                fontWeight: '600',
              }}>
                1차 모임 2회 참여 → 2차 워크샵 잠금 해제 🔓
              </p>
            </div>
          </div>

          {/* Upcoming Events */}
          <h3 style={{
            fontSize: '24px',
            fontWeight: '900',
            marginBottom: '20px',
            color: '#FFFFFF',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}>예정된 이벤트</h3>
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              backgroundColor: '#1A1A1A',
              border: '2px solid #333333',
              borderRadius: '16px',
              padding: '30px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                }}>🐕 반려견 산책 모임</h4>
                <span style={{
                  padding: '6px 16px',
                  background: 'rgba(16,185,129,0.2)',
                  border: '2px solid #10B981',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: '#10B981',
                  fontWeight: '800',
                }}>
                  1차
                </span>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#CCCCCC',
                marginBottom: '20px',
                fontWeight: '700',
              }}>2025년 11월 20일 • 15:00</p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  flex: 1,
                  minWidth: '200px',
                  backgroundColor: '#0A0A0A',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#999999',
                    marginBottom: '8px',
                    fontWeight: '700',
                  }}>QR 티켓</p>
                  <div style={{ fontSize: '40px' }}>▪️▪️▫️▪️</div>
                </div>
                <button style={{
                  padding: '12px 28px',
                  fontSize: '16px',
                  fontWeight: '800',
                  backgroundColor: '#1A1A1A',
                  color: '#FF1B8D',
                  border: '2px solid #FF1B8D',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}>
                  공유하기
                </button>
              </div>
            </div>
          </div>

          {/* Past Events */}
          <h3 style={{
            fontSize: '24px',
            fontWeight: '900',
            marginBottom: '20px',
            color: '#FFFFFF',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}>지난 이벤트</h3>
          <div>
            <div style={{
              backgroundColor: 'rgba(26, 26, 26, 0.5)',
              border: '2px solid #333333',
              borderRadius: '16px',
              padding: '30px',
              opacity: 0.75,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                }}>📚 심야 독서 클럽</h4>
                <span style={{
                  fontSize: '12px',
                  color: '#999999',
                  fontWeight: '700',
                }}>참여 완료</span>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#CCCCCC',
                fontWeight: '700',
              }}>2025년 10월 28일</p>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      </div>
    </div>
  );
}
