<template>
    <div class="md:hidden left-slide bg-neutral-900 shadow-black shadow-lg z-10 h-16 flex w-screen relative items-center ">
        <Bars2Icon @click="toggleSideTab" class="size-10 mx-2 p-2"/>
        <p class=" font-bold text-2xl absolute left-1/2 transform -translate-x-1/2 uppercase">maincharacter</p>
    </div>
    <transition name="left-slide">
        <nav class="font-light flex flex-col ml-6 h-screen my-5" @click="openSidetab = false" v-if="openSidetab">
            <XMarkIcon @click="toggleSideTab" class="size-10 mr-3 p-2 absolute right-0"/>

            <router-link to="/" class="w-40 uppercase my-3 ml-4">Daily Quest</router-link>
            <!-- <router-link to="/quests" class="w-40 uppercase my-3 ml-4">Quests</router-link> -->
            <router-link to="/player" class="w-40 uppercase my-3 ml-4">Player</router-link>
            <div
                class="w-40 uppercase my-3 ml-4"
                @click="playerStore.toggleSettings()"
            >
                Settings
            </div>
        </nav>
    </transition>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';
import { usePlayerStore } from '../stores/playerStore.js';

import '../assets/left-slide.css'
import { XMarkIcon, Bars2Icon } from '@heroicons/vue/24/outline'

const playerStore = usePlayerStore()

const openSidetab = ref(false)

const toggleSideTab = () => {
    openSidetab.value = !openSidetab.value
}
</script>
