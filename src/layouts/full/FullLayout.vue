<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalSidebarVue from './sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './header/VerticalHeader.vue';
import Customizer from './customizer/Customizer.vue';
import { useCustomizerStore } from '../../stores/customizer';
import { pl, zhHans } from 'vuetify/locale'
import NewRecordDialog from '@/components/record/NewRecordDialog.vue';
import { ref } from 'vue';
import { PlusIcon } from 'vue-tabler-icons';
const customizer = useCustomizerStore();
const openNewRecordDialog = ref(false);
</script>

<template>
    <v-locale-provider>
        <v-app :theme="customizer.actTheme" :class="[
            customizer.actTheme,
            customizer.mini_sidebar ? 'mini-sidebar' : '',
            customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
            customizer.setBorderCard ? 'cardBordered' : '',
            customizer.inputBg ? 'inputWithbg' : ''
        ]">
            <!-- <Customizer /> -->
            <VerticalSidebarVue />
            <VerticalHeaderVue />
            <NewRecordDialog v-model="openNewRecordDialog"></NewRecordDialog>

            <v-main>
                <v-container fluid class="page-wrapper px-0 pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <v-btn class="customizer-btn" size="large" icon variant="flat" color="primary"
                            @click.stop="openNewRecordDialog = true">
                            <PlusIcon />
                        </v-btn>
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
