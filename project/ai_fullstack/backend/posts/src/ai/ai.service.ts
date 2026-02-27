import {
    Injectable
} from '@nestjs/common';
import { MessageDto } from './dto/chat.dto';
// DeepSeek 的 LangChain Chat 模型
import { ChatDeepSeek } from '@langchain/deepseek';
// LangChain 标准消息类型
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { OpenAIEmbeddings, DallEAPIWrapper } from '@langchain/openai';
import * as fs from 'fs/promises';
import path from 'path';
// 向量数据库，ai应用功能的一个核心之一
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

interface Post {
    title: string,
    category: string;
    embedding: number[];
}

/**
 * 将前端 DTO 消息
 * 转换为 LangChain 可识别的 Message 对象 */
export function convertToLangchainMessages(
    messages: MessageDto[]
): (HumanMessage | AIMessage | SystemMessage)[] {

    return messages.map(msg => {
        // 根据角色转换消息类型
        switch (msg.role) {
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

export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normV1 * normV2);
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
    private embeddings: OpenAIEmbeddings;
    private imageGenerator: DallEAPIWrapper;
    private posts: Post[] = [];

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
        this.embeddings = new OpenAIEmbeddings({
            configuration: {
                apiKey: process.env.OPENAI_API_KEY,
                baseURL: process.env.OPENAI_BASE_URL
            },
            model: 'text-embedding-ada-002',
        })
        this.imageGenerator = new DallEAPIWrapper({
            openAIApiKey: process.env.OPENAI_API_KEY,
            model: 'dall-e-3',
            n: 1,
            size: '1024x1024',
            quality: 'standard',
        })
        this.loadPosts();
    }

    private async loadPosts() {
        try {
            // data 文件一般不会被打包到dist目录下，需要在nest-cli.json中配置
            // "assets": [
            //   {
            //     "include": "data/**/*",
            //     "outDir": "dist/data"
            //   }
            console.log(__dirname, '????????'); //D:\workspace\lesson_zp\project\ai_fullstack\backend\posts\dist\src\ai ????????
            const filePath = path.join(__dirname, "../../", 'data/data', 'posts-embedding.json');
            const data = await fs.readFile(filePath, 'utf-8');
            this.posts = JSON.parse(data);
        } catch (error) {
            console.log('Failed to load posts:', error);
            this.posts = [];
        }
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
            if (content) {
                onToken(content);
            }
        }
    }

    async search(keyword: string, topK: number = 3) {
        const vector = await this.embeddings.embedQuery(keyword);
        // console.log(vector);
        const result = this.posts.map(post => ({
            ...post,
            similarity: cosineSimilarity(post.embedding, vector)
        }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK)
            .map(item => item.title);

        return {
            code: 0,
            data: result
        }
    }

    async avatar(name: string) {
        const imgUrl = await this.imageGenerator.invoke(`
            你是一位专业头像设计师（Avatar Designer）。

            请根据用户姓名「${name}」，设计一个高质量个人头像。

            要求：
            - 只出现【一个人物】，禁止多人
            - 半身或头肩构图（适合头像裁剪）
            - 正面或微侧面视角
            - 风格：卡通 + 时尚 + 现代感 + 干净专业
            - 人物形象亲和、自信、自然微笑
            - 线条简洁，色彩协调，高级配色
            - 背景简洁、低干扰，突出人物主体
            - 画面居中，适合作为社交媒体头像
            - 高清、细节清晰、无文字、无水印

            整体感觉：
            年轻、专业、好看、有设计感。
        `)
        console.log(imgUrl, 'imgUrl');
        return imgUrl;
    }

    async rag(question: string) {
        // google notebooklm
        // 知识库 embedding
        // 内存向量数据库
        // 向量 -> 向量存储 源文件（Document） this.embeddings(LLM) 结果存储下来
        const vectorStore = await MemoryVectorStore.fromDocuments(
            [
                new Document({
                    pageContent: "React 是一个用于构建用户界面的JavaScript库"
                }),
                new Document({
                    pageContent: "NestJS 是一个用于构建服务器端应用的 node.js 框架，擅长企业级开发"
                }),
                new Document({
                    pageContent: "RAG 通过检索外部知识增强大模型的回答能力"
                })
            ],
            this.embeddings
        );

        const docs = await vectorStore.similaritySearch(question, 1);
        console.log(docs);
        // LLM chat 的上下文 增强 Augumented
        // 检索 retrieve
        const content = docs.map(d => d.pageContent).join('\n');
        // 增强 Augmented
        const prompt = `
        你是一个专业的JS工程师，请基于下面资料回答问题。
        资料：
        ${content}

        问题：
        ${question}
        `;
        // 生成 Generate
        const res = await this.chatModule.invoke(prompt);
        return res.content;
    }
}