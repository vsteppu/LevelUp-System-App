import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js';

import HomePage from '../views/HomePage.vue'
import QuestsPage from '../views/QuestsPage.vue'
import PlayerPage from '../views/PlayerPage.vue'
import AuthPage from '../views/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/quests',
      name: 'quests',
      component: QuestsPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/player',
      name: 'player',
      component: PlayerPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: { requiresAuth: false }
    },
  ],
})

router.beforeEach(async(to) => {

  const authStore = useAuthStore()
  const user = await authStore.getUser()

  if (!user && to.meta.requiresAuth === true) {
    return { path: '/auth' }
  } else {
    return true
  }
})


export default router
