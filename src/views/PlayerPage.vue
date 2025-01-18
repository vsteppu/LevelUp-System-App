<template>
  <main class="flex justify-center items-center flex-col">
    <!--     <DailyQuests/> -->
    <section>
      <div class="flex items-center my-3 text-2xl">
        <p class="pi pi-user text-blue-300 mr-3 p-3 border-blue-300 border-[1px] rounded-sm " ></p>
        <h1 class="uppercase h-12 flex flex-grow items-center pl-2 border-blue-300 border-[1px] rounded-sm ">player section</h1>
      </div>
      <hr class=" border-blue-300 " />
      <div class="h-16 w-[400px] flex justify-between items-center">
        <h2 class="uppercase " >Player</h2>
        <span class="uppercase">{{ playerName }}</span>
      </div>
      <hr class=" border-blue-300 " />
      <div class="h-16 w-[400px] flex justify-between items-center">
        <p class="uppercase">Level:</p>
        <p class="uppercase">{{ playerLevel }}</p>
      </div>
      <hr class=" border-blue-300 " />
      <div class="h-16 w-[400px] flex justify-between items-center">
        <p class="uppercase">Speciality:</p>
        <p class="uppercase">{{ playerSpeciality }}</p>
      </div>
      <hr class=" border-blue-300 " />
      <div class="h-16 w-[400px] flex justify-between items-center">
        <p class="uppercase">Rank:</p>
        <p class="uppercase">{{ playerRank }}</p>
      </div>
      <hr class=" border-blue-300 " />
    </section>
    <section>Achivements</section>
  </main>

  <button @click="() => { console.log(store.player.displayName) }">click</button>



</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { usePlayerStore } from '@/stores/playerStore';

const store = usePlayerStore()

const router = useRouter()
const props = defineProps(['submit']);

const playerName = ref(store.player.displayName)
const playerLevel = ref(store.player.level)
const playerRank = ref('unknown')
const playerSpeciality = ref('unknown')



</script>
<style scoped></style>
