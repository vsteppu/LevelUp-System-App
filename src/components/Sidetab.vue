<template>
  <div class="md:hidden bg-slate-900 z-10 h-16 flex w-full relative items-center">
    <p @click="openSidetab = !openSidetab" class="pi pi-bars text-2xl ml-2 p-2"></p>
    <p class=" font-medium font-goldman text-4xl absolute left-1/2 transform -translate-x-1/2 pb-1">player</p>
    <p @click="openSidetab = !openSidetab" v-if="openSidetab" class="pi pi-times text-2xl mr-2 p-2 absolute right-0"></p>
  </div>

  <nav class="font-light flex flex-col ml-6 h-screen my-5" @click="openSidetab = false" v-if="openSidetab">
    <router-link to="/" class=" w-40 uppercase my-3 ml-4">Daily Quest</router-link>
    <router-link to="/quests" class=" w-40 uppercase my-3 ml-4">Quests</router-link>
    <router-link to="/player" class=" w-40 uppercase my-3 ml-4">Player</router-link>
    <!-- <router-link to="/player" ><PLayerIcon/></router-link> -->
  </nav>
  <hr class=" border-blue-300 mb-3 md:hidden " />
</template>
<script setup>
import { ref } from 'vue';

const openSidetab = ref(false)

</script>

<style scoped>
.bg {
  background-size: 300% 300%;
  animation: color ease-in-out 20s infinite
}

@keyframes color {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }

}
</style>
