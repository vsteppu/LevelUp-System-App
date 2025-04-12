import { defineStore } from "pinia";
import { ref } from 'vue';

export const useNotifications = defineStore('notifications', () => {
    const notification = ref({})
    const showNotification = ref(false)

    const clear = (index = null) => {
        if(! index) {
            notifications.value = []
            return
        }

        notifications.value = notifications.value.splice(index, 1)
    }

    const notify = (message, type) => {
        notification.value = { message, type }
        showNotification.value = true
        console.log('showNotification.value: ', showNotification.value);
        setTimeout(() => {
            notification.value = {}
            showNotification.value = false
        }, 3000)
    }
    return {
        notification,
        showNotification,

        notify,
        clear }
})
