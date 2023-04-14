<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'

const appName = 'Vue3 SPA'
</script>

<template>
    <SiteHeader :appName="appName"></SiteHeader>
    <div class="p-1 mt-16 lg:p-5 lg:mt-10">
        <RouterView />
    </div>
</template>
