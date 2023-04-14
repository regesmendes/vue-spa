<script setup>
import { ref, inject } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAppConfigStore } from '@/stores/appConfig'
import SimpleButton from './SimpleButton.vue'

const axios = inject('axios')
const user = useUserStore()
const form = ref({
    email: null,
    password: null,
    name: null,
    confirmPassword: null,
    errors: []
})
const mode = ref('login')
const emits = defineEmits(['close'])
const loadingScreen = useAppConfigStore().loadingScreen

async function getCsrfCookie() {
    axios.get('/sanctum/csrf-cookie');
}

async function getUser() {
    let { data } = await axios.get('/api/user')

    user.profile.authenticated = true
    user.profile.name = data.name
}

async function login(e) {
    e.preventDefault()
    loadingScreen.locked = true
    loadingScreen.loading = true
    form.value.errors = []

    let url = '/login'
    let data = {
        email: form.value.email,
        password: form.value.password
    }
    if (mode.value === 'register') {
        url = '/register'
        data.name = form.value.name
        data.password_confirmation = form.value.confirmPassword
    }

    try {
        await axios.post(url, data)
        await getUser()
        emits('close')
    } catch (error) {
        form.value.errors = error.response.data.errors ?? { message: error.message }
    }
    loadingScreen.loading = false
    return false
}

getCsrfCookie()
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-screen text-gray-700">
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
                    <label for="nameInput">Name<i :class="{'text-red-500':form.errors.name}">*</i></label>
                    <input type="text" name="name" id="nameIput" v-model="form.name" class="rounded-md px-2 h-9" :class="[form.errors.name ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="form.errors.name" class="text-red-500">{{ form.errors.name.join('<br>') }}</span>
                </div>

                <div class="w-full px-3 flex flex-col mt-5">
                    <label for="usernameInput">Username<i :class="{'text-red-500':form.errors.email}">*</i></label>
                    <input type="email" name="username" id="usernameIput" v-model="form.email" class="rounded-md px-2 h-9" :class="[form.errors.email ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="form.errors.email" class="text-red-500">{{ form.errors.email.join('<br>') }}</span>
                </div>

                <div class="w-full px-3 flex flex-col mt-5">
                    <label for="passwordInput">Password<i :class="{'text-red-500':form.errors.password}">*</i></label>
                    <input type="password" name="password" id="passwordIput" v-model="form.password" class="rounded-md px-2 h-9" :class="[form.errors.password ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="form.errors.password" class="text-red-500">{{ form.errors.password.join('<br>') }}</span>
                </div>

                <div v-if="mode === 'register'" class="w-full px-3 flex flex-col mt-5">
                    <label for="confirmPasswordInput">Confirm Password<i :class="{'text-red-500':form.errors.confirmPassword}">*</i></label>
                    <input type="password" name="confirmPassword" id="confirmPasswordIput" v-model="form.confirmPassword" class="rounded-md px-2 h-9" :class="[form.errors.confirmPassword ? 'bg-red-100' : 'bg-gray-200']" required>
                    <span v-if="form.errors.confirmPassword" class="text-red-500">{{ form.errors.confirmPassword.join('<br>') }}</span>
                </div>

                <span v-if="form.errors.message" class="text-red-500">{{ form.errors.message }}</span>
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
