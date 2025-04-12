<template>
    <nav class="hidden md:flex z-20 justify-between items-center h-16 font-light px-32 bg-neutral-900">
        <router-link to="/" class=" font-bold text-2xl uppercase">maincharacters</router-link>
        <div class="flex justify-between items-center h-12 w-96 font-light">
            <router-link to="/" class="h-16  flex justify-center items-center uppercase">Daily Quest</router-link>
            <router-link to="/quests" class="h-16  flex justify-center items-center uppercase">Quests</router-link>
            <router-link to="/player" class="h-16  flex justify-center items-center uppercase">Player</router-link>
            <Cog6Tooth
                @click="playerStore.toggleSettings()"
                class="size-6 cursor-pointer"
            />
        </div>
    </nav>
    <router-view></router-view>
</template>
<script setup>
import { usePlayerStore } from '../stores/playerStore'
import Cog6Tooth from '@heroicons/vue/24/outline/Cog6ToothIcon.js'

const playerStore = usePlayerStore()
</script>

