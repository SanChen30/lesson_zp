# 原型继承

1. 函数方法：call、apply，可以指定函数运行时的 this 指向

被指定的函数也立即执行了，两个方法的区别是参数传递方式不同

第一个参数是 this 的指向对象，构造函数继承中 this 指向子类

后面的参数是指定函数的参数

call 方法的余下参数是逗号分隔的参数列表

apply 方法的余下参数是数组


## Cat.prototype = Animal.prototype;（直接赋值父类的 prototype）

一、问题：

1. 子类和父类共享同一个 prototype 对象

这意味着对 Cat.prototype 的任何修改（比如添加方法）都会直接影响到 Animal.prototype，破坏了封装性和独立性。

2. 无法区分实例是 Cat 还是 Animal

因为 Cat.prototype === Animal.prototype，所以：

```js
let cat = new Cat();
console.log(cat instanceof Cat); // true（但其实 Cat.prototype 没有被正确设置）
console.log(cat instanceof Animal); // true
```

虽然 instanceof 可能仍返回 true，但语义上混乱，且 constructor 全部指向 Animal。

3. constructor 错乱

Cat.prototype.constructor 仍然是 Animal，而不是 Cat。

正确做法：应让 Cat.prototype 是一个新对象，其原型链指向 Animal.prototype，而不是直接共享。

## Cat.prototype = new Animal();（用父类实例作为子类 prototype）

这是早期 ES5 中常用的“原型链继承”方式，但它也有明显缺陷：

一、问题：

1. 调用了父类构造函数（可能带副作用）

new Animal() 会执行 Animal 的构造函数。如果 Animal 构造函数中有初始化逻辑（比如 this.name = ...、网络请求、DOM 操作等），这会在设置继承时就被执行一次，而且通常没有传参，可能导致错误或无意义的状态。

2. 父类实例属性被“固化”在子类 prototype 上
   
例如：

```js
function Animal() {
this.species = 'animal';
}
Cat.prototype = new Animal(); // Cat.prototype 上有了 species: 'animal'
```

所有 Cat 实例都会共享这个 species（因为它是 prototype 上的属性）。如果某个实例修改了它，会影响其他实例（除非被遮蔽）。

3. constructor 指向错误

Cat.prototype.constructor 现在是 Animal，不是 Cat。需要手动修正：

```js
Cat.prototype.constructor = Cat;
```

4. 无法向父类构造函数传参

在设置继承时就调用了 new Animal()，此时无法知道未来子类实例化时应该传什么参数给父类。

## 推荐做法（ES5 时代）：

使用 Object.create() 来建立原型链，避免调用父类构造函数：

```js
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
```

这样：
Cat.prototype 是一个新对象；
它的 [[Prototype]] 指向 Animal.prototype；
没有执行 Animal 构造函数；
可以安全地添加子类方法；
修正 constructor 指向。

## 现代做法（ES6+）：

直接使用 class 和 extends，由引擎处理所有细节：

```js
class Animal {
constructor(name) {
this.name = name;
}
}

class Cat extends Animal {
constructor(name) {
super(name);
}
}
```

完全避免上述问题。
