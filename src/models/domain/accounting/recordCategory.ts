import type { RecordTypeEnum } from './record';

export class RecordCategory {
    public id?: number;
    public name: string;
    public recordType: RecordTypeEnum;

    constructor(name: string, recordType: RecordTypeEnum) {
        this.name = name;
        this.recordType = recordType;
    }
}
