<script setup lang="ts">
import { computed, ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { CurrencyEnum, type Account } from '@/types/mainTypes/AccountingTypes';
import { router } from '@/router';
import { useAccountsStore } from '@/stores/accounts';
import currencyExchang from '@/models/accounting/currencyExchang';
import { displayBalance } from '@/helpers/amountHelper';


const page = ref({ title: '帳戶管理' });
const accountsStore = useAccountsStore();

let accounts = ref(await accountsStore.getAll());

function handleAddClick() {
    router.push('/account/add');
}

function handleAccountClick(selection: Account) {
    router.push(`/account/edit/${selection.id}`);
}

const totalAssets = computed(() => {
    var assets = accounts.value.map(x => {
        if (x.currency == CurrencyEnum.NTD) {
            return x.balance;
        }

        return currencyExchang.exchange({
            amount: x.balance,
            currency: x.currency
        }, CurrencyEnum.NTD).amount;
    });

    if (assets.length == 0) {
        return 0;
    }

    return assets.reduce((a, b) => Number(a) + Number(b));
})

</script>

<template>
    <div class="d-flex justify-space-between align-end">
        <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>

    </div>
    <v-card elevation="10">
        <v-card-text class="py-4 px-6 text-white bg-primary">
            <v-row>
                <v-col>
                    <h2 class="text-h5">總資產</h2>
                    <h2 class="text-h4 font-weight-regular">{{ displayBalance(totalAssets, CurrencyEnum.NTD) }}</h2>
                </v-col>
                <v-col cols="auto">
                    <v-btn color="primary" prepend-icon="mdi-plus" @click="handleAddClick" class="h-100">
                        新增
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider class="border-opacity-75"></v-divider>
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
</template>
