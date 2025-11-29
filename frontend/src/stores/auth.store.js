import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/api/auth-api";
import { useAuthState } from "@/composables/auth";
import { useGoogleToken } from "@/stores/recaptcha.js";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore',()=>{
    const googleToken = useGoogleToken()
    const router = useRouter()
    const { getUser, isAuthenticated } = useAuthState()

    const user = ref(getUser() || null)
    const authenticated = ref(isAuthenticated() || false)

    const registerUser = async (user) => {
        const token = await googleToken.getToken();
        const { email, password } = user

        const response = await loginAPI({ email, password, token });
        if (response.success) router.push({ path: "/" });
        return response;
    }

    const loginUser = async (data) => {
        const token = await googleToken.getToken();

        const { email, password } = data
        alert(`
            email:${email}
            token:${token}
            `)

        const response = await loginAPI({ email, password, token });

        if (response.success) {
            authenticated.value = true
            user.value = response?.user
            router.push({ path: "/" })
        }
        return response;
    }

    const logoutUser = () => {
        localStorage.removeItem('user')
        router.push({name: 'auth-page'})

    }

    return {
        user,
        authenticated,
        loginUser,
        registerUser,
        logoutUser,
    };
})