import { ChatDeepSeek } from '@langchain/deepssek';
import 'dotenv/config';

const model = new ChatDeepSeek({
    model:'deepseek-chat',
    temperature: 0.7
});

const res = await model.invoke("你好");

