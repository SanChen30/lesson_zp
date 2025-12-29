import {
  useEffect, // 副作用
  useState, // 响应
  useRef, // 默默奉献存储能力
} from 'react';

export default function App() {
    let intervalId = useRef(null);
    const [count, setCount] = useState(0);
    function start() {
        intervalId.current = setInterval(() => {
            console.log('tick~~~~');
        },1000)
        console.log(intervalId.current);
    }
    function stop() {
        clearInterval(intervalId.current);
    }

    useEffect(() => {
        console.log(intervalId.current);
    }, [count])
  return (
    <>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
      {count}
      <button type="button" onClick={() => setCount(count + 1)}>count++</button>
    </>
  )
}