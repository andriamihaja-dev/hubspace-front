import { create } from 'zustand'
import type { FeedPost } from '@/hooks/posts/types'
import { api } from '@/lib/api'

// Préférences de tri
export type FeedFilter = 'recent' | 'friends' | 'others'

interface PostStore {
  posts: FeedPost[]
  cursor?: number
  hasMore: boolean
  isLoading: boolean
  isError: boolean
  filter: FeedFilter
  fetchInitial: (take?: number) => Promise<void>
  fetchNext: (take?: number) => Promise<void>
  setFilter: (filter: FeedFilter) => void
  randomize: () => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  cursor: undefined,
  hasMore: true,
  isLoading: false,
  isError: false,
  filter: 'recent',

  fetchInitial: async (take = 20) => {
    set({ isLoading: true, isError: false, cursor: undefined, hasMore: true, posts: [] })
    try {
      const { filter } = get()
      const res = await api.get('/feed', { params: { take, filter } })
      const data = res.data.data as FeedPost[]
      set({
        posts: data,
        cursor: data.length ? data[data.length - 1].id : undefined,
        hasMore: data.length === take,
      })
    } catch {
      set({ isError: true })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchNext: async (take = 20) => {
    const { isLoading, hasMore, cursor, posts, filter } = get()
    if (isLoading || !hasMore) return
    set({ isLoading: true, isError: false })
    try {
      const res = await api.get('/feed', { params: { take, cursor, filter } })
      const data = res.data.data as FeedPost[]
      set({
        posts: [...posts, ...data],
        cursor: data.length ? data[data.length - 1].id : cursor,
        hasMore: data.length === take,
      })
    } catch {
      set({ isError: true })
    } finally {
      set({ isLoading: false })
    }
  },

  setFilter: (filter) => {
    set({ filter })
    get().fetchInitial()
  },

  randomize: () => {
    const { posts } = get()
    const mixed = [...posts]
    const sampleCount = Math.ceil(mixed.length * 0.1)
    for (let i = 0; i < sampleCount; i++) {
      const j = Math.floor(Math.random() * mixed.length)
      const k = Math.floor(Math.random() * mixed.length)
      ;[mixed[j], mixed[k]] = [mixed[k], mixed[j]]
    }
    set({ posts: mixed })
  },
}))
