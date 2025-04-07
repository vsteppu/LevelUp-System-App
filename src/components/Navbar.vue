<template>
    <nav class="hidden md:flex z-20 justify-between items-center h-16 font-light px-32 bg-neutral-900">
        <router-link to="/" class=" font-bold text-2xl uppercase">Maincharacter</router-link>
        <div class="flex justify-between items-center h-12 w-96 font-light">
            <router-link to="/" class="h-16  flex justify-center items-center uppercase">Daily Quest</router-link>
            <router-link to="/quests" class="h-16  flex justify-center items-center uppercase">Quests</router-link>
            <router-link to="/player" class="h-16  flex justify-center items-center uppercase">Player</router-link>
        </div>
    </nav>
    <router-view></router-view>
</template>
