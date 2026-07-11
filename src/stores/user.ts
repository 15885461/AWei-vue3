import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const name = ref('')
  const avatar = ref('')
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  function login() {
    const mockToken = 'mock-token'
    token.value = mockToken
    setToken(mockToken)
  }

  function getInfo() {
    name.value = 'admin'
    avatar.value = ''
    roles.value = ['admin']
    permissions.value = ['*:*:*']
  }

  function logout() {
    token.value = ''
    name.value = ''
    avatar.value = ''
    roles.value = []
    permissions.value = []
    removeToken()
  }

  return {
    token,
    name,
    avatar,
    roles,
    permissions,
    getInfo,
    login,
    logout,
  }
})
