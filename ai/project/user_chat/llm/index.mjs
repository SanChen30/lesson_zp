// http 服务 和llm 服务结合起来
import http from 'http';
import OpenAI from 'openai';
import url from 'url';
import {
  config
} from 'dotenv';
config({
  path: '.env'
});
console.log(process.env.OPENAI_API_KEY, '////');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL:'https://api.agicto.cn/v1'
});
// aigc
const getCompletion = async (prompt, model='gpt-3.5-turbo') => {
  try {
    const messages = [{
      role: 'user',
      content: prompt
    }];
    const result = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.1
    });
    
    // 添加安全检查
    if (!result || !result.choices || result.choices.length === 0) {
      throw new Error('API响应中没有有效的结果');
    }
    
    return result.choices[0].message.content;
  } catch (error) {
    console.error('获取AI响应时出错:', error);
    return `抱歉，AI处理请求失败: ${error.message}`;
  }
}

// const result = await getCompletion('你好');
// console.log(result);
http.createServer(async (req, res) => {
  // 设置CORS头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  
  try {
    // 解析URL获取参数
    const parsedUrl = url.parse(req.url, true);
    const { question, data } = parsedUrl.query || {};
    
    // 参数验证
    if (!question) {
      res.statusCode = 400;
      res.end(JSON.stringify({ result: '错误：缺少question参数' }));
      return;
    }
    
    // 构建提示信息
    const prompt = `
      ${data || '暂无数据'}
      请根据上面的JSON数据，回答${question}这个问题。
    `;
    
    // 获取AI响应
    const result = await getCompletion(prompt);
    
    // 返回成功响应
    res.statusCode = 200;
    res.end(JSON.stringify({ result }));
  } catch (error) {
    console.error('服务器处理错误:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ result: `服务器内部错误: ${error.message}` }));
  }
}).listen(1314, () => {
  console.log('AI服务已启动，监听端口1314');
});