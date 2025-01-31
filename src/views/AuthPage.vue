<template>
  <header class="flex flex-col justify-center items-center">
    <section
      class="flex flex-col justify-center items-center bg-gradient-to-tl from-[#222222] to-neutral-900 p-10 md:rounded-2xl mt-10 ">
      <h1 class="my-2 w-96 uppercase p-2 font-extralight text-xl">Authentication</h1>
      <input type="text" v-model="email" @keyup.enter="signIn()" placeholder="Enter your Email"
        class="my-2 w-96 bg-neutral-800 rounded-md px-4 py-1">
        <div class="flex justify-center items-center w-96">
          <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password" @keyup.enter="signIn()" placeholder="Enter your Password"
          class="my-2 flex flex-grow bg-neutral-800 rounded-l-md px-4 py-1">
          <button @click="togglePasswordVisibiliti" type="button" class="rounded-r-md bg-neutral-800 px-3 py-1" >
            <EyeIcon :fill="isPasswordVisible? '#dc2626' : '#16a34a'"/>
          </button>
        </div>
      <button v-if="registerPage" @click="signUp()"
        class="uppercase p-3 my-3 w-44 bg-neutral-900 shadow-lg shadow-neutral-900 rounded-3xl">
        <p class="pi pi-power-off text-green-600 mr-1"></p>
        register
      </button>
      <button v-if="!registerPage" @click="signIn()"
        class="uppercase p-3 my-3 w-44 bg-neutral-900 shadow-lg shadow-neutral-900 rounded-3xl  ">
        <p class="pi pi-sign-in text-green-600 mr-1"></p>
        login
      </button>
      <button @click="registerPage = !registerPage" class="uppercase p-2 my-3 font-light text-md hover:text-green-600">
        {{ registerPage ? 'Go to login' : 'Go to register' }}
      </button>
      <div class="text-green-600 pb-2 text-2xl font-light flex justify-center items-center">
        {{ authStatus }}
      </div>
      <div class="text-red-600 pb-2 text-2xl font-light flex justify-center items-center">
        {{ message }}
      </div>
    </section>
  </header>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../supabase.js'
import { useAuthStore } from '@/stores/authStore.js';

import EyeIcon from '@/components/icons/eyeIcon.vue'

import router from '@/router/index.js';

const authStore = useAuthStore()

const registerPage = ref(false)
const message = ref('')
const authStatus = ref('')
const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const togglePasswordVisibiliti = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const signUp = async () => {
  try {
    const user = await authStore.registerUser(email, password,)
    if (user.user !== null) {
      authStatus.value = `Account created successfully. Confirm your account by accessing the link sent to you email. Then you can log in`
    }
  } catch (error) {
    message.value = errorCodes[error.code] ?? error.message; // Show Supabase error
  }
}


const signIn = async () => {
  try {
    const user = await authStore.logIn(email, password);

    if (user?.user) {
      authStatus.value = "Login successfully";
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  } catch (error) {
    message.value = errorCodes[error.code] ?? error.message; // Show Supabase error
  }
};

/* const signIn = async () => {
  try{const user = await authStore.logIn(email, password)
  if (user.user !== null){
      authStatus.value = 'Login successfully'
      setTimeout(() => {
          router.push('/')
      }, 2000)
  }}catch(error){
    console.log(error)
    message.value = 'error on log in'
  }
} */
const userStatus = async () => {
  const user = await authStore.getUser(email)
}

onMounted(() => {
  userStatus()
})


</script>
