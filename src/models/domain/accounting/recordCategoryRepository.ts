import type { RecordTypeEnum } from './record';
import type { RecordCategory } from './recordCategory';

export interface RecordCategoryRepository {
    getAllAsync(): Promise<RecordCategory[]>;
    getByTypeAsync(recordType: RecordTypeEnum): Promise<RecordCategory[]>;
}
