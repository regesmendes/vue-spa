<script setup>
import IconCross from '../icons/IconCross.vue';
import { useMenuStore } from '@/stores/menu'

const menu = useMenuStore()

const emits = defineEmits(['selected']);

defineProps({
    title: {
        type: String,
        default: 'Menu'
    }
});
</script>

<template>
    <div class="side-area fixed w-full h-full inset-0 z-50 show">
        <div class="back-menu fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0">
            <div class="cursor-pointer text-white absolute right-64 p-2">
                <IconCross size="2rem" @click="emits('selected')"></IconCross>
            </div>
        </div>

        <nav class="side-menu flex flex-col right-0 w-64 fixed top-0 bg-white dark:bg-gray-800 h-full overflow-auto z-40 show">
            <div class="mb-auto">
                <nav class="relative flex flex-wrap">
                    <div class="text-center py-4 w-full font-bold border-b border-gray-100">{{ title }}</div>
                    <ul id="side-menu" class="w-full float-none flex flex-col">
                        <li v-for="item1 in menu.mainMenu">
                            <RouterLink v-if="item1.href" :to="item1.href" class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-700 cursor-pointer" @click="emits('selected')">{{ item1.title }}</RouterLink>
                            <div v-else>
                                <div class="block py-2 px-5 border-b border-gray-100 hover:bg-gray-700">{{ item1.title }}</div>
                                <ul>
                                    <li v-for="item2 in item1.items">
                                        <RouterLink v-if="item2.href" :to="item2.href" class="block py-2 px-10 border-b border-gray-100 hover:bg-gray-700 cursor-pointer" @click="emits('selected')">{{ item2.title }}</RouterLink>
                                        <div v-else>
                                            <div class="block py-2 px-10 border-b border-gray-100 hover:bg-gray-700">{{ item2.title }}</div>
                                            <ul>
                                                <li v-for="item3 in item2.items" class="hover:bg-gray-700">
                                                    <RouterLink :to="item3.href" class="block py-2 px-[3.75rem] border-b border-gray-100 cursor-pointer" @click="emits('selected')">{{ item3.title }}</RouterLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
    </div>
</template>