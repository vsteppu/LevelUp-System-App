<template>
    <section class="flex flex-col justify-center items-center md:mx-auto mx-2">
        <div v-for="item in quests" :key="item.id"
        class="md:h-16 h-fit md:w-[750px] w-full bg-neutral-800 my-2 flex align-middle justify-between items-center">
        <div class=" md:h-16 md:w-12 flex items-center justify-center text-2xl text-center  bg-neutral-800 rounded-sm ">
            <p class="pi pi-info-circle p-4"></p>
        </div>
        <span
        class="uppercase md:h-16 h-fit md:flex-grow flex flex-col justify-center pl-5 pb-1 bg-neutral-700 rounded-md">
        <p class="text-md">{{ item.quest }}</p>
        <p class=" text-sm font-medium text-neutral-900">{{ item.description }}</p>
    </span>
    <div
    class=" md:h-16 md:w-12 flex items-center justify-center text-2xl text-center bg-neutral-800 rounded-sm text-green-400 text-shadow-green">
    <p class="pi pi-check p-4"></p>
</div>
</div>
</section>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';
import { usePlayerStore } from '@/stores/playerStore.js';

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const quests = ref([
{ id: 1, quest: '1400 pushups/week', description: 'Try to do 200 pusups every day during a week', status: false, },
{ id: 2, quest: 'Surpas yourself', description: 'Try to do twise that you regular exrcises', status: false, },
{ id: 3, quest: 'Build youre back', description: 'Include more back exercise in youre daily routine', status: false, },
])

</script>
