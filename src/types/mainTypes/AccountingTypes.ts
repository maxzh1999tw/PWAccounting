export enum AccountTypeEnum {
    General,
    Investment
}

export enum AccountCurrencyTypes {
    NTD = 'NTD',
    BTC = 'BTC',
    JPY = 'JPY'
}

export type AccountType = {
    id: number;
    name: string;
    type: AccountTypeEnum;
    balance: number;
    currency: AccountCurrencyTypes;
    memo?: string;
};
