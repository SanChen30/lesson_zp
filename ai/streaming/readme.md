# AI 流式输出

1. 流式输出 streaming

大模型交互的用户体验（新）优化

streaming: true 边思考边生成边返回，没必要 done 后再返回所有结果

等待时间短

前端负责用户体验，后端负责业务

2. 编码、解码

任何内容都是由二进制存储（太低效率）

对内容（非文本、网络通信）进行二进制剪裁或操作

Buffer 缓冲

HTML5 提供编码对象 TextEncoder 和 解码对象 TextDecoder

# vue 3 流式输出 demo

## 初始化项目

1. npm init vite

vite 是最近最优秀的前端脚手架

做项目前先要个基建
init 初始化

2. 选择

vue3
javascript

3. 生成项目模板

src/ 开发目录，主要的代码会在这

4. npm install
5. npm run dev
6. 打开浏览器，访问 http://localhost:5173/

## vue 基础语法

.vue 后缀文件
App.vue 根组件

分为三部分

    - script
    - template
    - style

### 响应式数据

变量 -> 数据 -> 响应式数据对象

聚焦于业务，不用去写 DOM API 了

JS 早期的命令式编程，比较机械

- 监听事件
- 变量的值加一
- 获取dom节点
- 修改dom节点的内容

vue focus 于业务， ref 响应式理念

    - 模板需要消费响应式数据 {{count}}
    - vue let count = ref(0)
      对象上有一个 value 属性，指向响应式数据，count.value = 111;
    - 模板会自动更新

```vue
<script setup>
// 从 Vue 导入 ref 函数，用于创建响应式数据
// es6 解构，vue 太复杂了，目前只需要 ref 函数
import { ref } from 'vue';

// 使用 ref() 创建一个响应式引用对象
// 初始值为 111，访问其值需通过 .value（在 JS 中）
let count = ref(111);

// 打印当前 count 对象（是一个 RefImpl 实例）
console.log(count); // 输出: { value: 111 }

// 2 秒后修改 count 的值
setTimeout(() => {
  // 注意：在 JavaScript 中修改 ref 的值必须通过 .value
  count.value = 222;
  console.log('count 更新为:', count.value); // 输出: 222
}, 2000);
</script>

<template>
  <!-- 在模板中，Vue 会自动解包 ref，所以直接写 count 即可 -->
  <div class="container">
    <div>
      {{ count }} <!-- 自动显示 count.value，无需写 .value -->
    </div>
  </div>
</template>

<style scoped>
</style>
```


### 