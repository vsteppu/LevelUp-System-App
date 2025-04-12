<template>
    <div class="relative flex items-center min-w-[420px] mb-4">
        <div class="border rounded overflow-hidden relative w-full" :class="notificationStyles.wrapper">
            <div class="bg-white flex justify-start items-stretch">
                <div class=" px-3 py-2 min-h-full" :class="notificationStyles.iconContainer">
                    <component :is="notificationStyles.icon" />
                </div>

                <div class="pl-4 pr-8 py-2.5 w-full text-[14px] font-medium leading-[20px]" :class="notificationStyles.body">
                    <div v-html="notification.message" />
                    <span
                        v-if="notification.actionText"
                        @click="handleActionClick"
                        class="text-won-green underline cursor-pointer"
                    >
                        {{ notification.actionText }}
                    </span>
                </div>
            </div>
        </div>

        <xIcon class="absolute right-2 cursor-pointer" classes="w-6 h-6" @click="() => notificationsStore.clear(index)"/>
    </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useNotifications } from "../../stores/notifications.store";

//import xCircle from "../../icons/x-circle.vue"
//import xIcon from "../../icons/x-icon.vue";
//import CheckIcon from "../../icons/radio-checked.vue";
//import WarningIcon from "../../icons/warning.vue";

const notificationsStore = useNotifications();
const props = defineProps({
    notification: {
        type: Object,
        default: null
    },
    index: {
        type: Number,
        default: 0
    }
})

const { notification, index } = toRefs(props)

const handleActionClick = () => {
    notification.value?.actionClickCb();
    notificationsStore.clear(index.value)
}

const notificationClasses = {
    error: {
        body: "bg-won-red-light",
        iconContainer: "bg-won-red",
        wrapper: "border-won-red",
        icon: xCircle
    },
    success: {
        body: "bg-won-green-light",
        iconContainer: "bg-won-green",
        wrapper: "border-won-green",
        icon: CheckIcon
    },
    warning: {
        body: "bg-won-yellow-light",
        iconContainer: "bg-won-yellow",
        wrapper: "border-won-yellow",
        icon: WarningIcon
    }
}

const notificationStyles = computed(() => {
    return notificationClasses[notification.value.type.toLowerCase()] || notificationClasses.error
})
</script>
