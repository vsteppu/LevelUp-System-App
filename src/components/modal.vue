<template>
    <teleport to="body">
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
                class="flex flex-col items-center w-[600px] bg-neutral-800 shadow-lg z-9990 p-4"
            >
                <h1 class="text-xl font-bold my-6">
                    {{ title }}
                </h1>
                <div class="flex justify-between items-baseline my-3 flex-grow">
                    {{ title }}
                </div>
                <button
                    @click="getUpdates"
                    class="uppercase h-12 w-56 my-6 bg-player-gray rounded shadow-lg shadow-neutral-950"
                >
                    update
                </button>
            </div>
        </div>
    </teleport>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import userApi from '../api/userApi'

const authStore = useAuthStore()

const requiredUpdatesFor = ref('level up')

const getUpdates = async() => {
    await userApi.updateSupabaseUser('difficulty_level', 'beginner')
    authStore.fetchUser()
};
</script>
