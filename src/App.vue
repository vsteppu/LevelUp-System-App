<template>
    <!-- <GetUpdates v-if="isUpdateRequired"/> -->
    <Sidetad class="z-10 h-16 w-full"/>
    <Navbar class=" h-16 w-full "/>
    <NotificationIcon v-if="showNotification"/>
    <Settings class="z-50"/>

</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/authStore'
import { useNotifications } from "../src/stores/notifications.store.js";

import Settings from './components/settings.vue';
import Sidetad from './components/Sidetab.vue';
import Navbar from './components/Navbar.vue';
import NotificationIcon from './components/details/NotificationIcon.vue';
import GetUpdates from './components/authentication/get-updates.vue';

const authStore = useAuthStore()
const notificationStore = useNotifications()
const { userMetaData} = storeToRefs(authStore)
const { showNotification } = storeToRefs(notificationStore)

const isUpdateRequired = computed(() => {
    return Object.keys(userMetaData.value).includes('name') && !Object.keys(userMetaData.value).includes('difficulty_level')
})
</script>
