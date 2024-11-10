import { type Record, type RecordCategory as RecordCategory } from '@/types/mainTypes/AccountingTypes';
import { defineStore } from 'pinia';
import { getDB } from '@/models/idbs/dbContext';
import { StoreName } from '@/models/idbs/names';
import { getMothRange } from '@/helpers/dateHelper';

export const useRecordCategoriesStore = defineStore({
    id: 'RecordCategories',
    actions: {
        async getSpendCategories(): Promise<RecordCategory[]> {
            const db = await getDB();
            const trans = db!.transaction(StoreName.SpendRecordCategories, 'readonly');
            return await trans.store.getAll();
        },
        async getIncomeCategories(): Promise<RecordCategory[]> {
            const db = await getDB();
            const trans = db!.transaction(StoreName.IncomeRecordCategories, 'readonly');
            return await trans.store.getAll();
        }
    }
});

export const useRecordsStore = defineStore({
    id: 'records',
    getters: {},
    actions: {
        async getMonthRecords(month: Date): Promise<Record[]> {
            const db = await getDB();
            const trans = db!.transaction(StoreName.Records, 'readonly');

            const { startOfMonth, endOfMonth } = getMothRange(month);
            const monthRange = IDBKeyRange.bound(startOfMonth, endOfMonth, false, false);

            return await trans.store.getAll(monthRange);
        },
        async addRecord(record: Record): Promise<void> {
            const db = await getDB();
            const trans = db!.transaction(StoreName.Records, 'readwrite');
            trans.store.add(record);
            await trans.done;
        }
    }
});
