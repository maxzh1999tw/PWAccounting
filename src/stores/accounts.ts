import { getDB } from '@/models/idbs/dbContext';
import { type Account } from '@/types/mainTypes/AccountingTypes';
import { defineStore } from 'pinia';
import { StoreName } from '@/models/idbs/names';

/** 定義 Store */
export const useAccountsStore = defineStore({
    id: 'accounts',
    actions: {
        /** 取得所有帳戶資料 */
        async getAll(): Promise<Account[]> {
            const db = await getDB();
            const trans = db!.transaction(StoreName.Accounts, 'readonly');
            return await trans.store.getAll();
        },

        /** 新增帳戶 */
        async addAccount(account: Account) {
            const db = await getDB();
            const trans = db!.transaction(StoreName.Accounts, 'readwrite');
            await trans.store.add(account);
            await trans.done;
        },

        /** 更新帳戶 */
        async updateAccount(account: Account) {
            const db = await getDB();
            const trans = db!.transaction(StoreName.Accounts, 'readwrite');
            await trans.store.put(account);
            await trans.done;
        }
    }
});
