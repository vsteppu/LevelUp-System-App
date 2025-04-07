<template>
    <main class="flex md:justify-center items-center flex-col relative">
        <div class="h-16 md:w-[400px] w-full px-4 flex align-middle justify-between items-center">
            <div
                class="h-12 w-12 flex items-center justify-center text-2xl text-center bg-neutral-800 rounded-sm"
            >
                <ExclamationCircleIcon class="size-8" />
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
        <div class="mt-5 md:w-[350px] w-full md:px-2 px-9 text-xl md:text-lg font-light">
            <form
                v-for="item in dailyExercise"
                :key="item.id"
                @click="addExecise(item)"
                class="flex justify-between"
            >
                {{ item.value }}
                <div class="flex items-center">
                    [ {{ item.quantity }} {{ item.units }} ]
                    <p
                        class="flex justify-center items-center h-5 w-5 border-[1px] border-neutral-300 rounded-sm ml-3"
                    >
                        <span
                            v-if="checkedExercise.includes(item.value) || dailyQuestCompleted"
                            class="pi pi-check text-green-400 text-shadow-green text-2xl"
                        >
                        </span>
                    </p>
                </div>
            </form>
            <p
                :class="
                    dailyQuestCompleted
                        ? 'text-green-600 text-shadow-green'
                        : 'text-red-600 text-shadow-red'
                "
                class="my-5 uppercase"
            >
                {{
                    dailyQuestCompleted ? 'Daily quest completed' : 'Daily quest not yet completed'
                }}
            </p>
        </div>
        <div
            :class="dailyQuestCompleted ? 'from-green-600 to-green-950' : 'from-red-600 to-red-950'"
            class="bg-gradient-to-b pb-2 text-5xl font-extrabold flex justify-center items-center text-transparent bg-clip-text"
        >
            {{ timer }}
        </div>
        <div
            :class="dailyQuestCompleted ? 'from-green-600 to-green-950' : 'from-red-600 to-red-950'"
            class="h-[1px] w-[400px] bg-gradient-to-b"
        ></div>
        <!--     <button @click="resetCheckbox()" class="h-12 w-[500px] bg-gradient-to-b from-red-600 to-red-900 ">Reset checkbox</button> -->
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
import 'primeicons/primeicons.css'

import { computed, onMounted, ref, watch } from 'vue'
import { DAILY_QUESTS } from '@/stores/store'
import { startCountdown, monitorDate } from '@/stores/helpers'
import { useAuthStore } from '@/stores/authStore.js'
import { usePlayerStore } from '@/stores/playerStore.js'
import { supabase } from '@/supabase'

import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const playerStore = usePlayerStore()

const checkedExercise = ref([])
const exerciseDone = ref(false)
const dailyQuestCompleted = ref(false)
const playerLevel = ref(0)
const timer = ref(0)
const popupMessage = ref('')
const playerName = ref('')
const playerRank = ref('')
const levelUpNotification = ref(false)

const dailyExercise = ref([
    { id: 1, units: 'reps', value: 'Pushups', quantity: 100 },
    { id: 2, units: 'reps', value: 'Sit-ups', quantity: 100 },
    { id: 3, units: 'reps', value: 'Squats', quantity: 100 },
    { id: 4, units: 'km', value: 'Running', quantity: 10 },
])

const emit = defineEmits(['levelUp'])

const addExecise = (item) => {
    const check = checkedExercise.value.includes(item.value)
    if (!check) {
        checkedExercise.value.push(item.value)
    }
}

const checked = computed(() =>
    ['Pushups', 'Sit-ups', 'Squats', 'Running'].every((exercise) =>
        checkedExercise.value.includes(exercise),
    ),
)

const upgradeLevel = async () => {
    const getDate = monitorDate()
    await playerStore.completeDailyQuest(getDate)
    await playerStore.levelUp()
    const user = await authStore.getUser()
    playerLevel.value = user.user_metadata.level
    dailyQuestCompleted.value = true
    playerRank.value = user.user_metadata.rank
}

const resetCheckbox = async () => {
    await playerStore.resetDailyQuest()
    checkedExercise.value = []
    const user = await authStore.getUser()
    dailyQuestCompleted.value = user.user_metadata.daily_quests
}

const userStatus = async () => {
    const user = await authStore.getUser()
    const currentDate = monitorDate()
    const dailyQuestsLastExecutionDate = user.user_metadata.dates.daily_quest_completed
    playerLevel.value = user.user_metadata.level
    playerName.value = user.user_metadata.name
    if (dailyQuestsLastExecutionDate !== currentDate) {
        dailyQuestCompleted.value = false
    } else {
        dailyQuestCompleted.value = true
    }
}

watch(
    () => checked.value,
    () => {
        upgradeLevel()
        exerciseDone.value = true
    },
)

watch(
    () => timer.value,
    () => {
        if (timer.value === '00:00:01') {
            resetCheckbox()
        }
    },
)

const updateDailyQuest = async () => {
    const { data } = await supabase.auth.updateUser({
        data: {
            dates: {
                daily_quest_completed: 'vsd',
            },
        },
    })
}

onMounted(async () => {
    await userStatus(),
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
