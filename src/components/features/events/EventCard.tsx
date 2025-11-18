import { useState } from 'react';
import { Event } from '../../../types/event';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const stageColors = {
  '1차': { bg: 'rgba(16,185,129,0.2)', border: '#10B981', text: '#10B981' },
  '2차': { bg: 'rgba(59,130,246,0.2)', border: '#3B82F6', text: '#3B82F6' },
  '3차': { bg: 'rgba(255,27,141,0.2)', border: '#FF1B8D', text: '#FF1B8D' },
};

export default function EventCard({ event, onClick }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = stageColors[event.stage];
  const availableSeats = event.maxCapacity - event.currentAttendees;
  const isAlmostFull = availableSeats <= 3;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '28px',
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '18px',
        border: isHovered ? '2px solid rgba(255,27,141,0.5)' : '2px solid #333333',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered
          ? '0 10px 40px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Stage Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <span style={{
          padding: '8px 18px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '900',
          color: colors.text,
          background: colors.bg,
          border: `2px solid ${colors.border}`,
          textShadow: `0 0 10px ${colors.text}66`,
        }}>
          {event.stage}
        </span>
        {event.requiresVIP && (
          <span style={{
            padding: '6px 14px',
            background: 'rgba(255,228,0,0.2)',
            border: '2px solid #FFE400',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#FFE400',
            fontWeight: '800',
            textShadow: '0 0 10px rgba(255,228,0,0.6)',
          }}>
            VIP
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '22px',
        fontWeight: '900',
        marginBottom: '15px',
        color: '#FFFFFF',
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}>{event.title}</h3>

      {/* Date & Time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#CCCCCC',
        marginBottom: '10px',
        fontWeight: '700',
      }}>
        <span>📅</span>
        <span>{event.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}</span>
        <span>•</span>
        <span>{event.startTime} - {event.endTime}</span>
      </div>

      {/* Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#CCCCCC',
        marginBottom: '15px',
        fontWeight: '700',
      }}>
        <span>📍</span>
        <span>{event.location}</span>
      </div>

      {/* Host */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        marginBottom: '20px',
        fontWeight: '700',
      }}>
        <span>🎤</span>
        <span style={{ color: '#DDDDDD' }}>Host: {event.host}</span>
      </div>

      {/* Capacity */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          marginBottom: '10px',
        }}>
          <span style={{
            color: '#CCCCCC',
            fontWeight: '700',
          }}>참가자</span>
          <span style={{
            color: isAlmostFull ? '#FF1B8D' : '#DDDDDD',
            fontWeight: isAlmostFull ? '900' : '700',
            textShadow: isAlmostFull ? '0 0 15px rgba(255,27,141,0.6)' : 'none',
          }}>
            {event.currentAttendees} / {event.maxCapacity}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#1A1A1A',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #333333',
        }}>
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${colors.text}, ${colors.text}80)`,
              width: `${(event.currentAttendees / event.maxCapacity) * 100}%`,
              transition: 'width 0.5s ease',
              boxShadow: `0 0 15px ${colors.text}66`,
            }}
          />
        </div>
        {isAlmostFull && (
          <p style={{
            fontSize: '12px',
            color: '#FF1B8D',
            marginTop: '8px',
            fontWeight: '800',
            textShadow: '0 0 10px rgba(255,27,141,0.6)',
          }}>⚡ 남은 자리 {availableSeats}석!</p>
        )}
      </div>

      {/* Mood Distribution Preview */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '20px',
        height: '6px',
      }}>
        {Object.entries(event.moodDistribution).map(([mood, percentage]) => (
          percentage > 0 && (
            <div
              key={mood}
              style={{
                height: '100%',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #00FFC6, #00FFC680)',
                width: `${percentage}%`,
                boxShadow: '0 0 8px rgba(0,255,198,0.5)',
              }}
              title={`${mood}: ${percentage}%`}
            />
          )
        ))}
      </div>

      {/* Tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        {event.tags.map((tag, index) => (
          <span
            key={index}
            style={{
              padding: '6px 14px',
              backgroundColor: '#0A0A0A',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#BBBBBB',
              fontWeight: '600',
              border: '1px solid #333333',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
