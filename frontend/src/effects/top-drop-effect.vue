<template>
    <Transition
        enter-active-class="ease-in-out duration-500 transform"
        enter-from-class="-top-20 -translate-y-full"
        enter-to-class="-top-0 translate-y-0"

        leave-active-class="ease-in-out duration-500 transform"
        leave-from-class="translate-y-0 -top-0 "
        leave-to-class="-translate-y-full -top-20"

        mode="out-in"
    >
        <slot class=""/>
    </Transition>
</template>
