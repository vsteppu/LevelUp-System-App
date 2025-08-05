<template>
    <teleport to="body">
        <div
            v-if="showSettings"
            class="absolute inset-0 bg-black bg-opacity-50"
            @click="playerStore.toggleSettings()"
        />
        <transition
            name="slide"
        >
            <div
                v-if="showSettings"
                class="fixed md:top-0 top-16 right-0 h-full md:w-[400px] w-full bg-neutral-900 shadow-lg z-9990 flex flex-col p-4"
            >
                <div
                    class="flex justify-between items-center"
                >
                    <h2
                        class="text-xl font-bold"
                    >
                        Settings
                    </h2>
                    <XMarkIcon
                        @click="playerStore.toggleSettings()"
                        class="size-6"
                    />
                </div>
                <div class="flex md:flex-row flex-col md:justify-between justify-start md:items-center my-3">
                    <p class="">Difficulty Level</p>
                    <Combobox
                        :options="DIFFICULTY"
                        @value:update="updateDifficulty"
                        optionsContainerHeight="max-h-[250px]"
                        :placeholder="userMetaData?.difficulty_level"
                        :openOnFocus="true"
                        :highlightQuery="true"
                        :defaultValue="userMetaData?.difficulty_level"
                        :comboBoxWidth="'md:w-40 w-full'"
                        :disableTyping="true"
                        :disableOverflow="true"
                        :inputClasses="'cappitalize'"
                        class="md:mx-8 mt-3"
                    />
                </div>
                <button
                    @click="playerStore.toggleSettings()"
                    class=" mb-24 mt-auto px-4 py-2 bg-player-gray rounded shadow-lg shadow-neutral-950"
                >
                    Save settings
                </button>
            </div>
        </transition>

    </teleport>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import { usePlayerStore } from '../stores/playerStore.js'
import { DIFFICULTY } from '../stores/store'
import Combobox from '../components/combobox.vue'

import '../assets/right-slide.css'
import XMarkIcon from '@heroicons/vue/24/outline/XMarkIcon.js'

const authStore = useAuthStore()
const playerStore = usePlayerStore()
const { userMetaData } = storeToRefs(authStore)
const { showSettings } = storeToRefs(playerStore)

const updateDifficulty = (newValue) => {
    playerStore.changeDifficultyLevel(newValue)
};
</script>
