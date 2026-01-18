import { ChatDeepSeek } from '@langchain/deepseek';
import 'dotenv/config';
import { tool } from '@langchain/core/tools';
import { z } from 'zod'; // 用于定义工具的输入参数的类型

const fakeWeatherDB = {
    北京: { temp: "30摄氏度", condition: "晴", wind: "微风"},
    上海: { temp: "28摄氏度", condition: "多云", wind: "强"},
    广州: { temp: "26摄氏度", condition: "阴", wind: "中"},
}

const weatherTool = tool(
    async ({ city }) => {
        const weather = fakeWeatherDB[city];
        if(!weather) {
            return `城市${city}的天气信息不存在`;
        }
        return `城市${city}的天气是${weather.temp}, ${weather.condition}, 风力${weather.wind}`;
    },
    {
        name: "get_weather",
        description: "查询指定城市的今日天气情况",
        schema: z.object({
            city: z.string().describe("要查询天气的城市")
        })
    }
)

// console.log(weatherTool);

// 函数，定义一个加法工具
const addTool = tool(
    // 两个参数
    // 等下大模型来调用这个tool
    // 参数是一个对象，可以解构出a和b
    async ({a, b}) => String(a + b), // 类型转换为string
    {
        name: 'add',
        description: '计算两个数字的和',
        // schema 模式，定义参数的类型
        // z.object 定义一个对象，有两个属性a和b，定义它们的类型
        schema: z.object({
            a: z.number(),
            b: z.number()
        })
    }
)

const model = new ChatDeepSeek({
    model: 'deepseek-chat',
    temperature: 0
}).bindTools([addTool, weatherTool]);

// const res = await model.invoke("3 + 5等于多少？");

// ES6 的可选链操作符（Optional Chaining） `?.` ，它的作用是安全地访问嵌套对象的属性，避免因中间某个值为 null 或 undefined 而报错。
// 如果 res.tool_calls 存在，并且它是一个非空数组（长度大于 0），就执行 if 块中的代码。
// 有tool_calls属性，说明大模型调用了工具

// 等价于
// if (res.tool_calls && res.tool_calls.length > 0) {
//   // ...
// }

const res = await model.invoke("北京今天的天气怎么样？");

if(res.tool_calls?.length) {
    console.log(res.tool_calls[0]);
    if (res.tool_calls[0].name === 'add') {
        const result = await addTool.invoke(res.tool_calls[0].args);
        console.log("最终结果：",result);
    }else if (res.tool_calls[0].name === 'get_weather') {
        const result = await weatherTool.invoke(res.tool_calls[0].args);
        console.log("最终结果：",result);
    }
}

// if (res.tool_calls?.length) {
//   for (const toolCall of res.tool_calls) {
//     console.log('处理工具调用:', toolCall);
    
//     if (toolCall.name === 'add') {
//       const result = await addTool.invoke(toolCall.args);
//       console.log("加法结果：", result);
//     } else if (toolCall.name === 'get_weather') {
//       const result = await weatherTool.invoke(toolCall.args);
//       console.log("天气结果：", result);
//     } else {
//       console.warn("未知工具:", toolCall.name);
//     }
//   }
// }

