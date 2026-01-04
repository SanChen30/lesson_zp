function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.say = function () {
    console.log(`我是${this.name}, 我今年${this.age}岁`)
}