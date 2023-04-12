import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const profile = ref({
        authenticated: false,
        name: 'Guest',
        photoFilename: 'user_pic',
    })

    return { profile }
})
