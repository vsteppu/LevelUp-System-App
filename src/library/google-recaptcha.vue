<template>
 </template>

<script setup>
import { onMounted } from 'vue';
import { useGoogleToken } from '@/stores/recaptcha.js';

const { insertWidget } = useGoogleToken()

onMounted( async() => {
    insertWidget()
})
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>
