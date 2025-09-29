import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  setAccessToken: (token) => {
    set({ accessToken: token })
  },

  logout: () => {
    console.log('[AuthStore] Déconnexion forcée')
    set({ accessToken: null })
  },
}))
