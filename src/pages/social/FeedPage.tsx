// src/pages/social/FeedPage.tsx
import { useRef, useCallback } from 'react'
import { PostCard } from '@/components/ui/PostCard'
import CreatePostCard from './CreatePostCards'
import { useFeed } from '@/hooks/posts/useFeed'
import type { FeedFilter } from '@/store/usePostStore'

export default function FeedPage() {
  const {
    posts,
    isLoading,
    isError,
    hasMore,
    fetchNext,
    filter,
    setFilter,
    randomize,
  } = useFeed(20)

  const observer = useRef<IntersectionObserver | null>(null)

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNext(20)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore, fetchNext]
  )

  if (isLoading && posts.length === 0) {
    return <p className="text-white text-center mt-10">Chargement du fil d’actualité…</p>
  }
  if (isError) {
    return <p className="text-red-500 text-center mt-10">Erreur lors du chargement du feed.</p>
  }
  if (!isLoading && posts.length === 0) {
    return <p className="text-white text-center mt-10">Aucun post pour le moment.</p>
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-4">
      <h1 className="text-2xl text-white font-bold mb-6 text-center">Fil d’actualité</h1>

      {/* filtres + random */}
      <div className="flex gap-2 justify-center mb-4">
        {(['recent','friends','others'] as FeedFilter[]).map(f => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${
              filter === f ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300'
            }`}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded bg-zinc-600 text-zinc-100"
          onClick={randomize}
        >
          Random
        </button>
      </div>

      <CreatePostCard />

      {posts.map((post, idx) => {
        const isLast = idx === posts.length - 1
        return (
          <div key={post.id} ref={isLast ? lastPostRef : null}>
            <PostCard
              postId={post.id}
              author={post.author.username}
              content={post.content}
              date={new Date(post.createdAt).toLocaleString()}
              medias={post.medias.map(m => ({
                id: m.id,
                path: m.url,
                type: m.mimetype.startsWith('image') ? 'PHOTO' : 'VIDEO',
              }))}
              commentsCount={post._count.comments}
              reactionCounts={post.reactionCounts}
              userReaction={post.userReaction?.type}
            />
          </div>
        )
      })}

      {isLoading && posts.length > 0 && (
        <p className="text-center text-white mt-4">Chargement de plus de posts…</p>
      )}
    </main>
  )
}
