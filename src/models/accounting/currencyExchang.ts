import type { CurrencyEnum } from '@/types/mainTypes/AccountingTypes';

interface AmountWithCurrency {
    amount: number;
    currency: CurrencyEnum;
}

export default {
    exchange(source: AmountWithCurrency, targetCurrency: CurrencyEnum): AmountWithCurrency {
        return {
            amount: source.amount,
            currency: targetCurrency
        };
    }
};
