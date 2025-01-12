import { getAccountRepository, getRecordRepository } from '@/models/injection';
import { Record, RecordTypeEnum } from '@/models/domain/accounting/record';
import { el } from 'vuetify/lib/locale/index.mjs';

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
        console.log('oldRecord', oldRecord);

        let account = await this.accountRepository.getByIdAsync(newRecord.accountId!);
        if (!account) {
            throw new Error('Account not found');
        }
        console.log('account', account);

        if (oldRecord!.recordType == RecordTypeEnum.Spend) {
            account.balance += oldRecord.amount;
            account.balance -= newRecord.amount;
        } else if (oldRecord.recordType == RecordTypeEnum.Income) {
            account.balance -= oldRecord.amount;
            account.balance += newRecord.amount;
        } else if (oldRecord.recordType == RecordTypeEnum.Transfer) {
            let oldToAccount = await this.accountRepository.getByIdAsync(oldRecord.toAccountId!);
            if (!oldToAccount) {
                throw new Error('Old toAccount not found');
            }
            account.balance += oldRecord.amount;
            oldToAccount.balance -= oldRecord.amount;
            await this.accountRepository.updateAsync(oldToAccount);
            let newToAccount = await this.accountRepository.getByIdAsync(newRecord.toAccountId!);
            if (!newToAccount) {
                throw new Error('New toAccount not found');
            }
            account.balance -= newRecord.amount;
            newToAccount.balance += newRecord.amount;
            await this.accountRepository.updateAsync(newToAccount);
        } else {
            throw new Error('Old RecordType not found');
        }

        await this.accountRepository.updateAsync(account);
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
