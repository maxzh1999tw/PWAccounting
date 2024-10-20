import { AccountCurrencyEnum, AccountTypeEnum, type Account } from '@/types/mainTypes/AccountingTypes';
import { defineStore } from 'pinia';

export const useAccountsStore = defineStore({
    id: 'accounts',
    state: () => ({
        accounts: [
            {
                id: 1,
                name: '現金',
                type: AccountTypeEnum.General,
                balance: 560000,
                currency: AccountCurrencyEnum.NTD,
                memo: '測試'
            },
            {
                id: 2,
                name: '銀行',
                type: AccountTypeEnum.General,
                balance: 7600,
                currency: AccountCurrencyEnum.NTD,
                memo: '銀行代碼 306'
            }
        ] as Account[]
    }),
    getters: {},
    actions: {
        addAccount(account: Account) {
            account.id = this.accounts.length + 1;
            this.accounts.push(account);
        },
        updateAccount(account: Account) {
            const index = this.accounts.findIndex((a) => a.id === account.id);
            this.accounts[index] = account;
        }
    }
});
