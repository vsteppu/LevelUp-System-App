<template>
    <div v-if="loading" class="bg-neutral-950 w-full top-16 bottom-0 absolute z-10 flex justify-center items-center ">
        <p class="pi pi-spin pi-spinner text-7xl text-neutral-500 absolute"></p>
    </div>
    <main>
        <div class="md:w-[800px] md:p-10 h-[calc(100vh-64px)] items-center mx-auto bg-gradient-to-tl from-[#222222] to-neutral-900">
            <QuestTemplate/>
        </div>
    </main>
    <section></section>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore.js';
import { usePlayerStore } from '@/stores/playerStore.js';

import QuestTemplate from '@/components/quests/QuestTemplate.vue';

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const loading = ref(true)

onMounted(()=>
setTimeout(()=>{loading.value=false},500))
</script>
