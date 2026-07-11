import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useUserStore } from '@/stores/user'
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

const whiteList = ['/login', '/404']

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const hasToken = !!userStore.token
  const hasUserInfo = !!userStore.name

  if (hasToken) {
    if (to.path === '/login') {
      return '/dashboard'
    }
    if (!hasUserInfo) {
      await userStore.getInfo()
    }
    return true
  }
  if (whiteList.includes(to.path)) {
    return true
  }
  return '/login'
})

export default router
