<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { RecordTypeEnum, type Record } from '@/types/mainTypes/AccountingTypes';
import { useRecordCategoriesStore } from '@/stores/records';
import { useAccountsStore } from '@/stores/accounts';
import DateTimePickerTab from './dateTimePickerTab.vue';
import { formatDate } from '@/helpers/dateHelper';

const props = defineProps<{
    modelValue: Record;
}>();

const dateTimePickerTab = useTemplateRef('dateTimePickerTab')
const dateTimeDisplay = computed(() => formatDate(props.modelValue.dateTime, "YYYY-MM-DD  HH : mm"))

const accountsStore = useAccountsStore();
const accounts = await accountsStore.getAll();

const recordCategorysStore = useRecordCategoriesStore();
const categories = await recordCategorysStore.getCatigoriesByRecordType(RecordTypeEnum.Income);
</script>

<template>
    <v-form class="h-100">
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">時間</v-label>
            </v-col>
            <v-col cols="9">
                <v-text-field color="primary" variant="outlined" v-model="dateTimeDisplay" :readonly="true" hide-details
                    @click="dateTimePickerTab?.open()" />
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">金額</v-label>
            </v-col>
            <v-col cols="9">
                <v-number-input color="primary" variant="outlined" v-model="modelValue.amount"
                    hide-details></v-number-input>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">類別</v-label>
            </v-col>
            <v-col cols="9">
                <v-select v-model="modelValue.categoryId" :items="categories" item-title="name" item-value="id"
                    hide-details></v-select>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">帳戶</v-label>
            </v-col>
            <v-col cols="9">
                <v-select v-model="modelValue.accountId" :items="accounts" item-title="name" item-value="id"
                    hide-details></v-select>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">備註</v-label>
            </v-col>
            <v-col cols="9">
                <v-text-field color="primary" variant="outlined" v-model="modelValue.memo" :counter="20" hide-details />
            </v-col>
        </v-row>
    </v-form>

    <DateTimePickerTab v-model="props.modelValue.dateTime" ref="dateTimePickerTab"></DateTimePickerTab>
</template>
