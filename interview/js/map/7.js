let str = "hello";
// slice 支持负数索引，从后往前，从-1开始
console.log(str.slice(-3,-1)); // ll 左闭右开
// substring 不支持负数索引，负数会被自动转换为0
console.log(str.substring(-3,-1)); // 空字符串

console.log(str.slice(3,1)); // 空字符串
// 自动把小的参数当起点，大的参数当终点
console.log(str.substring(3,1));  // el

// 返回某个字符的第一个下标
console.log(str.indexOf("o")); // 4
console.log(str.indexOf("l")); // 2

// 返回某个字符的最后一个下标
console.log(str.lastIndexOf("l")); // 3