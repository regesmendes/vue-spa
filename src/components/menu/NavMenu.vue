<script setup>
import DropDownMenuItem from './DropDownMenuItem.vue'
import { useMenuStore } from '@/stores/menu'

const menu = useMenuStore()
</script>

<template>
    <ul class="hidden lg:flex lg:flex-row text-gray-400 text-sm items-center font-bold">
        <li  v-for="(item, index) in menu.mainMenu" :key="index" class="relative border-l border-gray-800 hover:bg-gray-900" :class="{'group/menu0': !item.items || item.items.length}">
            <RouterLink v-if="item.route" :to="{name: item.route}" class="block py-3 px-6 border-b-2 border-transparent">{{ item.title }}</RouterLink>
            <DropDownMenuItem v-else :title="item.title" :items="item.items"></DropDownMenuItem>
        </li>
    </ul>
</template>