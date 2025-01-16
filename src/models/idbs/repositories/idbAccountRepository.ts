import type { AccountRepository } from '@/models/domain/accounting/accountRepository';
import { getDB } from '../dbContext';
import type { Account } from '@/models/domain/accounting/account';
import { StoreName } from '../names';

export class IdbAccountRepository implements AccountRepository {
    private db = getDB();

    async getAllAsync(): Promise<Account[]> {
        return await (await this.db).getAll(StoreName.Accounts);
    }

    async addAsync(account: Account): Promise<void> {
        delete account.id;
        await (await this.db).add(StoreName.Accounts, account);
    }

    async getByIdAsync(id: number): Promise<Account | undefined> {
        return await (await this.db).get(StoreName.Accounts, id);
    }

    async updateAsync(account: Account): Promise<void> {
        await (await this.db).put(StoreName.Accounts, account);
    }

    async deleteAsync(id: number): Promise<void> {
        await (await this.db).delete(StoreName.Accounts, id);
    }
}
