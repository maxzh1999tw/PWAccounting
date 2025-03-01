import type { RecordTypeEnum } from './record';
import type { RecordCategory } from './recordCategory';

export interface RecordCategoryRepository {
    getAllAsync(): Promise<RecordCategory[]>;
    getByTypeAsync(recordType: RecordTypeEnum): Promise<RecordCategory[]>;
    addAsync(recordCategory: RecordCategory): Promise<void>;
    getByIdAsync(id: number): Promise<RecordCategory | undefined>;
    updateAsync(recordCategory: RecordCategory): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}
