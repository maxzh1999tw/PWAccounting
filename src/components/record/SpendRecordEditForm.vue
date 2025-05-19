<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import DateTimePickerTab from './dateTimePickerTab.vue';
import { formatDate } from '@/helpers/dateHelper';
import { Record, RecordTypeEnum } from '@/models/domain/accounting/record';
import { getRecordCategoryRepository } from '@/models/injection';
import { Account } from '@/models/domain/accounting/account';
import { RecordCategory } from '@/models/domain/accounting/recordCategory';
import CalculatorTab from './calculatorTab.vue';

const props = defineProps<{
    modelValue: Record,
    accounts: Account[],
}>();

const dateTimePickerTab = useTemplateRef('dateTimePickerTab')
const dateTimeDisplay = computed(() => formatDate(props.modelValue.dateTime, "YYYY-MM-DD  HH : mm"))

const calculatorTab = useTemplateRef('calculatorTab')

const recordCategoryRepository = getRecordCategoryRepository();
const categories = await recordCategoryRepository.getByTypeAsync(RecordTypeEnum.Spend);

let categoryWithMissed = computed(() => {
    var result = [...categories];
    if (!categories.some(c => c.id == props.modelValue.categoryId)) {
        var deletedCategory = new RecordCategory("已刪除", RecordTypeEnum.Spend);
        deletedCategory.id = props.modelValue.categoryId;
        result.push(deletedCategory);
    }

    return result;
})
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
                <v-number-input color="primary" variant="outlined" v-model="modelValue.amount" hide-details
                    @click="calculatorTab?.open()"></v-number-input>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">類別</v-label>
            </v-col>
            <v-col cols="9">
                <v-select v-model="modelValue.categoryId" :items="categoryWithMissed" item-title="name" item-value="id"
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
    <CalculatorTab v-model="props.modelValue.amount" ref="calculatorTab"></CalculatorTab>
</template>
