export class Record {
    public id?: number;
    public recordType: RecordTypeEnum;
    public dateTime: Date;
    public amount: number;
    public categoryId?: number;
    public accountId?: number;
    public memo?: string;
    // 以下是轉移專用欄位
    public fee?: number;
    public toAccountId?: number;

    constructor(
        recordType: RecordTypeEnum,
        dateTime: Date,
        amount: number,
        categoryId?: number,
        accountId?: number,
        memo?: string,
        fee?: number,
        toAccountId?: number
    ) {
        this.recordType = recordType;
        this.dateTime = dateTime;
        this.amount = amount;
        this.categoryId = categoryId;
        this.accountId = accountId;
        this.memo = memo;
        this.fee = fee;
        this.toAccountId = toAccountId;
    }

    static getNewSpendRecord(initCategoryId: number | undefined, initAccountId: number | undefined): Record {
        return new Record(RecordTypeEnum.Spend, new Date(), 0, initCategoryId, initAccountId);
    }

    static getNewIncomeRecord(initCategoryId: number | undefined, initAccountId: number | undefined): Record {
        return new Record(RecordTypeEnum.Income, new Date(), 0, initCategoryId, initAccountId);
    }

    static getNewTransferRecord(initAccountId1: number | undefined, initAccountId2: number | undefined): Record {
        return new Record(RecordTypeEnum.Transfer, new Date(), 0, undefined, initAccountId1, undefined, undefined, initAccountId2);
    }
}

export enum RecordTypeEnum {
    Spend = '支出',
    Income = '收入',
    Transfer = '轉移'
}
