import { type Record } from './record';

export interface RecordRepository {
    getMonthRecordsAsync(month: Date): Promise<Record[]>;
    addAsync(record: Record): Promise<void>;
    updateAsync(record: Record): Promise<void>;
}
