<script setup lang="ts">
import { ref, toRaw, watch } from "vue";
import { XIcon } from "vue-tabler-icons"
import SpendRecordEditForm from "./SpendRecordEditForm.vue";
import IncomeRecordEditForm from "./IncomeRecordEditForm.vue";
import TransferRecordEditForm from "./TransferRecordEditForm.vue";
import emitter from "@/eventBus";
import { getAccountRepository, getRecordCategoryRepository, getRecordRepository } from "@/models/injection";
import { Record, RecordTypeEnum } from "@/models/domain/accounting/record";
import { SyncAccountBalancePolicy } from "@/models/domain/accounting/syncAccountBalancePolicy";
const props = defineProps<{
    modelValue: boolean;
}>();

const accountRepository = getAccountRepository();
const accounts = await accountRepository.getAllAsync();
const firstAccountId = accounts.length >= 1 ? accounts[0].id : undefined;
const secondAccountId = accounts.length >= 2 ? accounts[1].id : firstAccountId;

const recordCategoryRepository = getRecordCategoryRepository();
const spendCategoryList = await recordCategoryRepository.getByTypeAsync(RecordTypeEnum.Spend);
const firstSpendCategoryId = spendCategoryList.length >= 1 ? spendCategoryList[0].id : undefined;
const incomeCategoryList = await recordCategoryRepository.getByTypeAsync(RecordTypeEnum.Income);
const firstIncomeCategoryId = incomeCategoryList.length >= 1 ? incomeCategoryList[0].id : undefined;

watch(() => props.modelValue, () => {
    if (props.modelValue) {
        spendRecord.value = Record.getNewSpendRecord(firstSpendCategoryId, firstAccountId);
        incomeRecord.value = Record.getNewIncomeRecord(firstIncomeCategoryId, firstAccountId);
        transferRecord.value = Record.getNewTransferRecord(firstAccountId, secondAccountId);
        typeTab.value = RecordTypeEnum.Spend;
    }
})

const emit = defineEmits(['update:modelValue', 'submit']);
const spendRecord = ref(Record.getNewSpendRecord(firstSpendCategoryId, firstAccountId));

const incomeRecord = ref(Record.getNewIncomeRecord(firstIncomeCategoryId, firstAccountId));

const transferRecord = ref(Record.getNewTransferRecord(firstAccountId, secondAccountId));

const typeTab = ref(RecordTypeEnum.Spend)

watch(typeTab, () => {
    switch (typeTab.value) {
        case RecordTypeEnum.Spend:
            spendRecord.value = Record.getNewSpendRecord(firstSpendCategoryId, firstAccountId);
            break;
        case RecordTypeEnum.Income:
            incomeRecord.value = Record.getNewIncomeRecord(firstIncomeCategoryId, firstAccountId);
            break;
        case RecordTypeEnum.Transfer:
            transferRecord.value = Record.getNewTransferRecord(firstAccountId, secondAccountId);
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

    var recordRepository = getRecordRepository();
    await recordRepository.addAsync(toRaw(record));
    await new SyncAccountBalancePolicy().onNewRecordAddedAsync(toRaw(record));
    emit('update:modelValue', false);
    emitter.emit('any-record-change');
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
                            <SpendRecordEditForm :accounts="accounts" v-model="spendRecord"></SpendRecordEditForm>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="RecordTypeEnum.Income">
                            <IncomeRecordEditForm :accounts="accounts" v-model="incomeRecord"></IncomeRecordEditForm>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="RecordTypeEnum.Transfer">
                            <TransferRecordEditForm :accounts="accounts" v-model="transferRecord">
                            </TransferRecordEditForm>
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
