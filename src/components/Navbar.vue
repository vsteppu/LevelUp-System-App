<template>
    <nav class="hidden md:flex z-20 justify-between items-center h-16 font-light px-32 bg-neutral-900">
        <router-link to="/" class=" font-bold text-2xl uppercase">maincharacters</router-link>
        <div class="flex justify-between items-center h-12 font-light">
            <router-link to="/login" v-if="!isAutenticated" class="h-16  flex justify-center items-center uppercase">login</router-link>
            <div
                v-else
                class="w-96 flex justify-between items-center"
            >
                <router-link to="/" class="h-16  flex justify-center items-center uppercase">Daily Quest</router-link>
                <router-link to="/quests" class="h-16  flex justify-center items-center uppercase">Quests</router-link>
                <router-link to="/player" class="h-16  flex justify-center items-center uppercase">Player</router-link>
                <Cog6Tooth
                    @click="playerStore.toggleSettings()"
                    class="size-6 cursor-pointer"
                />
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { usePlayerStore } from '../stores/playerStore'
import Cog6Tooth from '@heroicons/vue/24/outline/Cog6ToothIcon.js'

const authStore = useAuthStore()
const playerStore = usePlayerStore()
const { user } = storeToRefs(authStore)
const isAutenticated = computed(() => user.value !== null)
console.log('isAutenticated: ', isAutenticated.value);
</script>

