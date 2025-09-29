import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import api from '@/lib/axios.interceptor'

export const useSessionInitializer = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.post('/auth/refresh', {}, { withCredentials: true })
        const newAccessToken = res.data?.data?.access_token
        if (newAccessToken) {
          setAccessToken(newAccessToken)
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
          console.log('[AUTH] ✅ Session restaurée via refresh')
        }
      } catch (err) {
        console.log('[AUTH] 🚫 Pas de session active')
        logout()
      }
    }

    tryRefresh()
  }, [])
}
