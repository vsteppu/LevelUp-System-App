<template>
    <Transition
        enter-active-class="transition-all duration-200 "
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"

        leave-active-class="transition-all duration-200 "
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"

        mode="out-in"
    >
        <slot/>
    </Transition>
</template>    