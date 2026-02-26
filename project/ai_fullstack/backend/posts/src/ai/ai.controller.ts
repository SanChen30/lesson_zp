import {
    Controller,
    Post,
    Body,
    Res
} from '@nestjs/common';

import { AIService } from './ai.service';
import { ChatDto } from './dto/chat.dto';
import type { Response } from 'express';

/**
 * 控制器路由前缀：/ai
 * 所有接口都会以 /ai 开头
 */
@Controller('ai')
export class AIController {
    /**
     * 依赖注入 AIService
     * NestJS 自动创建实例
     */
    constructor(private readonly aiService: AIService){}

    /**
     * POST /ai/chat
     * 聊天接口
     */
    @Post('chat')
    async chat(
        @Body() chatDto: ChatDto, // 从请求体获取数据
        @Res() res: Response                // 原生 Response 对象（Express）
    ) {

        /**
         * 设置 SSE（Server-Sent Events）响应头
         */

        // 告诉浏览器：这是事件流，而不是普通 JSON
        res.setHeader('Content-Type', 'text/event-stream');

        // 禁止缓存，否则流式更新会失效
        res.setHeader('Cache-Control', 'no-cache');

        // 保持 HTTP 长连接（关键）
        res.setHeader('Connection', 'keep-alive');

        try {

            /**
             * 调用 AIService 的 chat 方法
             * 参数：
             * 1️⃣ messages - 用户聊天内容
             * 2️⃣ 回调函数 - 每生成一个 token 就调用 */
            await this.aiService.chat(
                chatDto.messages,

                // token 回调（流式返回核心）
                (token: string) => {
                    /**
                     * 向客户端写入数据流
                     * 格式：
                     * 0:"token内容"
                     * \n 表示一条消息结束 */
                    res.write(`0:${JSON.stringify(token)}\n`);
                }
            );
            /**
             * AI 输出结束
             * 关闭连接
             */
            res.end();

        } catch (err) {

            // 服务端错误日志
            console.error(err);

            // 返回 500
            res.status(500).end();
        }
    }
}