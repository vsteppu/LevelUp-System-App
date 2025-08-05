import { supabase, supabaseAdmin } from "@/supabase";
import { monitorDate } from "@/stores/helpers";

const registerUser = async (email, password) => {
    const response = await supabase.auth.signUp({ email, password })
    if (response.error) throw response.error
    return response?.data
}

const setUserValues = async (data) => {
    const response = await supabase.auth.updateUser({ data })
    if (response.error) throw response.error
    return response?.data
}

const authenticateUser = async(email, password) => {
    const response = await supabase.auth.signInWithPassword({ email, password })
    if (response.error) throw response.error
    return response
}

const getSupabaseUser = async() => {
    const response = await supabase.auth.getUser()
    return response
}

const getSupabaseSession = async() => {
    const response = await supabase.auth.getSession()
    if (response.error) throw response.error
    return response.data?.session
}

const updateSupabaseUser = async(key, value) => {
    const response = await supabase.auth.updateUser({ data:{[key]: value}})
    if (response.error) throw response.error
    return response?.data?.user
}

const updateDailyQuestDate = async() => {
    const response = await supabase.auth.updateUser({ data:{daily_quest_date: monitorDate()}})
    if (response.error) throw response.error
    return response?.data?.user
}


const signOutUser = async() => {
    const response = await supabase.auth.signOut()
    return response
}

const deleteUserById = async(userId) => {
    const response = await supabaseAdmin.auth.admin.deleteUser(userId)
    return response.error
}

export default {
    registerUser,
    setUserValues,
    authenticateUser,
    getSupabaseUser,
    getSupabaseSession,
    updateSupabaseUser,
    signOutUser,
    deleteUserById,
    updateDailyQuestDate,
}
