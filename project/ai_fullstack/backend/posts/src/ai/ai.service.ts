import {
    Injectable
} from '@nestjs/common';
import { MessageDto } from './dto/chat.dto';
import { ChatDeepSeek } from '@langchain/deepseek';

@Injectable()
export class AIService {
    private chatModule: ChatDeepSeek; // 让大模型成为service的一个私有属性
    constructor() {

    }
    async chat(messages: MessageDto[], onToken: (token: string) => void) {

    }
}