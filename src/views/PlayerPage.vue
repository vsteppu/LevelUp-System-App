<template>
  <!-- <PlayerInfo/>-->
  <main class="flex md:justify-center md:items-center flex-col relative">
    <div
      class="flex md:justify-between justify-between mt-2 md:w-[350px]  md:px-2 px-6 text-xl md:text-xl uppercase">
      <p class="font-light">Player</p>
      <div class="font-bold">
        {{ playerName }}
      </div>
    </div>
    <div v-if="playerName === undefined" class="font-thin flex md:px-0 px-6 justify-between md:w-[350px]">
      <input v-model="playerName" @keyup.enter="setUserValues(playerName)" placeholder="type your name" class="my-2 flex flex-grow mr-3 w-44 bg-slate-800 px-4 py-1">
      <button @click="setUserValues(playerName)">Change</button>
    </div>
    <div
      class="flex md:justify-between justify-between mt-2 md:w-[350px]  md:px-2 px-6 text-xl md:text-xl font-bold uppercase">
      <p class="font-light">Player level</p>
      <div class="font-bold">
        {{ playerLevel }}
      </div>
    </div>
    <div
      class="flex md:justify-between justify-between mt-2 md:w-[350px]  md:px-2 px-6 text-xl md:text-xl font-bold uppercase">
      <p class="font-light">Daily Quests</p>
      <div class="font-bold">
        {{ dailyQuest }}
      </div>
    </div>
    <section class="my-6 md:pl-0 mx-auto">
      <button @click="logOut()" class="uppercase p-4 bg-slate-800">logout</button>
    </section>
  </main>
  <!-- <StartNotification/> -->
</template>

<script setup>
import { supabase } from '../supabase.js'
import { useAuthStore } from '@/stores/authStore.js';
import { usePlayerStore } from '@/stores/playerStore.js';
import { ref, onMounted } from 'vue';

import StartNotification from '../components/StartNotification.vue'

import router from '@/router/index.js';

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const playerName = ref('')
const playerLevel = ref(0)
const dailyQuest = ref(false)
const setName = ref(true)
const message = ref('')
let level = ref(0)

const name = ref('')

const upgrade = async () => {
  const upgradeUser = playerStore.levelUp(level)
}
/* const levelUp = async () => {
  level.value++
  const { data } = await supabase.auth.updateUser({
    data: { level: level.value }
  })
} */

const setUserValues = async () => {
  const user = await authStore.getUser()
  if(user.user_metadata.name === undefined){
    await authStore.addUserValues(playerName)
  }
  setName.value = false
}

const userStatus = async () => {
  const user = await authStore.getUser()
  playerName.value = user.user_metadata.name
  playerLevel.value = user.user_metadata.level
  if(user.user_metadata.daily_quests){dailyQuest.value = 'ACCOMPLISH'}
}

const out = (playerName) => {
console.log(playerName.value)
}
const logOut = async () => {
  let { error } = await supabase.auth.signOut()
  router.push('/auth')
}

onMounted(() => {
  userStatus()
})
</script>
