<script setup lang="ts">
import { ref, toRaw, watch } from "vue";
import { XIcon } from "vue-tabler-icons"
import SpendRecordEditForm from "./SpendRecordEditForm.vue";
import { getNewIncomeRecord, getNewSpendRecord, getNewTransferRecord, RecordTypeEnum, type Record } from "@/types/mainTypes/AccountingTypes";
import IncomeRecordEditForm from "./IncomeRecordEditForm.vue";
import TransferRecordEditForm from "./TransferRecordEditForm.vue";
import { useRecordCategoriesStore, useRecordsStore } from "@/stores/records";
import { useAccountsStore } from "@/stores/accounts";
import emitter from "@/eventBus";
const props = defineProps<{
    modelValue: boolean;
}>();

const accountList = await useAccountsStore().getAll();
const firstAccountId = accountList.length >= 1 ? accountList[0].id : undefined;
const secondAccountId = accountList.length >= 2 ? accountList[1].id : firstAccountId;

const spendCategoryList = await useRecordCategoriesStore().getCatigoriesByRecordType(RecordTypeEnum.Spend);
const firstSpendCategoryId = spendCategoryList.length >= 1 ? spendCategoryList[0].id : undefined;
const incomeCategoryList = await useRecordCategoriesStore().getCatigoriesByRecordType(RecordTypeEnum.Income);
const firstIncomeCategoryId = incomeCategoryList.length >= 1 ? incomeCategoryList[0].id : undefined;

watch(() => props.modelValue, () => {
    if (props.modelValue) {
        spendRecord.value = getNewSpendRecord(firstSpendCategoryId, firstAccountId);
    }
})

const emit = defineEmits(['update:modelValue', 'submit']);
const spendRecord = ref(getNewSpendRecord(firstSpendCategoryId, firstAccountId));

const incomeRecord = ref(getNewIncomeRecord(firstIncomeCategoryId, firstAccountId));

const transferRecord = ref(getNewTransferRecord(firstAccountId, secondAccountId));

const typeTab = ref(RecordTypeEnum.Spend)

watch(typeTab, () => {
    switch (typeTab.value) {
        case RecordTypeEnum.Spend:
            spendRecord.value = getNewSpendRecord(firstSpendCategoryId, firstAccountId);
            break;
        case RecordTypeEnum.Income:
            incomeRecord.value = getNewIncomeRecord(firstIncomeCategoryId, firstAccountId);
            break;
        case RecordTypeEnum.Transfer:
            transferRecord.value = getNewTransferRecord(firstAccountId, secondAccountId);
            break;
    }
})

async function save() {
    let record: Record;
    switch (typeTab.value) {
        case RecordTypeEnum.Spend:
            record = spendRecord.value;
            break;
        case RecordTypeEnum.Income:
            record = incomeRecord.value;
            break;
        case RecordTypeEnum.Transfer:
            record = transferRecord.value;
            break;
    }

    var recordsStore = useRecordsStore();
    await recordsStore.addRecord(toRaw(record));
    emit('update:modelValue', false);
    emitter.emit('new-record-added');
}
</script>

<template>
    <div class="text-center">
        <v-dialog v-model="props.modelValue" fullscreen transition="dialog-bottom-transition">
            <v-card :rounded="false">
                <v-toolbar dark color="primary" style="flex: unset">
                    <v-btn icon color="inherit" @click="$emit('update:modelValue', false)" flat>
                        <XIcon width="20" />
                    </v-btn>
                    <v-toolbar-title>新增記帳</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
                <v-tabs fixed-tabs v-model="typeTab" class="w-100" color="primary">
                    <v-tab :value="RecordTypeEnum.Spend">支出</v-tab>
                    <v-tab :value="RecordTypeEnum.Income">收入</v-tab>
                    <v-tab :value="RecordTypeEnum.Transfer">帳戶互轉</v-tab>
                </v-tabs>
                <v-card-item>
                    <v-tabs-window v-model="typeTab">
                        <v-tabs-window-item :value="RecordTypeEnum.Spend">
                            <SpendRecordEditForm v-model="spendRecord"></SpendRecordEditForm>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="RecordTypeEnum.Income">
                            <IncomeRecordEditForm v-model="incomeRecord"></IncomeRecordEditForm>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="RecordTypeEnum.Transfer">
                            <TransferRecordEditForm v-model="transferRecord"></TransferRecordEditForm>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card-item>

                <div class="w-100 mt-auto">
                    <v-btn color="primary rounded-0" class="w-100 h-100 py-4" @click="save">儲存</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
