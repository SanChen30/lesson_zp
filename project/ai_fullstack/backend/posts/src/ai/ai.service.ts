import {
    Injectable
} from '@nestjs/common';
import { MessageDto } from './dto/chat.dto';
// DeepSeek 的 LangChain Chat 模型
import { ChatDeepSeek } from '@langchain/deepseek';
// LangChain 标准消息类型
import { SystemMessage, HumanMessage, AIMessage} from '@langchain/core/messages';


/**
 * 将前端 DTO 消息
 * 转换为 LangChain 可识别的 Message 对象 */
export function convertToLangchainMessages(
    messages: MessageDto[]
): (HumanMessage | AIMessage | SystemMessage)[] {

    return messages.map(msg => {
        // 根据角色转换消息类型
        switch(msg.role) {
            // 用户消息
            case 'user':
                return new HumanMessage(msg.content)
            // AI 回复
            case 'assistant':
                return new AIMessage(msg.content)
            // 系统提示词
            case 'system':
                return new SystemMessage(msg.content)
            // 非法角色
            default:
                throw new Error(`Unsupported role: ${msg.role}`)
        }
    })
}


/**
 * AIService
 * NestJS Service 层
 * 负责：
 * 1️⃣ 调用 LLM
 * 2️⃣ 数据转换
 * 3️⃣ 流式处理 */
@Injectable()
export class AIService {
    /**
     * 私有大模型实例
     * 整个 service 生命周期只创建一次 */
    private chatModule: ChatDeepSeek;

    constructor() {

        /* 初始化 DeepSeek Chat 模型 */
        this.chatModule = new ChatDeepSeek({
            // API 配置
            configuration: {
                apiKey: process.env.DEEPSEEK_API_KEY,
                baseURL: process.env.DEEPSEEK_BASE_URL
            },
            // 使用模型名称
            model: 'deepseek-chat',
            // 随机性（越高越发散）
            temperature: 0.7,
            // 开启流式输出（关键）
            streaming: true
        })
    }

    /**
     * 聊天方法
     * @param messages 前端消息历史
     * @param onToken 每生成一个 token 时的回调函数 */
    async chat(
        messages: MessageDto[],
        onToken: (token: string) => void
    ) {

        /**
         * Step 1:
         * DTO → LangChain Message */
        const langChainMessages =
            convertToLangchainMessages(messages);
        // console.log(langChainMessages, '////////');

        /**
         * Step 2:
         * 调用 DeepSeek 流式生成
         * 返回 AsyncIterable（异步流） */
        const stream =
            await this.chatModule.stream(langChainMessages);

        /**
         * Step 3:
         * 异步遍历 token 流 */
        // 每当 LLM 生成一点内容，就执行一次循环。
        for await (const chunk of stream) {
            /**
             * chunk.content:
             * 当前生成的一小段文本（token） */
            const content = chunk.content as string; // 类型断言

            /**
             * Service 只负责数据处理
             * Controller 决定如何返回 HTTP */
            if(content) {
                onToken(content);
            }
        }
    }
}