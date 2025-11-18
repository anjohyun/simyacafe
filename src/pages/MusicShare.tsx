import { useState, useEffect } from 'react';
import { Song, SongQueue } from '../types/cafe';
import { mockPlaylists } from '../data/mockCafe';
import { useToast } from '../contexts/ToastContext';
import { Modal } from '../components/common';

export default function MusicShare() {
  const [songQueue, setSongQueue] = useState<SongQueue[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(mockPlaylists[0]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(0);
  const toast = useToast();

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
            🎵 음악 플레이리스트
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#DDDDDD',
            fontWeight: '600',
          }}>
            장르별 음악을 듣고 신청곡을 추가하세요
          </p>
        </div>

        {/* Music Playlist Section */}
        <div style={{
          padding: '40px',
          background: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '24px',
          border: '2px solid #333333',
          marginBottom: '32px',
        }}>
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
