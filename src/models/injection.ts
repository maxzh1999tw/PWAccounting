import type { AccountRepository } from './domain/accounting/accountRepository';
import type { RecordCategoryRepository } from './domain/accounting/recordCategoryRepository';
import type { RecordRepository } from './domain/accounting/recordRepository';
import { IdbAccountRepository } from './idbs/repositories/idbAccountRepository';
import { IdbRecordCategoryRepository } from './idbs/repositories/idbRecordCategoryRepository';
import { IdbRecordRepository } from './idbs/repositories/idbRecordRepository';

export function getAccountRepository(): AccountRepository {
    return new IdbAccountRepository();
}

export function getRecordRepository(): RecordRepository {
    return new IdbRecordRepository();
}

export function getRecordCategoryRepository(): RecordCategoryRepository {
    return new IdbRecordCategoryRepository();
}
