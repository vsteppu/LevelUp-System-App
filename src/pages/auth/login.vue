<template>
    <div class="flex flex-col gap-2 rounded">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-extralight">Login</h1>
            <logo class="size-6 invert" />
        </div>
        <div>
            <h2 class="text-xl font-thin mb-1">Email</h2>
            <input
                type="text"
                v-model="email"
                placeholder="input your email"
                :class="regularInputs"
            />
        </div>
        <div>
            <h2 class="text-xl font-thin mb-1">Password</h2>
            <input
                type="password"
                v-model="password"
                placeholder="input your password"
                :class="regularInputs"
            />
        </div>
        <button
            @click="loginHandler()"
            :class="[
                ' hover:shadow-violet-800 shadow-xl duration-900 rounded mt-2 font-bold text-white flex items-center justify-center',
            ]"
        >
            <LoadingIcon 
                v-if="loading" 
                class="size-6 my-3"
            />
            <p v-else 
                class="my-3"
            >
                Login
            </p>
        </button>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";
import { regularInputs } from "@/assets/inputs";

import { useAuthStore } from "@/stores/auth.store";

import Logo from "@/assets/icons/logo.vue";
import LoadingIcon from '@/assets/icons/loading.vue'
import GoogleReCaptcha from '@/library/google-recaptcha.vue'
import { useNotificationStore } from "@/stores/notification.store";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const { something, number, boolean, name, user, surname } = defineProps(['something', 'number', 'boolean', 'name', 'user', 'surname']);

const email = ref("vurado@gmail.com");
const password = ref("123456Aa.");
const loading = ref(false);
const test = ref(false);

const loginHandler = async () => {
    loading.value = true;
    try{
        const response = await authStore.loginUser({
            email: email.value,
            password: password.value
        })
        if(response.success) notificationStore.notify("Login was successful","success")
    } catch (err) {
        notificationStore.notify( err.message, "error")
        throw err
    } finally {
        loading.value = false
    }
};

onMounted(() => test.value = true)
</script>
