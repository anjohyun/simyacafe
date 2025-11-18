import { useState } from 'react';
import { Event } from '../../../types/event';
import { Modal, Button, Input } from '../../common';
import { useToast } from '../../../contexts/ToastContext';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    expectations: '',
    vipCode: '',
  });
  const toast = useToast();

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('예약이 완료되었습니다! 📧 확인 메일을 보냈습니다.');
    setShowBookingForm(false);
    setFormData({ name: '', contact: '', expectations: '', vipCode: '' });
    setTimeout(onClose, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event.title} size="lg">
      <div className="space-y-6">
        {/* Event Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="text-gray-300">
                {event.date.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏰</span>
              <span className="text-gray-300">{event.startTime} - {event.endTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>📍</span>
            <span className="text-gray-300">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>🎤</span>
            <span className="text-gray-300">Host: {event.host}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold mb-2">이벤트 소개</h4>
          <p className="text-gray-400">{event.description}</p>
        </div>

        {/* Attendees */}
        <div>
          <h4 className="font-semibold mb-2">참가자 ({event.currentAttendees}/{event.maxCapacity})</h4>
          <div className="flex flex-wrap gap-2">
            {event.attendees.map((attendee) => (
              <div key={attendee.id} className="flex items-center gap-2 px-3 py-2 bg-dark-bg rounded-lg">
                <span className="text-2xl">{attendee.avatar}</span>
                <div>
                  <p className="text-sm font-medium">{attendee.name}</p>
                  <p className="text-xs text-gray-500">{attendee.mood}</p>
                </div>
              </div>
            ))}
            {Array.from({ length: Math.min(3, event.maxCapacity - event.currentAttendees) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex items-center justify-center w-12 h-12 bg-dark-bg border-2 border-dashed border-gray-700 rounded-lg">
                <span className="text-gray-600">?</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Distribution */}
        <div>
          <h4 className="font-semibold mb-2">무드 분포</h4>
          <div className="space-y-2">
            {Object.entries(event.moodDistribution).map(([mood, percentage]) => (
              percentage > 0 && (
                <div key={mood}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{mood}</span>
                    <span className="text-gray-300">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-mint to-neon-pink"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Booking Form */}
        {!showBookingForm ? (
          <div className="flex gap-3">
            <Button variant="primary" fullWidth onClick={() => setShowBookingForm(true)}>
              예약하기 ✨
            </Button>
            <Button variant="secondary" onClick={onClose}>
              닫기
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="font-semibold">예약 정보</h4>

            <Input
              label="이름"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
            />

            <Input
              label="연락처"
              type="tel"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="010-1234-5678"
            />

            <Input
              label="특별히 기대하는 점 (선택)"
              value={formData.expectations}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
              placeholder="이 이벤트에서 무엇을 기대하시나요?"
            />

            {event.requiresVIP && (
              <Input
                label="VIP 코드"
                required
                value={formData.vipCode}
                onChange={(e) => setFormData({ ...formData, vipCode: e.target.value })}
                placeholder="VIP-XXXX-XXXX"
                helperText="2차 참가자에게 발급된 코드를 입력하세요"
              />
            )}

            <div className="flex gap-3">
              <Button type="submit" variant="primary" fullWidth>
                예약 완료 🎉
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowBookingForm(false)}>
                취소
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
