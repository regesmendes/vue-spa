<script setup>
import { ref } from 'vue';
import IconCross from './icons/IconCross.vue';
import IconSearch from './icons/IconSearch.vue';
import SearchBox from './SearchBox.vue';

const visible = ref(false)

</script>

<template>
    <div class="relative border-r lg:border-l border-gray-800 hover:bg-gray-900">
        <button class="block py-3 px-6 border-b-2 border-transparent" @click="visible = !visible">
            <IconSearch v-if="!visible"></IconSearch>
            <IconCross v-else></IconCross>
        </button>
        <div v-show="visible" class="absolute left-auto right-0 top-full z-50 text-left bg-white text-gray-700 border border-gray-100 mt-1 p-3 min-w-[15rem]">
            <SearchBox @search="visible = !visible"></SearchBox>
        </div>
    </div>
</template>