import { ChatDeepSeek } from '@langchain/deepseek';
import 'dotenv/config';

const model = new ChatDeepSeek({
    model:'deepseek-chat',
    temperature: 0
});

// http api 请求
const res = await model.invoke("我叫三宸，喜欢喝AD钙");
console.log(res.content);
console.log('-------------');
const res2 = await model.invoke("我叫什么名字");
console.log(res2.content);