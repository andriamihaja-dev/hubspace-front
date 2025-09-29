import { useEffect } from 'react'
import { usePostStore, FeedFilter } from '@/store/usePostStore'

export function useFeed(take = 20) {
  const posts = usePostStore((s) => s.posts)
  const isLoading = usePostStore((s) => s.isLoading)
  const isError = usePostStore((s) => s.isError)
  const hasMore = usePostStore((s) => s.hasMore)
  const filter = usePostStore((s) => s.filter)

  const fetchInitial = usePostStore((s) => s.fetchInitial)
  const fetchNext = usePostStore((s) => s.fetchNext)
  const setFilter = usePostStore((s) => s.setFilter)
  const randomize = usePostStore((s) => s.randomize)

  // charge initial / à chaque changement de filtre
  useEffect(() => {
    fetchInitial(take)
  }, [fetchInitial, filter, take])

  return {
    posts,
    isLoading,
    isError,
    hasMore,
    fetchNext,
    filter,
    setFilter,
    randomize,
  }
}
