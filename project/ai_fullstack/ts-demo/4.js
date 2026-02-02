var _a;
// TS 的数据类型
// 简单类型
var a = 1;
var b = 'hello';
var d = null;
var e = undefined;
// 数组类型
var arr = [1, 2, 3];
var user = [1, 'Tom', 1];
// 元组类型，元组是一种固定长度、且每个位置有特定类型的数组。
var user2 = [1, 'Tom'];
// Array<string> 是 string[] 的 泛型写法，两者完全等价。
// Array<T> 是 TypeScript 内置的泛型接口，T 是“类型参数”。
// 你可以把 T 想象成函数的参数，只不过传的是类型而不是值。
var arr2 = ['a', 'b', 'c'];
// 枚举类型
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Success"] = 1] = "Success";
    Status[Status["Failed"] = 2] = "Failed";
})(Status || (Status = {}));
var s = Status.Pending;
s = Status.Success;
// 类型的推导，不写any的话，会根据赋值的类型，推导为该类型
// 但是如果赋值为多个类型，就会报错
// 但写了any，就会放弃类型约束，变成任意类型
var aa = 1;
aa = '11';
aa = {};
aa.hello(); // 任意类型，可以调用任何方法
// 未知类型，比any更安全一些
// unknown 的核心设计理念：“你可以存任何东西进去，但在确认类型之前，不能随便用它。”
// unknown 类型可以接收任何类型的值，但在使用前（如调用方法、访问属性）必须先进行类型检测或类型断言，否则 TypeScript 会报错，从而避免潜在的运行时错误。
var bb = 1;
bb = '22';
bb = {};
if (typeof bb === 'string') { // 类型断言，告诉编译器 bb 是 string 类型
    console.log(bb.toUpperCase());
}
// 对象类型
var user3 = {
    name: 'Tom',
    age: 18,
};
var u = {
    name: 'Alice',
    age: 25,
    id: 1001,
    hobby: ['reading', 'travel'],
};
// u.id = 1002; // 编译错误：无法分配到 "id" ，因为它是只读属性。
(_a = u.hobby) === null || _a === void 0 ? void 0 : _a.slice(0); // 可选属性，调用时需要判断是否存在，可以使用可选链操作符 ?. 来避免运行时错误。
var num = 111;
var u2 = {
    name: 'Alice',
    age: 25,
    hobby: ['reading', 'travel'],
};
