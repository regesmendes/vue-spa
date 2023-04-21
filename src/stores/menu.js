import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
    const mainMenu = ref([{
        title: 'Home',
        route: 'home',
    }, {
        title: 'About',
        items: [{
            title: 'The Author',
            items: [{
                title: 'Work',
                route: 'about'
            }, {
                title: 'Hobbies',
                route: 'about'
            }],
        }, {
            title: 'This Web Site',
            route: 'about'
        }]
    }])

    return { mainMenu }
})
