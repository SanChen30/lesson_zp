<script setup>
import { ref } from 'vue';

// v-model 指令，响应式绑定表单的数据
// v-model 双向数据绑定指令
// v-model 绑定 question stream 变量
let question = ref('讲一个喜羊羊和灰太狼的故事，20字');
const stream = ref(true);
const content = ref('') // 单向绑定，主要的


// 调用大模型
const askLLM = async () => {
  if (!question.value) {
    console.log('question 不能为空');
    return;
  }

  // 用户体验
  content.value = '思考中...';
  // 请求行
  // 请求头
  // 请求体
  const endpoint = 'https://api.deepseek.com/chat/completions';
  const headers = {
    'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json'
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'deepseek-chat',
      stream: stream.value,
      messages: [
      {
        role: 'user',
        content: question.value
      }
    ]
    })
  })
  if(stream.value){
    // 流式输出
    content.value = ""; // 把上次的生成清空
    // HTML5 流式响应体
    // 响应体的读对象
    const reader = response.body?.getReader();
    // 流出来的是二进制流 buffer
    const decoder = new TextDecoder();
    let done = false; // 流是否结束，没有
    let buffer = '';
    while(!done) {
      // 只要没有完成，就一直拼接buffer
      // 解构重命名，外面有同名done，这里重命名为doneReading
      const { value, done: doneReading } = await reader?.read();
      console.log(value, doneReading);
      done = doneReading;
      // chunk 内容块 包含多行data: 有多少行不确定
      // data: {} 能不能传完也不确定
      const chunkValue = buffer + decoder.decode(value); // 字符串
      console.log(chunkValue);
      buffer = '';
      const lines = chunkValue.split('\n').filter((line => line.startsWith('data: ')));
      for(const line of lines){
        const incoming = line.slice(6); // 干掉数据标志 data: 
        if(incoming === '[DONE]'){
          done = true;
          break;
        }
        try{
          // 大模型流式生成，tokens 长度不定的
          const data = JSON.parse(incoming);
          const delta = data.choices[0].delta.content;
          if(delta){
            content.value += delta;
          }
        }catch(err){
          // JSON.parse 解析失败
          buffer += `data: ${incoming}`
        }
      }
    }


  }
  else{
    const data = await response.json();
    console.log(data);
    content.value = data.choices[0].message.content;
  }

}
</script>




<template>
  <div class="container">
    <div>
      <label>输入: </label>
      <input class="input" v-model="question" />
      <button @click="askLLM">提交</button>
    </div>
    <div class="output">
      <div>
        <label>Streaming</label>
        <input type="checkbox" v-model="stream" />
        <div>{{ content }}</div>
      </div>
    </div>
  </div>
</template>




<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  /* 主轴、次轴 */
  flex-direction: column; /* 设置主轴 */
  align-items: start;     /* 次轴对齐方式 */
  justify-content: start; /* 主轴对齐方式 */
  height: 100vh;
  font-size: 0.85rem;
}

.input {
  width: 200px;
}

button {
  padding: 0 10px;
  margin-left: 6px;
}

.output{
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  text-align: left;
}
</style>