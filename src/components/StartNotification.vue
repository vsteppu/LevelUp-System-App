<template>
  <header
    v-if="!closeStartNotification"
    class="mx-auto top-10 relative flex justify-center items-center p-20 w-[700px] h-[400px] bg-slate-900 text-blue-300 rounded-md border-[1px] border-blue-300">
    <div>
      <h1 class=" flex justify-center text-red-600 uppercase ">
        Notification!
      </h1>
      <h2 v-if="slide === 1" class="flex items-center flex-col text-center">
        {{ startNotifications[0] }}
        <button @click="switchSlides()" class="flex justify-center h-8 w-36 my-3 border-[1px] border-blue-300">
          Next
        </button>
      </h2>
      <h2 v-if="slide === 2" class="flex items-center flex-col text-center">
        {{ startNotifications[1] }}
        <p class=" font-medium text-xl">
          {{ startNotifications[2] }}
        </p>
        <button @click="switchSlides()" class="flex justify-center h-8 w-36 my-3 border-[1px] border-blue-300">
          Continue
        </button>
      </h2>
      <h2 v-if="slide === 3" class="flex items-center flex-col text-center">
        {{ startNotifications[3] }}
        <button @click="closeNotification()" class="flex justify-center h-8 w-36 my-3 border-[1px] border-blue-300">
          Close
        </button>
      </h2>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { startNotifications } from '../notifications/startNotifications'
import { useRouter } from 'vue-router';

const router = useRouter()

const slide = ref(1)
const closeStartNotification = ref(false)

const switchSlides = () => {
  slide.value++
}
const closeNotification = () => {
  closeStartNotification.value = true
  router.push('/')
}

</script>
