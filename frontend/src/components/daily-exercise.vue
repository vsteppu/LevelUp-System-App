<template>
    <div v-if="loading">
        <Loading />
    </div>
    <div
        v-else
        class="text-3xl w-full font-thin flex flex-col justify-center"
    >
        <h1>Daily exercise</h1>
        <div
            v-for="exercise in dailyExercise"
        >
            <div class="flex items-center justify-between mb-2">
                <h3>{{ exercise?.display_name }}</h3>

                <div class="flex items-center justify-center">
                    {{ exercise?.value }}
                    {{ exercise?.unit_type }}
                    <div class=" flex flex-col text-center px-3 ml-3 cursor-pointer">
                        <span
                            @click="() => increeseCount(exercise?.name)"
                        >
                            <ChevronUpIcon class="size-10"/>
                        </span>
                        <Divider />
                        <span
                            @click="() => decreeseCount(exercise?.name)"
                        >
                            <ChevronDownIcon class="size-10"/>
                        </span>
                    </div>
                </div>
            </div>
            <Divider />
        </div>
        <div class="mx-auto flex justify-around w-full">
            <button 
                @click="submitExercises"
                class=" bg-green-800 mt-6 w-fit px-10 py-4 cursor-pointer"
            >
                Submit
            </button>
            <button 
                @click="deleteAllExercises()"
                class=" bg-red-800 mt-6 w-fit px-10 py-4 cursor-pointer"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useExerciseStore } from "@/stores/exercise.store.js";
import { DAILY_EXERCISE } from "@/stores/store";

import Divider from './divider.vue'

import Loading from "../assets/icons/loading.vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

const exerciseStore = useExerciseStore();
const dailyExercise = ref(DAILY_EXERCISE)

const loading = ref(false);
const history = ref(false);

const handleFetchExercises = async () => {
    history.value = await exerciseStore.fetchDailyExercises();
}

const increeseCount = ( name ) => {
    const exerciseIndex = dailyExercise.value.findIndex(item => item.name === name)
    let updateValue = dailyExercise.value[exerciseIndex]
    updateValue.value = name != 'running' 
        ? updateValue.value + 5
        : updateValue.value + 1
    
    dailyExercise.value[exerciseIndex] = updateValue
};

const decreeseCount = ( name ) => {
    const exerciseIndex = dailyExercise.value.findIndex(item => item.name === name)
    let updateValue = dailyExercise.value[exerciseIndex]
    if (updateValue.value !== 0) updateValue.value = name != 'running'
        ? updateValue.value - 5
        : updateValue.value -1
    dailyExercise.value[exerciseIndex] = updateValue
};

const submitExercises = async() => {
    const data = dailyExercise.value
    await exerciseStore.addDailyExercises(data)
};

const deleteAllExercises = async() => {
    await exerciseStore.deleteDailyExercise()
};

console.log('daily');

onMounted(() => {
    handleFetchExercises();
});
</script>
