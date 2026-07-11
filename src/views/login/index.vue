<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

async function handleLogin() {
  await userStore.login()
  router.push('/dashboard')
}
</script>
<template>
  <div class="login-page">
    <div class="login-box">
      <h1>登录</h1>
      <p>请登录以继续</p>
      <input v-model="username" placeholder="请输入用户名">
      <input v-model="password" type="password" placeholder="请输入密码">
      <button v-on:click="handleLogin">登录</button>
    </div>
  </div>
</template>
<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.login-box {
  width: 360px;
  padding: 24px;
  background: #fff;
  border-radius: 4px;
}
</style>