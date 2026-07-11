<script setup>
import { useUserStore } from '@/stores/user'
import Breadcrumb from './Breadcrumb.vue'
const userStore = useUserStore()
</script>
<template>
  <div class="navbar">
    <div>
      <Breadcrumb />
    </div>
    <div class="user-info">
      {{ userStore.name }}
    </div>
  </div>
</template>
<style scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
  display: flex;
  justify-content: space-between;
}

.user-info {
  color: #000000;
}
</style>