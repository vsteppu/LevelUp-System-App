<template>
    <notification />
    <NavBar/>
    <div>
        <router-view />
    </div>
</template>

<script setup>
import Notification from './components/notification.vue'
import NavBar from './components/nav-bar.vue'

console.log('something');
</script>