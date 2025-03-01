<script setup lang="ts">
import { ref, toRaw } from 'vue';
import Swal from 'sweetalert2';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { dbName, getDB } from '@/models/idbs/dbContext';

const page = ref({ title: '設定' });

async function deleteAllData() {
    let result = await Swal.fire({
        title: '確定刪除所有資料?',
        text: '此動作將無法復原',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
    });

    if (!result.isConfirmed) {
        return;
    }

    try {
        let db = await getDB();
        await db.close();
        indexedDB.deleteDatabase(dbName);
        await Swal.fire('刪除成功', '', 'success');
        window.location.reload();
    } catch (error) {
        console.error(error);
        Swal.fire('刪除失敗', 'error');
    }
}
</script>

<template>
    <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10">
                <v-card-item>
                    <v-btn color="error" class="w-100" @click="deleteAllData()">刪除所有資料</v-btn>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>