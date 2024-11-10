export enum AccountTypeEnum {
    General = '一般'
}

export enum CurrencyEnum {
    NTD = 'NTD',
    BTC = 'BTC',
    JPY = 'JPY'
}

export type Account = {
    id?: number;
    name: string;
    type: AccountTypeEnum;
    balance: number;
    currency: CurrencyEnum;
    memo?: string;
};

export type RecordCategory = {
    id?: number;
    name: string;
    isActive: boolean;
};

export interface Record {
    id?: number;
    dateTime: Date;
}

export type SpendRecord = {
    id?: number;
    dateTime: Date;
    amount: number;
    spendRecordCategoryId: number;
    accountId: number;
    memo?: string;
};

export type IncomeRecord = {
    id?: number;
    dateTime: Date;
    amount: number;
    incomeRecordCategoryId: number;
    accountId: number;
    memo?: string;
};

export type TransferRecord = {
    id?: number;
    dateTime: Date;
    amount: number;
    fee: number;
    fromAccountId: number;
    toAccountId: number;
    memo?: string;
};
