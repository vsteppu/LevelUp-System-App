<template>
    <h1 class="my-2 w-96 uppercase p-2 font-extralight text-xl">Add more details</h1>
    <input
        type="text"
        v-model="playerName"
        placeholder="Enter your Name"
        class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1"
    />
    <input
        type="text"
        v-model="playerSurname"
        placeholder="Enter your surname"
        class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1"
    />
    <button
        @click="addDetails"
        class="flex uppercase p-4 my-7 bg-neutral-900 shadow-lg shadow-neutral-950 rounded-3xl"
    >
        <UserPlusIcon class="text-green-600 size-6 mr-3"/>
        Add details
    </button>
    <div class="text-green-600 pb-2 text-2xl font-light flex justify-center items-center">
        {{ message }}
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { errorCodes } from '../../stores/helpers.js'

import { UserPlusIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

const message = ref('')
const playerName = ref('')
const playerSurname = ref('')

const addDetails = async () => {
    try {
        if (playerName.value !== '' && playerSurname.value !== '') {
            await authStore.createUser(playerName.value, playerSurname.value)
        } else {
            message.value = `Please complete the input fields`
        }
    } catch (error) {
        message.value = errorCodes.code ?? error.message // Show Supabase error
    } finally {

    }
}
</script>
