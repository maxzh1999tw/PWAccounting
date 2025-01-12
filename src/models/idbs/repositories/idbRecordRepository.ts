import type { Record } from '@/models/domain/accounting/record';
import type { RecordRepository } from '@/models/domain/accounting/recordRepository';
import { getDB } from '../dbContext';
import { StoreName } from '../names';
import { getMothRange } from '@/helpers/dateHelper';

export class IdbRecordRepository implements RecordRepository {
    private db = getDB();

    async getMonthRecordsAsync(month: Date): Promise<Record[]> {
        const { startOfMonth, endOfMonth } = getMothRange(month);
        const monthRange = IDBKeyRange.bound(startOfMonth, endOfMonth, false, false);
        return await (await this.db).getAllFromIndex(StoreName.Records, 'dateTime', monthRange);
    }

    async addAsync(record: Record): Promise<void> {
        await (await this.db).add(StoreName.Records, record);
    }

    async updateAsync(record: Record): Promise<void> {
        await (await this.db).put(StoreName.Records, record);
    }
}
