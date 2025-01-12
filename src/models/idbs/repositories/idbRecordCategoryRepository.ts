import type { RecordCategory } from '@/models/domain/accounting/recordCategory';
import type { RecordCategoryRepository } from '@/models/domain/accounting/recordCategoryRepository';
import { getDB } from '../dbContext';
import { StoreName } from '../names';
import type { RecordTypeEnum } from '@/models/domain/accounting/record';

export class IdbRecordCategoryRepository implements RecordCategoryRepository {
    private db = getDB();

    async getAllAsync(): Promise<RecordCategory[]> {
        return await (await this.db).getAll(StoreName.RecordCategories);
    }

    async getByTypeAsync(recordType: RecordTypeEnum): Promise<RecordCategory[]> {
        return await (await this.db).getAllFromIndex(StoreName.RecordCategories, 'recordType', recordType);
    }
}
