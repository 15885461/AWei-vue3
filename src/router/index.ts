import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useUserStore } from '@/stores/user'
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const whiteList = ['/login', '/404']

router.beforeEach((to) => {
  const userStore = useUserStore()
  const hasToken = !!userStore.token
  const hasUserInfo = !!userStore.name

  if (hasToken) {
    if (to.path === '/login') {
      return '/dashboard'
    }
    if (!hasUserInfo) {
      userStore.getInfo()
    }
    return true
  }
  if (whiteList.includes(to.path)) {
    return true
  }
  return '/login'
})

export default router
