import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import userApi from '../api/userApi.js'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const userMetaData = ref(null)
    const errorMessage = ref('')

    const registerUser = async (email, password) => {
        await userApi.registerUser(email, password)
        fetchUser()
    }

    const createUser = async (playerName, playerSurname) => {
        const data = {
            name: playerName,
            surname: playerSurname,
            level: 1,
            rank: 'unknown',
            specialty: 'unknown',
            daily_quests: false,
            quests: 0,
            achivements: 0,
            chalanges: 0,
            difficulty_level: 'beginner'
        }
        await userApi.setUserValues(data)
        fetchUser()
    }

    const fetchUser = async () => {
        const {data, error} = await userApi.getSupabaseUser()

        if (data.user && error === null) {
            user.value = data.user
            userMetaData.value = user.value.user_metadata
        } else {
            user.value = null
        }
    }

    const logIn = async (email, password) => {
        const response = await userApi.authenticateUser(email, password)
        fetchUser()
        return response
    }

    const signOut = async (email, password) => {
        const response = await userApi.signOutUser(email, password)
        return response
    }

    const deleteUser = async (userId) => {
        console.log('userId: ', userId);
        try {
            const response = await userApi.deleteUserById(userId)
            if (response) {
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
        signOut,
        createUser,
        deleteUser,
        fetchUser,
    }
})
