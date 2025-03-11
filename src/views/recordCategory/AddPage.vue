<script setup lang="ts">
import { ref, toRaw } from 'vue';
import Swal from 'sweetalert2';
import { router } from '@/router';
import { useRoute } from 'vue-router';

import EditForm from '../../components/recordCategory/recordCategoryEditForm.vue';
import { getRecordCategoryRepository } from '@/models/injection';
import { RecordCategory } from '@/models/domain/accounting/recordCategory';
import { RecordTypeEnum } from '@/models/domain/accounting/record';

const route = useRoute();
const typeParam = route.query.type as string;
const initType = typeParam === RecordTypeEnum.Income ? RecordTypeEnum.Income : RecordTypeEnum.Spend;

const recordCategoryRepository = getRecordCategoryRepository();
var model = ref(new RecordCategory("", initType));
var loading = ref(false);

async function submit() {
    loading.value = true;
    await recordCategoryRepository.addAsync(toRaw(model.value));
    loading.value = false;
    await Swal.fire({
        text: "儲存成功",
        icon: "success",
    });
    router.push('/recordCategory');
}
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10" :loading="loading">
                <v-card-item>
                    <EditForm :model="model" @submit="submit" :isEdit="false">
                        <template #toolBarBottom>
                            <v-row class="mt-5">
                                <v-col cols="6" md="6">
                                    <router-link to="/recordCategory">
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
