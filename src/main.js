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
const { user } = storeToRefs(authStore)

// Wait until we check for an existing session
authStore.fetchUser().then(async() => {
    console.log('user.value.difficulty_leve: ', user.value.difficulty_leve);
    if (user.value.difficulty_level === undefined || user.value.difficulty_level === null) {
        console.log('user.value.difficulty_level not find')
        console.log('creating user.value.difficulty_level...')
        await authStore.addUserValues('begginer')
        console.log('user.value.difficulty_level ==> set')
    }
    app.mount('#app')
})
//app.mount('#app')
