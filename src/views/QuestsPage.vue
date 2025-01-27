<template>
  <main>
  </main>
  <section class="flex flex-col justify-center items-center mx-auto">
    <div v-for="item in quests" :key="item.id"
      class="h-16 md:w-[750px] w-full px-4 my-2 flex align-middle justify-between items-center">
      <div
        class=" h-16 w-12 flex items-center justify-center text-2xl text-center  bg-neutral-900 rounded-sm ">
        <p class="pi pi-info-circle "></p>
      </div>
      <span
        class="uppercase  h-16 flex-grow flex flex-col justify-center pl-5 pb-1 border-[2px] bg-neutral-700 border-neutral-900 rounded-sm">
        <p class="text-md">{{ item.quest }}</p>
        <p class=" text-sm font-medium text-neutral-900">{{ item.description }}</p>
      </span>
      <div
        class=" h-16 w-20 flex items-center justify-center text-2xl text-center bg-neutral-900 rounded-sm text-green-400 text-shadow-green">
        <p class="pi pi-check "></p>
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

const shareLink = () => {
  console.log(items.value)
}


const userStatus = async () => {
  const user = await authStore.getUser()
  playerLevel.value = user.user_metadata.level
  playerName.value = user.user_metadata.name
  dailyQuestCompleted.value = user.user_metadata.daily_quests
  console.log(user.user_metadata)
  console.log(user.user_metadata.level)
  console.log(user.user_metadata.name)
  console.log(user.user_metadata.daily_quests)
}

</script>
