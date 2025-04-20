<template>
    <h1 class="my-2 w-96 uppercase p-2 font-extralight text-xl">Set Email and password</h1>
    <input
        type="text"
        v-model="email"
        placeholder="Enter your Email"
        class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1"
    />
    <input
        type="text"
        v-model="password"
        placeholder="Enter your Password"
        class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1"
    />
    <button
        @click="signUp"
        class="flex uppercase p-4 my-3 bg-neutral-900 shadow-lg shadow-neutral-950 rounded-3xl"
    >
        <UserIcon class="text-green-600 size-6  mr-3"/>
        Create new player
    </button>
    <div class="text-green-600 pb-2 text-2xl font-light flex justify-center items-center">
        {{ message }}
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import { errorCodes } from '../../stores/helpers'

import { UserIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const message = ref('')
const authStatus = ref('')
const email = ref('')
const password = ref('')

const signUp = async () => {
    try {
        const user = await authStore.registerUser(email.value, password.value)
        if (user !== null) {
            authStatus.value = `Account created successfully`
        }
    } catch (error) {
        message.value = errorCodes.code ?? error.message // Show Supabase error
        console.log('message.value: ', message.value)
    }
}
</script>
