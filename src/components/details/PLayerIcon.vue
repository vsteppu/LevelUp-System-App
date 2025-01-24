<template>
  <div class="uppercase  h-16 w-32 flex justify-between items-center font-montserrat font-light ">
    <h1 class="flex">player</h1>
    <div class="flex">
      Lv. {{ level }}
    </div>
  </div>
</template>
<script setup>
import { usePlayerStore } from '@/stores/playerStore'

const store = usePlayerStore()
const level = store.player


</script>
