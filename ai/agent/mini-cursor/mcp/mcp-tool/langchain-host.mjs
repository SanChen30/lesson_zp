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

// host 
const model = new ChatOpenAI({
    modelName: process.env.OPENAI_API_MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_API_BASE_URL
    }
});

const tools = await mcpClient.getTools();
console.log(tools, '?????');
const modelWithTools = model.bindTools(tools);

// client
const mcpClient = new MultiServerMCPClient({
    mcpServers: {
        'my-mcp-server': {
            command: 'node',
            args: ['D:/workspace/lesson_zp/ai/agent/mini-cursor/mcp/mcp-tool/my-mcp-server.mjs']
        },
    }
})

async function runAgentWithTools (query, maxIterations=30) {
    const messages = [
        
    ]
}