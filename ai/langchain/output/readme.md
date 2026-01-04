# langchain outputParser

大模型返回内容的解析

有时候，LLM 生成的内容不是我们期望的格式（json）,我们需要对其进行解析

## JS 模块化

- 早期前端 JS 没有模块化关键字，script 引入的文件就是模块，文件封装函数
<script src="a.js"></script>
<script src="b.js"></script>

- node 后端

比较复杂的 MVC 架构，每个模块都有自己的文件，文件之间通过 require 引入，commonjs 规范
```js
// math.js
exports.add = (a, b) => a + b;

// main.js
const math = require('./math');
console.log(math.add(2, 3));
```

- ES6 2015

vue/react 前端变得复杂，推出 ESM 规范，import/export 关键字

```js
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { add } from './math.js';
console.log(add(2, 3), multiply(2, 3));
```