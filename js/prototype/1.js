// 早期的 JavaScript 中，没有类的概念，只有构造函数和原型链。
// JS 中函数是一等公民
// 函数首字母大写默认为构造函数
function Car(color) {
    // this 指向实例化的对象
    this.color = color;
    // 为什么要在原型上添加方法，而不是在构造函数上添加方法？
    // 因为在构造函数上添加方法，每次实例化对象时，都会创建一个新的方法，占用内存空间。
    // 而在prototype 上添加方法，只有一个方法，所有实例化对象共享。
    // this.drive = function(){
    //     console.log('driving');
    // }
    // 同样的，每辆汽车相同的属性值也可以添加到原型上
    // this.name = 'su7',
    // this.height = 1.4,
    // this.weight = 1.5,
    // this.long = 4800
}

// 添加方法到原型
Car.prototype = {
    drive() {
        console.log('driving');
    },
    name: 'su7',
    height: 1.4,
    weight: 1.5,
    long: 4800,
}

const car1 = new Car('red');
console.log(car1, car1.name, car1.weight);
car1.drive();
const car2 = new Car('blue');
console.log(car2, car2.name, car2.weight);