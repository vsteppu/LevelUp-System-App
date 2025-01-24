<template>
  <Sidetad class="z-10 bg-green-900 h-16 w-full"/>
  <nav class="hidden md:flex justify-around items-center mb-6 w-[700px] h-16 font-light mx-auto ">
    <router-link to="/" class="h-16 w-40 flex justify-center items-center uppercase">Daily Quest</router-link>
    <div class="h-8 w-[0.5px] bg-blue-300"></div>
    <router-link to="/quests" class="h-16 w-40 flex justify-center items-center uppercase">Quests</router-link>
    <div class="h-8 w-[0.5px] bg-blue-300"></div>
    <!-- <router-link to="/player" ><PLayerIcon/></router-link> -->
  </nav>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import PLayerIcon from './components/details/PLayerIcon.vue';
import Sidetad from './components/Sidetab.vue';

const isFirstRun = ref(false);
const openSidetab = ref(false);

onMounted(() => {
  // Check if this is the first time the user is visiting
  if (!localStorage.getItem('hasVisited')) {
    isFirstRun.value = true;
    localStorage.setItem('hasVisited', 'true');
  }
});

</script>
