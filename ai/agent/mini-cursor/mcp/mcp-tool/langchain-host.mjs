import 'dotenv/config';
// adapters  mcp 适配器
import {
    MultiServerMCPClient
} from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import {
    HumanMessage,
    ToolMessage
} from '@langchain/core/messages';
import chalk from 'chalk';

// 程序就是host 

const model = new ChatOpenAI({
    modelName: process.env.OPENAI_API_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL
    }
});

// client
const mcpClient = new MultiServerMCPClient({
    // 本地自己写的 mcp server
    mcpServers: {
        'my-mcp-server': {
            command: 'node',
            args: ['D:/workspace/lesson_zp/ai/agent/mini-cursor/mcp/mcp-tool/my-mcp-server.mjs']
        },
    }
})


const tools = await mcpClient.getTools();
console.log(tools, '?????');
const modelWithTools = model.bindTools(tools);


async function runAgentWithTools(query, maxIterations = 30) {
    const messages = [
        new HumanMessage(query)
    ];

    for (let i = 0; i < maxIterations; i++) {
        console.log(chalk.bgGreen('⏳正在等待AI思考...'));
        const response = await modelWithTools.invoke(messages);
        console.log(response, '-----');
        messages.push(response); // assistant 回复  里面可能还有 tool_calls 属性，说明需要调用工具，content 为空

        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n AI 最终回复:\n ${response.content}\n`);
            return response.content;
        }

        console.log(chalk.bgBlue(`🔧 检测到 ${response.tool_calls.length} 个工具调用`));
        console.log(chalk.bgBlue(`🔧 工具调用: ${response.tool_calls.map(t => t.name).join(',')}`));

        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name);
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    content: toolResult,
                    too_call_id: toolCall.id
                }))
            }
        }
    }
    return messages[messages.length - 1].content;
}

const result = await runAgentWithTools('查一下用户 002 的信息');
console.log(result, '/////');
await mcpClient.close();