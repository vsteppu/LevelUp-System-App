import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DAILY_EXERCISE } from '../stores/store'
import { useAuthState } from "@/composables/auth";
import { deleteAllExercisesAPI, deleteExerciseAPI, getExercisesAPI, postExercisesAPI } from "@/api/exercises-api";

export const useExerciseStore = defineStore( "exercise-store", () => {
    const { getUser } = useAuthState()
    const user = getUser()

    const workoutHistory = ref(null)

    const fetchDailyExercises = async() => {
        try{
            const response = await getExercisesAPI()
            workoutHistory.value = response?.exercises
            return workoutHistory.value
        } catch (err) {
            throw err
        }
    }

    const addDailyExercises = async(exercises) => {
        try{
            const data = { user_id: user.id, exercises }

            return await postExercisesAPI(data)
        } catch (err) {
            throw err
        }
    }

    const deleteDailyExercise = async() => {
        const id = 11
        try{
            await deleteExerciseAPI(id)
        } catch (err) {
            throw err
        }
    }

    const deleteAllDailyExercises = async() => {
        try{
            await deleteAllExercisesAPI()
        } catch (err) {
            throw err
        }
    }

    return {
        workoutHistory,
        
        fetchDailyExercises,
        addDailyExercises,
        deleteDailyExercise,
        deleteAllDailyExercises,
    }
})