import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0); // 响应式状态
  console.log("变了~~~~~");
  const inputRef = useRef(null); // 初始值为空
  console.log(inputRef.current); // 初始值为空
  useEffect(() => {
    console.log(inputRef.current); // 选中当前 input 元素
    inputRef.current.focus(); // 设置当前 input 元素为焦点
  }, [])
  // 自动聚焦
  return (
    <>
      <input ref={inputRef} />
      {count}
      <button type="button" onClick={() => setCount(count + 1)}>count++</button>
    </>
  )
}