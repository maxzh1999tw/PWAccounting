import type { RecordTypeEnum } from './record';

export class RecordCategory {
    public id?: number;
    public name: string;
    public recordType: RecordTypeEnum;
    public isActive: boolean;

    constructor(name: string, recordType: RecordTypeEnum, isActive: boolean) {
        this.name = name;
        this.recordType = recordType;
        this.isActive = isActive;
    }
}
