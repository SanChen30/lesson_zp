# Symbol 

独一无二的值

1. 数据类型

1) 简单数据类型

- 传统数据类型
  - number
  - string
  - boolean
  - null
  - undefined

- es6 新增数据类型
  - bigint
  - symbol 符号，唯一值

2) 复杂数据类型

都叫对象 object

2. js 总共有8种数据类型

七上八下

number 和 bigint 会被统称为 numeric 类型

## Symbol 符号

1. 声明方式

`Symbol()` 函数式声明，但是简单数据类型，不用 new 关键字

参数：label 可选，描述符号的字符串，即使label 相同，也会返回不同的 Symbol 值

- Symbol 可以作为对象的唯一key 用于多人协作，避免命名冲突
- 对象是动态的，但是Symbol key 不会被覆盖，也不可以被枚举

而是使用 Object.getOwnPropertySymbols() 方法获取对象所有的symbol key