<template>
    <div
        v-if="loading"
        class="bg-neutral-950 w-full top-16 bottom-0 absolute z-10 flex justify-center items-center"
    >
        <p class="pi pi-spin pi-spinner text-7xl text-neutral-500 absolute"></p>
    </div>
    <div
        class="md:w-[800px] p-5 h-[calc(100vh-64px)] items-center mx-auto bg-gradient-to-tl from-[#222222] to-neutral-900"
    >
        <DailyQuests @levelUp="upgradeLevel(player)" />
    </div>
    <!--
    <div class="flex justify-center items-center flex-col text-blue-300 relative">
              <Popover>
        <PopoverButton class="flex justify-center ">
            <span class=" font-light ">Info</span>
        </PopoverButton>
        <PopoverPanel class="w-[350px]">
            <p>
                Daily quests must be completed during the day.
                Otherwise will be applied a <b class="uppercase text-red-600 mx-2 text-shadow-red">punishment</b> and all data
                including
                levels, quests, challages and other achivements gained in the app will be reset.
            </p>
        </PopoverPanel>
    </Popover>
    <button @click="sss()" class="rounded-md w-48 h-12 bg-orange-800">here to see</button>
    </div>
    -->
</template>

<script setup>
import 'primeicons/primeicons.css'
import { ref, onMounted, computed } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { defineProps } from 'vue'
import { usePlayerStore } from '../stores/playerStore.js'
import DailyQuests from '@/components/quests/DailyQuests.vue'

const loading = ref(true)

const props = defineProps(['levelUp'])

const player = ref(0)

const store = usePlayerStore()

const upgradeLevel = (playerLevel) => {
    const upgrade = store.levelUp(playerLevel)
    player.value = upgrade
    console.log(player.value)
}

const isFirstRun = ref(false)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 300)
    player.value = store.player
    if (!localStorage.getItem('hasVisited')) {
        isFirstRun.value = true
        localStorage.setItem('hasVisited', 'true')
    }
})
</script>
