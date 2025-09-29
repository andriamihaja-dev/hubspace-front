import { api } from './api'
import { useAuthStore } from '@/store/useAuthStore'

let isRefreshing = false

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // ⚠️ Ne jamais tenter de refresh sur /auth/refresh lui-même
    if (originalRequest.url?.includes('/auth/refresh')) {
      console.warn('[AXIOS] 401 sur /auth/refresh → on ne tente rien')
      useAuthStore.getState().logout()
      return Promise.reject(error)
    }

    // ✅ Si access token expiré → on tente de le refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        console.log('[AXIOS] 🔄 Tentative de refresh...')

        try {
          const res = await api.post('/auth/refresh', {}, { withCredentials: true })
          const newAccessToken = res.data?.data?.access_token

          if (newAccessToken) {
            useAuthStore.getState().setAccessToken(newAccessToken)
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            isRefreshing = false
            return api(originalRequest)
          }
        } catch (refreshError) {
          console.error('[AXIOS] ❌ Échec du refresh token', refreshError)
          useAuthStore.getState().logout()
          isRefreshing = false
          return Promise.reject(refreshError)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api