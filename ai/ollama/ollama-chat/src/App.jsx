import { useEffect, useState } from 'react';
import { chatCompletions } from './api/ollamaApi.js';
import { useLLM } from './hooks/useLLM.js';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const { messages, loading } = useLLM();  
  const handleSend = () => {

  }
  // messages loading sendMessage 响应式状态，需要封装，hooks文件     
  useEffect(() => {
    // api 请求在页面挂载之后
    // fetch('https://api.github.com/users/shunwuyu/repos')
    // .then(data => data.json())
    // .then(res => {
    //   console.log(res);
    // })

    // http 请求框架
    //   axios
    //    .get('https://api.github.com/users/shuwuyu/repos')
    //    .then(res => {
    //     console.log(res.data);
    //    })
    // }, [])

    (
      async () => {
        const res = await chatCompletions([
          {
            role: 'user',
            content: '你好',
          }
        ])
        console.log(res);
      }
    )()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-[800px] bg-white rounded-lg shadow-md flex flex-col h-[90vh] max-h-[800px]"></div>
      <form className="p-4 border-t" onSubmit={handleSend}>
        <div className="flex gap-2">
          <input 
          type="text" 
          placeholder="输入消息...按回车发送" 
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400" 
          disabled={loading || !inputValue.trim()}>发送</button>
        </div>
      </form>
    </div>
  )
}