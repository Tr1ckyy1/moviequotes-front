import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresUnAuth: true }
    },
    {
      path: '/auth/google/callback',
      component: () => import('../views/GoogleAuth.vue')
    },
    {
      path: '/movie-quotes',
      name: 'movie-quotes',
      component: () => import('../views/MovieQuotes.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'edit-profile',
          name: 'edit-profile',
          component: () => import('../views/ProfileEdit.vue')
        },
        {
          path: 'movies-list',
          name: 'movies-list',
          component: () => import('../views/MoviesList.vue')
        },
        {
          path: 'movies-list/:movieId',
          name: 'movie-show',
          component: () => import('../views/MovieShow.vue')
        }
      ]
    },
    {
      name: 'error',
      path: '/error/:status',
      component: () => import('../views/ErrorPage.vue')
    }
  ],
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
})

router.beforeEach(function (to) {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.userLoggedIn) {
    return { name: 'home' }
  } else if (to.meta.requiresUnAuth && authStore.userLoggedIn) return { name: 'dashboard' }
  else return true
})

export default router
