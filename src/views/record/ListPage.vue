<script setup lang="ts">
import { computed, ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { CurrencyEnum, type Record } from '@/types/mainTypes/AccountingTypes';
import { useRecordsStore } from '@/stores/records';
import { formatDate } from '@/helpers/dateHelper';


const page = ref({ title: '紀錄管理' });
const recordsStore = useRecordsStore();

const month = ref(new Date());
const monthRecords = ref(await recordsStore.getMonthRecords(month.value));

function handleRecordClick(record: Record) {

}

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
                    <h2 class="text-h4 font-weight-regular">wewreth</h2>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider class="border-opacity-75"></v-divider>
        <v-list>
            <template v-for="(record, i) in monthRecords" :key="record.id">
                <v-list-item color="primary" class="py-3" @click="handleRecordClick(record)">
                    <v-list-item-title class="text-subtitle-1">{{ formatDate(record.dateTime, "MM/dd")
                        }}</v-list-item-title>
                    <template v-slot:append>
                        <v-list-item-subtitle class="text-subtitle-1 text-high-emphasis mr-3">
                            $5,151
                        </v-list-item-subtitle>
                    </template>
                </v-list-item>
                <v-divider class="border-opacity-75" v-if="(i + 1) != monthRecords.length"></v-divider>
            </template>
        </v-list>
    </v-card>
</template>
