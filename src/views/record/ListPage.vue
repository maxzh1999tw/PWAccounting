<script setup lang="ts">
import { computed, ref, toRaw, useTemplateRef, watch } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { RecordTypeEnum, type Record } from '@/types/mainTypes/AccountingTypes';
import { useRecordCategoriesStore, useRecordsStore } from '@/stores/records';
import { formatDate, getDateOnly, isSameDay } from '@/helpers/dateHelper';
import { displayBalance } from '@/helpers/amountHelper';
import { distinct } from '@/helpers/arrayHelper';
import { useAccountsStore } from '@/stores/accounts';
import EditRecordDialog from '@/components/record/EditRecordDialog.vue';


const page = ref({ title: '紀錄管理' });
const recordsStore = useRecordsStore();

const month = ref(new Date());
const monthRecords = ref(await recordsStore.getMonthRecords(month.value))
watch(month, refreshList);

async function refreshList() {
    monthRecords.value = await recordsStore.getMonthRecords(month.value);
}

const recordGroupByDate = computed(() => {
    let recordGroupList = distinct(monthRecords.value!.map(x => getDateOnly(x.dateTime)), x => x.getTime()).sort((a, b) => b.getTime() - a.getTime()).map(date => {
        return {
            date: date,
            records: monthRecords!.value!.filter(x => isSameDay(x.dateTime, date)).sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0)),
            total: monthRecords!.value!.filter(x => isSameDay(x.dateTime, date)).sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0)).map(x => getRecordAddOn(x)).reduce((a, b) => a + b)
        }
    })
    return recordGroupList;
});

const categoriesStore = useRecordCategoriesStore();
const categories = await categoriesStore.getAll();

const accountStore = useAccountsStore();
const accounts = await accountStore.getAll();

const editRecordDialog = useTemplateRef('editRecordDialog')
function handleRecordClick(record: Record) {
    editRecordDialog!.value!.openDialog(record);
}

function getRecordAddOn(record: Record): number {
    let times = 0;
    switch (record.recordType) {
        case RecordTypeEnum.Spend:
            times = -1;
            break;
        case RecordTypeEnum.Income:
            times = 1;
            break;
        case RecordTypeEnum.Transfer:
            times = 0;
            break;
    }

    return record.amount * times;
}

async function onRecordSaved(record: Record) {
    await recordsStore.updateRecord(toRaw(record));
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
        <v-list class="pt-0">
            <template v-for="(dateGroup, i) in recordGroupByDate" :key="dateGroup.date">

                <v-list-item class="py-3">
                    <v-list-item-title class="text-subtitle-1 font-weight-bold">
                        {{ formatDate(dateGroup.date, "MM/DD (ddd)") }}
                    </v-list-item-title>
                    <template v-slot:append>
                        <v-list-item-subtitle opacity="100" class="text-subtitle-1 font-weight-bold">
                            {{ dateGroup.total ? displayBalance(dateGroup.total) : "0" }}
                        </v-list-item-subtitle>
                    </template>
                </v-list-item>

                <v-divider class="border-opacity-75"></v-divider>

                <div v-for="(record) in dateGroup.records" :key="record.id">
                    <v-list-item v-if="record.recordType == RecordTypeEnum.Spend" class="py-3"
                        @click="handleRecordClick(record)">
                        <v-list-item-title class="text-medium-emphasis">
                            <v-row>
                                <v-col cols="2">{{ accounts.find(x => x.id == record.accountId)?.name }}</v-col>
                                <v-col cols="3">{{ categories.find(x => x.id == record.categoryId)?.name }}</v-col>
                                <v-col cols="4">{{ record?.memo }}</v-col>
                                <v-col cols="3" class="text-end text-primary">{{
                                    displayBalance(record.amount)
                                    }}</v-col>
                            </v-row>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="record.recordType == RecordTypeEnum.Income" class="py-3"
                        @click="handleRecordClick(record)">
                        <v-list-item-title class="text-medium-emphasis">
                            <v-row>
                                <v-col cols="2">{{ accounts.find(x => x.id == record.accountId)?.name }}</v-col>
                                <v-col cols="3">{{ categories.find(x => x.id == record.categoryId)?.name }}</v-col>
                                <v-col cols="4">{{ record?.memo }}</v-col>
                                <v-col cols="3" class="text-end text-secondary">{{
                                    displayBalance(record.amount)
                                    }}</v-col>
                            </v-row>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="record.recordType == RecordTypeEnum.Transfer" class="py-3"
                        @click="handleRecordClick(record)">
                        <v-list-item-title class="text-medium-emphasis">
                            <v-row>
                                <v-col cols="2">{{ accounts.find(x => x.id == record.accountId)?.name }}</v-col>
                                <v-col cols="3">轉至{{ accounts.find(x => x.id == record.toAccountId)?.name }}</v-col>
                                <v-col cols="4">{{ record?.memo }}</v-col>
                                <v-col cols="3" class="text-end">{{ displayBalance(record.amount)
                                    }}</v-col>
                            </v-row>
                        </v-list-item-title>
                    </v-list-item>
                    <v-divider class="border-opacity-75" v-if="(i + 1) != dateGroup.records.length"></v-divider>
                </div>

                <v-divider class="border-opacity-75" v-if="(i + 1) != recordGroupByDate.length"></v-divider>
            </template>
        </v-list>
    </v-card>

    <edit-record-dialog @onSave="onRecordSaved" ref="editRecordDialog"></edit-record-dialog>
</template>
