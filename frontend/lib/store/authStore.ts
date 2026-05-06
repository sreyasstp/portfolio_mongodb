import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: 'ADMIN' | 'USER'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        Cookies.set('auth_token', token, { expires: 1, secure: true, sameSite: 'strict' })
        set({ user, token, isAuthenticated: true })
      },

      clearAuth: () => {
        Cookies.remove('auth_token')
        set({ user: null, token: null, isAuthenticated: false })
      },

      updateUser: (partialUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        }))
      },
    }),
    {
      name: 'portfolio-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)
