<script setup>
import { inject } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import { useAppConfigStore } from './stores/appConfig'

/** app setup */
const appName = 'Vue3 SPA'
const appSettings = useAppConfigStore()
const axios = inject('axios')

document.title = appName


/** axios setup */
async function csrfInterceptor(error) {
    if (error.response.status === 419) {
        await axios.get(appSettings.apiRoute('csrf-cookie'))
        return axios(error.response.config)
    }
    return Promise.reject(error)
}

axios.defaults.withCredentials = true
axios.defaults.baseURL = appSettings.api.baseUrl
axios.interceptors.response.use(response => response, csrfInterceptor)
</script>

<template>
    <SiteHeader :appName="appName"></SiteHeader>
    <div class="p-1 mt-16 lg:p-5 lg:mt-10">
        <RouterView />
    </div>
</template>
