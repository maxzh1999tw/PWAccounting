<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { AccountCurrencyTypes, AccountTypeEnum, type AccountType } from '@/types/mainTypes/AccountingTypes';
import { router } from '@/router';
import { useAccountsStore } from '@/stores/accounts';
import { WalletIcon } from 'vue-tabler-icons';

const page = ref({ title: '帳戶管理' });
const accountStore = useAccountsStore();

let accounts = ref(accountStore.accounts);

function handleAddClick() {
    router.push('/account/add');
}

function handleAccountClick(selection: AccountType) {
    router.push(`/account/edit/${selection.id}`);
}

function displayBalance(balance: number, currency: AccountCurrencyTypes) {
    return `$${new Intl.NumberFormat().format(balance)} ${currency}`
}

</script>

<template>
    <div class="d-flex justify-space-between align-end">
        <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="handleAddClick" class="mb-3">
            新增帳戶
        </v-btn>
    </div>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10">
                <v-list>
                    <template v-for="(account, i) in accounts" :key="account.id">
                        <v-list-item color="primary" class="py-3" @click="handleAccountClick(account)">
                            <v-list-item-title class="text-subtitle-1">{{ account.name }}</v-list-item-title>
                            <v-list-item-subtitle class="text-subtitle-2 text-high-emphasis">{{ account.memo
                                }}</v-list-item-subtitle>
                            <template v-slot:append>
                                <v-list-item-subtitle class="text-subtitle-1 text-high-emphasis mr-3"> {{
                                    displayBalance(account.balance, account.currency) }}</v-list-item-subtitle>
                            </template>
                        </v-list-item>
                        <v-divider class="border-opacity-75" v-if="(i + 1) != accounts.length"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>
