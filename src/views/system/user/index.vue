<script setup>
import { getDictLabel, getDictOptions } from '@/utils/dict'
import { computed, reactive } from 'vue'

const queryParams = reactive({
  username: '',
  status: '',
})
const rawUserList = [
  { id: 1, username: 'admin', status: '0' },
  { id: 2, username: 'test', status: '1' },
]
const userList = computed(() => {
  return rawUserList.filter(user => {
    const matchUsername = user.username.includes(queryParams.username)
    const matchStatus = queryParams.status === user.status || !queryParams.status
    return matchUsername && matchStatus
  })
})

function handleQuery() { }
function resetQuery() {
  queryParams.username = ''
  queryParams.status = ''
  handleQuery()
}
function handleEdit(user) {
  console.log('编辑用户：', user)
}

function handleRemove(user) {
  console.log('删除用户：', user)
}
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
})
const totalPage = computed(() => {
  return Math.ceil(userList.value.length / pagination.pageSize) || 1
})
</script>
<template>
  <div>
    <h2>用户管理</h2>
    <div class="search-form">
      <label>
        用户名：
        <input v-model="queryParams.username" placeholder="请输入用户名">
      </label>
      <label>
        状态：
        <select v-model="queryParams.status">
          <option value="">全部</option>
          <option v-for="item in getDictOptions('sys_normal_disable')" :key="item.value" :value="item.value">{{
            item.label }}</option>
        </select>
        <button v-on:click="handleQuery">查询</button>
        <button v-on:click="resetQuery">重置</button>
      </label>
    </div>
    <div class="toolbar">
      <button v-has-permi="'system:user:add'">新增</button>
      <button v-has-permi="'system:user:edit'">编辑</button>
      <button v-has-permi="'system:user:remove'">删除</button>
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ getDictLabel('sys_normal_disable', user.status) }}</td>
          <td>
            <button v-has-permi="'system:user:edit'" @click="handleEdit(user)">编辑</button>
            <button v-has-permi="'system:user:remove'" @click="handleRemove(user)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <span>共{{ userList.length }}条</span>
      <label>
        每页：
        <select v-model="pagination.pageSize">
          <option :value="10">10条</option>
          <option :value="20">20条</option>
          <option :value="30">30条</option>
        </select>
      </label>
      <button v-on:click="pagination.pageNum--" :disabled="pagination.pageNum <= 1">上一页</button>
      <span>第{{ pagination.pageNum }}页</span>
      <button v-on:click="pagination.pageNum++" :disabled="pagination.pageNum >= totalPage">下一页</button>
    </div>
  </div>
</template>
