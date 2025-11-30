<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="p-3 w-2/3 flex flex-col justify-center items-center">
            <DailyExercise/>
        </div>
    </div>
</template>

<script setup>
import DailyExercise from '@/components/daily-exercise.vue'
import WorkoutDetailsCard from '@/components/workout-details-card.vue'

console.log('home');
</script>