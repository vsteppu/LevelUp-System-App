import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js';
import routes from './routes.js'

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

router.beforeEach(async(to) => {

    const authStore = useAuthStore()
    const isAuthenticated = await authStore.fetchUser()
    console.log('isAuthenticated: ', isAuthenticated);

    if (!isAuthenticated && to.meta.requiresAuth === true) {
        return { name: 'login' }
    } else {
        return true
    }
})

export default router
