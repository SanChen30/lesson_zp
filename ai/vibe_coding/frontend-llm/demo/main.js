// 请求的目的地
// llm 的 api 地址，类似于 base_url
const endpoint = 'https://api.deepseek.com/chat/completions';

// 请求头
const headers = {
    'content-Type':'application/json',
    // api key 是请求令牌
    'Authorization':`Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`   
}

// 请求体
const payload = {
    // 模型名称
    'model':'deepseek-chat',
    // 消息列表
    'messages':[
        {
            // 角色
            'role':'system',
            // 内容
            'content':'You are a helpful assistant.'
        },
        {
            role:'user',
            content:'你好 DeepSeek'
        }
    ]
}

// 将顶级await移到async函数中
async function fetchData() {
    try {
        const response = await fetch(endpoint, {
            // POST 比 GET 更安全，因为 POST 不会将数据暴露在 URL 中，并且会带上请求体
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        const data = await response.json(); //对象化
        document.getElementById('reply').textContent = data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('reply').textContent = '请求失败，请检查控制台错误';
    }
}

// 调用async函数
fetchData();