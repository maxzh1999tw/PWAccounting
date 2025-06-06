<script setup lang="ts">
import { ref } from "vue";
import { XIcon, TrashXIcon } from "vue-tabler-icons"
import SpendRecordEditForm from "./SpendRecordEditForm.vue";
import IncomeRecordEditForm from "./IncomeRecordEditForm.vue";
import TransferRecordEditForm from "./TransferRecordEditForm.vue";
import { Record, RecordTypeEnum } from "@/models/domain/accounting/record";
import type { Account } from "@/models/domain/accounting/account";
import Swal from "sweetalert2";

const record = ref(Record.getNewSpendRecord(undefined, undefined));

defineExpose({
    openDialog,
});

const props = defineProps<{
    accounts: Account[],
}>();

const open = ref(false);

const emit = defineEmits(['onSave', 'onDelete']);

async function save() {
    if (record.value) {
        emit('onSave', record.value);
    }
    open.value = false;
}

async function handleDelete() {
    let result = await Swal.fire({
        title: "你確定要刪除此筆紀錄嗎？",
        text: "此動作無法還原，請三思。",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "刪除",
        cancelButtonText: "取消"
    });

    if (!result.isConfirmed) {
        return;
    }

    emit('onDelete', record.value);
    open.value = false;
}

function openDialog(editingRecord: Record) {
    record.value = { ...editingRecord };
    open.value = true;
}
</script>

<template>
    <div class="text-center">
        <v-dialog v-model="open" fullscreen transition="dialog-bottom-transition">
            <v-card :rounded="false">
                <v-toolbar dark color="primary" style="flex: unset">
                    <v-btn icon color="inherit" @click="open = false" flat>
                        <XIcon width="20" />
                    </v-btn>
                    <v-toolbar-title>編輯記錄</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon color="inherit" @click="handleDelete">
                            <TrashXIcon></TrashXIcon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-item>
                    <SpendRecordEditForm v-model="record" :accounts="accounts"
                        v-if="record.recordType == RecordTypeEnum.Spend">
                    </SpendRecordEditForm>

                    <IncomeRecordEditForm v-model="record" :accounts="accounts"
                        v-if="record.recordType == RecordTypeEnum.Income">
                    </IncomeRecordEditForm>

                    <TransferRecordEditForm v-model="record" :accounts="accounts"
                        v-if="record.recordType == RecordTypeEnum.Transfer">
                    </TransferRecordEditForm>
                </v-card-item>

                <div class="w-100 mt-auto">
                    <v-btn color="primary rounded-0" class="w-100 h-100 py-4" @click="save">儲存</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
