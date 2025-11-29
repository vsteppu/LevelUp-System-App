<template>
    <notification />
    <navbar/>
    <div>
        <router-view />
    </div>
</template>

<script setup>
import Navbar from './components/navbar.vue'
import Notification from './components/notification.vue'

console.log('something');
</script>