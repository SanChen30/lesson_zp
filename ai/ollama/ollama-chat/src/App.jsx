import { useEffect } from 'react';
import axios from 'axios'; // react 开发标配 http 请求库

export default function App() {
  useEffect(() => {
    // api 请求在页面挂载之后
    // fetch('https://api.github.com/users/shunwuyu/repos')
    // .then(data => data.json())
    // .then(res => {
    //   console.log(res);
    // })

    // http 请求框架
    axios
     .get('https://api.github.com/users/shuwuyu/repos')
     .then(res => {
      console.log(res.data);
     })
  }, [])
  return (
    <>
    App
    </>
  )
}