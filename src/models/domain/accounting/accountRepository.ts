import type { Account } from './account';

export interface AccountRepository {
    getAllAsync(): Promise<Account[]>;
    addAsync(account: Account): Promise<void>;
    getByIdAsync(id: number): Promise<Account | undefined>;
    updateAsync(account: Account): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}
