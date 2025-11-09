// 打印结果是？

console.log([1, 2, 3].map(parseInt)); //[ 1, NaN, NaN ]

[1, 2, 3].map(parseInt)

// 等价于：
[1, 2, 3].map((currentValue, index, array) => {
  return parseInt(currentValue, index, array);
  // 注意：第三个参数 array 被 parseInt 忽略了
})

// 具体执行：
// 第一次迭代：parseInt(1, 0)
// 第二次迭代：parseInt(2, 1)  
// 第三次迭代：parseInt(3, 2)

[1, 2, 3].map(function (item, index, array) {
    console.log(item, index, array);
});

// 回调函数有三个参数：当前元素、当前索引、原数组
// 回调函数：parseInt
// parseInt(element, index, array)

console.log(parseInt(1, 0, [1, 2, 3])); // 当 radix 为 0 时，按十进制处理
console.log(parseInt(2, 1, [1, 2, 3])); // 进制基数必须在 2-36 之间，基数为 1 是无效的，返回 NaN
console.log(parseInt(3, 2, [1, 2, 3])); // 二进制只包含数字 0 和 1，数字 3 在二进制中是无效数字，返回 NaN


// 正确写法
console.log([1, 2, 3].map(num => parseInt(num, 10)));
// [1, 2, 3]
console.log([1, 2, 3].map(Number));
// [1, 2, 3]
console.log([1, 2, 3].map(num => +num)); // 一元加号 + 会尝试将其操作数转换为数字类型
// [1, 2, 3]

[1, 2, 3].map(num => +num)

// 等价于：
[1, 2, 3].map(num => Number(num))

// 执行过程：
// +1 → 1
// +2 → 2  
// +3 → 3