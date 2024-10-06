<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { AccountCurrencyTypes, AccountTypeEnum, type AccountType } from '@/types/mainTypes/AccountingTypes';

const props = defineProps<{
    model: AccountType;
}>();

const emit = defineEmits(['submit']);

const valid = ref(false);
const nameRules = [(value: any) => {
    if (value) return true

    return '請填寫帳戶名稱'
}]
const balanceRules = [(value: any) => {
    if (value || value === 0) return true

    return '請填寫帳戶餘額'
}]

const accountTypeSelections = [{
    title: "一般",
    value: AccountTypeEnum.General,
}, {
    title: "投資",
    value: AccountTypeEnum.Investment,
}]

const currencyTypeSelections = [{
    title: "新台幣",
    value: AccountCurrencyTypes.NTD,
}, {
    title: "比特幣",
    value: AccountCurrencyTypes.BTC,
}, {
    title: "日幣",
    value: AccountCurrencyTypes.JPY,
}]

async function submit() {
    if (valid.value) {
        emit('submit', props.model);
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" v-model="valid">
        <v-row class="mt-1">
            <v-col cols="12" md="12">
                <v-text-field v-model="model.name" :counter="10" label="帳戶名稱" :rules="nameRules">
                </v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-select v-model="model.type" :items="accountTypeSelections" label="帳戶類型"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8" md="8">
                <v-text-field v-model="model.balance" type="number" label="帳戶餘額" :rules="balanceRules"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-select v-model="model.currency" :items="currencyTypeSelections" label="幣種"></v-select>
            </v-col>
        </v-row>
        <v-row class="mt-1">
            <v-col cols="12" md="12">
                <v-text-field v-model="model.memo" :counter="20" label="備註">
                </v-text-field>
            </v-col>
        </v-row>
        <slot name="toolBarBottom"></slot>
    </v-form>
</template>
