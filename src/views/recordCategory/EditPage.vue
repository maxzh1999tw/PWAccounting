<script setup lang="ts">
import { ref, toRaw } from 'vue';
import Swal from 'sweetalert2';
import { router } from '@/router';
import { useRoute } from 'vue-router';

import EditForm from '../../components/recordCategory/recordCategoryEditForm.vue';
import { getRecordCategoryRepository } from '@/models/injection';
import { TrashIcon } from 'vue-tabler-icons';

const recordCategoryRepository = getRecordCategoryRepository();
const route = useRoute();
const recordCategoryId = Number(route.params.id);
if (isNaN(recordCategoryId)) {
    Swal.fire({
        text: "無效的記帳類別ID",
        icon: "error",
    }).then(() => {
        router.push('/recordcategory');
    });
    throw new Error("Invalid record category ID");
}

const recordcategory = await recordCategoryRepository.getByIdAsync(recordCategoryId);
if (!recordcategory) {
    Swal.fire({
        text: "找不到記帳類別",
        icon: "error",
    }).then(() => {
        router.push('/recordcategory');
    });
}

var model = ref(recordcategory!);
var loading = ref(false);

async function submit() {
    loading.value = true;
    await recordCategoryRepository.updateAsync(toRaw(model.value));
    loading.value = false;
    await Swal.fire({
        text: "儲存成功",
        icon: "success",
    });
    router.push('/recordcategory');
}

async function deleteRecordCategory() {
    if (!model.value?.id) {
        return;
    }

    let result = await Swal.fire({
        title: "你確定要刪除此記帳類別嗎？",
        text: "關於此記帳類別的紀錄會顯示為未知記帳類別",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "刪除",
        cancelButtonText: "取消"
    });

    if (!result.isConfirmed) {
        return;
    }

    loading.value = true;
    await recordCategoryRepository.deleteAsync(toRaw(model.value.id));
    await Swal.fire({
        text: "刪除成功",
        icon: "success",
    });
    router.push('/recordcategory');
}
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10" :loading="loading">
                <v-card-item>
                    <div class="w-100 text-end">
                        <v-btn color="primary" variant="outlined" @click="deleteRecordCategory()" :disabled="loading">
                            <TrashIcon />
                        </v-btn>
                    </div>
                    <EditForm :model="model" @submit="submit" :isEdit="true">
                        <template #toolBarBottom>
                            <v-row class="mt-5">
                                <v-col cols="6" md="6">
                                    <router-link to="/recordcategory">
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
