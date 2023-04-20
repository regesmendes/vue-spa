import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useAppConfigStore } from './appConfig'
import axios from 'axios'

const parseErrors = (error) => {
    return (error.response && error.response.data) ? error.response.data.errors : { message: error.message }
}

const guestUser = {
    name: 'Guest',
    photoFilename: 'user_pic',
}

export const useAuthStore = defineStore('auth', () => {
    const user = reactive({
        authenticated: false,
        data: {...guestUser}
    })
    const errors = ref(null)
    const apiRoute = useAppConfigStore().apiRoute

    const getCsrfToken = async () => {
        errors.value = null
        try {
            await axios.get(apiRoute('csrf-cookie'))
        } catch (error) {
            errors.value = parseErrors(error)
        }
    }

    const getUser = async () => {
        try {
            let data = await axios.get(apiRoute('user-profile'))
            user.authenticated = true
            user.data = data.data
        } catch (error) {
            errors.value = parseErrors(error)
        }
    }

    const login = async (data) => {
        try {
            await axios.post(apiRoute('login'), data)
            await getUser()
        } catch (error) {
            errors.value = parseErrors(error)
        }

    }

    const register = async (data) => {
        try {
            await axios.post(apiRoute('register'), data)
        } catch (error) {
            errors.value = parseErrors(error)
        }
    }

    const logout = async () => {
        try {
            await axios.post(apiRoute('logout'))
            user.authenticated = false
            user.data = {...guestUser}
        } catch (error) {
            errors.value = parseErrors(error)
        }
    }

    const clearErrors = () => {
        errors.value = null
    }

    return {
        user,
        errors,
        getCsrfToken,
        getUser,
        login,
        register,
        logout,
        clearErrors
    }
})