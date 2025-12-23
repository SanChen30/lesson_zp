import 'dotenv/config';
// console.log(process.env.DEEPSEEK_API_KEY);
import { ChatDeepSeek } from '@langchain/deepseek';

const model = new ChatDeepSeek({
    model: 'deepseek-reasoner',
    temperature: 0,
    // langchain 帮我们适配了市面上大多数的LLM
    // 适配器模式，不用传 baseURL, apiKey，直接从环境变量中获取
    // baseURL ?
    // apiKey ?
})

// invoke 调用
const res = await model.invoke('用一句话解释什么是RAG');
console.log(res.content);