import { type Record } from './record';

export interface RecordRepository {
    getMonthRecordsAsync(month: Date): Promise<Record[]>;
    getByIdAsync(id: number): Promise<Record | undefined>;
    addAsync(record: Record): Promise<void>;
    updateAsync(record: Record): Promise<void>;
    removeAsync(id: number): Promise<void>;
}
