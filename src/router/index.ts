import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieQuotes from '../views/MovieQuotes.vue'
import DashboardView from '../views/DashboardView.vue'
import ProfileEdit from '../views/ProfileEdit.vue'
import MoviesList from '../views/MoviesList.vue'
import GoogleAuth from '@/views/GoogleAuth.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresUnAuth: true }
    },
    {
      path: '/auth/google/callback',
      component: GoogleAuth
    },
    {
      path: '/movie-quotes',
      name: 'movie-quotes',
      component: MovieQuotes,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'edit-profile',
          name: 'edit-profile',
          component: ProfileEdit
        },
        {
          path: 'movies-list',
          name: 'movies-list',
          component: MoviesList
        }
      ]
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
