import Home from '@/pages/home.vue'
import LoginPage from '@/pages/auth/login.vue'
import AuthPage from '@/pages/auth/auth-page.vue'
import RegisterPage from '@/pages/auth/register.vue'
import WorkoutProgress from '@/pages/workout-progress.vue'

const routes = [
    {
        path: '/', 
        component: Home,
        name: 'home',
        meta: { requiresAuth: true }
    },
    {
        path: '/progress', 
        component: WorkoutProgress,
        name: 'progress',
        meta: { requiresAuth: true }
    },
    { 
        path: '/auth-page', 
        component: AuthPage,
        name: 'auth-page',
        meta: { requiresAuth: false }
    }
]

export default routes