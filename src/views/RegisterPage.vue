<template>
    <header class="flex flex-col justify-center items-center">
        <section
            class="flex flex-col justify-center items-center bg-gradient-to-tl from-[#222222] to-neutral-900 p-10 md:rounded-2xl mt-10"
        >
            <h1 class="my-2 w-96 uppercase p-2 font-extralight text-xl">Authentication</h1>
            <input
                type="text"
                v-model="name"
                placeholder="Enter your Name"
                class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1"
            />
            <input
                type="text"
                v-model="email"
                placeholder="Enter your Email"
                class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1"
            />
            <div class="flex justify-center items-center w-96">
                <input
                    :type="isPasswordVisible ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Enter your Password"
                    class="my-2 flex flex-grow bg-neutral-800 rounded-l-md px-4 py-1"
                />

                <button
                    @click="togglePasswordVisibiliti"
                    type="button"
                    class="rounded-r-md bg-neutral-800 px-3 py-1"
                >
                    <EyeSlashIcon v-if="isPasswordVisible" :class="'size-6'" />
                    <EyeIcon v-else :class="'size-6'" />
                </button>
            </div>
            <button
                @click="signUp"
                class="uppercase p-3 my-3 w-44 bg-neutral-900 shadow-lg shadow-neutral-900 rounded-3xl"
            >
                <p class="pi pi-power-off text-green-600 mr-1"></p>
                register
            </button>
            <router-link :to="{ name:'login'}">
                <div
                    class="uppercase p-2 my-3 font-light text-xs hover:text-green-600"
                >
                    Go to Login
                </div>
            </router-link>
            <div class="text-green-600 pb-2 text-2xl font-light flex justify-center items-center">
                {{ message }}
            </div>
        </section>
    </header>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/authStore.js'
import { errorCodes } from '../stores/helpers.js'

import { EyeIcon } from '@heroicons/vue/24/outline'
import { EyeSlashIcon } from '@heroicons/vue/24/outline'


const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const message = ref('')
const authStatus = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const togglePasswordVisibiliti = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}

const signUp = async () => {
    try {
        const user = await authStore.registerUser(name.value, email.value, password.value)
        console.log('user: ', user);
        if (user !== null) {
            authStatus.value = `Account created successfully. Confirm your account by accessing the link sent to you email. Then you can log in`
        }
    } catch (error) {
        message.value = errorCodes.code ?? error.message // Show Supabase error
        console.log('message.value: ', message.value)
    }
}
</script>
