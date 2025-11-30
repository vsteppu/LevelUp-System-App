import axios from "axios";

const api = import.meta.env.VITE_API_URL || '/api'

const getExercisesAPI = async () => {
    const response = await axios.get(`${api}/get-exercises`)
    return response?.data
}

const postExercisesAPI = async (data) => {
    console.log('data: ', data);
    const response = await axios.post(`${api}/add-exercises`, data)
    return response?.data
}

const deleteExerciseAPI = async (id) => {
    return await axios.delete(`${api}/delete-exercise/${id}`)
}

const deleteAllExercisesAPI = async () => {
    return await axios.delete(`${api}/delete-all-exercises`)
}


export {
    getExercisesAPI,
    postExercisesAPI,
    deleteExerciseAPI,
    deleteAllExercisesAPI
}