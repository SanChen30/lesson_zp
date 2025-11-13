// js 内部调用 utf-16 编码，存储，常规字符用16位来表示一个单位
// emoji、一些生僻字，占据2个甚至更多的单位

console.log('a'.length); // 1
console.log('中'.length); // 1
// emoji
console.log("𝄞".length); // 2

const str = "Hello,世界!👋";
console.log(str.length); // 11


console.log(str[0]); // H
console.log(str.charAt(0)); // H
console.log(str[0] === str.charAt(0)); // true

console.log(str.slice(0,5)); // Hello 左闭右开
console.log(str.substring(0,5)); // Hello 左闭右开