import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login as loginApi, getInfo as getInfoApi } from '@/api/user'
export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const name = ref('')
  const avatar = ref('')
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])

  async function login() {
    const res = await loginApi()
    const loginToken = res.data.token
    token.value = loginToken
    setToken(loginToken)
  }

  async function getInfo() {
    const res = await getInfoApi()
    const userInfo = res.data
    name.value = userInfo.name
    avatar.value = userInfo.avatar
    roles.value = userInfo.roles
    permissions.value = userInfo.permissions
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
