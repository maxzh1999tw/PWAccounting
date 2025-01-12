import type { AccountRepository } from './domain/accounting/accountRepository';
import { IdbAccountRepository } from './idbs/repositories/idbAccountRepository';

export function getAccountRepository(): AccountRepository {
    return new IdbAccountRepository();
}
