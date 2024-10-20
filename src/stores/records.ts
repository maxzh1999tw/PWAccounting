import { type RecordCategory as RecordCategory } from '@/types/mainTypes/AccountingTypes';
import { defineStore } from 'pinia';

export const useRecordCategorysStore = defineStore({
    id: 'recordTypes',
    state: () => ({
        spendRecordCategorys: [
            {
                id: 1,
                name: '飲食',
                isActive: true
            },
            {
                id: 2,
                name: '娛樂',
                isActive: true
            },
            {
                id: 3,
                name: '生活',
                isActive: true
            }
        ] as RecordCategory[],
        incomeRecordCategorys: [
            {
                id: 1,
                name: '薪資',
                isActive: true
            },
            {
                id: 2,
                name: '投資',
                isActive: true
            },
            {
                id: 3,
                name: '收債',
                isActive: true
            }
        ] as RecordCategory[]
    }),
    getters: {},
    actions: {}
});
