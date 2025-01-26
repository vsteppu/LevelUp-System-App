<template>
  <div class="mt-5 md:w-[350px] w-full md:px-2 px-9 text-2xl md:text-lg font-light ">
    <label for="pushups" class="flex justify-between">
      <h2>100 Pushups</h2>
      <div class="flex justify-center items-center h-5 w-5 border-[1px] border-blue-300 rounded-sm">
          <input type="checkbox" id="pushups" value="pushups" v-model="checkedExercise" class=" appearance-none " />
          <span v-if="checkedExercise.includes('pushups')" class="pi pi-check text-green-400 text-shadow-green text-3xl"></span>
        </div>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checkedExercise = ref([])

</script>
