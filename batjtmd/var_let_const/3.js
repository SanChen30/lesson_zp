const PI = 3.1415926;
const person = {
    name: "张三",
    age: 28
}

// person.name = "李四";
// console.log(person);

// 如果是原始类型，const 声明的变量，不能被重新赋值
// 如果是引用类型，const 声明的变量，不能修改引用地址，但是可以修改引用地址中的属性值

// 如果对象一定不能变呢？
// 可以使用 Object.freeze() 方法，冻结对象，不能被修改
Object.freeze(person);
person.age = 30;
console.log(person);
