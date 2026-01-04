import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import 'dotenv/config'

const model = new ChatDeepSeek({
    model: 'deepseek-reasoner',
    temperature: 0,
})

// 前端概念 zod 校验, 校验 LLM 生成的内容是否符合前端概念
const FrontendSchema = z.object({
    name: z.string().describe('概念名称'),
    core: z.string().describe('核心要点'),
    useCase: z.array(z.string()).describe('常见使用场景'),
    difficulty: z.enum(['简单', '中等', '困难']).describe('学习难度')
})

console.log(FrontendSchema);