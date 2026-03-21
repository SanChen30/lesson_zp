import { Controller, Get, Query, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import {
  from,
  Observable
} from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) { }

  // @Get('chat')
  // async chat(@Query('query') query: string) {
  //   const answer = await this.aiService.runChain(query);
  //   return {
  //     answer
  //   }
  // }

  // Server-Sent Events
  // Content Type: text/event-stream 事件流
  // Cache-Control: no-cache 禁止缓存
  // Connection: keep-alive 保持长连接
  // Transfer-Encoding: chunked 分块传输
  // 装饰器模式，Sse 装饰器，返回一个 Observable 对象
  @Sse('chat/stream')
  chatStream(@Query('query') query: string): Observable<MessageEvent> {
    const stream = this.aiService.runChainStream(query);
    // 将 llm stream 转换为 observable 对象
    return from(stream)
      .pipe(
        map((chunk) => ({
          // 前端需要的chunk的格式约定
          data: chunk
        }))
      ) as Observable<MessageEvent>
  }
}
