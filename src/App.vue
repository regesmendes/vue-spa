<script setup>
import { inject, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import { useAppConfigStore } from './stores/appConfig'
import { useAuthStore } from './stores/auth';
import Cookies from 'js-cookie'

/** app setup */
const appName = 'Vue3 SPA'
const appSettings = useAppConfigStore()
const auth = useAuthStore()
const axios = inject('axios')

document.title = appName


/** axios setup */
async function csrfInterceptor(error) {
    if (error.response.status === 419 || error.response.status === 401) {
        await axios.get(appSettings.apiRoute('csrf-cookie'))
        error.response.config.headers['laravel-session'] = Cookies.get('laravel-session');
        error.response.config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
        return axios(error.response.config)
    }
    return Promise.reject(error)
}

axios.defaults.withCredentials = true
axios.defaults.baseURL = appSettings.api.baseUrl
axios.interceptors.request.use(config => {
    config.headers['laravel-session'] = Cookies.get('laravel-session')
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    return config
})
axios.interceptors.response.use(response => response, csrfInterceptor)

onMounted(() => {
    auth.getUser()
});
</script>

<template>
    <SiteHeader :appName="appName"></SiteHeader>
    <div class="p-1 mt-16 lg:p-5 lg:mt-10">
        <RouterView />
    </div>
</template>
