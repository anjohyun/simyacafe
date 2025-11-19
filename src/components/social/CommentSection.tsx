import { useState } from 'react';
import { Comment, CommentType, CreateCommentForm } from '../../types/social';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useToast } from '../../contexts/ToastContext';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (form: CreateCommentForm) => void;
  onLikeComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  currentUserId: string;
  maxDepth?: number;
}

interface CommentItemProps {
  comment: Comment;
  depth: number;
  maxDepth: number;
  currentUserId: string;
  onReply: (parentId: string) => void;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
}

function CommentItem({
  comment,
  depth,
  maxDepth,
  currentUserId,
  onReply,
  onLike,
  onDelete,
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);

  const isOwner = comment.userId === currentUserId;
  const canReply = depth < maxDepth;

  const typeStyles = {
    standard: { icon: '💬', color: '#FFFFFF' },
    question: { icon: '❓', color: '#FFE400' },
    remix: { icon: '🎚️', color: '#FF1B8D' },
    photo: { icon: '📷', color: '#00FFC6' },
  };

  const typeStyle = typeStyles[comment.type];

  return (
    <div
      style={{
        marginLeft: depth > 0 ? '40px' : '0',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          padding: '16px',
          background:
            comment.isHighlighted || comment.type === 'question'
              ? 'rgba(255, 228, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.05)',
          border:
            comment.isPinned
              ? '2px solid #FF1B8D'
              : comment.type === 'question'
              ? '2px solid #FFE400'
              : '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          borderLeft: depth > 0 ? `4px solid ${typeStyle.color}` : undefined,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF1B8D, #00FFC6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              {comment.userAvatar}
            </div>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {comment.userName}
                {comment.isPinned && (
                  <span style={{ fontSize: '16px' }} title="고정된 댓글">
                    📌
                  </span>
                )}
                {comment.type !== 'standard' && (
                  <span style={{ fontSize: '14px' }} title={comment.type}>
                    {typeStyle.icon}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#999999' }}>
                {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: ko })}
                {comment.isEdited && ' • 수정됨'}
                {comment.timestamp && ` • ${comment.timestamp}`}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#FFFFFF',
            lineHeight: '1.6',
            marginBottom: '12px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {comment.content}
        </div>

        {/* Photo */}
        {comment.photoUrl && (
          <div style={{ marginBottom: '12px' }}>
            <img
              src={comment.photoUrl}
              alt="Comment photo"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => onLike(comment.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: comment.isLiked ? '#FF1B8D' : '#999999',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            {comment.isLiked ? '❤️' : '🤍'} {comment.likes > 0 && comment.likes}
          </button>

          {canReply && (
            <button
              onClick={() => onReply(comment.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#999999',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              💬 답글
            </button>
          )}

          {isOwner && (
            <button
              onClick={() => onDelete(comment.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FF6B6B',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              🗑️ 삭제
            </button>
          )}

          {comment.replyCount > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#00FFC6',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '4px 8px',
                marginLeft: 'auto',
              }}
            >
              {showReplies ? '▼' : '▶'} 답글 {comment.replyCount}개
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
              currentUserId={currentUserId}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentSection({
  comments,
  onAddComment,
  onLikeComment,
  onDeleteComment,
  currentUserId,
  maxDepth = 3,
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [commentType, setCommentType] = useState<CommentType>('standard');
  const [timestamp, setTimestamp] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const toast = useToast();

  const handleSubmit = () => {
    if (!commentText.trim()) {
      toast.error('댓글 내용을 입력해주세요');
      return;
    }

    const form: CreateCommentForm = {
      content: commentText,
      type: commentType,
      timestamp: timestamp || undefined,
      parentId: replyingTo || undefined,
    };

    onAddComment(form);
    setCommentText('');
    setCommentType('standard');
    setTimestamp('');
    setReplyingTo(null);
    toast.success('댓글이 등록되었습니다!');
  };

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
    // Scroll to comment input
    const commentInput = document.getElementById('comment-input');
    commentInput?.focus();
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (sortBy === 'recent') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
          댓글 {comments.length}개
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSortBy('recent')}
            style={{
              padding: '8px 16px',
              background: sortBy === 'recent' ? 'rgba(255,27,141,0.2)' : 'rgba(255,255,255,0.05)',
              border: sortBy === 'recent' ? '2px solid #FF1B8D' : '2px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            최신순
          </button>
          <button
            onClick={() => setSortBy('popular')}
            style={{
              padding: '8px 16px',
              background: sortBy === 'popular' ? 'rgba(255,27,141,0.2)' : 'rgba(255,255,255,0.05)',
              border: sortBy === 'popular' ? '2px solid #FF1B8D' : '2px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            인기순
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <div
        style={{
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          marginBottom: '24px',
        }}
      >
        {replyingTo && (
          <div
            style={{
              marginBottom: '12px',
              padding: '8px 12px',
              background: 'rgba(0, 255, 198, 0.1)',
              border: '2px solid #00FFC6',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#00FFC6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>답글 작성 중...</span>
            <button
              onClick={() => setReplyingTo(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#00FFC6',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        )}

        <textarea
          id="comment-input"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />

        {/* Comment Type & Timestamp */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
          <select
            value={commentType}
            onChange={(e) => setCommentType(e.target.value as CommentType)}
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            <option value="standard">💬 일반 댓글</option>
            <option value="question">❓ 질문</option>
            <option value="remix">🎚️ 리믹스 공유</option>
            <option value="photo">📷 사진 첨부</option>
          </select>

          {commentType === 'standard' && (
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="타임스탬프 (예: 0:45)"
              style={{
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                width: '150px',
              }}
            />
          )}

          <button
            onClick={handleSubmit}
            style={{
              marginLeft: 'auto',
              padding: '8px 24px',
              background: 'linear-gradient(90deg, #FF1B8D, #00FFC6)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            {replyingTo ? '답글 작성' : '댓글 작성'}
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div>
        {sortedComments.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#666666',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>첫 댓글을 남겨보세요</div>
          </div>
        ) : (
          sortedComments
            .filter((c) => !c.parentId)
            .map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                depth={0}
                maxDepth={maxDepth}
                currentUserId={currentUserId}
                onReply={handleReply}
                onLike={onLikeComment}
                onDelete={onDeleteComment}
              />
            ))
        )}
      </div>
    </div>
  );
}
