import { AccountTypeEnum, AccountCurrencyEnum } from '@/types/mainTypes/AccountingTypes';
import type { IDBPDatabase, IDBPTransaction, StoreNames } from 'idb';

export default function (
    database: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, StoreNames<unknown>[], 'versionchange'>
): void {
    const accountStore = database.createObjectStore('accounts', { keyPath: 'id' });
    database.createObjectStore('spendRecordTypes', { keyPath: 'id' });
    database.createObjectStore('incomeRecordTypes', { keyPath: 'id' });
    database.createObjectStore('records', { keyPath: 'id' });

    accountStore.add({
        id: 1,
        name: '現金',
        type: AccountTypeEnum.General,
        balance: 560000,
        currency: AccountCurrencyEnum.NTD,
        memo: '測試'
    });

    accountStore.add({
        id: 2,
        name: '銀行',
        type: AccountTypeEnum.General,
        balance: 7600,
        currency: AccountCurrencyEnum.NTD,
        memo: '銀行代碼 306'
    });
}
