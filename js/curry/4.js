// 日志函数
const log = type => message => {
    console.log(`${type}: ${message}`);
}

// 等价于
// const log = (type) => {
//     return (message) => {
//         console.log(`${type}: ${message}`);
//     }
// }
// log 是一个接受一个参数 type 的函数。
// 它返回另一个函数，这个内部函数接受 message 参数。
// 当两个参数都提供后（分两步），才会执行 console.log。
// 这就是 严格柯里化：必须先传 type，再传 message，不能一次传两个（比如 log('error', 'msg') 是无效的，会返回一个函数而不是打印日志）。

// 柯里化 可以用于固定一些函数的参数
// 固定日志类型，提升函数的语义
// 利用柯里化“固定”第一个参数
// 这个过程叫做 参数预设（partial application） —— 通过柯里化提前“固化”一部分参数，生成更专注的新函数。
const errorLog = log("error");
const infoLog = log("info");

// 现在你不需要每次都写日志类型，只需要关注具体消息内容。
// 函数名 errorLog / infoLog 本身就有清晰语义，代码可读性更高，比 log('error', 'msg') 更直观。
errorLog("接口异常");
infoLog("页面加载完成");