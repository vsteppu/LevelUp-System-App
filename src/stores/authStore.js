import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { supabase } from '../supabase.js'
import router from '@/router/index.js'


export const useAuthStore = defineStore('authStore', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) ?? null)
  const errorMessage = ref('')

  const registerUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      return data
    } catch (err) {
      console.log(err.message)
    }
  }
  const addUserValues = async(playerName) => {
    const { data } = await supabase.auth.updateUser({
      data: {
        name: playerName.value,
        level: 1,
        rank: 'unknown',
        specialty: 'unknown',
        daily_quests: false,
        quests: 0,
        achivements: 0,
        chalanges: 0,
       }})
  }

  const logIn = async (email, password) => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (data !== null) {
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
      return data
    } catch (err) {
      console.log(err.message)
    }
  }

  const getUser = async () => {
    const {data: { user }} = await supabase.auth.getUser()
    return user
  }

  return {
    user,
    registerUser,
    logIn,
    getUser,
    addUserValues,
  }
})
