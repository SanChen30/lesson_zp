import { 
  useState,
  useMemo, // 性能优化
 } from 'react';

 // 昂贵的计算
 function slowSum(n) {
  console.log('计算中...');
  let sum = 0;
  for (let i = 0; i < n * 10000; i++) {
    sum += i;
  }
  return sum;
}

export default function App() {
  // count 和 keyword 不相关
  // 状态的改变会带来组件函数的重新运行
  // useEffect、useMemo、useCallback 用来标记一下不用运行
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const list = ['apple', 'orange', 'peach', 'banana'];

  // 缓存计算结果
  // const filterList = list.filter(item => {
  //   console.log('filter 执行'); // count 变的时候
  //   return item.includes(keyword);
  // })

  const filterList = useMemo(() => {
    // 类似于vue的computed
    console.log('filter 执行'); // 只有在keyword改变的时候才会执行
    return list.filter(item => item.includes(keyword));
  }, [keyword])

  const [num, setNum] = useState(0);
  // 直接缓存昂贵的计算
  const result = useMemo(() => {
    return slowSum(num);
  }, [num])

  
  return (
    <div>
      <p>结果: {result}</p>
      <button onClick={() => setNum(num + 1)}>num + 1</button>
      
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      {count}
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      {
        filterList.map(item => (
          <li key={item}>{item}</li>
        ))
      }
    </div>
  )
}