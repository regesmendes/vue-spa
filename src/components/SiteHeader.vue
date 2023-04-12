<script setup>
import SearchComponent from './SearchComponent.vue';
import NavMenu from './menu/NavMenu.vue';
import MobileMenu from './menu/MobileMenu.vue';
import MobileMenuToggle from './menu/MobileMenuToggle.vue';
import UserComponent from './UserComponent.vue';

defineProps({
    appName: {
        type: String,
        default: 'vue-spa'
    }
});
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-50">
        <nav class="bg-black">
            <div class="xl:container mx-auto px-3 sm:px-4 xl:px-2">
                <div class="flex justify-between">
                    <h1 class="mx-w-10 text-2xl font-bold text-white flex items-center">{{ appName }}</h1>

                    <div class="flex flex-row">
                        <NavMenu></NavMenu>

                        <div class="flex flex-row items-center text-gray-300">
                            <SearchComponent></SearchComponent>
                            <UserComponent></UserComponent>

                            <MobileMenuToggle @click="showMobileMenu = !showMobileMenu"></MobileMenuToggle>
                            <MobileMenu v-if="showMobileMenu" :title="appName" @selected="showMobileMenu = !showMobileMenu"></MobileMenu>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            showMobileMenu: false
        };
    }
}
</script>