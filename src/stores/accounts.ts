import { getDB } from '@/models/idbs/dbContext';
import { type Account } from '@/types/mainTypes/AccountingTypes';
import { defineStore } from 'pinia';
import { type IDBPDatabase } from 'idb';

/** 定義 Store */
export const useAccountsStore = defineStore({
    id: 'accounts',
    state: () => ({
        db: null as IDBPDatabase | null // 初始為 null，稍後再初始化
    }),
    actions: {
        /** 初始化資料庫連線 */
        async initDB() {
            if (!this.db) {
                this.db = await getDB();
            }
        },

        /** 取得所有帳戶資料 */
        async getAll(): Promise<Account[]> {
            await this.initDB(); // 確保資料庫已初始化
            try {
                const trans = this.db!.transaction('accounts', 'readonly');
                return await trans.store.getAll();
            } catch (error) {
                console.error('取得帳戶資料失敗：', error);
                return [];
            }
        },

        /** 新增帳戶 */
        async addAccount(account: Account) {
            await this.initDB();
            try {
                const trans = this.db!.transaction('accounts', 'readwrite');
                await trans.store.add(account);
                await trans.done;
            } catch (error) {
                console.error('新增帳戶失敗：', error);
                throw error;
            }
        },

        /** 更新帳戶 */
        async updateAccount(account: Account) {
            await this.initDB();
            try {
                const trans = this.db!.transaction('accounts', 'readwrite');
                await trans.store.put(account);
                await trans.done;
            } catch (error) {
                console.error('更新帳戶失敗：', error);
                throw error;
            }
        }
    }
});
