import dayjs from 'dayjs';

export function formatDate(date: Date, format: string): string {
    return dayjs(date).format(format);
}

export function getMothRange(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
}
