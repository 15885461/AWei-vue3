import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')

  function login() {
    const mockToken = 'mock-token'
    token.value = mockToken
    setToken(mockToken)
  }

  function logout() {
    token.value = ''
    removeToken()
  }

  return {
    token,
    login,
    logout,
  }
})
