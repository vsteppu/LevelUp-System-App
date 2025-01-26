import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { supabase } from '../supabase.js'
import router from '@/router/index.js'
import { useAuthStore } from './authStore.js'


export const usePlayerStore = defineStore('store', () => {
  const authStore = useAuthStore()

  const levelUp = async() => {
    const user = await authStore.getUser()
    if(user.user_metadata.level === undefined || user.user_metadata.level === null){
      const { data } = await supabase.auth.updateUser({
        data: { level: 1 }
      })
    }
    let level = user.user_metadata.level
    level++
    const { data } = await supabase.auth.updateUser({
      data: { level: level }
    })
    console.log(level)
  }

  const completeDailyQuest = async() => {
    const { data } = await supabase.auth.updateUser({
      data: { daily_quests: true }
    })
  }
  const resetDailyQuest = async() => {
    const { data } = await supabase.auth.updateUser({
      data: { daily_quests: false }
    })
  }

  return {levelUp, completeDailyQuest, resetDailyQuest}
})
