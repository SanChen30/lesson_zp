// 模块化导入 OpenAI 模块
import OpenAI from 'openai';

// 模块化导入 dotenv 模块
// import dotenv from 'dotenv';

// 从 dotenv 模块中导入 config 函数。导入包的一部分，优化性能，是ES6的解构
import { config } from 'dotenv';

// dotenv.config({
//     path:".env"
// });

// 加载 .env 文件中的环境变量
config({
    path: ".env"
});

//进程启动了
console.log(process.env);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // openai sdk 是 AIGC 事实标准
    // 默认发送请求到openai 服务器
    // 可以通过 baseURL 自定义服务器请求地址 LLM 服务器代理商或其他模型
    baseURL: "https://api.agicto.cn/v1",
});

// 箭头函数
// async 耗时性的任务 异步任务
const main = async () => {
    // 生成图片接口
    const response = await client.images.generate({

        model: "dall-e-3", //达芬奇
        // prompt 给LLM 下达的指令
        prompt: "A spaceship flying througn the universe",
        n: 1,
        size: "1024x1024"
    });
    
    console.log(response.data[0].url);
}

main();