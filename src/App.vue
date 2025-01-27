<template>
  <Sidetad class="z-10 bg-green-900 h-16 w-full"/>
  <nav class="hidden md:flex justify-around items-center mb-6 w-[700px] h-16 font-light mx-auto ">
    <router-link to="/" class="h-16 w-40 flex justify-center items-center uppercase">Daily Quest</router-link>
    <div class="h-8 w-[0.5px] bg-blue-300"></div>
    <router-link to="/quests" class="h-16 w-40 flex justify-center items-center uppercase">Quests</router-link>
    <div class="h-8 w-[0.5px] bg-blue-300"></div>
    <router-link to="/player" class="h-16 w-40 flex justify-center items-center uppercase">Player</router-link>
    <!-- <router-link to="/player" ><PLayerIcon/></router-link> -->
  </nav>
  <router-view></router-view>
  <button @click="userStatus()"></button>
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

const userStatus = async () => {
  const user = await authStore.getUser()
  playerStatus.value = user
  if (playerStatus.value === null){
        router.push('/auth')
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
