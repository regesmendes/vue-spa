<script setup>
import IconMenu from '../icons/IconMenu.vue';
</script>

<template>
    <div class=" hover:bg-gray-800 block lg:hidden">
        <button type="button" class="menu-mobile block py-3 px-6 border-b-2 border-transparent">
            <span class="sr-only">Mobile menu</span>
            <IconMenu></IconMenu>
        </button>
    </div>
</template>