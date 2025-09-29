import { createContext, useEffect, useState, useContext } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'

// 1. Types
interface User {
  id: number
  email: string
  username: string
  avatarUrl?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
}

// 2. Context
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
})

// 3. Provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.post('/auth/refresh', {}, { withCredentials: true })
        const token = res.data?.data?.access_token
        const refreshedUser = res.data?.data?.user

        if (token) {
          setAccessToken(token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        if (refreshedUser) {
          setUser(refreshedUser)
          console.log('[UserContext] ✅ Session restaurée')
        } else {
          setUser(null)
        }
      } catch {
        console.warn('[UserContext] 🚫 Aucun refresh possible')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    tryRefresh()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </UserContext.Provider>
  )
}

// 4. Hook à la fin (IMPORTANT)
export const useUserContext = () => useContext(UserContext)
