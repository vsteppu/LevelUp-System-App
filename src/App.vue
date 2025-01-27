<template>
  <Sidetad class="z-10 h-16 w-full"/>
  <nav class="hidden md:flex justify-between items-center mb-3 h-16 font-light px-32 bg-neutral-900">
    <router-link to="/" class=" font-bold text-2xl uppercase">{{playerName}}</router-link>
    <div class="flex justify-between items-center h-12 w-96 font-light">
      <router-link to="/" class="h-16  flex justify-center items-center uppercase">Daily Quest</router-link>
      <router-link to="/quests" class="h-16  flex justify-center items-center uppercase">Quests</router-link>
      <router-link to="/player" class="h-16  flex justify-center items-center uppercase">Player</router-link>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { supabase } from '../src/supabase.js'
import { useAuthStore } from '@/stores/authStore.js';

import PLayerIcon from './components/details/PLayerIcon.vue';
import Sidetad from './components/Sidetab.vue';
import router from '../src/router/index.js';

const authStore = useAuthStore()

const isFirstRun = ref(false);
const openSidetab = ref(false);

const playerStatus = ref('')
const playerName = ref('')

const userStatus = async () => {
  const user = await authStore.getUser()
  playerStatus.value = user
  playerName.value = user.user_metadata.name
  if (playerStatus.value === null){
        router.push('/auth')
      }else if(playerName.value === undefined){
        playerName.value = 'MainCharacter'
        router.push('/player')
      }

}

const isAuthenticaded = computed(()=>playerStatus.value)

onMounted(() => {
  userStatus()
  watch(()=>playerStatus,
    ()=>{
      if (isAuthenticaded === null){
        router.push('/auth')
      }
    })
  // Check if this is the first time the user is visiting
  if (!localStorage.getItem('hasVisited')) {
    isFirstRun.value = true;
    localStorage.setItem('hasVisited', 'true');
  }
});

</script>
