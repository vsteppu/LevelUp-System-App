
import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../supabase.js'
import { DIFFICULTY_LEVEL } from '../stores/store'
import { useAuthStore } from './authStore.js'
import userApi from '../api/userApi.js'

export const usePlayerStore = defineStore('store', () => {
    const authStore = useAuthStore()
    const { user, userMetaData } = storeToRefs(authStore)

    const showSettings = ref(false)
    const userLevel = computed(() => userMetaData.value?.level)
    const dailyRoutine = computed(() =>{
        const level = userMetaData.value?.difficulty_level
        return DIFFICULTY_LEVEL.value[level]
    })

    const toggleSettings = () => {
        showSettings.value = !showSettings.value
    }

    const levelUpPlayer = async(key) => {
        let level = userLevel.value
        level++
        await userApi.updateSupabaseUser(key, level)
        authStore.fetchUser()
    }

    const completeDailyQuest = async(key, value) => {
        await userApi.updateSupabaseUser(key, value)
    }

    const resetDailyQuest = async(key, value) => {
        await userApi.updateSupabaseUser(key, value)
    }

    const changeDailyQuestDate = async() => {
        await userApi.updateDailyQuestDate()
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
        return DIFFICULTY_LEVEL.value[findDifficultyLevel]
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
        changeDailyQuestDate
    }
})
