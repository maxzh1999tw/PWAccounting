<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import dayjs from 'dayjs'

const props = defineProps<{
    modelValue: Date;
}>();

const emit = defineEmits(['update:modelValue']);

const isDateTimePickerShown = ref(false);
const dateTimePickerProgress = ref(0);
const dateTimePickerDate = ref(props.modelValue);
const dateTimePickerTime = ref('00:00');

watch(dateTimePickerDate, () => {
    if (isDateTimePickerShown.value) {
        let newDateTime = new Date(props.modelValue);
        newDateTime.setFullYear(dateTimePickerDate.value.getFullYear());
        newDateTime.setMonth(dateTimePickerDate.value.getMonth());
        newDateTime.setDate(dateTimePickerDate.value.getDate());
        emit("update:modelValue", newDateTime);
        dateTimePickerProgress.value = 1;
    }
})

watch(dateTimePickerTime, () => {
    if (isDateTimePickerShown.value) {
        let newDateTime = new Date(props.modelValue);
        let splited = dateTimePickerTime.value.split(':')
        newDateTime.setHours(Number(splited[0]));
        newDateTime.setMinutes(Number(splited[1]));
        emit("update:modelValue", newDateTime);
        isDateTimePickerShown.value = false;
    }
})

function open() {
    dateTimePickerDate.value = props.modelValue;
    dateTimePickerTime.value = dayjs(props.modelValue).format("HH:mm");
    nextTick(() => {
        isDateTimePickerShown.value = true;
        dateTimePickerProgress.value = 0;
    })
}

defineExpose({
    open,
});
</script>

<template>
    <v-bottom-sheet v-model="isDateTimePickerShown" inset>
        <v-card class="d-flex align-center" rounded="rounded-t">
            <v-tabs fixed-tabs v-model="dateTimePickerProgress" class="w-100" color="primary">
                <v-tab value="0">日期</v-tab>
                <v-tab value="1">時間</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-window v-model="dateTimePickerProgress">
                    <v-tabs-window-item value="0">
                        <v-date-picker v-model="dateTimePickerDate" title="">
                        </v-date-picker>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="1">
                        <v-time-picker v-model="dateTimePickerTime" format="24hr" class="py-4" title="">
                        </v-time-picker>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </v-bottom-sheet>
</template>

<style scoped>
::v-deep(.v-picker-title) {
    display: none;
}
</style>