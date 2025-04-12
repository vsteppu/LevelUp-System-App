import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase.js'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
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
                difficulty_level: 'beginner',
            },
        })
    }
    const updateValues = async (value) => {
        const { data } = await supabase.auth.updateUser({
            data: {
                difficulty_level: value,
            },
        })
    }

    const fetchUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()

            if (session?.user) {
                user.value = session.user.user_metadata
                console.log('user.value: ', user.value);
            } else {
                user.value = null
            }
        } catch (error) {
            throw error
        }
    }

    const logIn = async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error
        return data
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
        addUserValues,
        deleteUser,
        fetchUser,
        updateValues,
    }
})
