<script setup lang="ts">
import { ref, toRaw } from 'vue';
import Swal from 'sweetalert2';
import { router } from '@/router';
import { useRoute } from 'vue-router';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditForm from '../../components/account/AccountEditForm.vue';
import { getAccountRepository } from '@/models/injection';

const page = ref({ title: '編輯帳戶' });
const breadcrumbs = ref([
    {
        text: '帳戶管理',
        disabled: false,
        href: '/account'
    },
    {
        text: '編輯帳戶',
        disabled: true,
        href: '#'
    }
]);

const accountRepository = getAccountRepository();
const route = useRoute();
const accountId = Number(route.params.id);
if (isNaN(accountId)) {
    Swal.fire({
        text: "無效的帳戶ID",
        icon: "error",
    }).then(() => {
        router.push('/account');
    });
    throw new Error("Invalid account ID");
}

const account = await accountRepository.getByIdAsync(accountId);
if (!account) {
    Swal.fire({
        text: "找不到帳戶",
        icon: "error",
    }).then(() => {
        router.push('/account');
    });
}

var model = ref(account!);
var loading = ref(false);

async function submit() {
    loading.value = true;
    await accountRepository.updateAsync(toRaw(model.value));
    loading.value = false;
    await Swal.fire({
        text: "儲存成功",
        icon: "success",
    });
    router.push('/account');
}
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10" :loading="loading">
                <v-card-item>
                    <EditForm :model="model" @submit="submit">
                        <template #toolBarBottom>
                            <v-row class="mt-5">
                                <v-col cols="6" md="6">
                                    <router-link to="/account">
                                        <v-btn variant="tonal" color="primary" :disabled="loading"
                                            class="w-100">取消</v-btn>
                                    </router-link>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-btn color="primary" type="submit" :disabled="loading" class="w-100"
                                        :loading="loading">儲存</v-btn>
                                </v-col>
                            </v-row>
                        </template>
                    </EditForm>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
