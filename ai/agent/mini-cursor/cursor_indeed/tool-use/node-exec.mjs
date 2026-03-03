// exec 执行命令的tool
import {
    spawn
    // node 内置模块
    // 高级，创建一个子进程
    // 进程 = 操作系统分配资源的最小单位，一个正在运行的程序实例
    // 线程 = CPU 调度的最小单位，进程里的执行路径，一个进程可以包含多个线程
    // 主进程 node node-exec.mjs
    // 执行 npm i npm run dev npm init vite
    // cmd 本身就是进程，不能阻塞主进程
    // node 是多进程的架构
    // 父进程 mini-cursor 启动 子进程
} from 'node:child_process';

// bash 命令
// git bash
const command = 'ls -la';
// 新建子进程
const [cmd, ...args] = command.split(' ');
const cwd = process.cwd();
console.log(`当前工作目录: ${cwd}`);
// 并发
const child = spawn(cmd, args, {
    cwd,
    // 继承父进程的输入输出 stdin stdout
    stdio: 'inherit',
    // 开启 shell 模式，才能解析命令中的管道、重定向等
    shell: true
});

let errorMsg = '';
// 进程间的通信，基于监听事件
child.on('error', (error) => {
    errorMsg = error.message;
})

child.on('close', (code) => {
    if (code === 0) {
        console.log('命令执行成功，子进程退出');
        process.exit(0);
    } else {
        if (errorMsg) {
            console.error(`错误: ${errorMsg}`);
        }
        process.exit(code || 1);
    }
})