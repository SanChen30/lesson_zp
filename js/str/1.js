//坚持一种风格的字符串，不要混合使用单引号和双引号，遵守公司代码风格
let str = "hello world";
let str2 = 'hello world';
//ES6 模板字符串
//其他大型语言都有模板字符串的功能，js 不再去拼接字符串
let w = 'world';
let str3 = "hello" + w;
let str4 = `hello ${w}`;

let str5 = new String("hello world");  //字符串构造类，包装类
console.log(
    str5, //[String: 'hello world']
    str5.valueOf(), // hello world 
    typeof str5, // object
    Object.prototype.toString.call(str5) // [object String]
); 
 

// 查看具体类型：Object.prototype.toString.call(str5)