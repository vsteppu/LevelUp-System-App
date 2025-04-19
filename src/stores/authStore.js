import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import userApi from '../api/userApi.js'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const userMetaData = ref(null)
    const errorMessage = ref('')

    const registerUser = async (name, email, password) => {
        const data = {
            name: name,
            level: 1,
            rank: 'unknown',
            specialty: 'unknown',
            daily_quests: false,
            quests: 0,
            achivements: 0,
            chalanges: 0,
            difficulty_level: 'beginner',
        }
        await userApi.registerUser(email, password)
        await userApi.setUserValues(data)
        const response = fetchUser()
        return response
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
            const response = await userApi.getSupabaseUser()
            console.log('response: ', response);

            if (response) {
                user.value = response
                console.log('user.value: ', user.value);
                userMetaData.value = response.user_metadata
                return user
            } else {
                user.value = null
            }
        } catch (error) {
            throw error
        }
    }

    const logIn = async (email, password) => {
        try {
            const response = await userApi.authenticateUser( email, password )
            fetchUser()
            return response
        } catch (err) {
            throw err
        }
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
        userMetaData,

        registerUser,
        logIn,
        addUserValues,
        deleteUser,
        fetchUser,
        updateValues,
    }
})
