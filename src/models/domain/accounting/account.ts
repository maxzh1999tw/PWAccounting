export class Account {
    public id?: number;
    public name: string;
    public type: AccountTypeEnum;
    public balance: number;
    public currency: CurrencyEnum;
    public memo?: string;

    constructor(name: string, type: AccountTypeEnum, balance: number, currency: CurrencyEnum, memo?: string) {
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.currency = currency;
        this.memo = memo;
    }
}

export enum AccountTypeEnum {
    General = '一般'
}

export enum CurrencyEnum {
    NTD = 'NTD',
    BTC = 'BTC',
    JPY = 'JPY'
}
