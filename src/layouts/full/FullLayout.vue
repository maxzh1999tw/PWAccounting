<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalSidebarVue from './sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './header/VerticalHeader.vue';
import { useCustomizerStore } from '../../stores/customizer';
import NewRecordDialog from '@/components/record/NewRecordDialog.vue';
import { ref } from 'vue';
import { PlusIcon } from 'vue-tabler-icons';
import { useRouter } from "vue-router";
import { watchEffect } from "vue";

const customizer = useCustomizerStore();
const openNewRecordDialog = ref(false);

const router = useRouter();

// 監聽路由變更，模擬 beforeRouteLeave 行為
watchEffect((onCleanup) => {
    const unwatch = router.beforeEach((to, from, next) => {
        if (openNewRecordDialog.value) {
            openNewRecordDialog.value = false;
            return next(false); // 阻止導航
        }
        next();
    });

    // 在組件卸載時移除監聽
    onCleanup(() => unwatch());
});

function handleNewRecordDialogOpen() {
    openNewRecordDialog.value = true;
}
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
                <v-container fluid class="page-wrapper px-0 pb-sm-15 pb-10 pt-0">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <v-btn class="customizer-btn" size="large" icon variant="flat" color="primary"
                            @click.stop="handleNewRecordDialogOpen()">
                            <PlusIcon />
                        </v-btn>
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
