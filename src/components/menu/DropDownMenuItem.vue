<script setup>
import { RouterLink } from 'vue-router';
import SubMenuItem from './SubMenuItem.vue';

defineProps({
    title: {
        type: String,
        default: "(empty)"
    },
    items: {
        type: Array,
        default: []
    }
});
</script>

<template>
    <div class="cursor-pointer">
        <div class="block py-3 px-6 border-b-2 border-transparent group/menu0">{{ title }}</div>

        <ul class="invisible group-hover/menu0:visible font-normal absolute left-0 right-auto top-full z-50 border-b-0 text-left bg-white text-gray-700 border border-gray-100 min-w-[10rem]">
            <li v-for="item in items" class="relative hover:bg-gray-50 group/menu1">
                <RouterLink v-if="item.href" :to="item.href" class="block py-3 px-6 border-b-2 border-transparent">{{ item.title }}</RouterLink>
                <SubMenuItem v-else :title="item.title" :items="item.items"></SubMenuItem>
            </li>
        </ul>
    </div>
</template>
