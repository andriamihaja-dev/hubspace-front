// src/components/ui/ReactionButton.tsx
import { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { ReactionMenu } from './ReactionMenu'
import { usePostReactions } from '@/hooks/reaction/usePostReactions'
import {
  useAddPostReaction,
  useChangePostReaction,
  useRemovePostReaction,
} from '@/hooks/reaction/usePostReactionMutations'
import type { ReactionDto } from '@/hooks/reaction/usePostReactionMutations'

// Le même mapping que dans PostCard
const EMOJI_MAP: Record<string, string> = {
  LIKE: '👍',
  DISLIKE: '👎',
  LOVE: '❤️',
  HAHA: '😂',
  WOW: '😮',
  SAD: '😢',
  ANGRY: '😡',
}

// Inversion pour retrouver la "clé" à partir de l’emoji
const TYPE_BY_EMOJI: Record<string, string> =
  Object.fromEntries(Object.entries(EMOJI_MAP).map(([k, v]) => [v, k])) as Record<string, string>

interface ReactionButtonProps {
  postId: number
}

export function ReactionButton({ postId }: ReactionButtonProps) {
  const [open, setOpen] = useState(false)

  // 1) Récupère counts & ma réaction
  const { data, isLoading } = usePostReactions(postId)
  const reactionCounts = data?.reactionCounts ?? {}
  const currentType = data?.userReaction ?? ''   // ex: "LIKE", "ANGRY", …

  // 2) Prépare les 3 mutations
  const add    = useAddPostReaction()
  const change = useChangePostReaction()
  const remove = useRemovePostReaction()

  const handleReaction = (emoji: string) => {
    const typeKey = TYPE_BY_EMOJI[emoji]
    if (!typeKey) return console.warn('Unknown emoji', emoji)

    const payload: ReactionDto = {
      type: typeKey,
      target_type: 'POST' as const,  // force le literal
      target_id: postId,
    }

    console.log('[ReactionButton] handleReaction →', payload)

    if (typeKey === currentType) {
      remove.mutate(payload)
    } else if (!currentType) {
      add.mutate(payload)
    } else {
      change.mutate(payload)
    }

    setOpen(false)
  }

  if (isLoading) {
    return <button className="text-xl">…</button>
  }

  return (
    <div className="flex items-center space-x-3">

      {/* B) Bouton + popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            onMouseDown={e => e.button === 0 && e.preventDefault()}
            onClick={() => setOpen(o => !o)}
            className="hover:scale-105 transition-transform text-xl"
            aria-label="Réagir"
          >
            {/* on affiche l’emoji de la réaction courante ou 👍 par défaut */}
            { EMOJI_MAP[currentType] ?? '👍' }
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="center"
          className="p-2 bg-white text-black rounded shadow-md z-50"
        >
          {/* ReactionMenu doit appeler onSelect(emoji) */}
          <ReactionMenu onSelect={handleReaction} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
