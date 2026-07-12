<script setup>
import { getDictLabel } from '@/utils/dict'

const userList = [
  { id: 1, username: 'admin', status: '0' },
  { id: 2, username: 'test', status: '1' },
]
</script>
<template>
  <div>
    <h2>用户管理</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ getDictLabel('sys_normal_disable', user.status) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
