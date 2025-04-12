<template>
    <Sidetad class="z-10 h-16 w-full"/>
    <Navbar class=" h-16 w-full "/>
    <NotificationIcon v-if="showNotification"/>
    <Settings class="z-50"/>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useNotifications } from "../src/stores/notifications.store.js";

import Settings from './components/settings.vue';
import Sidetad from './components/Sidetab.vue';
import Navbar from './components/Navbar.vue';
import NotificationIcon from './components/details/NotificationIcon.vue';

const notificationStore = useNotifications()
const { showNotification } = storeToRefs(notificationStore)
</script>
