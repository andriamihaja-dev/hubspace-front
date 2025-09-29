import { useState } from 'react'

export type Comment = {
  id: number
  content: string
  createdAt: string
  author: {
    id: number
    username: string
    avatarUrl?: string
  }
  userId: number
}

interface CommentItemProps {
  comment: Comment
  onEdit: (newContent: string) => void
  onDelete: () => void
}

export function CommentItem({ comment, onEdit, onDelete }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(comment.content)

  const save = () => {
    if (draft.trim() && draft !== comment.content) {
      onEdit(draft.trim())
    }
    setIsEditing(false)
  }

  return (
    <div className="flex space-x-3">
      <img
        src={comment.author.avatarUrl ?? '/default-avatar.png'}
        alt=""
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between text-xs text-zinc-400">
          <span className="font-medium text-sm">{comment.author.username}</span>
          <span>{new Date(comment.createdAt).toLocaleString()}</span>
        </div>

        {isEditing ? (
          <>
            <textarea
              className="w-full p-1 mt-1 bg-zinc-800 text-white rounded"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="flex gap-2 mt-1">
              <button onClick={save} className="text-blue-500">Enregistrer</button>
              <button onClick={() => setIsEditing(false)} className="text-zinc-400">Annuler</button>
            </div>
          </>
        ) : (
          <p className="mt-1 text-zinc-100 whitespace-pre-line">{comment.content}</p>
        )}

        {/* actions éditer / supprimer */}
        {!isEditing && comment.userId === comment.author.id && (
          <div className="flex gap-2 text-xs text-zinc-500 mt-1">
            <button onClick={() => setIsEditing(true)}>Modifier</button>
            <button onClick={onDelete}>Supprimer</button>
          </div>
        )}
      </div>
    </div>
  )
}
