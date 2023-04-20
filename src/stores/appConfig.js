import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', () => {
    const loadingScreen = reactive({
        loading: false,
        label: 'Loading...',
        locked: false,
    })

    const api = reactive({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        routes: [{
            name: 'csrf-cookie',
            path: '/sanctum/csrf-cookie'
        }, {
            name: 'user-profile',
            path: '/api/user'
        }, {
            name: 'login',
            path: '/login'
        }, {
            name: 'register',
            path: '/register'
        }, {
            name: 'logout',
            path: '/logout'
        }]
    })

    const apiRoute = (routeName, params = {}) => {
        let route = api.routes.filter(r => r.name === routeName)
        if (route.length && typeof params === 'object') {
            Object.getOwnPropertyNames(params).forEach(param => route[0].path = route[0].path.replace('{' + param + '}', params[param]))
        }
        return route.length ? route[0].path : null
    }

    return {
        loadingScreen,
        api,
        apiRoute
    }
})
