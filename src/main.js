import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/main.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const app = Vue.createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(VueAxios, axios)
    .use(router)
    .provide('axios', app.config.globalProperties.axios)
    .mount('#app')
