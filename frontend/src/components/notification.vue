<template>
    <TopDropEffect>
        <div
            v-if="showNotification"
            class="absolute font-extralight text-center w-full z-100 h-20"
        >
            <div 
                v-for="notification in notifications"
                :class="
                    notification.type == 'error'
                    ? 'bg-red-600' 
                    : 'bg-green-600'
                "
            >
                {{ notification.message }}
            </div>
        </div>
    </TopDropEffect>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useNotificationStore } from '@/stores/notification.store';
import TopDropEffect from '../effects/top-drop-effect.vue'

const notificationStore = useNotificationStore()
const { notifications, showNotification } = storeToRefs(notificationStore)

</script>