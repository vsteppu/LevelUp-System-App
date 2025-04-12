<template>
    <div class="fixed top-20 left-0 right-0 ml-auto mr-auto w-fit min-w-[400px] !z-[9950]">
        <Notification
            v-for="(notification, index) in notifications"
            :key="index"
            :index="index"
            :notification="notification"
        />
    </div>
</template>

<script setup>
import Notification from '../details/NotificationIcon.vue';

const props = defineProps({
    notifications: {
        type: Array,
        default: []
    }
})
</script>
