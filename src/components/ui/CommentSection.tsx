// src/components/ui/CommentSection.tsx
import { useState } from 'react'
import { useCreateComment } from '@/hooks/comments/useCreateComment'
import { useComments } from '@/hooks/comments/useComments'
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type CommentSectionProps = {
  postId: number
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [content, setContent] = useState('')
  const { data: comments, isLoading: loadingComments } = useComments(postId)
  const {
    mutate: createComment,
    isPending,
  } = useCreateComment()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    createComment({ postId, content })
    setContent('')
  }

  return (
   <div className="mt-6 space-y-4">
    {/* Comment writing form */}
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        className="bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-600 focus:ring-2 focus:ring-violet-500"
        placeholder="Écris un commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
      />
      <Button
        type="submit"
        disabled={isPending || !content.trim()}
        className="bg-violet-600 hover:bg-violet-700 text-white"
      >
        {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
        Publier
      </Button>
    </form>


      {/* List of comments */}
      <div className="space-y-3">
        {loadingComments ? (
          <p className="text-zinc-400">Chargement des commentaires...</p>
        ) : (
          comments?.map((comment) => (
            <div key={comment.id} className="border border-zinc-700 rounded-lg p-3">
              <p className="text-sm text-zinc-300">{comment.author.username}</p>
              <p className="text-sm text-white whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
