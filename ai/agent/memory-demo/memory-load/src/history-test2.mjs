// 加载 Memory
import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { FileSystemChatMessageHistory } from "@langchain/community/stores/message/file_system";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import path from "node:path";

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

async function fileHistoryDemo() {
    const filePath = path.join(process.cwd(), "chat_history.json");
    const sessionId = "user_session_001";

    const systemMessage = new SystemMessage(
        "你是一个友好的做菜助手，喜欢分享美食和烹饪技巧。"
    );
    const restoredHistory = new FileSystemChatMessageHistory({
        filePath: filePath,
        sessionId: sessionId,
    })

    console.log(await restoredHistory.getMessages());
}
fileHistoryDemo().catch(console.error);