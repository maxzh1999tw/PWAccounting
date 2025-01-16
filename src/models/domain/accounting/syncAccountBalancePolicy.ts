import { getAccountRepository, getRecordRepository } from '@/models/injection';
import { Record, RecordTypeEnum } from '@/models/domain/accounting/record';

export class SyncAccountBalancePolicy {
    private accountRepository = getAccountRepository();

    async onNewRecordAddedAsync(record: Record) {
        let account = await this.accountRepository.getByIdAsync(record.accountId!);
        if (!account) {
            throw new Error('Account not found');
        }

        if (record.recordType == RecordTypeEnum.Spend) {
            account.balance -= record.amount;
            await this.accountRepository.updateAsync(account);
        } else if (record.recordType == RecordTypeEnum.Income) {
            account.balance += record.amount;
            await this.accountRepository.updateAsync(account);
        } else if (record.recordType == RecordTypeEnum.Transfer) {
            let toAccount = await this.accountRepository.getByIdAsync(record.toAccountId!);
            if (!toAccount) {
                throw new Error('Account not found');
            }

            account.balance -= record.amount;
            toAccount!.balance += record.amount;
            await this.accountRepository.updateAsync(account);
            await this.accountRepository.updateAsync(toAccount);
        } else {
            throw new Error('RecordType not found');
        }
    }

    async onRecordUpdatingAsync(newRecord: Record) {
        let recordRepository = getRecordRepository();
        let oldRecord = await recordRepository.getByIdAsync(newRecord.id!);
        if (!oldRecord) {
            throw new Error('Old record not found');
        }

        let account = await this.accountRepository.getByIdAsync(newRecord.accountId!);

        if (account && oldRecord!.recordType == RecordTypeEnum.Spend) {
            account.balance += oldRecord.amount;
            account.balance -= newRecord.amount;
        } else if (account && oldRecord.recordType == RecordTypeEnum.Income) {
            account.balance -= oldRecord.amount;
            account.balance += newRecord.amount;
        } else if (oldRecord.recordType == RecordTypeEnum.Transfer) {
            let oldToAccount = await this.accountRepository.getByIdAsync(oldRecord.toAccountId!);

            if (account) {
                account.balance += oldRecord.amount;
                account.balance -= newRecord.amount;
            }
            if (oldToAccount) {
                oldToAccount.balance -= oldRecord.amount;
                await this.accountRepository.updateAsync(oldToAccount);
            }

            let newToAccount = await this.accountRepository.getByIdAsync(newRecord.toAccountId!);
            if (!newToAccount) {
                throw new Error('New toAccount not found');
            }
            newToAccount.balance += newRecord.amount;
            await this.accountRepository.updateAsync(newToAccount);
        }

        if (account) {
            await this.accountRepository.updateAsync(account);
        }
    }

    async onRecordRemovedAsync(record: Record) {
        let account = await this.accountRepository.getByIdAsync(record.accountId!);
        if (!account) {
            throw new Error('Account not found');
        }

        if (record.recordType == RecordTypeEnum.Spend) {
            account.balance += record.amount;
        } else if (record.recordType == RecordTypeEnum.Income) {
            account.balance -= record.amount;
        } else if (record.recordType == RecordTypeEnum.Transfer) {
            let toAccount = await this.accountRepository.getByIdAsync(record.toAccountId!);
            if (!toAccount) {
                throw new Error('Account not found');
            }
            account.balance += record.amount;
            toAccount.balance -= record.amount;
            await this.accountRepository.updateAsync(toAccount);
        } else {
            throw new Error('RecordType not found');
        }

        await this.accountRepository.updateAsync(account);
    }
}
