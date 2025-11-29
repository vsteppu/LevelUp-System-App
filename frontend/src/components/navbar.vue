
<template>
    <div 
        :class="[
            isMobile ? 'px-8' : 'px-20',
            'w-full fixed py-3 flex justify-between'
        ]"
    >
        <Logo 
            class="size-8 invert"
        />
        <div 
            v-if="authenticated && !isMobile"
            class="font-thin text-2xl flex items-center gap-10"
        >
            <router-link 
                :to="{ name: 'home' }"
            >
                Home
            </router-link>
            <router-link 
                :to="{ name: 'progress' }"
            >
                Progress
            </router-link>
            <button
                @click="logout"
            >
                <ArrowRightStartOnRectangleIcon class="size-6 cursor-pointer"/>
            </button>
        </div>
        <div v-else>
            <FadeEffect>
                <XMarkIcon
                    v-if="show"
                    @click="show = !show"
                    class="size-6 cursor-pointer"
                />
                <Bars2Icon
                    v-else
                    @click="show = !show"
                    class="size-6 cursor-pointer"
                />
            </FadeEffect>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";

import Logo from '@/assets/icons/logo.vue'
import { ArrowRightStartOnRectangleIcon, Bars2Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from "pinia";
import FadeEffect from '@/effects/fade-effect.vue'
import { useIsMobile } from "@/composables/is-mobile.js";
import { ref } from "vue";

const authStore = useAuthStore();
const { isMobile } = useIsMobile();
const { authenticated } = storeToRefs(authStore)
console.log('isMobile: ', isMobile.value);
const show = ref(false)

const logout = async () => {
    authStore.logoutUser()
    authenticated.value = false
}

</script>