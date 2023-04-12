<script setup>
import SimpleButton from './SimpleButton.vue'

const emits = defineEmits(['login', 'close'])
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-screen text-gray-700">
        <div class="absolute top-0 left-0 opacity-70 bg-gray-800 w-full h-screen" @click="emits('close')"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-80 border rounded bg-white">
            <h1 class="text-center py-4 text-3xl font-bold">Login</h1>
            <div class="w-full px-3 flex flex-col">
                <label for="usernameInput">Username</label>
                <input type="email" name="username" id="usernameIput" value="" class="bg-gray-200 rounded-md px-2 h-9">
            </div>
            <div class="w-full px-3 flex flex-col mt-5">
                <label for="passwordInput">Password</label>
                <input type="password" name="password" id="passwordIput" value="" class="bg-gray-200 rounded-md px-2 h-9">
            </div>
            <div class="w-full px-3 flex mt-8">
                <SimpleButton text="Login" @click="emits('login')"></SimpleButton>
                <SimpleButton text="Cancel" @click="emits('close')"></SimpleButton>
            </div>
        </div>
    </div>
</template>
