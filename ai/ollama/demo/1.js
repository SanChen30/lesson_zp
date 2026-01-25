// ollama 开源大模型API服务，11434端口
// v1/chat/completions 兼容 openai 接口
const OLLAMA_URL = 'http://127.0.0.1:11434/v1/chat/completions';

const headers = {
    'Authorization': 'Bearer ollama',
    'Content-Type': 'application/json'
}

const data = {
    model: 'qwen2.5:0.5b',
    messages: [
        {
            role: 'user',
            content: '你好，你是谁呀？'
        }
    ]
}

fetch(OLLAMA_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
})
.then(res => res.json())
.then(data => {
    console.log(data.choices[0].message.content);
})
.catch(err => console.error('Error:', err));

