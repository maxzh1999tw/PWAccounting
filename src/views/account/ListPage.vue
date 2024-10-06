<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { AccountCurrencyTypes, AccountTypeEnum, type AccountType } from '@/types/mainTypes/AccountingTypes';
import { router } from '@/router';
import { useAccountsStore } from '@/stores/accounts';

const page = ref({ title: '帳戶管理' });
const accountStore = useAccountsStore();

const selection = ref([]);

let accounts = ref(accountStore.accounts);

function handleAddClick() {
    router.push('/account/add');
}

function handleAccountClick() {
    router.push(`/account/edit/${selection.value[0]}`);
}

</script>

<template>
    <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10">
                <v-card-item>
                    <v-btn color="primary" prepend-icon="mdi-plus" @click="handleAddClick">
                        新增帳戶
                    </v-btn>
                    <v-list :items="accounts" item-title="name" item-value="id" @click="handleAccountClick"
                        v-model:selected="selection"></v-list>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
