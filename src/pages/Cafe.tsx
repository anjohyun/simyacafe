import { useState, useEffect } from 'react';
import { CafeMood, MoodVote, CurrentCafeState, Song, SongQueue } from '../types/cafe';
import { moodOptions, initialCafeState, initialVotes, timeSlots, mockPlaylists } from '../data/mockCafe';
import { useToast } from '../contexts/ToastContext';
import { Button, Modal } from '../components/common';

export default function Cafe() {
  const [cafeState, setCafeState] = useState<CurrentCafeState>(initialCafeState);
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<CafeMood | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [songQueue, setSongQueue] = useState<SongQueue[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(mockPlaylists[0]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0);
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
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [dominantMood]);

  const handleVote = (mood: CafeMood) => {
    if (hasVoted) {
      toast.info('이미 투표하셨습니다!');
      return;
    }

    setSelectedMood(mood);
    setVotes(prev => ({
      ...prev,
      [mood]: prev[mood] + 1,
    }));
    setHasVoted(true);
    toast.success('투표 완료! 10초 후 분위기에 반영됩니다 ✨');

    // Simulate mood change after 10 seconds
    setTimeout(() => {
      const moodOption = moodOptions.find(m => m.id === mood);
      if (moodOption) {
        setCafeState(prev => ({
          ...prev,
          currentMood: mood,
          lightingColor: moodOption.color,
          ambianceDescription: moodOption.description,
        }));
      }
    }, 10000);
  };

  const handleReservation = () => {
    if (!selectedTimeSlot) {
      toast.error('시간대를 선택해주세요');
      return;
    }
    toast.success(`${selectedTimeSlot} 예약이 완료되었습니다! 📧 확인 메일을 보냈습니다.`);
    setSelectedTimeSlot('');
    setPartySize(2);
    setSpecialRequests('');
  };

  const handleRequestSong = (song: Song) => {
    const newRequest: SongQueue = {
      id: `queue-${Date.now()}`,
      song,
      requestedBy: '익명의 방문객',
      timestamp: Date.now(),
      priority: 'normal',
    };
    setSongQueue([...songQueue, newRequest]);
    toast.success(`🎵 "${song.title}" 신청곡이 대기열에 추가되었습니다!`);
  };

  const handleShowLyrics = (song: Song) => {
    setSelectedSong(song);
    setShowLyricsModal(true);
  };

  // Auto-advance song every 30 seconds for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlayingIndex((prev) =>
        (prev + 1) % selectedPlaylist.songs.length
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [selectedPlaylist]);

  const dominantMoodOption = moodOptions.find(m => m.id === dominantMood.mood);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      color: '#FFFFFF',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontWeight: '900',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #FF1B8D 0%, #FFE400 50%, #00FFC6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(255, 27, 141, 0.5))',
          }}>
            연결실 심야 카페
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#CCCCCC',
            fontWeight: '600',
          }}>
            실시간으로 분위기를 만들어가는 공간
          </p>
        </div>

        {/* Current Cafe Status Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${cafeState.lightingColor}20 0%, rgba(26,26,26,0.9) 100%)`,
          border: `2px solid ${cafeState.lightingColor}40`,
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${cafeState.lightingColor}30 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '900',
              marginBottom: '30px',
              color: '#FFFFFF',
            }}>
              지금 연결실은...
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}>
              {/* DJ Profile */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}>
                <div style={{
                  fontSize: '60px',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(26, 26, 26, 0.8)',
                  borderRadius: '50%',
                  border: `3px solid ${cafeState.lightingColor}`,
                  boxShadow: `0 0 20px ${cafeState.lightingColor}60`,
                }}>
                  {cafeState.djAvatar}
                </div>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: '#999999',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    현재 DJ
                  </div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                  }}>
                    {cafeState.djName}
                  </div>
                </div>
              </div>

              {/* Now Playing */}
              <div style={{
                padding: '20px',
                background: 'rgba(26, 26, 26, 0.6)',
                borderRadius: '16px',
                border: '2px solid #333333',
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#999999',
                  fontWeight: '600',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ fontSize: '16px' }}>🎵</span>
                  현재 재생 중
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  marginBottom: '4px',
                }}>
                  {cafeState.currentSong}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#BBBBBB',
                  fontWeight: '600',
                }}>
                  {cafeState.currentArtist}
                </div>
                {/* Fake progress bar */}
                <div style={{
                  marginTop: '12px',
                  height: '4px',
                  background: '#1A1A1A',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '45%',
                    height: '100%',
                    background: cafeState.lightingColor,
                    boxShadow: `0 0 10px ${cafeState.lightingColor}`,
                  }} />
                </div>
              </div>

              {/* Visitor Count */}
              <div style={{
                padding: '20px',
                background: 'rgba(26, 26, 26, 0.6)',
                borderRadius: '16px',
                border: '2px solid #333333',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#999999',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}>
                  실시간 방문자
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '900',
                  color: cafeState.lightingColor,
                  textShadow: `0 0 20px ${cafeState.lightingColor}60`,
                  marginBottom: '4px',
                }}>
                  {cafeState.visitorCount}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#00FFC6',
                  fontWeight: '700',
                }}>
                  🟢 Live
                </div>
              </div>
            </div>

            {/* Current Ambiance */}
            <div style={{
              marginTop: '30px',
              padding: '24px',
              background: 'rgba(26, 26, 26, 0.4)',
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '12px',
              }}>
                🌟 현재 분위기
              </div>
              <p style={{
                fontSize: '18px',
                color: '#DDDDDD',
                lineHeight: '1.6',
              }}>
                {cafeState.ambianceDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Mood Voting Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            marginBottom: '16px',
            color: '#FFFFFF',
          }}>
            지금 어떤 분위기를 원하시나요?
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#999999',
            marginBottom: '32px',
            fontWeight: '600',
          }}>
            투표로 카페의 분위기를 직접 만들어보세요
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {moodOptions.map((option) => {
              const voteData = moodVotes.find(v => v.mood === option.id);
              const isSelected = selectedMood === option.id;
              const isActive = dominantMood.mood === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                  disabled={hasVoted}
                  style={{
                    padding: '32px 24px',
                    background: isActive
                      ? `linear-gradient(135deg, ${option.color}30 0%, rgba(26,26,26,0.9) 100%)`
                      : 'rgba(26, 26, 26, 0.8)',
                    border: isActive
                      ? `3px solid ${option.color}`
                      : isSelected
                        ? `3px solid ${option.color}80`
                        : '3px solid #333333',
                    borderRadius: '20px',
                    cursor: hasVoted ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: hasVoted && !isSelected ? 0.6 : 1,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (!hasVoted) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 8px 30px ${option.color}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                    {option.icon}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                  }}>
                    {option.label}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#BBBBBB',
                    marginBottom: '16px',
                    lineHeight: '1.4',
                  }}>
                    {option.description}
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '900',
                    color: option.color,
                    textShadow: `0 0 15px ${option.color}60`,
                  }}>
                    {voteData?.percentage}%
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#999999',
                    fontWeight: '600',
                  }}>
                    {voteData?.count} votes
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Results Visualization */}
          <div style={{
            padding: '32px',
            background: 'rgba(26, 26, 26, 0.8)',
            borderRadius: '20px',
            border: '2px solid #333333',
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '800',
              marginBottom: '24px',
              color: '#FFFFFF',
            }}>
              실시간 투표 결과
            </h3>

            {/* Current Dominant Mood */}
            {dominantMoodOption && (
              <div style={{
                padding: '24px',
                background: `${dominantMoodOption.color}20`,
                border: `2px solid ${dominantMoodOption.color}`,
                borderRadius: '16px',
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '14px',
                  color: '#CCCCCC',
                  fontWeight: '700',
                  marginBottom: '12px',
                }}>
                  현재 분위기
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '900',
                  color: dominantMoodOption.color,
                  textShadow: `0 0 30px ${dominantMoodOption.color}60`,
                }}>
                  {dominantMoodOption.icon} {dominantMoodOption.label} {dominantMood.percentage}%
                </div>
              </div>
            )}

            {/* Stacked Bar Chart */}
            <div style={{
              width: '100%',
              height: '60px',
              display: 'flex',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '24px',
            }}>
              {moodVotes.map((vote) => {
                const option = moodOptions.find(m => m.id === vote.mood);
                if (!option || vote.percentage === 0) return null;

                return (
                  <div
                    key={vote.mood}
                    style={{
                      width: `${vote.percentage}%`,
                      background: option.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'width 0.5s ease',
                      position: 'relative',
                    }}
                    title={`${option.label}: ${vote.percentage}%`}
                  >
                    {vote.percentage > 10 && (
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                      }}>
                        {vote.percentage}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detailed Breakdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}>
              {moodVotes.map((vote) => {
                const option = moodOptions.find(m => m.id === vote.mood);
                if (!option) return null;

                return (
                  <div
                    key={vote.mood}
                    style={{
                      padding: '16px',
                      background: 'rgba(26, 26, 26, 0.6)',
                      borderRadius: '12px',
                      border: `2px solid ${option.color}40`,
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#DDDDDD',
                      }}>
                        {option.icon} {option.label}
                      </span>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '900',
                        color: option.color,
                      }}>
                        {vote.percentage}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#1A1A1A',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${vote.percentage}%`,
                        height: '100%',
                        background: option.color,
                        transition: 'width 0.5s ease',
                        boxShadow: `0 0 10px ${option.color}60`,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cafe Environment Preview */}
        <div style={{
          marginBottom: '60px',
          padding: '40px',
          background: `linear-gradient(135deg, ${cafeState.lightingColor}15 0%, rgba(26,26,26,0.8) 100%)`,
          borderRadius: '24px',
          border: `2px solid ${cafeState.lightingColor}30`,
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            marginBottom: '24px',
            color: '#FFFFFF',
          }}>
            만약 지금 방문한다면...
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              padding: '24px',
              background: 'rgba(26, 26, 26, 0.6)',
              borderRadius: '16px',
              border: '2px solid #333333',
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
                조명 분위기
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: cafeState.lightingColor,
                  borderRadius: '8px',
                  boxShadow: `0 0 20px ${cafeState.lightingColor}60`,
                }} />
                <span style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                }}>
                  {dominantMoodOption?.label} 무드
                </span>
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: 'rgba(26, 26, 26, 0.6)',
              borderRadius: '16px',
              border: '2px solid #333333',
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
                음악 장르
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '800',
                color: '#FFFFFF',
              }}>
                {cafeState.musicGenre}
              </div>
            </div>

            <div style={{
              padding: '24px',
              background: 'rgba(26, 26, 26, 0.6)',
              borderRadius: '16px',
              border: '2px solid #333333',
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

        {/* Music Playlist Section */}
        <div style={{
          padding: '40px',
          background: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '24px',
          border: '2px solid #333333',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#FFFFFF',
            marginBottom: '32px',
          }}>
            🎵 음악 플레이리스트
          </h2>

          {/* Playlist Selector */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}>
            {mockPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => {
                  setSelectedPlaylist(playlist);
                  setCurrentPlayingIndex(0);
                }}
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '800',
                  background: selectedPlaylist.id === playlist.id
                    ? `linear-gradient(135deg, ${playlist.color}, ${playlist.color}88)`
                    : 'rgba(26, 26, 26, 0.8)',
                  color: '#FFFFFF',
                  border: selectedPlaylist.id === playlist.id
                    ? `2px solid ${playlist.color}`
                    : '2px solid #333333',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '24px' }}>{playlist.icon}</span>
                {playlist.name}
              </button>
            ))}
          </div>

          {/* Now Playing */}
          <div style={{
            padding: '32px',
            background: `linear-gradient(135deg, ${selectedPlaylist.color}22, rgba(26, 26, 26, 0.8))`,
            borderRadius: '20px',
            border: `2px solid ${selectedPlaylist.color}`,
            marginBottom: '32px',
          }}>
            <div style={{
              fontSize: '14px',
              color: '#999999',
              fontWeight: '700',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '20px' }}>🎧</span>
              NOW PLAYING
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              {selectedPlaylist.songs[currentPlayingIndex].title}
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#DDDDDD',
              marginBottom: '16px',
            }}>
              {selectedPlaylist.songs[currentPlayingIndex].artist}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{
                flex: 1,
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${selectedPlaylist.color}, #00FFC6)`,
                  width: '60%',
                  transition: 'width 1s linear',
                }} />
              </div>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
              }}>
                {selectedPlaylist.songs[currentPlayingIndex].duration}
              </div>
            </div>
            {selectedPlaylist.songs[currentPlayingIndex].lyrics && (
              <button
                onClick={() => handleShowLyrics(selectedPlaylist.songs[currentPlayingIndex])}
                style={{
                  marginTop: '16px',
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                📝 가사 보기
              </button>
            )}
          </div>

          {/* Song List */}
          <div style={{
            marginBottom: '32px',
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}>
              플레이리스트
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}>
              {selectedPlaylist.songs.map((song, index) => (
                <div
                  key={song.id}
                  style={{
                    padding: '20px',
                    background: currentPlayingIndex === index
                      ? `linear-gradient(135deg, ${selectedPlaylist.color}33, rgba(26, 26, 26, 0.8))`
                      : 'rgba(26, 26, 26, 0.6)',
                    borderRadius: '16px',
                    border: currentPlayingIndex === index
                      ? `2px solid ${selectedPlaylist.color}`
                      : '2px solid #333333',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        marginBottom: '4px',
                      }}>
                        {song.title}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#DDDDDD',
                        fontWeight: '600',
                      }}>
                        {song.artist}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#999999',
                      fontWeight: '700',
                    }}>
                      {song.duration}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                  }}>
                    <button
                      onClick={() => handleRequestSong(song)}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        background: `linear-gradient(90deg, ${selectedPlaylist.color}, ${selectedPlaylist.color}CC)`,
                        border: 'none',
                        borderRadius: '10px',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      🎵 신청하기
                    </button>
                    {song.lyrics && (
                      <button
                        onClick={() => handleShowLyrics(song)}
                        style={{
                          padding: '10px 16px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '10px',
                          color: '#FFFFFF',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        📝
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Song Queue */}
          {songQueue.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}>
                신청곡 대기열 ({songQueue.length})
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {songQueue.map((queueItem, index) => (
                  <div
                    key={queueItem.id}
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(26, 26, 26, 0.6)',
                      borderRadius: '12px',
                      border: '2px solid #333333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '800',
                        color: '#0A0A0A',
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '800',
                          color: '#FFFFFF',
                        }}>
                          {queueItem.song.title}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#999999',
                          fontWeight: '600',
                        }}>
                          {queueItem.song.artist} • {queueItem.requestedBy}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#999999',
                      fontWeight: '700',
                    }}>
                      {queueItem.song.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                    {slot.time}
                    {slot.waitTime && (
                      <div style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        color: selectedTimeSlot === slot.time ? '#0A0A0A' : '#FFE400',
                      }}>
                        {slot.waitTime}분 대기
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Party Size & Special Requests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#DDDDDD',
                  marginBottom: '12px',
                }}>
                  인원수
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    style={{
                      width: '48px',
                      height: '48px',
                      fontSize: '24px',
                      fontWeight: '800',
                      background: 'rgba(26, 26, 26, 0.8)',
                      color: '#FFFFFF',
                      border: '2px solid #333333',
                      borderRadius: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    −
                  </button>
                  <div style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '32px',
                    fontWeight: '900',
                    color: '#FFFFFF',
                  }}>
                    {partySize}명
                  </div>
                  <button
                    onClick={() => setPartySize(Math.min(10, partySize + 1))}
                    style={{
                      width: '48px',
                      height: '48px',
                      fontSize: '24px',
                      fontWeight: '800',
                      background: 'rgba(26, 26, 26, 0.8)',
                      color: '#FFFFFF',
                      border: '2px solid #333333',
                      borderRadius: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#DDDDDD',
                  marginBottom: '12px',
                }}>
                  특별 요청사항
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="테이블 위치, 알러지 등 요청사항을 입력하세요..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    background: 'rgba(26, 26, 26, 0.8)',
                    color: '#FFFFFF',
                    border: '2px solid #333333',
                    borderRadius: '12px',
                    outline: 'none',
                    resize: 'vertical',
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

      {/* Lyrics Modal */}
      {showLyricsModal && selectedSong && (
        <Modal isOpen={showLyricsModal} onClose={() => setShowLyricsModal(false)}>
          <div style={{
            padding: '40px',
            maxWidth: '600px',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            borderRadius: '24px',
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '32px',
            }}>
              <div style={{
                fontSize: '14px',
                color: '#999999',
                fontWeight: '700',
                marginBottom: '8px',
              }}>
                LYRICS
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}>
                {selectedSong.title}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#DDDDDD',
              }}>
                {selectedSong.artist}
              </div>
            </div>

            {/* Lyrics Display - Beam Projector Style */}
            <div style={{
              padding: '32px',
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '16px',
              border: '2px solid #333333',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
            }}>
              {selectedSong.lyrics?.map((line, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    lineHeight: '1.8',
                    opacity: 0.9,
                    animation: `fadeIn 0.5s ease ${index * 0.2}s both`,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLyricsModal(false)}
              style={{
                marginTop: '24px',
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
