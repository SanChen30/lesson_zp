import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
// Zod 是一个用于 TypeScript 的高性能、声明式 schema 验证库，支持运行时类型检查与静态类型推导。
import { z } from 'zod';
import 'dotenv/config'

const model = new ChatDeepSeek({
    model: 'deepseek-reasoner',
    temperature: 0,
});

// 前端概念Schema，让大模型按照我们指定的返回结果格式回答问题。zod 校验, 是一个对象，字段名为name，数据类型为string，描述为概念名称
const FrontendConceptSchema = z.object({
    name: z.string().describe('概念名称'),
    core: z.string().describe('核心要点'),
    useCase: z.array(z.string()).describe('常见使用场景'),
    difficulty: z.enum('简单', '中等', '困难').describe('学习难度')
})

// console.log(FrontendConceptSchema);

const jsonParser = new JsonOutputParser(FrontendConceptSchema);

const prompt = PromptTemplate.fromTemplate(`
  你是一个只会输出 JSON 的 API，不允许输出任何解释性文字。

  ⚠️ 你必须【只返回】符合以下 Schema 的 JSON：
  - 不允许增加字段
  - 不允许减少字段
  - 字段名必须完全一致，使用name、core、useCase、difficulty
  - 返回结果必须可以被 JSON.parse 成功解析

  {format_instructions}

  前端概念：{topic}
`);

// chain 提示词编译->模型调用->json解析器验证
const chain = prompt.pipe(model).pipe(jsonParser);
// console.log(jsonParser.getFormatInstructions(), 'zod');
const response = await chain.invoke({
    topic: 'Promise',
    format_instructions: jsonParser.getFormatInstructions(),
});
console.log(response);