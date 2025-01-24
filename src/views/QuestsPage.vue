<template>
  <section>
    <StepsCount />
    <div v-for="item in items">
      <ShareLink @click="shareLink()" />
    </div>
  </section>
  <section>

  </section>
</template>

<script setup>
import { ref } from 'vue';

import StepsCount from '../components/quests/StepsCount.vue'
import ShareLink from '../components/icons/networking-share-icon.vue'

const items = ref([
  { jobId: 1 },
  { jobId: 2 },
  { jobId: 3 },
])

const shareLink = () => {
  console.log(items.value)
}
</script>
