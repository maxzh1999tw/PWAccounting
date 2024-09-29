<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
// Icon Imports
import { GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellRingingIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import Logo from '../logo/Logo.vue';
// dropdown imports
import Navigations from '../vertical-header/Navigations.vue';
import RightMobileSidebar from '../vertical-header/RightMobileSidebar.vue';

const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
    showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
    // yes, console.log() is a side effect
    priority.value = newPriority;
});


</script>
<template>
    <v-app-bar elevation="0" :priority="priority" height="64" class="horizontal-header" color="background">
        <div :class="customizer.boxed ? 'maxWidth v-toolbar__content px-lg-0 px-4' : 'v-toolbar__content px-6'">
            <div class="hidden-md-and-down">
                <Logo />
            </div>
            <v-btn class="hidden-md-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER"
                size="small">
                <Menu2Icon size="25" />
            </v-btn>

            <!---/Search part -->
            <v-spacer />
            <!-- ---------------------------------------------- -->
            <!---right part -->
            <!-- ---------------------------------------------- -->

        </div>
    </v-app-bar>

    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>
