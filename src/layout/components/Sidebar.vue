<script setup>
import { computed } from 'vue';
import { usePermissionStore } from '@/stores/permission';
const permissionStore = usePermissionStore();
const menuRoutes = computed(() => {
  const layoutRoutes = permissionStore.routes.find(route => route.path === '/')
  const constantMenuRoutes = layoutRoutes?.children || []

  const dynamicMenuRoutes = permissionStore.routes.filter((route) => {
    return route.meta?.title && route.path !== '/' && route.path !== '/404' && route.path !== '/login'
  })

  return [...constantMenuRoutes, ...dynamicMenuRoutes]
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