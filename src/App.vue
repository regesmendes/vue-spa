<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'

const appName = 'Vue3 SPA'
</script>

<template>
    <SiteHeader :appName="appName"></SiteHeader>
    <div class="mt-[80px]">
        <RouterView />
    </div>
</template>
