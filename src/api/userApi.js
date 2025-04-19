import { supabase } from "@/supabase";

const registerUser = async (email, password) => {
    const response = await supabase.auth.signUp({ email, password })
    return response.data
}

const setUserValues = async (data) => {
    console.log('playerName: ', data);
    const response = await supabase.auth.updateUser({ data })
    return response.data
}

const authenticateUser = async(email, password) => {
    const response = await supabase.auth.signInWithPassword({ email, password })
    return response.data
}

const getSupabaseUser = async() => {
    const response = await supabase.auth.getUser()
    return response.data.user
}

const getSupabaseSession = async() => {
    const response = await supabase.auth.getSession()
    return response.data.session
}

const updateSupabaseUser = async(key, value) => {
    const response = await supabase.auth.updateUser({ data:{[key]: value}})
    return response.data.user
}

export default {
    registerUser,
    setUserValues,
    authenticateUser,
    getSupabaseUser,
    getSupabaseSession,
    updateSupabaseUser,
}
