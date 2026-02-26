// react 版本的防抖
import { useState, useEffect } from 'react';

// 通用
// T 是泛型占位符，代表“传入值的类型”
// keyword 是防抖的目标值，delay 是防抖时间，返回值是防抖后的目标值
export function useDebounce<T>(value: T, delay: number): T {
    const [debounceValue, setDebounceValue] = useState<T>(value); // 防抖后的值
    // api 请求 debounceValue 负责
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        // 清理函数
        // 当依赖项发生变化时，会先执行上一次effect的清理函数，再运行新的effect
        return () => { // 卸载时，更新时都会触发
            clearTimeout(handler);
        }
    }, [value, delay])
    return debounceValue;
}