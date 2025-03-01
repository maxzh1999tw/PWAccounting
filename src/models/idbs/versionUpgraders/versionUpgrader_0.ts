import type { IDBPDatabase, IDBPTransaction, StoreNames } from 'idb';
import { StoreName } from '../names';
import { nameof } from 'ts-simple-nameof';
import { Account, AccountTypeEnum, CurrencyEnum } from '@/models/domain/accounting/account';
import { Record, RecordTypeEnum } from '@/models/domain/accounting/record';
import { RecordCategory } from '@/models/domain/accounting/recordCategory';

export default function (
    database: IDBPDatabase<unknown>,
    transaction: IDBPTransaction<unknown, StoreNames<unknown>[], 'versionchange'>
): void {
    addAccountsStore(database);
    addRecordsStore(database);
    addRecordCategoriesStore(database);
}

function addAccountsStore(database: IDBPDatabase<unknown>): void {
    const accountStore = database.createObjectStore(StoreName.Accounts, {
        keyPath: nameof<Account>((x) => x.id),
        autoIncrement: true
    });
    accountStore.add({
        name: '現金',
        type: AccountTypeEnum.General,
        balance: 560000,
        currency: CurrencyEnum.NTD,
        memo: '測試'
    });

    accountStore.add({
        name: '銀行',
        type: AccountTypeEnum.General,
        balance: 7600,
        currency: CurrencyEnum.NTD,
        memo: '銀行代碼 306'
    });
}

function addRecordsStore(database: IDBPDatabase<unknown>): void {
    const recordStore = database.createObjectStore(StoreName.Records, {
        keyPath: nameof<Record>((x) => x.id),
        autoIncrement: true
    });
    const propertyName = nameof<Record>((x) => x.dateTime);
    recordStore.createIndex(propertyName, propertyName, { unique: false });
}

function addRecordCategoriesStore(database: IDBPDatabase<unknown>): void {
    const recordCategoriesStore = database.createObjectStore(StoreName.RecordCategories, {
        keyPath: nameof<RecordCategory>((x) => x.id),
        autoIncrement: true
    });

    recordCategoriesStore.add({
        name: '飲食',
        recordType: RecordTypeEnum.Spend
    } as RecordCategory);

    recordCategoriesStore.add({
        name: '生活',
        recordType: RecordTypeEnum.Spend
    });

    recordCategoriesStore.add({
        name: '薪資',
        recordType: RecordTypeEnum.Income
    });

    recordCategoriesStore.add({
        name: '投資',
        recordType: RecordTypeEnum.Income
    });

    const propertyName = nameof<RecordCategory>((x) => x.recordType);
    recordCategoriesStore.createIndex(propertyName, propertyName, { unique: false });
}
