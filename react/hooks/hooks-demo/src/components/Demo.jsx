import {useEffect, useState} from 'react';

export default function Demo() {
    useEffect(() => {
        console.log('123123'); // onMounted 执行
        const timer = setInterval(() => {
            console.log('timer');
        }, 1000)
        // 生命周期函数 onMounted onUpdated onUnmounted
        // 卸载
        // 当num是偶数时，子组件还在页面上，没有卸载不会执行return清理函数，
        // 而当num变为奇数时，<Demo /> 被移除 → React 自动调用 return () => {...} → 清理定时器。
        return () => { // 卸载前执行回收
            console.log('remove');
            clearInterval(timer);
        }
    }, [])
    return (
        <div>
            偶数Demo
        </div>
    )
}