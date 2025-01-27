<template>
  <header class="flex flex-col justify-center items-center">
    <section class="flex flex-col justify-center items-center">
      <h1 class="my-2 w-96 uppercase p-2 font-extralight text-xl">Authentication</h1>
      <input type="text" v-model="email" placeholder="Email" class="my-2 w-96 bg-slate-800 px-4 py-1">
      <input type="text" v-model="password" placeholder="Password" class="my-2 w-96 bg-slate-800 px-4 py-1">
      <button v-if="registerPage" @click="signUp()" class="uppercase p-4 bg-slate-800">register</button>
      <button v-if="!registerPage" @click="signIn()" class="uppercase p-4 bg-slate-800">login</button>
      <button @click="registerPage = !registerPage" class="uppercase p-2 my-3 font-extralight text-xs">
        {{ registerPage? 'Go to login':'Go to register'}}
      </button>
    </section>
    <div class="text-green-600 text-shadow-green pb-2 text-2xl font-light flex justify-center items-center">
      {{ authStatus }}
    </div>
  </header>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '../supabase.js'
import { useAuthStore } from '@/stores/authStore.js';

import router from '@/router/index.js';

const authStore = useAuthStore()

const registerPage = ref(false)
const user = ref(null)
const authStatus = ref('')

const email = ref('shtepuvlad@gmail.com')
const password = ref('123456Aa.')

const signUp = async () => {
  const user = await authStore.registerUser(email, password, name)
  authStatus.value = 'Account created successfully'
}

const signIn = async () => {
  const user = await authStore.logIn(email, password)
  authStatus.value = 'Login successfully'
}
const userStatus = async () => {
  const user = await authStore.getUser(email)
  console.log(user)
}

onMounted(()=>{
  userStatus()
})


</script>
