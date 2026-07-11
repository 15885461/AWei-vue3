<script setup>
import { computed } from 'vue';
import { constantRoutes } from '@/router';
const menuRoutes = computed(() => {
  const layoutRoutes = constantRoutes.find(route => route.path === '/')
  return layoutRoutes?.children || []
})
</script>
<template>
  <div class="sidebar">
    <div class="logo">My Project</div>
    <RouterLink v-for="item in menuRoutes" :key="item.path" class="menu-item" :to="'/' + item.path">
      {{ item.meta.title }}
    </RouterLink>
  </div>
</template>
<style scoped>
.sidebar {
  width: 220px;
  background: #304156;
  color: #fff;
}

.logo {
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  font-weight: 600;
}

.menu-item {
  display: block;
  padding: 12px 16px;
  color: #fff;
  text-decoration: none;
}

.menu-item.router-link-active {
  background: #263445;
  color: #409eff;
}
</style>