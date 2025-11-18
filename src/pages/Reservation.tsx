import { useState, useEffect } from 'react';
import { CafeMood, MoodVote, CurrentCafeState } from '../types/cafe';
import { moodOptions, initialCafeState, initialVotes, timeSlots } from '../data/mockCafe';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/common';

export default function Reservation() {
  const [cafeState, setCafeState] = useState<CurrentCafeState>(initialCafeState);
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<CafeMood | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const toast = useToast();

  // Calculate vote percentages
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  const moodVotes: MoodVote[] = moodOptions.map(option => ({
    mood: option.id,
    count: votes[option.id],
    percentage: totalVotes > 0 ? Math.round((votes[option.id] / totalVotes) * 100) : 0,
  }));

  // Get current dominant mood
  const dominantMood = moodVotes.reduce((prev, current) =>
    current.count > prev.count ? current : prev
  );

  // Simulate real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Random visitor count fluctuation
      setCafeState(prev => ({
        ...prev,
        visitorCount: Math.max(15, Math.min(45, prev.visitorCount + Math.floor(Math.random() * 7) - 3)),
      }));

      // Random small vote changes
      setVotes(prev => {
        const newVotes = { ...prev };
        const moods = Object.keys(newVotes) as CafeMood[];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        newVotes[randomMood] = Math.max(5, newVotes[randomMood] + Math.floor(Math.random() * 5) - 2);
        return newVotes;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = (mood: CafeMood) => {
    if (hasVoted) {
      toast.error('이미 투표하셨습니다!');
      return;
    }

    setSelectedMood(mood);
    setVotes(prev => ({
      ...prev,
      [mood]: prev[mood] + 1,
    }));
    setHasVoted(true);
    toast.success(`${moodOptions.find(m => m.id === mood)?.label} 분위기에 투표하셨습니다!`);
  };

  const handleReservation = () => {
    if (!selectedTimeSlot) {
      toast.error('시간대를 선택해주세요!');
      return;
    }

    toast.success(`${selectedTimeSlot} 예약이 완료되었습니다! 🎉`);
    setSelectedTimeSlot('');
    setPartySize(2);
    setSpecialRequests('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      padding: '80px 20px 40px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #FF1B8D, #FFE400, #00FFC6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            🌙 심야 카페 예약
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#DDDDDD',
            fontWeight: '600',
          }}>
            오늘 밤 카페의 분위기를 투표하고 예약하세요
          </p>
        </div>

        {/* Current Cafe Status Banner */}
        <div style={{
          padding: '32px',
          background: `linear-gradient(135deg, ${moodOptions.find(m => m.id === dominantMood.mood)?.color}20, rgba(26, 26, 26, 0.8))`,
          borderRadius: '24px',
          border: `2px solid ${moodOptions.find(m => m.id === dominantMood.mood)?.color}`,
          marginBottom: '40px',
          transition: 'all 0.5s ease',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            alignItems: 'center',
          }}>
            {/* DJ Profile */}
            <div style={{ flex: '1 1 200px' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '12px',
              }}>
                {cafeState.djAvatar}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                오늘의 DJ
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '900',
                color: '#FFFFFF',
              }}>
                {cafeState.djName}
              </div>
            </div>

            {/* Now Playing */}
            <div style={{ flex: '2 1 300px' }}>
              <div style={{
                fontSize: '12px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                NOW PLAYING
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '900',
                color: '#FFFFFF',
                marginBottom: '4px',
              }}>
                {cafeState.currentSong}
              </div>
              <div style={{
                fontSize: '16px',
                color: '#DDDDDD',
                fontWeight: '700',
              }}>
                {cafeState.currentArtist}
              </div>
              <div style={{
                marginTop: '12px',
                display: 'inline-block',
                padding: '6px 16px',
                background: `${moodOptions.find(m => m.id === dominantMood.mood)?.color}33`,
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '800',
                color: moodOptions.find(m => m.id === dominantMood.mood)?.color,
              }}>
                {cafeState.musicGenre}
              </div>
            </div>

            {/* Visitor Count */}
            <div style={{ flex: '1 1 150px', textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '8px',
              }}>
                👥
              </div>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                현재 인원
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '900',
                color: '#FFFFFF',
              }}>
                {cafeState.visitorCount}명
              </div>
            </div>
          </div>
        </div>

        {/* Mood Voting Section */}
        <div style={{
          padding: '40px',
          background: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '24px',
          border: '2px solid #333333',
          marginBottom: '40px',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '16px',
          }}>
            🎭 오늘 밤 분위기 투표
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#DDDDDD',
            fontWeight: '600',
            marginBottom: '32px',
          }}>
            원하는 분위기에 투표하세요! 매시간 투표 결과에 따라 음악이 바뀝니다.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {moodOptions.map((mood) => {
              const voteData = moodVotes.find(v => v.mood === mood.id);
              const isSelected = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  onClick={() => handleVote(mood.id)}
                  disabled={hasVoted}
                  style={{
                    padding: '24px',
                    background: isSelected
                      ? `linear-gradient(135deg, ${mood.color}, ${mood.color}CC)`
                      : 'rgba(26, 26, 26, 0.8)',
                    border: isSelected ? `3px solid ${mood.color}` : '2px solid #333333',
                    borderRadius: '20px',
                    cursor: hasVoted ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: hasVoted && !isSelected ? 0.6 : 1,
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '12px',
                  }}>
                    {mood.icon}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}>
                    {mood.label}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#DDDDDD',
                    fontWeight: '600',
                    marginBottom: '16px',
                    lineHeight: '1.4',
                  }}>
                    {mood.description}
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '900',
                    color: mood.color,
                  }}>
                    {voteData?.count || 0}표 ({voteData?.percentage || 0}%)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Results Visualization */}
          <div style={{
            padding: '32px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '20px',
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}>
              📊 실시간 투표 현황
            </h3>

            <div style={{
              display: 'flex',
              height: '40px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '16px',
            }}>
              {moodVotes.map((vote) => {
                const mood = moodOptions.find(m => m.id === vote.mood);
                return (
                  <div
                    key={vote.mood}
                    style={{
                      width: `${vote.percentage}%`,
                      background: mood?.color,
                      transition: 'width 0.5s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '800',
                      color: '#0A0A0A',
                    }}
                  >
                    {vote.percentage > 10 && `${vote.percentage}%`}
                  </div>
                );
              })}
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
            }}>
              {moodVotes.map((vote) => {
                const mood = moodOptions.find(m => m.id === vote.mood);
                return (
                  <div
                    key={vote.mood}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      background: mood?.color,
                    }} />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                    }}>
                      {mood?.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cafe Environment Preview */}
        <div style={{
          padding: '40px',
          background: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '24px',
          border: '2px solid #333333',
          marginBottom: '40px',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '24px',
          }}>
            🏮 현재 카페 분위기
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              padding: '24px',
              background: `linear-gradient(135deg, ${moodOptions.find(m => m.id === dominantMood.mood)?.color}15, rgba(0, 0, 0, 0.3))`,
              borderRadius: '16px',
              border: `2px solid ${moodOptions.find(m => m.id === dominantMood.mood)?.color}`,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '16px',
              }}>
                🎵
              </div>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                주요 무드
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '800',
                color: '#FFFFFF',
              }}>
                {moodOptions.find(m => m.id === dominantMood.mood)?.label}
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              border: '2px solid #333333',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '16px',
              }}>
                💡
              </div>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                조명 색상
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: cafeState.lightingColor,
                  border: '2px solid #FFFFFF',
                }} />
                <div style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                }}>
                  {cafeState.lightingColor}
                </div>
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '16px',
              border: '2px solid #333333',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '16px',
              }}>
                👥
              </div>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                현재 인원
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '800',
                color: '#FFFFFF',
              }}>
                {cafeState.visitorCount}명 방문 중
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Section */}
        <div style={{
          padding: '40px',
          background: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '24px',
          border: '2px solid #333333',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#FFFFFF',
            }}>
              방문 예약하기
            </h2>
            <div style={{
              padding: '12px 24px',
              background: 'linear-gradient(90deg, #FFE400, #FF1B8D)',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '800',
              color: '#0A0A0A',
            }}>
              🌟 VIP 우선 예약
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}>
            {/* Time Slot Selector */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '800',
                color: '#DDDDDD',
                marginBottom: '16px',
              }}>
                시간대 선택
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '12px',
              }}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    disabled={!slot.available}
                    style={{
                      padding: '16px 12px',
                      fontSize: '16px',
                      fontWeight: '800',
                      background: selectedTimeSlot === slot.time
                        ? 'linear-gradient(90deg, #FF1B8D, #00FFC6)'
                        : slot.available
                          ? 'rgba(26, 26, 26, 0.8)'
                          : 'rgba(26, 26, 26, 0.4)',
                      color: selectedTimeSlot === slot.time ? '#0A0A0A' : '#FFFFFF',
                      border: selectedTimeSlot === slot.time
                        ? '2px solid #00FFC6'
                        : '2px solid #333333',
                      borderRadius: '12px',
                      cursor: slot.available ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease',
                      opacity: slot.available ? 1 : 0.5,
                    }}
                  >
                    <div>{slot.time}</div>
                    {slot.waitTime && (
                      <div style={{ fontSize: '11px', marginTop: '4px' }}>
                        ⏰ {slot.waitTime}분 대기
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Party Size & Special Requests */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '800',
                color: '#DDDDDD',
                marginBottom: '16px',
              }}>
                인원 및 요청사항
              </label>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#DDDDDD',
                  marginBottom: '8px',
                }}>
                  인원
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={partySize}
                  onChange={(e) => setPartySize(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    background: 'rgba(26, 26, 26, 0.8)',
                    border: '2px solid #333333',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#DDDDDD',
                  marginBottom: '8px',
                }}>
                  특별 요청사항
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="창가 자리, 특정 음악 장르 등..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '12px 16px',
                    fontSize: '15px',
                    fontWeight: '600',
                    background: 'rgba(26, 26, 26, 0.8)',
                    border: '2px solid #333333',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleReservation}
              >
                예약 완료 🎉
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
