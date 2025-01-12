<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRaw, useTemplateRef, watch } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { AddMonth, formatDate, getDateOnly, isSameDay } from '@/helpers/dateHelper';
import { displayBalance } from '@/helpers/amountHelper';
import { distinct } from '@/helpers/arrayHelper';
import EditRecordDialog from '@/components/record/EditRecordDialog.vue';
import emitter from '@/eventBus';
import { getAccountRepository, getRecordCategoryRepository, getRecordRepository } from '@/models/injection';
import { RecordTypeEnum, type Record } from '@/models/domain/accounting/record'
import { SyncAccountBalancePolicy } from '@/models/domain/accounting/syncAccountBalancePolicy';

// ==========================
// ===== 頁面設定與初始化 =====
// ==========================
const page = ref({ title: '紀錄管理' });
const recordRepository = getRecordRepository();

const categoryRepository = getRecordCategoryRepository();
const categories = await categoryRepository.getAllAsync();

const accountRepository = getAccountRepository();
const accounts = await accountRepository.getAllAsync();

// ===================
// ===== 紀錄列表 =====
// ===================
const month = ref(new Date());
const monthRecords = ref(await recordRepository.getMonthRecordsAsync(month.value))
watch(month, refreshList);

async function refreshList() {
    monthRecords.value = await recordRepository.getMonthRecordsAsync(month.value);
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

// =================
// ===== 統計 ======
// =================
function changeMonth(add: number) {
    month.value = AddMonth(month.value, add);
}

const spendSum = computed(() => {
    return monthRecords.value.filter(x => x.recordType == RecordTypeEnum.Spend).map(x => x.amount).reduce((sum, current) => sum + current, 0);
})

const incomeSum = computed(() => {
    return monthRecords.value.filter(x => x.recordType == RecordTypeEnum.Income).map(x => x.amount).reduce((sum, current) => sum + current, 0);
})

// ===================
// ===== 編輯紀錄 =====
// ===================
const editRecordDialog = useTemplateRef('editRecordDialog')
function handleRecordClick(record: Record) {
    editRecordDialog!.value!.openDialog(record);
}

async function onRecordSaved(record: Record) {
    await new SyncAccountBalancePolicy().onRecordUpdatingAsync(toRaw(record));
    await recordRepository.updateAsync(toRaw(record));
}

// ==============================
// ===== 新紀錄事件(全局事件) =====
// ==============================
onMounted(() => emitter.on('new-record-added', refreshList));
onUnmounted(() => emitter.off('new-record-added', refreshList));

</script>

<template>
    <div class="d-flex justify-space-between align-end">
        <BaseBreadcrumb :title="page.title"></BaseBreadcrumb>
    </div>
    <v-card elevation="10">
        <v-card-text class="text-white bg-primary pb-4">
            <v-row>
                <v-col cols="3" class="text-start py-0">
                    <v-btn variant="flat" color="primary" @click="changeMonth(-1)" icon="mdi-menu-left">
                    </v-btn>
                </v-col>
                <v-col cols="6" class="text-center py-0">
                    <h2 class="py-3">{{ month.getFullYear() }} 年 {{ month.getMonth() + 1 }} 月</h2>
                </v-col>
                <v-col cols="3" class="text-end py-0">
                    <v-btn icon="mdi-menu-right" variant="flat" @click="changeMonth(1)" color="primary">
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col>
                    收入<h2>{{ displayBalance(incomeSum) }}</h2>
                </v-col>
                <v-col>
                    支出<h2>{{ displayBalance(spendSum) }}</h2>
                </v-col>
                <v-col>
                    本月合計<h2>{{ displayBalance(incomeSum - spendSum) }}</h2>
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
