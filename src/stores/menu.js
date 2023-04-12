import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
    const mainMenu = ref([{
        title: 'Home',
        href: '/',
    }, {
        title: 'About',
        items: [{
            title: 'The Author',
            items: [{
                title: 'Work',
                href: '/about'
            }, {
                title: 'Hobbies',
                href: '/about'
            }],
        }, {
            title: 'This Web Site',
            href: '/about'
        }]
    }])

    return { mainMenu }
})
