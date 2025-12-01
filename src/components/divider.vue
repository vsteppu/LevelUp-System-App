<template>
    <div :class="['h-px w-full', color]"/>
</template>
<script setup>
const { 
    color = 'bg-white'
} = defineProps(['color']) 
</script>