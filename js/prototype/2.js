function Person(name, age) {
    this.name = name,
        this.age = age
}

Person.prototype.speci = 'human'; //都是人类

const person1 = new Person('zhangsan', 18);
console.log(person1.name, person1.speci);
const person2 = new Person('lisi', 20);
console.log(person2.name, person2.speci);

console.log(person1.__proto__); //{ speci: 'human' }
