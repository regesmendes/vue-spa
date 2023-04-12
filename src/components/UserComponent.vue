<script setup>
import { ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import UserLoginPopup from './UserLoginPopup.vue'

const user = useUserStore()
const userPic = ref()
const showLogin = ref(false)

/**
 * update the user picture
 */
watchEffect(async () => {
    try {
        userPic.value = (await import(/* @vite-ignore */ `@/assets/images/${user.profile.photoFilename}.png`)).default
    } catch (e) {
        // User picture not found, loading the default anonymous picture
        const defaultPic = 'user_pic'
        userPic.value = (await import(/* @vite-ignore */ `@/assets/images/${defaultPic}.png`)).default
    }
})

/**
 * perform the login
 */
const login = () => {
    user.profile.authenticated = true
    user.profile.name = 'Logged'
    showLogin.value = false;
}

/**
 * perform the logout
 */
const logout = () => {
    user.profile.authenticated = false
    user.profile.name = 'Guest'
}
</script>

<template>
    <div class="relative border-r lg:border-l border-gray-800 hover:bg-gray-900 group/usermenu">
        <img :src="userPic" alt="user picture" class="w-5 h-5 my-3 mx-6 cursor-pointer">

        <ul class="invisible group-hover/usermenu:visible absolute left-[-90px] top-full w-full min-w-[10rem] text-gray-700">
            <li class="border border-gray-100 hover:bg-gray-50 px-2 py-1">
                {{ user.profile.name }}
            </li>
            <li v-if="user.profile.authenticated" class="border border-gray-100 hover:bg-gray-50 px-2 py-1 cursor-pointer" @click="logout">
                Logout
            </li>
            <li v-else class="border border-gray-100 hover:bg-gray-50 px-2 py-1 cursor-pointer" @click="showLogin = !showLogin">
                Login
            </li>
        </ul>
    </div>
    <UserLoginPopup v-if="showLogin" @close="showLogin = !showLogin" @login="login"></UserLoginPopup>
</template>
