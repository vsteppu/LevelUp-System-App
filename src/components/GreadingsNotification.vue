<template>
    <div v-if="notification = true" class="flex justify-center items-center flex-col">
        <p class="flex justify-center text-2xl font-semibold">
            Congratulations player. You have start the game!!!
        </p>
        <button @click="notification.value = false" class="flex justify-center h-8 w-60 my-3 border-[1px] border-blue-300">
            Continue
        </button>
    </div>
    <h2 v-if="slide === 4" class="flex justify-center items-center flex-col ">
        <h2>You have aquared the qualification to be a player. Will you accept?</h2>
        <span>
            <p class="flex w-96 px-20 justify-between">
                <button class="flex justify-center w-20 h-8 my-3 border-[1px] border-blue-300 ">No</button>
                <button @click="switchSlides()" class="flex justify-center h-8 w-20 my-3 border-[1px] border-blue-300">Yes</button>
            </p>
        </span>
    </h2>
</template>
<script setup>
import { ref } from 'vue';

const notification = ref(true)

</script>
