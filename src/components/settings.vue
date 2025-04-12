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
                class="fixed md:top-0 top-16 right-0 h-full w-[400px] bg-neutral-700 shadow-lg z-9990 flex flex-col p-4"
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
                <div class="flex justify-between items-center my-3">
                    <p>Difficulty Level</p>
                    <Combobox
                        :options="DIFFICULTY"
                        @value:update="updateDifficulty"
                        optionsContainerHeight="max-h-[250px]"
                        :placeholder="user.difficulty_level"
                        :openOnFocus="true"
                        :highlightQuery="true"
                        :defaultValue="user.difficulty_level"
                        :comboBoxWidth="'w-40'"
                        :disableTyping="true"
                        :disableOverflow="true"
                        :inputClasses="'cappitalize'"
                        class="mr-8"
                    />
                </div>
                <button
                    @click="playerStore.toggleSettings()"
                    class="mt-4 px-4 py-2 bg-player-gray rounded"
                >
                    Close
                </button>
            </div>
        </transition>

    </teleport>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import { usePlayerStore } from '../stores/playerStore.js'
import { DIFFICULTY } from '../stores/store'
import Combobox from '../components/combobox.vue'

import XMarkIcon from '@heroicons/vue/24/outline/XMarkIcon.js'

const authStore = useAuthStore()
const playerStore = usePlayerStore()
const { user } = storeToRefs(authStore)
const { showSettings } = storeToRefs(playerStore)

const updateDifficulty = (newValue) => {
    playerStore.changeDifficultyLevel(newValue)
};
</script>
<style>
.slide-enter-active {
    transition: all 0.3s ease-out;
}

.slide-leave-active {
    transition: all 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
