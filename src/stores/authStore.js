import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { supabase } from '../supabase.js'
import router from '@/router/index.js'
import { errorCodes } from '../stores/helpers.js'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) ?? null)
    const errorMessage = ref('')

    const registerUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })
        return data
    }
    const addUserValues = async (playerName) => {
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
            },
        })
    }

    const logIn = async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        return data
    }

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        return user
    }

    const deleteUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        const userId = user.id
        try {
            const { error } = await supabase.auth.admin.deleteUser(userId)
            if (error) {
                console.error('Error deleting user:', error.message)
            } else {
                console.log(`User with ID ${userId} deleted successfully.`)
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
    }

    return {
        user,
        registerUser,
        logIn,
        getUser,
        addUserValues,
        deleteUser,
    }
})
