// 请求的目的地
// llm 的 api 地址，类似于 base_url
const endpoint = 'https://api.deepseek.com/chat/completions';

// 请求头
const headers = {
    'content-Type':'application/json',
    // api key 是请求令牌
    'Authorization':'Bearer sk-148ec891b2a841b8943658bfac6638ef'
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

const response = await fetch(endpoint,{
    // POST 比 GET 更安全，因为 POST 不会将数据暴露在 URL 中，并且会带上请求体
    method:'POST',
    headers,
    body:JSON.stringify(payload)
});

const data = await response.json(); //对象化

document.getElementById('reply').textContent = data.choices[0].message.content;