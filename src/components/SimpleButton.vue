<script setup>
defineProps({
    text: {
        type: String,
        default: 'Button'
    }
})
</script>

<template>
    <div class="border border-gray-200 rounded mx-2 py-2 flex-grow text-center cursor-pointer hover:bg-gray-200">{{ text }}</div>
</template>