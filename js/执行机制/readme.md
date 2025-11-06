# Js 执行机制

1. JS 执行

Chrome 浏览器是一个基于 **V8 引擎**的浏览器，V8 引擎是 Google 开发的一个 JavaScript 引擎，它的执行机制是单线程的，即一次只能执行一个任务，v8 负责代码的编译和执行。

两个阶段：
1) 编译阶段

检测语法错误、变量提升、函数提升

js 脚本语言，编译在执行前的一刹那

2) 执行阶段

提升的变量早就为我们准备好了，我们可以在变量提升后使用它。

代码的编写顺序和执行顺序不一样，v8引擎在编译阶段干了什么？

- v8 引擎设计的js执行机制

编译阶段和执行阶段

var 和 let、const 的区别

**编译阶段**

一段可执行的代码，会被执行上下文对象包裹。

创建一下执行上下文对象 context ，为执行做准备。

执行上下文对象包含了变量环境、词法环境、可执行代码。

**调用栈**

负责将执行上下文对象压入栈中，执行完成后出栈。

函数的执行

首先，全局执行上下文会被压入调用栈

有函数要执行的话，创建一个全新的函数执行上下文对象，压入调用栈。

JS代码执行就可以用栈的特征来执行，先进后出。

在栈顶执行一个函数，执行完成后，出栈，变量垃圾回收

重复以上过程，直到调用栈为空。

**js 编译阶段的工作流程**

一段代码，由v8引擎接管

JS调用栈来管理JS的执行

以函数为单位

编译阶段

**创建全局执行上下文对象**

- 变量环境

a = undefined  fn()

- 词法环境

空

- 可执行代码

全局代码

fn(3) 执行阶段

**创建新的函数执行上下文对象入栈**（编译阶段）

- 变量环境(放var声明的变量)

函数是一等公民
函数声明更优先

a 是参数  
a = function a() { };
b = undefined

var 允许重复声明

- 词法环境(放let、const声明的变量)

空

- 可执行代码

fn(3) 函数代码


fn 执行阶段

a function -> 2

b = a = 2(值的拷贝)


## 总结

代码先编译再执行，一边编译，后执行，再编译，再执行

js 和 c++/java 不一样的原因

调用栈（v8 引擎良好执行代码的数据结构设计）

1. 编译总是发生在执行前的一刹那
2. 全局和函数体的编译会生成执行上下文，存入调用栈
3. 当函数执行完后，他的执行上下文会被销毁

编译的过程

1. 创建执行上下文对象
2. 找形参和变量声明，提升到变量环境 undefined
    let/const 声明的变量或常量，放入词法环境（暂时性死区）
3. 统一形参和实参的值（全局除外）
4. 找函数声明，将函数名作为key，值为函数体




# JavaScript 执行机制深度解析

## 1. JavaScript 执行引擎概述

Chrome 浏览器采用 **V8 引擎**执行 JavaScript，其核心特征是**单线程执行模型** - 即同一时间只能处理一个任务。V8 引擎负责代码的编译和执行全过程。

## 2. 两阶段执行流程

### 编译阶段
- 语法错误检测
- 变量提升（Hoisting）
- 函数提升
- 创建执行上下文

### 执行阶段
- 执行可执行代码
- 变量赋值
- 函数调用

> JavaScript 作为脚本语言，其编译发生在执行前的瞬间

## 3. 执行上下文（Execution Context）

每段可执行代码都会被**执行上下文对象**包裹，包含三个核心部分：

```javascript
// 执行上下文对象结构
ExecutionContext = {
    VariableEnvironment: {},  // 变量环境
    LexicalEnvironment: {},   // 词法环境  
    ExecutableCode: []        // 可执行代码
}
```

## 4. 调用栈（Call Stack）

调用栈负责管理执行上下文的入栈和出栈：

1. **全局执行上下文**首先入栈
2. **函数执行时**创建新的函数执行上下文并入栈
3. 函数执行完成后**出栈**，内存回收
4. 遵循**先进后出（LIFO）**原则

## 5. 编译阶段详细工作流程

### 全局执行上下文创建
```javascript
// 示例代码
var a = 1;
function fn(a) {
    console.log(a);
    var a = 2;
    function a() {};
    var b = a;
    console.log(a);
}
fn(3);

// 编译后全局执行上下文
GlobalContext = {
    VariableEnvironment: {
        a: undefined,
        fn: function() { ... }
    },
    LexicalEnvironment: {},
    ExecutableCode: "fn(3)"
}
```

### 函数执行上下文创建
```javascript
// fn(3) 函数执行上下文
FnContext = {
    VariableEnvironment: {
        a: function a() {},  // 函数声明优先
        b: undefined
    },
    LexicalEnvironment: {},
    ExecutableCode: "函数内部代码"
}
```

## 6. 变量声明差异

### var vs let/const
```javascript
// var - 变量提升，允许重复声明
var a = 1;
var a = 2; // 允许，不报错

// let/const - 暂时性死区，禁止重复声明  
let b = 3;
let b = 4; // 报错：SyntaxError
```

### 函数表达式 vs 函数声明
```javascript
func(); // 报错：func未定义
let func = () => {
    console.log('函数表达式不会提升');
};

showName(); // 正常执行
function showName() {
    console.log('函数声明会提升');
}
```

## 7. 内存管理机制

### 基本数据类型 - 栈内存
```javascript
let str = 'hello';
let str2 = str;  // 值拷贝
str2 = '你好';
console.log(str, str2); // 'hello' '你好'
```

### 复杂数据类型 - 堆内存
```javascript
let obj = { name: '张三', age: 18 };
let obj2 = obj; // 引用拷贝
obj2.age = 20;
console.log(obj.age); // 20 - 原对象也被修改

// 使用Object.freeze()防止修改
Object.freeze(obj);
obj.name = '李四'; // 静默失败
```

## 8. 严格模式影响

```html
<script>
    'use strict'; // 启用严格模式
    var a = 1;
    var a = 2; // 在严格模式下不会报错，但建议避免
    console.log(a); // 2
</script>
```

## 9. 核心执行原理总结

1. **即时编译**：代码在执行前瞬间编译
2. **上下文管理**：全局和函数都会创建执行上下文并入栈
3. **生命周期**：函数执行完成后上下文销毁
4. **编译步骤**：
   - 创建执行上下文对象
   - 变量声明提升至变量环境（var）
   - let/const 声明放入词法环境（暂时性死区）
   - 形参与实参值统一
   - 函数声明提升（最高优先级）

这种执行机制解释了 JavaScript 与其他编译型语言（如 C++/Java）的根本差异，也是理解闭包、作用域链等高级概念的基础。