import {
    useState,  // 响应式状态
    useEffect  // 副作用
} from 'react';
import Demo from './components/Demo.jsx';

// async 函数是一个 promise 函数，返回值是一个 promise 对象
async function queryData() {
    const data = await new Promise(resolve => {
        setTimeout(() => {
            resolve(666);
        }, 2000)
    });
    return data;
}

export default function App() {
    const [num, setNum] = useState(0);
    console.log("yyy");
    // useEffect(() => {
    //     console.log("xxx"); // 挂载后执行一次，onMounted；依赖更新时也执行，onUpdated
    //     // 挂载后执行，类似于 vue 生命周期 onMounted
    //     queryData().then(data => {
    //         setNum(data);
    //     })
    // }, [num])
    useEffect(() => {
        console.log('effect');
        // 定时器副作用
        const timer = setInterval(() => {
            console.log(num);
        }, 1000)
        // 每次都在新建定时器
        // 如何取消定时器？
        // 1. 定时器副作用返回一个函数，在函数中取消定时器
        // 2. 依赖项中添加 num，当 num 变化时，取消上一个定时器
        return () => {
            // 重新执行 effect 之前，取消上一个定时器
            // 不清除，会导致内存泄漏
            // useEffect return 函数
            console.log('remove');
            clearInterval(timer);
        }
    }, [num])
    return (
        <>
            {/* 点一下这个 div，num 就加 1。
            使用 prevNum => prevNum + 1 是为了安全地基于上一次的值更新（避免闭包问题）。 */}
            <div onClick={() => setNum(prevNum => prevNum + 1)}>{num}</div>
            {/* 如果 num 是偶数（比如 0, 2, 4...），就显示 <Demo /> 组件；
            如果是奇数（1, 3, 5...），就不显示（相当于“卸载”了 Demo）。 */}
            {num % 2 === 0 && <Demo />}
        </>
    )
}