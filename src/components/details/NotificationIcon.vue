<template>
    <div
        class="fixed top-40 left-0 right-0 ml-auto mr-auto w-fit !z-[9950]"
    >
        <div class="w-[600px] h-[400px] flex flex-col items-center bg-neutral-800">
            <div class="flex align-middle justify-between items-center">
                <ExclamationCircleIcon class="size-8 mx-4"/>
                <h1
                    class="uppercase text-4xl h-12 flex-grow flex items-center justify-center pb-1 border-[1px] rounded-sm">
                    notification
                </h1>
            </div>
            <div v-html="notification.message"/>
            <span
                v-if="notification.actionText"
                @click="handleActionClick"
                class="text-green-900 underline cursor-pointer"
            >
                {{ notification.actionText }}
            </span>

        </div>
    </div>
</template>
<script setup>
import { computed, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useNotifications } from "@/stores/notifications.store";

import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
const notificationsStore = useNotifications()

//const { notification, index } = toRefs(props)
const { notification, showNotification } = storeToRefs(notificationsStore)
console.log('notifications: ', notification.value)
</script>

