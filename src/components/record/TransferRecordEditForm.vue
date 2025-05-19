<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import DateTimePickerTab from './dateTimePickerTab.vue';
import { formatDate } from '@/helpers/dateHelper';
import { Record } from '@/models/domain/accounting/record';
import type { Account } from '@/models/domain/accounting/account';
import CalculatorTab from './calculatorTab.vue';

const props = defineProps<{
    modelValue: Record,
    accounts: Account[],
}>();

const dateTimePickerTab = useTemplateRef('dateTimePickerTab')
const dateTimeDisplay = computed(() => formatDate(props.modelValue.dateTime, "YYYY-MM-DD  HH : mm"))

const calculatorTab = useTemplateRef('calculatorTab')
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
                <v-label class="font-weight-medium">手續費</v-label>
            </v-col>
            <v-col cols="9">
                <v-text-field color="primary" variant="outlined" type="number" v-model="modelValue.fee" hide-details />
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">轉出帳戶</v-label>
            </v-col>
            <v-col cols="9">
                <v-select v-model="modelValue.accountId" :items="accounts" item-title="name" item-value="id"
                    hide-details></v-select>
            </v-col>
        </v-row>
        <v-row class="align-center">
            <v-col cols="3">
                <v-label class="font-weight-medium">轉入帳戶</v-label>
            </v-col>
            <v-col cols="9">
                <v-select v-model="modelValue.toAccountId" :items="accounts" item-title="name" item-value="id"
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
