<template>
    <div
        v-if="loading"
        class="bg-neutral-950 w-full top-16 bottom-0 absolute z-10 flex justify-center items-center"
    >
        <p class="pi pi-spin pi-spinner text-7xl text-neutral-500 absolute"></p>
    </div>
    <main
        class="flex md:justify-center md:items-center flex-col bg-gradient-to-tl from-player-gray to-neutral-900 bg-player-gray md:mx-40 relative"
    >
        <div
            class="bg-neutral-800 shadow-lg shadow-neutral-950 md:w-96 mx-5 h-20 my-5 flex justify-center items-center font-light uppercase text-2xl"
        >
            <p class="pi pi-userMetaData"></p>
            player information
        </div>
        <div
            v-for="item in playerInfo"
            class="flex md:justify-between justify-between my-4 w-full md:w-[650px] md:px-2 px-6 text-xl md:text-xl uppercase"
        >
            <p class="font-light">{{ item.key }}</p>
            <div class="font-bold">
                {{ item.value }}
            </div>
        </div>
        <hr class="md:w-[650px] w-full border-neutral-600" />
        <section class="my-6 md:pl-0 mx-auto flex flex-col">
            <button
                @click="logOut()"
                class="uppercase py-4 mb-4 bg-neutral-800 shadow-lg shadow-neutral-950"
            >
                <p class="pi pi-sign-out mr-1"></p>
                logout
            </button>
            <button @click="deleteAccountPopup = true" class="uppercase p-1 font-light text-sm">
                delete player
            </button>
        </section>
        <teleport to="body">
            <transition name="slide-in" mode="out-in">
                <div
                    v-if="deleteAccountPopup"
                    class="flex items-center justify-center flex-col shadow-lg shadow-neutral-950 bg-neutral-900 fixed top-1/3 left-1/2 md:w-[600px] w-full h-[250px] md:rounded-lg transform -translate-x-1/2 -translate-y-1/3"
                >
                    <p class="uppercase text-xl mx-5 pb-8">
                        Are you sure you want to delete account?
                    </p>
                    <div class="flex items-center justify-around w-full px-9 text-lg pb-4">
                        <button
                            @click="deleteAccountPopup = false"
                            class="w-40 h-12 bg-neutral-800 border-[1px] border-neutral-900"
                        >
                            Cancel
                        </button>
                        <button
                            @click="deleteUser()"
                            class="flex justify-center items-center w-40 h-12 bg-neutral-800 border-[1px] border-neutral-900 hover:text-red-700"
                        >
                            <TrashIcon class="size-6 mr-3"/>
                            Delete
                        </button>
                    </div>
                </div>
            </transition>
        </teleport>
        <span class="text-green-600 uppercase">{{ message }}</span>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { supabase, supabaseAdmin } from '../supabase.js'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/authStore.js'

import TrashIcon from '@heroicons/vue/24/outline/TrashIcon.js'

const authStore = useAuthStore()

const { user, userMetaData } = storeToRefs(authStore)

const playerInfo = ref({})
const playerName = ref('')

console.log('playerInfo: ', playerInfo.value);


const loading = ref(true)
const setName = ref('')
const message = ref('')
const deleteAccountPopup = ref(false)

const setUserValues = async () => {
    if (userMetaData.value.name === undefined) {
        await authStore.addUserValues(playerName)
    }
    setName.value = false
    router.push('/')
}

const userStatus = async () => {
    playerInfo.value = [
        {
            key: 'Player name',
            value: userMetaData.value?.name
        },
        {
            key: 'Player email',
            value: userMetaData.value?.email
        },
        {
            key: 'Player level',
            value: userMetaData.value?.level
        },
        {
            key: 'Player rank',
            value: userMetaData.value?.rank
        },
        {
            key: 'Player specialty',
            value: userMetaData.value?.specialty
        },
        {
            key: 'Player achivements',
            value: userMetaData.value?.achivements
        },
        {
            key: 'Daily quests completed',
            value: userMetaData.value?.daily_quests
        }
    ]
}

const deleteUser = async () => {
    //const userMetaData = await authStore.deleteUser()
    const userId = user.value.id
    //const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    const response = await authStore.deleteUser(userId)
    if (response) {
        message.value = error.message
    } else {
        deleteAccountPopup.value = false
        message.value = `Player deleted successfully`
        setTimeout(() => {
            router.push('/login')
        }, 3000)
    }
}

const logOut = async () => {
    let { error } = await authStore.signOut()
    if (error === null) router.push('/login')
}

onMounted(async() => {
    if(userMetaData !== null){
            userStatus()
            loading.value = false
        }
    }
)
</script>
