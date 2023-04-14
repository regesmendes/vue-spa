import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfig', () => {
    const loadingScreen = ref({
        loading: false,
        label: 'Loading...',
        locked: false,
    })

    return {
        loadingScreen
    }
})
