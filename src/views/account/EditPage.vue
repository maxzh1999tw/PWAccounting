<script setup lang="ts">
import { ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';
import Swal from 'sweetalert2';
import { router } from '@/router';
import { useRoute } from 'vue-router';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { AccountCurrencyTypes, AccountTypeEnum, type AccountType } from '@/types/mainTypes/AccountingTypes';
import EditForm from './EditForm.vue';

const page = ref({ title: '編輯帳戶' });
const accountStore = useAccountsStore();

const route = useRoute();
const accountId = route.params.id;

var modelIndex = accountStore.accounts.findIndex(x => x.id.toString() === accountId);
if (modelIndex == -1) {
    Swal.fire({
        text: "找不到帳戶",
        icon: "error",
    }).then(() => {
        router.push('/account');
    });
}

var model = ref(accountStore.accounts[modelIndex]);
var loading = ref(false);

async function submit() {
    loading.value = true;
    accountStore.updateAccount(model.value);
    loading.value = false;
    await Swal.fire({
        text: "儲存成功",
        icon: "success",
    });
    router.push('/account');
}
</script>

<template>
    <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10" :loading="loading">
                <v-card-item>
                    <EditForm :model="model" @submit="submit">
                        <template #toolBarBottom>
                            <v-row class="mt-5">
                                <v-col cols="12" md="12">
                                    <v-btn color="primary" type="submit" :disabled="loading"
                                        :loading="loading">儲存</v-btn>
                                    <router-link to="/account" class="ml-2">
                                        <v-btn variant="tonal" color="primary" :disabled="loading">取消</v-btn>
                                    </router-link>
                                </v-col>
                            </v-row>
                        </template>
                    </EditForm>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
