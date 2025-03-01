<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { RecordTypeEnum } from '@/models/domain/accounting/record';
import { getRecordCategoryRepository } from '@/models/injection';
import type { RecordCategory } from '@/models/domain/accounting/recordCategory';
import { router } from '@/router';
const page = ref({ title: '記帳類別管理' });
const tab = ref(RecordTypeEnum.Spend);
const recordCategoryRepository = getRecordCategoryRepository();
const categories = ref(await recordCategoryRepository.getAllAsync());
const spendCategories = computed(() => categories.value.filter((x) => x.recordType === RecordTypeEnum.Spend));
const incomeCategories = computed(() => categories.value.filter((x) => x.recordType === RecordTypeEnum.Income));

function handleCategoryClick(category: RecordCategory) {
    router.push('/RecordCategory/edit/' + category.id);
}

function handleAddClick(type: RecordTypeEnum) {
    router.push('/RecordCategory/add?type=' + type);
}
</script>

<template>
    <div class="d-flex justify-space-between align-end">
        <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
    </div>
    <v-card elevation="10">
        <v-tabs v-model="tab" color="primary" fixed-tabs>
            <v-tab :value="RecordTypeEnum.Spend">支出</v-tab>
            <v-tab :value="RecordTypeEnum.Income">收入</v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="RecordTypeEnum.Spend">
                    <v-list>
                        <v-list-item class="py-3 opacity-50" @click="handleAddClick(RecordTypeEnum.Spend)">
                            <v-list-item-title class="text-subtitle-1"><v-icon icon="mdi-plus"></v-icon>
                                點擊新增</v-list-item-title>
                        </v-list-item>
                        <v-divider class="border-opacity-75"></v-divider>
                        <template v-for="(category, i) in spendCategories" :key="category.id">
                            <v-list-item color="primary" class="py-3" @click="handleCategoryClick(category)">
                                <v-list-item-title class="text-subtitle-1">{{ category.name }}</v-list-item-title>
                            </v-list-item>
                            <v-divider class="border-opacity-75" v-if="(i + 1) != spendCategories.length"></v-divider>
                        </template>
                    </v-list>
                </v-tabs-window-item>
                <v-tabs-window-item :value="RecordTypeEnum.Income">
                    <v-list>
                        <v-list-item class="py-3 opacity-50" @click="handleAddClick(RecordTypeEnum.Income)">
                            <v-list-item-title class="text-subtitle-1"><v-icon icon="mdi-plus"></v-icon>
                                點擊新增</v-list-item-title>
                        </v-list-item>
                        <v-divider class="border-opacity-75"></v-divider>
                        <template v-for="(category, i) in incomeCategories" :key="category.id">
                            <v-list-item color="primary" class="py-3" @click="handleCategoryClick(category)">
                                <v-list-item-title class="text-subtitle-1">{{ category.name }}</v-list-item-title>
                            </v-list-item>
                            <v-divider class="border-opacity-75" v-if="(i + 1) != spendCategories.length"></v-divider>
                        </template>
                    </v-list>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>