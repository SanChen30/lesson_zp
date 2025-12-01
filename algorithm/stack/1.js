// 数组是开箱即用的线性数据结构
const arr = [1, 2, 3];

arr.push(4); // 尾部插入
arr.unshift(0); // 头部插入
console.log(arr); // [0, 1, 2, 3, 4]

arr.pop(); // 尾部删除
arr.shift(); // 头部删除
console.log(arr); // [1, 2, 3]

