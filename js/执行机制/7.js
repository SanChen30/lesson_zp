let str = 'hello';
let str2 = str;  // 值的拷贝 复印
str2 = '你好';
console.log(str, str2);
console.log(str.length, str2.length);

let obj = {
    name: '张三',
    age: 18,
}

// // 冷冻对象
// Object.freeze(obj);

// obj.name = '李四';
// console.log(obj.name);


let obj2 = obj; //引用式拷贝
obj2.age = 20;
console.log(obj2, obj);

// 变量申请内存空间不一样

// 简单数据类型 内存空间 栈内存 把值给你

// 复杂数据类型 内存空间 堆内存 把地址给你