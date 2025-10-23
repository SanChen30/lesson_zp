import OpenAI from 'openai';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config(); // .env 文件中的配置添加到环境变量

// 从环境变量中获取 API 密钥
const apiKey = process.env.OPENAI_API_KEY;

// llm client(大模型客户端)
const client = new OpenAI(
    {
        apiKey: apiKey,
        // baseURL: 'https://api.openai.com/v1',
        baseURL: 'https://api.302.ai/v1',
    }
    // 算力、电力、凭据
);

// 异步操作:使用await等待AI响应
// AIGC = Artificial Intelligence Generated Content (人工智能生成内容)
// AIGC 就是利用人工智能技术自动创造各种数字内容
const response = await client.completions.create(
    {
        // openai 模型家族
        // 文本模型
        // 价格平民
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 256,
        // 提示词是和LLM交流的方式
        // ES6 模板字符串:`` 支持多行文本,详细且清晰的描述LLM需要完成的任务
        prompt: `
            假如你是林夕这样的爱情歌曲作词家，
            请你写一首100字，为汪峰，写一首他爱上森林北的歌曲。
            森林北是一位美丽，勇敢，会骑马的女孩
        `
    }
)

// llm 一次性会给我们多条返回结果，我们只需要第一条
const result = response.choices[0].text;
console.log("歌词是："+result);
