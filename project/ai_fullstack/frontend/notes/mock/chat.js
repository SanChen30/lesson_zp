// 流式输出本质是边算（LLM token 生成）边给，而不是等全部结果生成再一次性返回
// AI场景中，模型生成文本是逐个 token 产生的（模型每次基于已生成的 token 序列，通过自回归方式预测下一个最可能的 token）
// streaming:true
// http chunked 数据块来传，res.end() 不用这个
// res.write(chunk) 写入数据块
// res.send text/plain 格式
// SSE text/event-stream 格式，模式去发送tokens
import { config } from 'dotenv';
config();

export default [
    {
        url: '/api/ai/chat',
        method: 'post',
        // rawResponse 用于自定义原始 HTTP 响应（流式输出）
        // 而 response 通常指封装后的结构化响应
        rawResponse: async (req, res) => {
            // node 原生的去拿到请求体
            // 在 Node.js 原生 http 模块中，请求体不是一次性给你的，而是通过 流（Stream） 以多个 chunk（数据块）的形式到达
            // chunk 数据块 (buffer)
            // 每个 chunk 是一个 Buffer（或字符串），代表 TCP 传输中的一段数据。
            // 多个 chunk 按 TCP 保证的顺序到达，最终拼成完整请求体。
            // tcp/ip 可靠的传输协议     
            // http 协议的底层协议就是 tcp/ip 协议
            // ip 负责通信 tcp 负责调度，管理，控制  
            // tcp 按顺序组装，失败重传 例如网页的 html 代码
            let body = '';
            // chunk 二进制流 buffer
            // 字符串
            req.on('data', (chunk) => { body += chunk });
            req.on('end', async () => {
                // console.log(body);
                try {
                    const { messages } = JSON.parse(body);
                    // console.log(messages);
                    res.setHeader('Content-Type', 'text/plain;charset=utf-8'); //告诉浏览器：这是文本流。
                    // 响应头先告诉浏览器，这是一个流式响应，数据会分块传输
                    res.setHeader('Transfer-Encoding', 'chunked'); //告诉浏览器：数据会一块一块来，不要等结束。
                    // vercel ai sdk 特制头
                    res.setHeader('x-vercel-ai-data-stream', 'v1'); //告诉 AI SDK：用 AI streaming 协议解析它。
                    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
                        },
                        body: JSON.stringify({
                            model: 'deepseek-chat',
                            messages: messages,
                            stream: true // 流式输出
                        })
                    })
                    if(!response.body) throw new Error('No response body');
                    // SSE 二进制流 reader 对象
                    // 大模型输出和解析之间连上一根管子 reader
                    // reader对象不断读取 LLM 输出的 token 流
                    const reader = response.body.getReader();// 是一个 token 流，二进制流对象
                    // 用于将 ArrayBuffer 或 TypedArray（如 Uint8Array）解码为字符串
                    // Uint8Array 字节数据 -> 解码为UTF-8 字符串，解码器
                    const decoder = new TextDecoder();
                    while(true) {
                        // LLM 的这一次生成被读到了
                        // 事件，有新的 token 生成
                        // value 是 Uint8Array
                        const { done, value } = await reader.read();
                        console.log(done, value, '-------------');
                        if(done) break;
                        // 解析出 token 字符串，LLM 内部 数学向量
                        const chunk = decoder.decode(value);
                        // data: 前缀
                        // delta（增量）表示本次流式响应中新生成的那一小段内容，而不是完整回复
                        console.log(chunk, '//////////////'); // JSON 字符串 解构 choice[0].delta.content 内容
                        const lines = chunk.split('\n'); // 拿到每一行的有效数据
                        for(let line of lines) { // 不需要用到下标，只关注数据本身，好理解，计数循环比较机械
                            // line 是字符串
                            // line.indexof("data:") === 0 等价于 line.startsWith('data:')
                            // ES6 新 API，字符串开头是否包含指定子字符串，更优雅，更易读
                            // data: [DONE] 表示流式响应结束，结束信号
                            if(line.startsWith('data:') && line !== 'data: [DONE]') {
                                try {
                                    const data = JSON.parse(line.slice(6));
                                    // ?. 代码的健壮性
                                    const content = data.choices[0]?.delta?.content || '';
                                    if(content) {
                                        // 响应对象，发送给前端，SSE 核心，用res.write 代替 res.send
                                        // 前缀	意义
                                        // 0	文本 token
                                        // 1	tool
                                        // 2	error
                                        // 向输出流不断地写入content
                                        res.write(`0:${JSON.stringify(content)}\n`)
                                    }
                                } catch(err) {
                                    console.error(err);
                                }
                            }
                        }
                    }
                    // 结束响应
                    res.end();
                } catch (error) {
                    console.error(error);
                }
            })
        }
    }
]