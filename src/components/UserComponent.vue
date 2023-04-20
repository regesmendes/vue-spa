<script setup>
import { ref, watchEffect } from 'vue'
import { useAppConfigStore } from '../stores/appConfig';
import { useAuthStore } from '../stores/auth';
import UserLoginPopup from './UserLoginPopup.vue'

const loadingScreen = useAppConfigStore().loadingScreen
const auth = useAuthStore()
const userPic = ref()
const showLogin = ref(false)

/**
 * update the user picture
 */
watchEffect(async () => {
    try {
        userPic.value = (await import(/* @vite-ignore */ `@/assets/images/${auth.user.data.photoFilename}.png`)).default
    } catch (e) {
        // User picture not found, loading the default anonymous picture
        const defaultPic = 'user_pic'
        userPic.value = (await import(/* @vite-ignore */ `@/assets/images/${defaultPic}.png`)).default
    }
})

/**
 * perform the logout
 */
const logout = async () => {
    loadingScreen.locked = true
    loadingScreen.loading = true

    await auth.logout()
    loadingScreen.loading = false
}
</script>

<template>
    <div class="relative border-r lg:border-l border-gray-800 hover:bg-gray-900 group/usermenu">
        <img :src="userPic" alt="user picture" class="w-5 h-5 my-3 mx-6 cursor-pointer group/usermenu">

        <ul class="invisible group-hover/usermenu:visible absolute left-[-90px] top-full w-full min-w-[10rem] text-gray-700 bg-white z-50">
            <li class="border border-gray-100 hover:bg-gray-50 bg-white px-2 py-1">
                {{ auth.user.data.name }}
            </li>
            <li v-if="auth.user.authenticated" class="border border-gray-100 hover:bg-gray-50 bg-white px-2 py-1 cursor-pointer" @click="logout">
                Logout
            </li>
            <li v-else class="border border-gray-100 hover:bg-gray-50 bg-white px-2 py-1 cursor-pointer" @click="showLogin = !showLogin">
                Login
            </li>
        </ul>
    </div>
    <UserLoginPopup v-if="showLogin" @close="showLogin = false"></UserLoginPopup>
</template>
