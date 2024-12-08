import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-tw'; // 載入繁體中文語系

dayjs.extend(localizedFormat);
dayjs.locale('zh-tw'); // 設定為繁體中文

export function formatDate(date: Date, format: string): string {
    return dayjs(date).format(format);
}

export function getMothRange(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
}

/**
 * 判斷兩個日期是否為同一天
 * @param date1 - 第一個日期
 * @param date2 - 第二個日期
 * @returns 如果是同一天，返回 true；否則返回 false
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    // 比較年份、月份和日期
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export function getDateOnly(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function AddMonth(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}
