// chain 
// AI 业务是复杂的，分步骤处理，每一步都做到可执行可配置，链接起来，形成一个工作流，Agent 就是这个工作流的实现。
// chain 有先后顺序，有流程的，可以被组织起来的工作流，每个步骤都可以是一个单独的组件，组件之间可以有依赖关系，也可以并行执行。
import 'dotenv/config';
import { ChatDeepSeek } from '@langchain/deepseek';
import { PromptTemplate } from '@langchain/core/prompts';

const model = new ChatDeepSeek({
    model: 'deepseek-reasoner',
    temperature: 0.7
})

const prompt = PromptTemplate.fromTemplate(`
    你是一个前端专家，用一句话解释: {topic}
`);

// prompt 提示词模板生成节点 ->
// model 大模型节点 ->
// 结束节点 invoke
// pipe 方法，将 prompt 提示词模板生成节点和 model 节点连接起来，形成一个工作流
// runnable sequencial workflow
// SequencialChain 顺序链，按照顺序执行，每个步骤的输出作为下一个步骤的输入。
const chain = prompt.pipe(model);
// console.log(chain instanceof RunnableSequence); // 检查 chain 是否是 RunnableSequence 的实例

const response = await chain.invoke({
    topic: '闭包',
});

console.log(response.text);