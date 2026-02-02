// TS 的数据类型
// 简单类型
let a: number = 1;
let b: string = 'hello';
let d: null = null;
let e: undefined = undefined;

// 数组类型
let arr: number[] = [1, 2, 3];
let user: (number | string)[] = [1, 'Tom', 1];

// 元组类型，元组是一种固定长度、且每个位置有特定类型的数组。
let user2: [number, string] = [1, 'Tom'];

// Array<string> 是 string[] 的 泛型写法，两者完全等价。
// Array<T> 是 TypeScript 内置的泛型接口，T 是“类型参数”。
// 你可以把 T 想象成函数的参数，只不过传的是类型而不是值。
let arr2: Array<string> = ['a', 'b', 'c'];

// 枚举类型
enum Status {
    Pending, // 0
    Success, // 1
    Failed, // 2
}
let s: Status = Status.Pending;
s = Status.Success;

// 类型的推导，不写any的话，会根据赋值的类型，推导为该类型
// 但是如果赋值为多个类型，就会报错
// 但写了any，就会放弃类型约束，变成任意类型
let aa: any = 1;
aa = '11';
aa = {};
aa.hello(); // 任意类型，可以调用任何方法

// 未知类型，比any更安全一些
// unknown 的核心设计理念：“你可以存任何东西进去，但在确认类型之前，不能随便用它。”
// unknown 类型可以接收任何类型的值，但在使用前（如调用方法、访问属性）必须先进行类型检测或类型断言，否则 TypeScript 会报错，从而避免潜在的运行时错误。
let bb: unknown = 1;
bb = '22';
bb = {};
if (typeof bb === 'string') { // 类型断言，告诉编译器 bb 是 string 类型
    console.log(bb.toUpperCase());
}

// 对象类型
let user3: { name: string, age: number } = {
    name: 'Tom',
    age: 18,
}

// 接口类型, 接口是一种“契约”，它定义了一个对象的形状（即属性和方法），但不包含实现细节。
// 类似于给对象定义了它有哪些属性及其类型
// id 是一个只读属性，意味着：可以在对象创建时赋值；但之后不能修改（编译时报错）。
// hobby 是可选属性（由 ? 表示）。创建对象时可以省略，也可以提供。如果提供，必须是 string[] 类型（或 undefined）。
interface IUser {
    name: string;
    age: number;
    readonly id: number;
    hobby?: string[];
}
const u: IUser = {
    name: 'Alice',
    age: 25,
    id: 1001,
    hobby: ['reading', 'travel'],
}
// u.id = 1002; // 编译错误：无法分配到 "id" ，因为它是只读属性。
u.hobby?.slice(0); // 可选属性，调用时需要判断是否存在，可以使用可选链操作符 ?. 来避免运行时错误。

// 自定义类型
type ID = string | number; 
let num: ID = 111;

type UserType = {
    name: string
    age: number
    hobby?: string[]
}
const u2: UserType = {
    name: 'Alice',
    age: 25,
    hobby: ['reading', 'travel'],
}