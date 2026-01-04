import { useState, memo, useCallback } from 'react';

// function Child() {
//     console.log('子组件渲染了');
//     return (
//         <div>
//             子组件
//         </div>
//     )
// }

// 高阶组件是一个函数，接收一个组件作为参数，并返回一个新的组件。
const Child = memo(({count, handleClick}) => {
    console.log('子组件渲染了');
    return (
        <div onClick={handleClick}>
            子组件{count}
        </div>
    )
})

export default function App() {
    // 父组件负责持有数据和管理数据
    // 某一个数据改变，只想让相关的子组件重新渲染
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);

    // 父组件可能要将函数传递给子组件
    // 每次都会是一个新函数
    // 但是父子组件通信传递函数是常态，缓存函数 useCallback 可以避免子组件重新渲染
    // const handleClick = () => {
    //     console.log('click');
    // }

    // 缓存函数
    const handleClick = useCallback(() => {
        console.log('click');
    }, [count]);

    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>count + 1</button>
            {num}
            <button onClick={() => setNum(num + 1)}>num + 1</button>
            {/* 子组件 */}
            <Child count={count} handleClick={handleClick} />
        </div>
    )
}