// src/components/ui/PostFocusModal.tsx
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PostCard, PostCardProps } from '@/components/ui/PostCard'
import { CommentSection } from '@/components/ui/CommentSection'

type PostFocusModalProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  post: PostCardProps
}

export function PostFocusModal({ open, onOpenChange, post }: PostFocusModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-700">
        {/* Le post en grand */}
        <PostCard {...post} />

        {/* Section commentaires */}
        <CommentSection postId={post.postId} />
      </DialogContent>
    </Dialog>
  )
}
