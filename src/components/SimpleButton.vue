<script setup>
defineProps({
    text: {
        type: String,
        default: 'Button'
    },
    type: {
        type: String,
        default: 'submit'
    }
})
</script>

<template>
    <button :type="type" class="border border-gray-200 rounded mx-2 py-2 flex-grow text-center cursor-pointer hover:bg-gray-200">{{ text }}</button>
</template>