import type { CurrencyEnum } from '@/types/mainTypes/AccountingTypes';

export function displayBalance(balance: number, currency?: CurrencyEnum) {
    let result = `${new Intl.NumberFormat().format(balance)}`;
    if (currency) {
        result += ` ${currency}`;
    }
    return result;
}
