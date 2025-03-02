<script setup lang="ts">
import { RecordTypeEnum } from '@/models/domain/accounting/record';
import type { RecordCategory } from '@/models/domain/accounting/recordCategory';
import { ref } from 'vue';

const props = defineProps<{
    model: RecordCategory;
    isEdit: boolean;
}>();

const emit = defineEmits(['submit']);

const valid = ref(false);
const nameRules = [(value: any) => {
    if (value) return true

    return '請填寫名稱'
}]

const recordCategoryTypeSelections = [{
    title: RecordTypeEnum.Income,
    value: RecordTypeEnum.Income,
}, {
    title: RecordTypeEnum.Spend,
    value: RecordTypeEnum.Spend,
}]

async function submit() {
    if (valid.value) {
        emit('submit', props.model);
    }
}
</script>

<template>
    <v-form @submit.prevent="submit" v-model="valid">
        <v-row class="mt-1">
            <v-col cols="12" md="12">
                <v-text-field v-model="model.name" :counter="10" label="名稱" :rules="nameRules">
                </v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-select v-model="model.recordType" :items="recordCategoryTypeSelections" label="類型"
                    :disabled="isEdit"></v-select>
            </v-col>
        </v-row>
        <slot name="toolBarBottom"></slot>
    </v-form>
</template>
