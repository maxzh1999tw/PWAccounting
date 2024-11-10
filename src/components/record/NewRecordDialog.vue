<script setup lang="ts">
import { ref, toRaw, watch } from "vue";
import { XIcon } from "vue-tabler-icons"
import SpendRecordEditForm from "./SpendRecordEditForm.vue";
import { type IncomeRecord, type Record, type SpendRecord, type TransferRecord } from "@/types/mainTypes/AccountingTypes";
import IncomeRecordEditForm from "./IncomeRecordEditForm.vue";
import TransferRecordEditForm from "./TransferRecordEditForm.vue";
import { useRecordsStore } from "@/stores/records";
const props = defineProps<{
    modelValue: boolean;
}>();

enum typeTabEnum {
    spend = "spend",
    income = "income",
    transfer = "transfer"
}

watch(() => props.modelValue, () => {
    if (props.modelValue) {
        spendRecord.value = {
            dateTime: new Date(),
            amount: 0,
            spendRecordCategoryId: 1,
            accountId: 1,
            memo: undefined,
        }
    }
})

const emit = defineEmits(['update:modelValue', 'submit']);
const spendRecord = ref({
    dateTime: new Date(),
    amount: 0,
    spendRecordCategoryId: 1,
    accountId: 1,
    memo: undefined,
} as SpendRecord);

const incomeRecord = ref({
    dateTime: new Date(),
    amount: 0,
    incomeRecordCategoryId: 1,
    accountId: 1,
    memo: undefined,
} as IncomeRecord);

const transferRecord = ref({
    dateTime: new Date(),
    amount: 0,
    fee: 0,
    fromAccountId: 1,
    toAccountId: 2,
    memo: undefined,
} as TransferRecord);

const typeTab = ref(typeTabEnum.spend)

watch(typeTab, () => {
    switch (typeTab.value) {
        case typeTabEnum.spend:
            spendRecord.value = {
                dateTime: new Date(),
                amount: 0,
                spendRecordCategoryId: 1,
                accountId: 1,
                memo: undefined,
            };
            break;
        case typeTabEnum.income:
            incomeRecord.value = {
                dateTime: new Date(),
                amount: 0,
                incomeRecordCategoryId: 1,
                accountId: 1,
                memo: undefined,
            };
            break;
        case typeTabEnum.transfer:
            transferRecord.value = {
                dateTime: new Date(),
                amount: 0,
                fee: 0,
                fromAccountId: 1,
                toAccountId: 2,
                memo: undefined,
            }
            break;
    }
})

async function save() {
    let record: Record;
    switch (typeTab.value) {
        case typeTabEnum.spend:
            record = spendRecord.value;
            break;
        case typeTabEnum.income:
            record = incomeRecord.value;
            break;
        case typeTabEnum.transfer:
            record = transferRecord.value;
            break;
    }

    var recordsStore = useRecordsStore();
    await recordsStore.addRecord(toRaw(record));
    emit('update:modelValue', false);
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
                    <v-tab :value="typeTabEnum.spend">支出</v-tab>
                    <v-tab :value="typeTabEnum.income">收入</v-tab>
                    <v-tab :value="typeTabEnum.transfer">帳戶互轉</v-tab>
                </v-tabs>
                <v-card-item>
                    <v-tabs-window v-model="typeTab">
                        <v-tabs-window-item :value="typeTabEnum.spend">
                            <SpendRecordEditForm v-model="spendRecord"></SpendRecordEditForm>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="typeTabEnum.income">
                            <IncomeRecordEditForm v-model="incomeRecord"></IncomeRecordEditForm>
                        </v-tabs-window-item>

                        <v-tabs-window-item :value="typeTabEnum.transfer">
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
