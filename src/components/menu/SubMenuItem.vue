<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    title: {
        type: String,
        default: "(empty-submenu)"
    },
    items: {
        type: Array,
        default: () => []
    }
});
</script>

<template>
    <div class="submenu-container">
        <div class="block py-2 px-6 border-b border-gray-100 submenu-item" :href="title">{{ title }}</div>

        <ul :class="submenuClasses" class="invisible group-hover/menu1:visible absolute transform top-full z-50 border-b-0 text-left -mt-10 ml-0 mr-0 bg-white border border-gray-100 min-w-[10rem]">
            <li v-for="(item, index) in items" class="relative hover:bg-gray-50" v-bind:key="index">
                <RouterLink :to="{name: item.route}" class="block py-2 px-6 border-b border-gray-100">{{ item.title }}</RouterLink>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            submenuClasses: 'left-full right-auto'
        }
    },

    mounted() {
        this.adjustSubmenuItemsPosition()
    },

    methods: {
        adjustSubmenuItemsPosition() {
            /**
             * adjusts the 3rd level of menu items to not be presented out of the screen
             */
            const dropdown = document.querySelector('div.submenu-item[href="'+ this.title + '"]')
            const menuItem = dropdown.closest('.submenu-container').querySelector('li')
            const dropdownRect = dropdown.getBoundingClientRect()
            const menuitemRect = menuItem.getBoundingClientRect()
            if (dropdownRect.right + menuitemRect.width > window.innerWidth) {
                this.submenuClasses = 'right-full left-auto'
            }
        }
    }
}
</script>
