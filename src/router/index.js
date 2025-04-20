import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js';

import HomePage from '../views/HomePage.vue'
import QuestsPage from '../views/QuestsPage.vue'
import PlayerPage from '../views/PlayerPage.vue'
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

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
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage,
            meta: { requiresAuth: false }
        },
    ],
})

router.beforeEach(async(to) => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)


    if (!user && to.meta.requiresAuth === true) {
        return { name: 'login' }
    } else {
        return true
    }
})


export default router
