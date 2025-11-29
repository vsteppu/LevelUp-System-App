import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore('notificationStore', () => {
const showNotification = ref(true)
const notifications = ref([])

const notify = (message, type, notificationTime = 3500) => {
    notifications.value.push({message, type})
    showNotification.value = true

    setTimeout(()=>{
        showNotification.value = false
        notifications.value = []
    }, notificationTime)
}

return {
    showNotification,
    notifications,

    notify,
}
})