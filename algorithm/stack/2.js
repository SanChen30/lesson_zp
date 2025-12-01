// 数组实现栈
const stack = [];

// 入栈
const push = stack.push(1);
console.log(push); // 1

// 访问栈顶元素
const peek = stack[stack.length - 1];
console.log(peek); // 1

// 出栈
const pop = stack.pop();
console.log(pop); // 1

// 栈长
const size = stack.length;
console.log(size); // 0

// 判空
const isEmpty = stack.length === 0;
console.log(isEmpty); // true