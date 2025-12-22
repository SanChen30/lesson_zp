function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.speci = "人类";

let zhen = new Person("郑总", 18);

console.log(zhen.speci);

const kong = {
    name: "孔子",
    hobbies: ["学习", "思考", "运动"]
}

zhen.__proto__ = kong;
console.log(zhen.hobbies, zhen.speci); // 原型对象改变，kong 没有 speci 属性