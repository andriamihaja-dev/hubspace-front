// src/components/ui/PostCard.tsx
import { useState } from 'react'
import { MediaPreview } from './MediaPreview'
import { ReactionButton } from './ReactionButton'
import { PostFocusModal } from './PostFocusModal'

type PostMedia = {
  id: number
  path: string
  type: 'PHOTO' | 'VIDEO' | 'DOCUMENT'
}

export type PostCardProps = {
  postId: number
  author: string
  content: string
  date: string
  medias?: PostMedia[]
  commentsCount?: number
  reactionCounts?: Record<string, number>
  userReaction?: string
  onCommentsClick?: () => void // utilisé uniquement si besoin de callback externe
}

const EMOJI_MAP: Record<string, string> = {
  LIKE: '👍',
  DISLIKE: '👎',
  LOVE: '❤️',
  HAHA: '😂',
  WOW: '😮',
  SAD: '😢',
  ANGRY: '😡',
}

export function PostCard({
  postId,
  author,
  content,
  date,
  medias = [],
  commentsCount = 0,
  reactionCounts = {},
  userReaction = '',
  onCommentsClick,
}: PostCardProps) {
  const [showModal, setShowModal] = useState(false)

  const sorted = Object.entries(reactionCounts)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  const totalTop = sorted.reduce((sum, [, cnt]) => sum + cnt, 0)

  return (
    <>
      <div className="bg-zinc-900 text-white rounded-2xl shadow-lg p-4 max-w-md mx-auto mb-6 border border-zinc-700">
        {/* HEADER */}
        <div className="flex justify-between mb-2">
          <span className="text-sm text-zinc-400">{author}</span>
          <span className="text-xs text-zinc-500">{date}</span>
        </div>

        {/* CONTENT */}
        <p className="whitespace-pre-line mb-3 text-zinc-100">{content}</p>

        {/* MEDIA */}
        {medias.length > 0 && (
          <div className="space-y-3 mt-3">
            {medias.map((m) => (
              <MediaPreview key={m.id} path={m.path} type={m.type} />
            ))}
          </div>
        )}

        {/* REACTIONS */}
        {sorted.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-zinc-400 mt-4">
            {sorted.map(([type]) => (
              <span key={type} role="img" aria-label={type}>
                {EMOJI_MAP[type] ?? '❓'}
              </span>
            ))}
            <span>{totalTop}</span>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
          <ReactionButton postId={postId} />
          <button
            className="flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition"
            aria-label="Voir les commentaires"
            onClick={() => {
              setShowModal(true)
              onCommentsClick?.()
            }}
          >
            <span role="img" aria-label="Comments">💬</span>
            <span className="text-sm">
              {commentsCount} commentaire{commentsCount !== 1 && 's'}
            </span>
          </button>
        </div>
      </div>

      {/* MODAL FOCUS */}
      <PostFocusModal
        open={showModal}
        onOpenChange={setShowModal}
        post={{
          postId,
          author,
          content,
          date,
          medias,
          commentsCount,
          reactionCounts,
          userReaction,
        }}
      />
    </>
  )
}
