import { openDB, type IDBPDatabase, type IDBPTransaction } from 'idb';
import versionUpgrader_0 from './versionUpgraders/versionUpgrader_0';

/** 資料庫名稱 */
export const dbName = 'PWAccountingV1';
/** 資料庫版本 */
const lastVersion = 1;

/** 定義資料庫型別，根據需求可替換成具體的資料庫結構 */
type DatabaseSchema = unknown; // 可根據需求替換成具體型別

/** 用於儲存唯一的資料庫連線 */
let dbPromise: Promise<IDBPDatabase<DatabaseSchema>> | null = null;

/**
 * 取得或建立資料庫連線。
 *
 * @returns {Promise<IDBPDatabase<DatabaseSchema>>} 回傳 IDB 資料庫的 Promise。
 */
export async function getDB(): Promise<IDBPDatabase<DatabaseSchema>> {
    if (!dbPromise) {
        dbPromise = openDB<DatabaseSchema>(dbName, lastVersion, {
            /**
             * 資料庫升級時觸發的回呼。
             *
             * @param db - 資料庫實例
             * @param oldVersion - 舊版本號碼
             * @param newVersion - 新版本號碼
             * @param transaction - 升級期間的交易
             */
            upgrade(
                db: IDBPDatabase<DatabaseSchema>,
                oldVersion: number,
                newVersion: number | null,
                transaction: IDBPTransaction<DatabaseSchema, string[], 'versionchange'>
            ) {
                const versionUpgrader = [versionUpgrader_0];
                for (let i = oldVersion; i < (newVersion ?? oldVersion + 1); i++) {
                    versionUpgrader[i](db, transaction);
                }
            },

            /**
             * 當資料庫升級被其他標籤頁阻擋時觸發。
             *
             * @param currentVersion - 目前版本
             * @param blockedVersion - 被阻擋的版本
             * @param event - 事件物件
             */
            blocked(currentVersion: number, blockedVersion: number | null, event: Event) {
                console.warn('資料庫升級被阻擋', { currentVersion, blockedVersion });
            },

            /**
             * 當此標籤頁阻擋了其他標籤頁的升級時觸發。
             *
             * @param currentVersion - 目前版本
             * @param blockedVersion - 被封鎖的版本
             * @param event - 事件物件
             */
            blocking(currentVersion: number, blockedVersion: number | null, event: Event) {
                console.warn('等待其他標籤頁釋放資料庫', { currentVersion, blockedVersion });
            },

            /** 當資料庫連線終止時觸發。 */
            terminated() {
                console.warn('資料庫連線終止');
            }
        });
    }
    return dbPromise;
}
