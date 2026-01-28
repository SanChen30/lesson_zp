import express from 'express'; // 引入后端框架express
import cors from 'cors'; // 引入跨域模块
// langchain 支持 ollama
import { ChatOllama } from "@langchain/ollama";
// 提示词模块
import { ChatPromptTemplate } from '@langchain/core/prompts';
// 输出格式化模块
import { StringOutputParser } from '@langchain/core/output_parsers';

const model = new ChatOllama({
    baseUrl: "http://127.0.0.1:11434",
    model: "deepseek-r1:8b",
    temperature: 0.1 // 严格
})
// Web server 基于 http 协议，在某个端口（3000）监听请求
const app = express(); // 创建应用实例
const port = 3000;

app.use(cors()); // 跨域配置中间件

// 使用中间件解析 JSON 格式的请求体为 js 对象
app.use(express.json());

// 路由
// method: get
// path: /hello
// response: hello world
// req 请求对象
// res 响应对象
// get 请求没有请求体
app.get('/hello', (req, res) => {
    res.send('hello world');
})

app.post('/chat', async (req, res) => {
    const { message } = req.body; // 从请求体里解构出用户的提问
    // 后端稳定第一
    if (!message || typeof message !== 'string') {
        // 响应头 statusCode 400，用户请求错误
        // 响应体是 json 格式
        // status 响应头，json 响应体
        // .send 返回文本，.json 后端 API 服务数据接口格式是 json
        return res.status(400).json({
            error: "message 必填，且必须是字符串"
        })
    }
    try {
        const prompt = ChatPromptTemplate.fromMessages([
            ['system', 'You are a helpful assistant.'],
            ['human', '{input}']
        ]);
        const chain = prompt
            .pipe(model)
            .pipe(new StringOutputParser());
        console.log('正在调用大模型');

        const result = await chain.invoke({
            input: message
        });
        res.status(200).json({
            reply: result
        })
    } catch (error) {
        console.error('调用大模型失败:', error);
        res.status(500).json({
            error: "调用大模型失败"
        })
    }
})

app.listen(port, () => {
    console.log('Server is running on port 3000');
})