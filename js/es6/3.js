// js 不适合做大量的运算
// 精度丢失，js最大表达的数字是：2的53次方-1，底层是二进制存储，64位，
// 能安全表示的最大整数是 2^53−1=9007199254740991，即 Number.MAX_SAFE_INTEGER
// [1 位符号][11 位指数][52 位尾数]

let num = 1234567890987654321;
console.log(num); // 1234567890987654400

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

let num2 = 1234567890987654321n;
console.log(num2, typeof num2); // 1234567890987654321n 'bigint'

// 指数运算符 ** 也支持 BigInt，es7
console.log(2 ** 10); // 1024
