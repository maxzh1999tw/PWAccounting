import type { AccountType } from '@/types/mainTypes/AccountingTypes';
import { defineStore } from 'pinia';

export const useAccountsStore = defineStore({
    id: 'accounts',
    state: () => ({
        accounts: [] as AccountType[]
    }),
    getters: {},
    actions: {
        addAccount(account: AccountType) {
            account.id = this.accounts.length + 1;
            this.accounts.push(account);
        },
        updateAccount(account: AccountType) {
            const index = this.accounts.findIndex((a) => a.id === account.id);
            this.accounts[index] = account;
        }
    }
});
