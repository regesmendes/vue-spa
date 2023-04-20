<script setup>
import IconSearch from './icons/IconSearch.vue';

const emits = defineEmits(['search'])
</script>

<template>
    <div class="flex flex-wrap items-stretch w-full relative">
        <input type="text"
            class="flex-shrink flex-grow max-w-full leading-5 w-px flex-1 relative py-2 px-5 text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
            name="text" placeholder="Search..." aria-label="search">
        <div class="flex -mr-px">
            <button class="flex items-center py-2 px-5 -ml-1 leading-5 text-gray-100 bg-black hover:text-white hover:bg-gray-900 hover:ring-0 focus:outline-none focus:ring-0" type="submit">
                <IconSearch @click="emits('search')"></IconSearch>
            </button>
        </div>
    </div>
</template>