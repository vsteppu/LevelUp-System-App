<template>
    <div
        v-if="loading"
        class="bg-neutral-950 w-full top-16 bottom-0 absolute z-10 flex justify-center items-center"
    >
        <p class="pi pi-spin pi-spinner text-7xl text-neutral-500 absolute"></p>
    </div>
    <!-- <PlayerInfo/>-->


    <main
        class="flex md:justify-center md:items-center flex-col bg-gradient-to-tl from-player-gray to-neutral-900 bg-player-gray md:mx-40 relative"
    >
        <div
            class="bg-neutral-800 shadow-lg shadow-neutral-950 md:w-96 mx-5 h-20 my-5 flex justify-center items-center font-light uppercase text-2xl"
        >
            <p class="pi pi-user"></p>
            player information
        </div>
        <div
            v-if="setName === undefined"
            class="font-light flex md:px-0 px-6 justify-between md:w-[450px]"
        >
            <input
                v-model="playerName"
                @keyup.enter="setUserValues(playerName)"
                placeholder="type your name"
                class="my-9 flex flex-grow mr-[2px] w-44 bg-neutral-700 px-4 py-1"
            />
            <button @click="setUserValues(playerName)" class="my-9 flex bg-neutral-700 px-2 py-1">
                Confirm
            </button>
        </div>
        <p
            v-if="setName === undefined"
            class="text-green-600 text-xl mb-9 font-light flex justify-center items-center"
        >
            Type your name in the field to start the game
        </p>
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
                            @click="authStore.addValues()"
                            class="w-40 h-12 bg-neutral-800 border-[1px] border-neutral-900"
                        >
                            Cancel
                        </button>
                        <button
                            @click="deleteUser()"
                            class="w-40 h-12 bg-red-700 border-[1px] border-red-300 text-red-300"
                        >
                            <p class="pi pi-trash mr-2"></p>
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
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { supabase, supabaseAdmin } from '../supabase.js'
import { useAuthStore } from '@/stores/authStore.js'

import router from '@/router/index.js'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const playerInfo = ref({})
const playerName = ref('')

const loading = ref(true)
const setName = ref('')
const userId = ref('')
const message = ref('')
const deleteAccountPopup = ref(false)

const setUserValues = async () => {
    if (user.value.name === undefined) {
        await authStore.addUserValues(playerName)
    }
    setName.value = false
    router.push('/')
}

const userStatus = async () => {
    playerInfo.value = [
        {
            key: 'Player name',
            value: user.value.name
        },
        {
            key: 'Player level',
            value: user.value.level
        },
        {
            key: 'Player rank',
            value: user.value.rank
        },
        {
            key: 'Player specialty',
            value: user.value.specialty
        },
        {
            key: 'Player achivements',
            value: user.value.achivements
        },
        {
            key: 'Daily quests',
            value: user.value.daily_quests
        }
    ]
}

const deleteUser = async () => {
    //const user = await authStore.deleteUser()

    console.log('user: ', user);
    userId.value = user.identities[0].user_id
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId.value)
    if (error) {
        message.value = error.message
    } else {
        deleteAccountPopup.value = false
        message.value = `Player deleted successfully`
        setTimeout(() => {
            router.push('/auth')
        }, 3000)
    }
}

const logOut = async () => {
    let { error } = await supabase.auth.signOut()
    router.push('/auth')
}

onMounted(async() => {
    if(user !== null){
            userStatus()
            loading.value = false
        }
    }
)
</script>
