// 如何一次性声明多个变量
// let a = 1, b = 2, c = 3;

// 数组解构赋值
// es6 为了优雅而来
// let [a, b, c] = [1, 2, 3];
// console.log(a, b, c); // 1 2 3

// 嵌套数组
// const [a, [b, c, [d], e]] = [1, [2, 3, [4], 5]];
// console.log(a, b, c, d, e); // 1 2 3 4 5

// 解构数组
const arr = [1, 2, 3, 4, 5];
const [a, ...b] = arr;
console.log(a, b); // 1 [2, 3, 4, 5]

// 解构教练和球员
const users = ['Darvin Ham', 'James', 'Luka', 'Davis', 'Ayton', 'Kyle'];
// 左右一致
const [captain, ...players] = users;
console.log(captain, players); // Darvin Ham [ 'James', 'Luka', 'Davis', 'Ayton', 'Kyle' ]

// 解构对象
const sex = 'boy'; // 常量
const obj = {
    name: 'Darvin Ham',
    age: 25,
    // es6 的对象属性简写语法(Shorthand Property)
    sex,
    like: {
        n: '唱跳'
    }
}
// let name = obj.name;
// 一次性解构一个对象，只要左右两边一样，[],{} 都能解开
let { name, age, like: { n } } = obj;
console.log(name, age, n); // Darvin Ham 25 唱跳

// 解构字符串数组
const [e, r, ...u] = 'hello';
console.log(e, r, u); // h e [ 'l', 'l', 'o' ]


// 包装类
const {length} = 'hello';
console.log(length); // 5 