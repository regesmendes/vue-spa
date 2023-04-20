<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppConfigStore } from '@/stores/appConfig'
import SimpleButton from './SimpleButton.vue'

const auth = useAuthStore()
const form = reactive({
    email: null,
    password: null,
    name: null,
    confirmPassword: null,
})
const mode = ref('login')
const emits = defineEmits(['close'])
const loadingScreen = useAppConfigStore().loadingScreen

async function login(e) {
    e.preventDefault()
    loadingScreen.locked = true
    loadingScreen.loading = true
    auth.clearErrors()

    let data = {
        email: form.email ?? null,
        password: form.password,
        name: form.name,
        password_confirmation: form.confirmPassword,
    }

    try {
        if (mode.value === 'login') {
            await auth.login(data)
        } else {
            await auth.register(data)
        }

        if (!auth.errors) {
            emits('close')
        }
    } catch (error) {
        console.log(error)
    }
    loadingScreen.loading = false
    return false
}
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-screen text-gray-700" v-cloak>
        <div class="absolute top-0 left-0 opacity-70 bg-gray-800 w-full h-screen" @click="emits('close')"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 border rounded bg-white">
            <div v-if="mode === 'login'">
                <h1 class="text-center py-4 text-3xl font-bold">Login</h1>
            </div>
            <div v-else>
                <h1 class="text-center py-4 text-3xl font-bold">Register</h1>
            </div>

            <form @submit="login" method="POST">

                <div v-if="mode === 'register'" class="w-full px-3 flex flex-col">
                    <label for="nameInput">Name<i :class="{'text-red-500':auth.errors && auth.errors.name}">*</i></label>
                    <input type="text" name="name" id="nameIput" v-model="form.name" class="rounded-md px-2 h-9" :class="[auth.errors && auth.errors.name ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="auth.errors && auth.errors.name" class="text-red-500">{{ auth.errors && auth.errors.name.join('<br>') }}</span>
                </div>

                <div class="w-full px-3 flex flex-col mt-5">
                    <label for="usernameInput">Username<i :class="{'text-red-500':auth.errors && auth.errors.email}">*</i></label>
                    <input type="email" name="username" id="usernameIput" v-model="form.email" class="rounded-md px-2 h-9" :class="[auth.errors && auth.errors.email ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="auth.errors && auth.errors.email" class="text-red-500">{{ auth.errors && auth.errors.email.join('<br>') }}</span>
                </div>

                <div class="w-full px-3 flex flex-col mt-5">
                    <label for="passwordInput">Password<i :class="{'text-red-500':auth.errors && auth.errors.password}">*</i></label>
                    <input type="password" name="password" id="passwordIput" v-model="form.password" class="rounded-md px-2 h-9" :class="[auth.errors && auth.errors.password ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="auth.errors && auth.errors.password" class="text-red-500">{{ auth.errors && auth.errors.password.join('<br>') }}</span>
                </div>

                <div v-if="mode === 'register'" class="w-full px-3 flex flex-col mt-5">
                    <label for="confirmPasswordInput">Confirm Password<i :class="{'text-red-500':auth.errors && auth.errors.confirmPassword}">*</i></label>
                    <input type="password" name="confirmPassword" id="confirmPasswordIput" v-model="form.confirmPassword" class="rounded-md px-2 h-9" :class="[auth.errors && auth.errors.confirmPassword ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="auth.errors && auth.errors.confirmPassword" class="text-red-500">{{ auth.errors && auth.errors.confirmPassword.join('<br>') }}</span>
                </div>

                <span v-if="auth.errors && auth.errors.message" class="text-red-500">{{ auth.errors && auth.errors.message }}</span>
                <div class="w-full px-3 flex my-8">
                    <SimpleButton v-if="mode === 'login'" text="Login"></SimpleButton>
                    <SimpleButton v-else text="Create"></SimpleButton>
                    <SimpleButton text="Cancel" @click="emits('close')"></SimpleButton>
                </div>
            </form>
            <div v-if="mode === 'login'" @click="mode = 'register'" class="p-2 text-sm cursor-pointer">Register a new user</div>
            <div v-else @click="mode = 'login'" class="p-2 text-sm cursor-pointer">Login with an existing user</div>
        </div>
    </div>
</template>
