import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
        },
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
    },
  },
]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}

export const asyncRoutes = [
  {
    path: 'system/user',
    name: 'SystemUser',
    component: () => import('@/views/system/user/index.vue'),
    meta: {
      title: '用户管理',
      roles: ['admin'],
    },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

const whiteList = ['/login', '/404']

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const hasToken = !!userStore.token
  const hasUserInfo = !!userStore.name

  if (hasToken) {
    if (to.path === '/login') {
      return '/dashboard'
    }
    if (!hasUserInfo) {
      await userStore.getInfo()
      const accessRoutes = permissionStore.generateRoutes(userStore.roles)
      accessRoutes.forEach((route) => {
        router.addRoute('Layout', route)
      })
      router.addRoute(notFoundRoute)
      return to.fullPath
    }
    return true
  }
  if (whiteList.includes(to.path)) {
    return true
  }
  return '/login'
})

export default router
