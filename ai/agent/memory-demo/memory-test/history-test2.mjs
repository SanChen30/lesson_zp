import 'dotenv/config';
import {
    ChatOpenAI
} from '@langchain/openai';
import {
    FileSystemChatMessageHistory
} from '@langchain/community/stores/message/file_system';
import {
    HumanMessage,
    SystemMessage,
    AIMessage
} from '@langchain/core/messages';
import path from 'node:path';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    temperature: 0,
});

async function fileHistoryDemo() {
    const filePath = path.join(process.cwd(), "chat-history.json");
    const sessionId = "user_session_001"; // 会话 ID
    
    const systemMessage = new SystemMessage(
        "你是一个友好的做菜助手，喜欢分享美食和烹饪技巧。"
    )

    console.log("[第一轮对话]");
    const history = new FileSystemChatMessageHistory(filePath, sessionId);
    const userMessage1 = new HumanMessage("红烧肉怎么做？");
    await history.addMessage(userMessage1);
    const messages1 = [systemMessage, ...(await history.getMessages())];
    // console.log(messages1);
    const response1 = await model.invoke(messages1);
    // console.log(response1);
    await history.addMessage(response1);
    // console.log(await history.getMessages());

    const userMessage2 = new HumanMessage("好吃吗？");
    await history.addMessage(userMessage2);

    const message2 = [systemMessage, ...(await history.getMessages())];
    const response2 = await model.invoke(message2);
    await history.addMessage(response2);
    console.log(await history.getMessages());
}

fileHistoryDemo()
    .catch(console.error);