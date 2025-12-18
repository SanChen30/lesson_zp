import { useState } from 'react';

export default function App() {
  // 定义一个状态变量 count，初始值为 1
  // 数组解构赋值，将 useState(1) 返回的数组解构为 count 和 setCount 两个变量
  // 第一个元素是状态变量 count，第二个元素是更新状态的函数 setCount
  // hook useState 为程序员带来了关键的响应式状态
  // 状态是变化的数据，组件的核心是状态
  // 1 是数据，也是状态的初始值
  // const [count, setCount] = useState(1);
  const [count, setCount] = useState(() => {
    // 复杂的初始化逻辑，用函数来计算，必须是同步的函数，不支持异步的，异步的可能不确定，状态一定是需要确定，肯定的
    // 纯函数是指对于相同的输入始终返回相同输出，且没有副作用（如修改外部状态或依赖外部可变数据）的函数。
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  });
  return (
    // <div onClick={() => setCount(count + 1)}>
    // 修改函数中可以直接传入新的值，也可以传入一个函数，这个函数的参数是上一次的state
    <div onClick={() => setCount((prevCount) => {console.log(prevCount);return prevCount + 1})}>
      {count}
    </div>
  )
}