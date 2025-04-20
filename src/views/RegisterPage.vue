<template>
    <header class="flex flex-col justify-center items-center">
        <section
            class="flex flex-col justify-center items-center bg-gradient-to-tl from-[#222222] to-neutral-900 p-10 md:rounded-2xl mt-10"
        >
            <SetCredetials v-if="!user"/>
            <CreatePlayer v-else-if="user && !name"/>
            <div
                v-if="autenticated"
                class="text-green-600 p-20 text-2xl font-light flex justify-center items-center"
            >
                You're ready to start the Game!
            </div>
            <router-link :to="{ name:'login'}">
                <div
                    class="uppercase font-light text-xs hover:text-green-600"
                >
                    Go to Login
                </div>
            </router-link>
        </section>
    </header>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import router from '@/router/index.js'
import SetCredetials from '../components/authentication/set-credetials.vue'
import CreatePlayer from '../components/authentication/create-player.vue'

const authStore = useAuthStore()
const { user, userMetaData } = storeToRefs(authStore)

const name = computed(() => userMetaData.value?.name)
const authStatus = computed(() => user.value !== null && name.value !== null && name.value !== undefined)
const autenticated = ref(false)

watch(authStatus,
() => {
        autenticated.value = true
        setTimeout(() => {
            autenticated.value = false
            user.value = null
            router.push('/')
        }, 3000)
    }
)
</script>
