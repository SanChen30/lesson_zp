console.log(NaN === NaN); // false
// NaN 与任何值比较（包括自己）都返回 false

console.log(NaN, typeof NaN); // NaN number
console.log(Number.isNaN(NaN)); // true

console.log(0 / 0, 6 / 0, -6 / 0); // NaN Infinity -Infinity
console.log(Math.sqrt(-1)); // NaN
console.log("abc" - 10); // NaN
console.log(undefined + 5); // NaN
console.log(parseInt("hello")); // NaN


const a = 0 / 0;
const b = parseInt("hello");
console.log(a === b); // false