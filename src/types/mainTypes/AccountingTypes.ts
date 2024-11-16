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
    recordType: RecordTypeEnum;
    isActive: boolean;
};

export enum RecordTypeEnum {
    Spend = '支出',
    Income = '收入',
    Transfer = '轉移'
}

export type Record = {
    id?: number;
    recordType: RecordTypeEnum;
    dateTime: Date;
    amount: number;
    categoryId?: number;
    accountId?: number;
    memo?: string;
    // 以下是轉移專用欄位
    fee: number;
    toAccountId: number;
};
