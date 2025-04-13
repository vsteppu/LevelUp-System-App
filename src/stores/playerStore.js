
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import { DIFFICULTY_LEVEL } from '../stores/store'
import { useAuthStore } from './authStore.js'
import { monitorDate } from '../stores/helpers'

export const usePlayerStore = defineStore('store', () => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    const showSettings = ref(false)
    const dailyRoutine = ref([])

    const toggleSettings = () => {
        showSettings.value = !showSettings.value
    }

    const levelUpPlayer = async() => {
        if(user.value.level === undefined || user.value.level === null){
            const { data } = await supabase.auth.updateUser({
                data: { level: 0 }
            })
            return data
        }
        let level = user.value.level
        level++
        const { data } = await supabase.auth.updateUser({
            data: { level: level }
        })
        return data
    }

    const completeDailyQuest = async() => {
        const getDate = monitorDate()
        const { data } = await supabase.auth.updateUser({
            data: {
                daily_quests: true,
                dates: {
                    daily_quest_completed: getDate
                }
            }
        })
        return data
    }

    const resetDailyQuest = async() => {
        const { data } = await supabase.auth.updateUser({
            data: { daily_quests: false }
        })
        return data
    }

    const changeDifficultyLevel = async(difficultyLevel) => {
        const { data } = await supabase.auth.updateUser({
            data: { difficulty_level: difficultyLevel}
        })
        await authStore.fetchUser()
        checkDifficultyLevel()
        return data
    }

    const checkDifficultyLevel = () => {
        const findDifficultyLevel = Object.keys(DIFFICULTY_LEVEL.value).find(
            (key) => key === user.value?.difficulty_level
        )
        dailyRoutine.value = DIFFICULTY_LEVEL.value[findDifficultyLevel]
    }

    return {
        showSettings,
        dailyRoutine,
        toggleSettings,
        levelUpPlayer,
        completeDailyQuest,
        resetDailyQuest,
        changeDifficultyLevel,
        checkDifficultyLevel,
    }
})
