<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellIcon, ShoppingCartIcon } from 'vue-tabler-icons';
// import MessagesDD from './MessagesDD.vue';
import Logo from '../logo/Logo.vue';
// import LogoIcon from '../logo/LogoIcon.vue'
import RightMobileSidebar from './RightMobileSidebar.vue';
import Navigations from './Navigations.vue';
import { useRoute } from "vue-router";
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const route = useRoute();

const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
    showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
    priority.value = newPriority;
});

</script>

<template>
    <v-app-bar elevation="0" :priority="priority" height="64" color="background" id="top">
        <v-btn class="hidden-md-and-down " icon color="primary" variant="text"
            @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)">
            <Menu2Icon size="25" />
        </v-btn>
        <v-btn class="hidden-lg-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
            <Menu2Icon size="25" />
        </v-btn>
        <h1 class="h3 ms-2">{{ route.name }}</h1>

        <v-spacer />

    </v-app-bar>

    <!-- ---------------------------------------------- -->
    <!-- Right Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>
