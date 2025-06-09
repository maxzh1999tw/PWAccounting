<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, defineExpose } from 'vue';
import Big from 'big.js';

const props = defineProps({
    modelValue: Number
});
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const buttons = [['7', '8', '9', 'AC', 'C'], ['4', '5', '6', 'x', '+'], ['1', '2', '3', '/', '-'], ['00', '0', '.', '=', 'OK']];

// Hi 我是Mia and max
const tempValue = ref(props.modelValue?.toString() ?? "");
const isFinal = ref(true);
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00']

function press(value: string) {
    if (numbers.includes(value)) {
        if (isFinal.value) {
            isFinal.value = false;
            handleNumberPressed(value)
        }
    }
};

function handleNumberPressed(value: string) {
    if (isFinal) {
        isFinal.value = false;
        tempValue.value = "";
    }

    if ((tempValue.value.length == 0 || tempValue.value == "0")
        && (value == "0" || value == "00")) {
        tempValue.value = "0";
        return;
    }

    if (value == ".") {
        if (tempValue.value == "") {
            tempValue.value = "0.";
            return;
        }
        else if (tempValue.value.includes(".")) {
            return;
        }
    }

    tempValue.value += value;
}


const confirm = () => {
    emit('update:modelValue', parseInt(display.value));
    isOpen.value = false;
};

function open() {
    isOpen.value = true;
};

defineExpose({ open });
</script>

<template>
    <v-bottom-sheet v-model="isOpen" inset>
        <v-card class="d-flex align-center" rounded="rounded-t">
            <v-card-text>
                <v-row>
                    <v-col cols="11">
                        <v-text-field prepend-icon="mdi-currency-usd" v-model="display" readonly solo
                            hide-details></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn icon color="inherit" @click="isOpen = false" flat>
                            <XIcon width="20" />
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row v-for="row in buttons">
                    <v-col v-for="btn in row" :key="btn">
                        <v-btn @click="press(btn)" block>{{ btn }}</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-bottom-sheet>
</template>