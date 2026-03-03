import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage,  //告知工具使用
    AIMessage
} from '@langchain/core/messages';
// node 内置文件模块 异步IO
import fs from 'node:fs/promises';
// 数据校验 zod，tool parameter 校验
import { z } from 'zod';

const model = new ChatOpenAI({
    modelName: process.env.OPENAI_API_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    temperature: 0,
})

// 原生写法复杂
// 新建一个tool
const readFileTool = tool(
    // tool 处理函数的函数体
    // 分析代码文件有没有bug
    // 先用 tool 读取文件内容，path 作为参数 等待它读取完成
    // 再分析bug
    async ({ path }) => {
        const content = await fs.readFile(path, 'utf-8');
        console.log(`[工具调用] read_file("${path}") 成功获取 ${content.length} 个字符`);
        return content;
    },
    {
        name: 'read_file',
        description: `用此工具来读取文件内容。当用户需要读取文件时、查看代码、分析文件内容时，调用此工具。
        输入文件路径（可以是相对路径或绝对路径）`,
        schema: z.object({
            path: z.string().describe('要读取的文件路径')
        })
    }
);

const tools = [
    readFileTool
];

// langchain 提供了一个方法，绑定工具
// model 不再孤单，有了工具的陪伴
// llm 就可以干活了
const modelWithTools = model.bindTools(tools);
const messages = [
    new SystemMessage(
        `
        你是一个代码助手，可以使用工具读取文件并解释代码。

        工作流程：
        1. 用户要求读取文件时，立即调用 read_file 工具
        2. 等待工具返回文件内容
        3. 基于文件内容进行分析和解释

        可用工具：
        - read_file: 读取文件内容（使用此工具来获取文件内容）
        `
    ),
    new HumanMessage('请读取tool-file-read.mjs文件内容并解释代码')
];

// llm 返回的决策，它要调用工具了
// tool_calls 的 api 部分
// 解析出工具name，并执行对应的工具函数，然后拿到 result
// 拿到的 result 还要作为 message 传给 llm
// 最后返回结果
let response = await modelWithTools.invoke(messages);
messages.push(response); // 把 llm 要调用工具的回复添加到 messages 中，形成多轮对话
// 循环调用工具，直到 llm 不再需要调用工具
while (response.tool_calls && response.tool_calls.length > 0) {
    console.log(`\n[检测到 ${response.tool_calls.length} 个工具调用]`);
    const toolResults = await Promise.all(
        response.tool_calls.map(async (toolCall) => {
            const tool = tools.find(t => t.name === toolCall.name);
            if(!tool) {
                return `错误：工具 ${toolCall.name} 不存在`
            }
            console.log(`[执行工具] ${toolCall.name}(${JSON.stringify(toolCall.args)})`);
            try {
                const result = await tool.invoke(toolCall.args); //调用工具
                return result;
            } catch (err) {
                return `错误：工具 ${toolCall.name} 执行失败，${err.message}`
            }
        })
    )
    console.log(toolResults);
    response.tool_calls.forEach((toolCall, index) => {
        messages.push(
            new ToolMessage({
                content: toolResults[index],
                tool_call_id: toolCall.id,
            })
        )
    })
    response = await modelWithTools.invoke(messages); // 此结果没有工具调用，没有tool_calls，跳出循环
    console.log(response.content);
}

// "tool_calls": [
//   {
//       "name": "read_file",
//       "args": {
//           "path": "tool-file-read.mjs"
//       },
//       "id": "call_1234567890"
//   },
// ]