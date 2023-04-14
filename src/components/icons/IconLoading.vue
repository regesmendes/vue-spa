<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFan } from '@fortawesome/free-solid-svg-icons'
import { useAppConfigStore } from '@/stores/appConfig'

const loadingScreen = useAppConfigStore().loadingScreen
library.add(faFan)
</script>

<template>
    <div v-if="loadingScreen.loading && loadingScreen.locked" class="absolute top-0 left-0 w-full h-screen z-900 bg-gray-500 opacity-50"></div>
    <div v-if="loadingScreen.loading" class="absolute top-full w-full flex">
        <div class="icon-loading m-auto border rounded bg-white px-10 py-2">
            <font-awesome-icon :icon="['fas', 'fan']" size="2xl" class="animate-spin" />
            <span class="ml-1">{{ loadingScreen.label }}</span>
        </div>
    </div>
</template>