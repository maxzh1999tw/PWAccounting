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

    async addAsync(recordCategory: RecordCategory): Promise<void> {
        delete recordCategory.id;
        await (await this.db).add(StoreName.RecordCategories, recordCategory);
    }

    async getByIdAsync(id: number): Promise<RecordCategory | undefined> {
        return await (await this.db).get(StoreName.RecordCategories, id);
    }

    async updateAsync(recordCategory: RecordCategory): Promise<void> {
        await (await this.db).put(StoreName.RecordCategories, recordCategory);
    }

    async deleteAsync(id: number): Promise<void> {
        await (await this.db).delete(StoreName.RecordCategories, id);
    }
}
