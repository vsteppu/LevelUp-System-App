import './assets/style.css'

import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { useAuthStore } from './stores/authStore.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const authStore = useAuthStore()

authStore.fetchUser().then(async() => {
    app.mount('#app')
})
