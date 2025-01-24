<template>
<main class="flex md:justify-center items-center flex-col text-blue-300 relative">
    <div class="h-16 md:w-[400px] w-full px-4 flex align-middle justify-between items-center">
      <div class=" h-12 w-12 flex items-center justify-center text-2xl text-blue-300 text-center border-[1px] rounded-sm border-blue-300 "><p class="pi pi-info-circle "></p></div>
      <h1 class="uppercase text-4xl h-12 flex-grow text-shadow-blue flex items-center justify-center pb-1 border-[1px] rounded-sm border-blue-300">
        Daily Quest
      </h1>
    </div>
    <teleport to="body" >
      <transition
        name="slide-in"
        mode="out-in"
      >
        <div
          v-if="levelUpNotification"
          class="flex items-center justify-center fixed top-1/3 left-1/2 w-[500px] h-[250px] bg-slate-900  border-[1px] rounded-sm border-blue-300 transform -translate-x-1/2 -translate-y-1/3"
          >
            <p class="uppercase text-4xl pb-4">{{ popupMessage }}</p>
        </div>
      </transition>
    </teleport>
<!--     <div class="uppercase text-3xl h-40 flex-grow text-shadow-blue flex items-center justify-center pb-1  border-[1px] rounded-sm border-blue-300">Level Up!</div> -->
    <div class="mt-5 md:w-[350px] w-full md:px-2 px-4 ">
      <hr class=" border-blue-300 mb-3 " />
      <label for="pushups" class="flex justify-between">
        <h2>100 Pushups</h2>
        <div class="flex justify-center items-center h-5 w-5 border-[1px] rounded-sm border-blue-300">
          <input type="checkbox" id="pushups" value="pushup" v-model="checkedExercise" class="peer appearance-none" />
          <span class="pi pi-check text-green-400 text-shadow-green opacity-0 peer-checked:opacity-100 text-2xl "></span>
        </div>
      </label>
      <label for="situps" class="flex justify-between">
        <h2>100 Sit-ups</h2>
        <div class="flex justify-center items-center h-5 w-5 border-[1px] rounded-sm border-blue-300">
          <input type="checkbox" id="situps" value="situps" v-model="checkedExercise" class="peer appearance-none" />
          <span class="pi pi-check text-green-400 text-shadow-green opacity-0 peer-checked:opacity-100 text-2xl "></span>
        </div>
      </label>
      <label for="squats" class="flex justify-between">
        <h2>100 Squats</h2>
        <div class="flex justify-center items-center h-5 w-5 border-[1px] rounded-sm border-blue-300">
          <input type="checkbox" id="squats" value="squats" v-model="checkedExercise" class="peer appearance-none" />
          <span class="pi pi-check text-green-400 text-shadow-green opacity-0 peer-checked:opacity-100 text-2xl "></span>
        </div>
      </label>
      <label for="running" class="flex justify-between">
        <h2>10km Running</h2>
        <div class="flex justify-center items-center h-5 w-5 border-[1px] rounded-sm border-blue-300">
          <input type="checkbox" id="running" value="running" v-model="checkedExercise" class="peer appearance-none" />
          <span class="pi pi-check text-green-400 text-shadow-green opacity-0 peer-checked:opacity-100 text-2xl "></span>
        </div>
      </label>
      <hr class=" border-blue-300 mt-3" />
      <p :class="exerciseDone? 'text-green-600 text-shadow-green':'text-red-600 text-shadow-red'" class="my-3 uppercase">
        {{ exerciseDone? 'Daily quest completed':'Daily quest not yet completed' }}
      </p>
    </div>
    <div
      :class="exerciseDone? 'from-green-600 to-green-950':'from-red-600 to-red-950'"
      class="bg-gradient-to-b  pb-2  text-5xl font-extrabold flex justify-center items-center text-transparent bg-clip-text">{{ timer }}</div>
      <div
      :class="exerciseDone? 'from-green-600 to-green-950':'from-red-600 to-red-950'"
      class="h-[1px] w-[400px] bg-gradient-to-b"></div>
<!--     <button @click="resetCheckbox()" class="h-12 w-[500px] bg-gradient-to-b from-red-600 to-red-900 ">Reset checkbox</button> -->
  </main>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { DAILY_QUESTS } from '@/stores/store'
import { startCountdown } from '@/stores/helpers';
import 'primeicons/primeicons.css'

const checkedExercise = ref([])
const playerLevel = ref(36)
const timer = ref(0);
const popupMessage = ref('')
const levelUpNotification = ref(false)

const exerciseDone =computed(()=>DAILY_QUESTS.every(item=> checkedExercise.value.includes(item)))

const emit = defineEmits(['levelUp']);

const resetCheckbox = () => {
  checkedExercise.value = []
}

onMounted(()=>startCountdown((newTimer)=>{
  timer.value = newTimer
  //console.log(timer.value)
}))

watch(
  ()=> [timer.value,exerciseDone.value],
  ()=>{
    if(timer.value === '00:00:01' && !exerciseDone.value){
      popupMessage.value = 'We are Sorry but. Times Up. A punishment will be applied'
      setTimeout(()=>{ levelUpNotification.value = true },400)
      setTimeout(()=>{ levelUpNotification.value = false },8500)
      resetCheckbox()
      console.log("Times Up")
    }
    if(timer.value === '00:00:01'){
      resetCheckbox()
    }
/*     if(!timer.value === '23:35:30'){
      dailyQuestCompleated = true
    } */
  }
)

watch(
  () => exerciseDone.value,
  () => {
    if(exerciseDone.value) {
      emit('levelUp', playerLevel.value)
      popupMessage.value = 'Level Up'
      setTimeout(()=>{ levelUpNotification.value = true },400)
      setTimeout(()=>{ levelUpNotification.value = false },1500)
    }
  }
)

</script>

<style scooped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-in-enter-from,
.slide-in-leave-to {
  max-height: 0; /* Start or end with no height */
  opacity: 0;    /* Start or end invisible */
}

.slide-in-enter-to,
.slide-in-leave-from {
  max-height: 500px; /* Full height for the content (adjust as needed) */
  opacity: 1;        /* Fully visible */
}
</style>
