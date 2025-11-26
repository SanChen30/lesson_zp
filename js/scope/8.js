let name = "张三";
{
    console.log(name); // 报错
    let name = "李四";
}

// 会报错的原因是：let 的「暂时性死区」（Temporal Dead Zone, TDZ）。

// 🔍 详细解释
// 1. 变量提升（Hoisting）只适用于 var
// var 声明的变量会被“提升”到作用域顶部，并初始化为 undefined。
// 但 let 和 const 虽然也会被“提升”到块级作用域顶部，但不会被初始化。
// 2. 什么是「暂时性死区」（TDZ）？
// 在块级作用域 {} 中：

// 从块的开始，到 let/const 变量实际声明并初始化的那一行之前，
// 这个变量处于 “暂时性死区” —— 你不能访问它，否则会抛出 ReferenceError。
// ⚠️ 即使外部有同名变量，在块内部只要用了 let name，整个块内就“屏蔽”了外部的 name，并且在声明前无法访问。