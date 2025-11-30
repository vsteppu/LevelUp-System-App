<template>
    <div class="flex items-center h-full">
            <div
                v-if="workoutDetails"
                class="w-80 rounded p-6 flex flex-col font-extralight"
            >
                <div>
                    <div class="text-start text-2xl font-bold justify-between flex my-2">
                        <span>
                            Date
                        </span>
                        <span class="text-red-400">
                            {{ workoutDate }}
                        </span>
                    </div>
                    <div
                        v-for="item in exercises"
                        :key="item.id"
                        class="flex justify-between text-xl"
                    >
                        <div class="">{{ item.display_name }}</div>
                        <div class="">{{ item.value }}</div>
                    </div>
                </div>
            </div>
            <div v-else class="w-80 rounded p-6 flex flex-col font-extralight">
                No Registered Data
            </div>
    </div>
</template>

<script setup>
import { computed, watch } from "vue";

const workoutDetails = defineModel()
watch(workoutDetails, () => {
    console.log('workoutDetails: ', workoutDetails.value);
})

const exercises = computed(() => workoutDetails.value?.daily_exercise)
const workoutDate = computed(() => { return sanitizeDate(workoutDetails.value?.createdAt) })

const sanitizeDate = (param) => {
    const parseDate = new Date(param);
    return parseDate.toLocaleDateString("en-GB");
};
sanitizeDate();
</script>
