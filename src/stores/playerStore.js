
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { supabase } from '../supabase.js'
import router from '@/router/index.js'
import { useAuthStore } from './authStore.js'


export const usePlayerStore = defineStore('store', () => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    const showSettings = ref(false)

    const toggleSettings = () => {
        console.log('showSettings.value: ', showSettings.value);
        showSettings.value = !showSettings.value
    }

    const levelUp = async() => {
        if(user.value.level === undefined || user.value.level === null){
            const { data } = await supabase.auth.updateUser({
                data: { level: 1 }
            })
        }
        let level = user.value.level
        level++
        const { data } = await supabase.auth.updateUser({
            data: { level: level }
        })
        console.log(level)
    }

    const completeDailyQuest = async(getDate) => {
        const { data } = await supabase.auth.updateUser({
            data: {
                daily_quests: true,
                dates: {
                    daily_quest_completed: getDate
                }
            }
        })
    }

    const changeDifficultyLevel = async(difficultyLevel) => {
        const { data } = await supabase.auth.updateUser({
            data: { difficulty_level: difficultyLevel}
        })
        authStore.fetchUser()
    }

    const resetDailyQuest = async() => {
        const { data } = await supabase.auth.updateUser({
            data: { daily_quests: false }
        })
    }

    return {
        showSettings,
        toggleSettings,
        levelUp,
        completeDailyQuest,
        resetDailyQuest,
        changeDifficultyLevel,
    }
})
