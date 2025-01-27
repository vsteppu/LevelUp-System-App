import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import QuestsPage from '../views/QuestsPage.vue'
import PlayerPage from '../views/PlayerPage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/quests',
      name: 'quests',
      component: QuestsPage,
    },
    {
      path: '/player',
      name: 'player',
      component: PlayerPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ],
})

export default router
