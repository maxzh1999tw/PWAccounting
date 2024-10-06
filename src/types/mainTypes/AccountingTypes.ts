export enum AccountTypeEnum {
    General,
    Investment
}

export enum AccountCurrencyTypes {
    NTD,
    BTC,
    JPY
}

export type AccountType = {
    id: number;
    name: string;
    type: AccountTypeEnum;
    balance: number;
    currency: AccountCurrencyTypes;
    memo?: string;
};
