<template>
  <Sidetad class="z-10 h-16 w-full"/>
  <Navbar class=" h-16 w-full "/>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { supabase } from '../src/supabase.js'
import { useAuthStore } from '@/stores/authStore.js';

import PLayerIcon from './components/details/PLayerIcon.vue';
import Sidetad from './components/Sidetab.vue';
import router from '../src/router/index.js';
import Navbar from './components/Navbar.vue';

const authStore = useAuthStore()

const isFirstRun = ref(false);
const openSidetab = ref(false);

const playerStatus = ref('')
const playerName = ref('MainCharacter')

const userStatus = async () => {
  const user = await authStore.getUser()
  playerStatus.value = user
  if (playerStatus.value === null){
        router.push('/auth')
      }else if(user.user_metadata.name === undefined){
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
