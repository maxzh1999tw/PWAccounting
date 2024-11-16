/**
 * 通用 distinct 函式，可對任意陣列進行去重。
 * @param array - 要去重的陣列
 * @param keyExtractor - (可選) 提取 key 的函數，用於對物件陣列或依 lambda 值進行去重
 * @returns 去重後的新陣列
 */
export function distinct<T>(array: T[], keyExtractor?: (item: T) => any): T[] {
    if (!keyExtractor) {
        // 對基本型別使用 Set 去重
        return Array.from(new Set(array));
    } else {
        // 對物件陣列或自定義 key 值使用 Map 去重
        const map = new Map();
        for (const item of array) {
            const key = keyExtractor(item);
            if (!map.has(key)) {
                map.set(key, item);
            }
        }
        return Array.from(map.values());
    }
}
