const s1 = Symbol('二哈');
const s2 = Symbol('二哈');
console.log(s1 == s2); // false



const secretKey = Symbol('secret');
console.log(secretKey); // Symbol(secret)

// 用于多人协作中，避免命名冲突，每个符号都是唯一的
// 对象是动态的，不太安全
// key属性名： string 类型 | symbol 类型
const a = "ecut";
const user = {
    [secretKey]:'123456',
    email:'zhangsan@163.com',
    name:'张三',
    [a]:123
};

// 这里的 [a] 是ES6的计算属性名语法，会先计算变量 a 的值，然后用这个值作为属性名
// 而a或者“a”是字面量属性名，不会被计算，直接作为属性名

console.log(user.ecut, user["ecut"]); // 789 789
user.email = 'zhangsan@qq.com';


