import 'dotenv/config';
import { ChatDeepSeek } from '@langchain/deepseek'; 
// 适配器，Provider 模式，省去了适配工作
// 适配大模型也是一个工作量，但是 langchain 帮我们做了，我们只需要按照 langchain 的接口规范实现即可。

// 提示词模块
import { PromptTemplate } from '@langchain/core/prompts';

// static 方法，静态方法，属于类的方法，不是实例的
const prompt = PromptTemplate.fromTemplate(`
你是一个{role},
请用不超过 {limit} 字回答以下问题:
{question}?
`)

const promptStr = await prompt.format({
    role: '前端面试官',
    limit: '50',
    question: '什么是闭包'
})

console.log(promptStr);

const model = new ChatDeepSeek({
    model: 'deepseek-reasoner',
    temperature: 0.7,
})

const res = await model.invoke(promptStr);
console.log(res.content);
