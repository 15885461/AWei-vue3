import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles: string[], route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles as string[] | undefined
  if (routeRoles) {
    return roles.some((role) => routeRoles.includes(role))
  }
  return true
}

function filterRoutes(routes: RouteRecordRaw[], roles: string[]) {
  return routes.filter((route) => hasPermission(roles, route))
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])

  function generateRoutes(roles: string[]) {
    const accessRoutes = filterRoutes(asyncRoutes, roles)
    routes.value = [...constantRoutes, ...accessRoutes]
    return accessRoutes
  }

  return {
    routes,
    generateRoutes,
  }
})
