import {useEffect, useState} from 'react';

export default function Demo() {
    useEffect(() => {
        console.log('123123'); // onMounted 执行
        const timer = setInterval(() => {
            console.log('timer');
        }, 1000)
        // 生命周期函数 onMounted onUpdated onUnmounted
        // 卸载
        // 为什么return了还是一直打印timer？
        // 因为定时器是异步的，return 函数是在组件卸载前调用，定时器还没有执行完
        // 和App.jsx中的定时器副作用不同，App.jsx中的定时器副作用是在组件卸载前调用，定时器已经执行完
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