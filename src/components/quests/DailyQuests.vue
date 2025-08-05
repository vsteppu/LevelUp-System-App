<template>
    <main class="flex md:justify-center items-center flex-col relative w-full">
        <div class="h-16 md:w-[400px] w-full md:px-4 flex align-middle justify-between items-center">
            <div
                class="h-12 w-12 flex items-center justify-center text-2xl text-center bg-neutral-800 rounded-sm"
            >
                <ExclamationCircleIcon
                    class="size-8"
                />
            </div>
            <h1
                class="uppercase text-3xl h-12 flex-grow flex items-center justify-center pb-1 border-[2px] border-neutral-800 rounded-sm"
            >
                Daily Quest
            </h1>
        </div>
        <teleport to="body">
            <transition name="slide-in" mode="out-in">
                <div
                    v-if="levelUpNotification"
                    class="flex items-center justify-center fixed top-1/3 left-1/2 w-[500px] h-[250px] border-[1px] rounded-sm transform -translate-x-1/2 -translate-y-1/3"
                >
                    <p class="uppercase text-4xl pb-4">
                        {{ popupMessage }}
                    </p>
                </div>
            </transition>
        </teleport>
        <div class="mt-5 md:w-[350px] w-screen md:px-2 px-9 text-xl md:text-lg font-light">
            <form
                v-for="item in dailyRoutine"
                :key="item.id"
                @click="addExecise(item.key)"
                class="flex justify-between"
            >
                {{ item.display }}
                <div class="flex items-center">
                    [ {{ item.quantity }} {{ item.units }} ]
                    <p
                        class="flex justify-center items-center h-5 w-5 border-[1px] border-neutral-300 rounded-sm ml-3"
                    >
                        <span
                            v-if="dailyExercise?.includes(item.key) || dailyRoutineCompleted"
                            class="pi pi-check text-green-400 text-shadow-green text-2xl"
                        >
                        </span>
                    </p>
                </div>
            </form>
            <p
                :class="
                    dailyRoutineCompleted
                        ? 'text-green-600 text-shadow-green'
                        : 'text-red-600 text-shadow-red'
                "
                class="my-5 uppercase"
            >
                {{
                    dailyRoutineCompleted ? 'Daily quest completed' : 'Daily quest not yet completed'
                }}
            </p>
        </div>
        <div
            :class="dailyRoutineCompleted ? 'from-green-600 to-green-950' : 'from-red-600 to-red-950'"
            class="bg-gradient-to-b pb-2 text-5xl font-extrabold flex justify-center items-center text-transparent bg-clip-text"
        >
            {{ timer }}
        </div>
        <hr :class="[dailyRoutineCompleted ? 'border-green-600' : 'border-red-600', 'md:w-[650px] w-full']"/>
    </main>
    <section class="flex md:justify-center md:items-center flex-col relative">
        <div
            class="flex md:justify-between justify-between mt-2 md:w-[350px] md:px-2 px-8 text-xl md:text-xl font-bold uppercase"
        >
            Player
            <div class="flex items-center">
                {{ playerName }}
            </div>
        </div>
        <div
            class="flex md:justify-between justify-between mt-2 md:w-[350px] md:px-2 px-8 text-lg md:text-xl font-light uppercase"
        >
            Player Level
            <div class="flex items-center">
                {{ playerLevel }}
            </div>
        </div>
    </section>
</template>
<script setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { monitorDate, startCountdown } from '@/stores/helpers'
import { useAuthStore } from '@/stores/authStore.js'
import { usePlayerStore } from '@/stores/playerStore.js'

import { ExclamationCircleIcon, CheckIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const { user, userMetaData } = storeToRefs(authStore)
const { dailyRoutine } = storeToRefs(playerStore)
const { name: playerName, difficulty_level, daily_quest_date, dayly_quest_date } = toRefs(userMetaData.value)

const emit = defineEmits(['levelUp'])

const dailyExercise = ref([])
const timer = ref(0)
const popupMessage = ref('')
const levelUpNotification = ref(false)
const dailyRoutineCompleted = computed(() => daily_quest_date?.value === monitorDate())
const playerLevel = computed(() => userMetaData.value?.level)
const isAllChecked = computed(() => ['pushup','squats','situps','running'].every((item) => dailyExercise.value.includes(item)))

console.log('userMetaData: ', userMetaData.value);
console.log('dayly_quest_date: ', dayly_quest_date.value);
console.log('dailyRoutineCompleted: ', dailyRoutineCompleted.value);

const addExecise = (item) => {
    const stored = localStorage.getItem('checkedExercise')
    if (stored === null) {
        localStorage.setItem('checkedExercise', JSON.stringify([item]))
        const checkedExercise = JSON.parse(localStorage.getItem('checkedExercise'))
        dailyExercise.value = checkedExercise
    } else {
        const checkedExercise = JSON.parse(stored)
        const check = checkedExercise.some((el)=> el === item)
        if (!check) {
            checkedExercise.push(item)
            localStorage.setItem('checkedExercise', JSON.stringify(checkedExercise))
            dailyExercise.value = checkedExercise
        }
    }
}

watch(
    isAllChecked,
    async () => {
        await playerStore.completeDailyQuest('daily_quests', true)
        await playerStore.levelUpPlayer('level')
        await playerStore.changeDailyQuestDate()
    }
)

watch(
    difficulty_level,
    () => {
        playerStore.checkDifficultyLevel()
    },
)

onMounted(
    async () => {
        if (!dailyRoutineCompleted.value) {
            await playerStore.resetDailyQuest('daily_quests', false)
            const checkedExercise = JSON.parse(localStorage.getItem('checkedExercise'))
            dailyExercise.value = checkedExercise !== null ? checkedExercise : []
        }
        playerStore.checkDifficultyLevel()
        startCountdown((newTimer) => {
            timer.value = newTimer
        })
})
</script>

<style scooped>
.slide-in-enter-active,
.slide-in-leave-active {
    transition:
        max-height 0.3s ease-out,
        opacity 0.3s ease-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
    max-height: 0;
    /* Start or end with no height */
    opacity: 0;
    /* Start or end invisible */
}

.slide-in-enter-to,
.slide-in-leave-from {
    max-height: 500px;
    /* Full height for the content (adjust as needed) */
    opacity: 1;
    /* Fully visible */
}
</style>
