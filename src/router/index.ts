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

  if (hasToken && to.path === '/login') {
    return '/dashboard'
  }
  if (!hasToken && !whiteList.includes(to.path)) {
    return '/login'
  }
  return true
})

export default router
