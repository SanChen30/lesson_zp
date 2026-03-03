// langchain tool 工具
import { tool } from '@langchain/core/tools';
import fs from 'node:fs/promises';
import path from 'node:path';
import {
    spawn
} from 'node:child_process';
import { z } from 'zod';

// 读取文件工具
const readFileTool = tool(
    async ({ filePath }) => {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            console.log(`[工具调用] read_file("${filePath}") 成功读取 ${content.length} 个字符`);
            return `文件内容: \n${content}`;
        } catch (error) {
            console.error(`[工具调用] read_file("${filePath}") 读取文件失败: ${error.message}`);
            return `读取文件失败: ${error.message}`;
        }
    },
    {
        name: 'read_file',
        description: '读取指定路径的文件内容',
        schema: z.object({
            filePath: z.string().describe('文件路径')
        })
    }
)

// 写入文件工具
const writeFileTool = tool(
    async ({ filePath, content }) => {
        try {
            // 如果 filePath 是 /a/b/c.txt 则返回 /a/b 目录
            const dir = path.dirname(filePath);
            // make directory 创建目录，recursive: true 递归创建
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`[工具调用] write_file("${filePath}") 成功写入 ${content.length} 个字符`);
            return `文件写入成功: ${filePath}`;
        } catch (error) {
            console.error(`[工具调用] write_file("${filePath}") 写入文件失败: ${error.message}`);
            return `写入文件失败: ${error.message}`;
        }
    },
    {
        name: 'write_file',
        description: '向指定路径写入文件内容，自动创建目录',
        schema: z.object({
            filePath: z.string().describe('文件路径'),
            content: z.string().describe('要写入的文件内容')
        })
    }
)

// 执行命令工具
const executeCommandTool = tool(
    async ({ command, workingDirectory }) => {
        const cwd = workingDirectory || process.cwd(); // 当前工作目录
        console.log(`[工具调用] execute_command("${command}") 执行命令，当前工作目录: ${cwd}`);
        return new Promise((resolve, reject) => {
            const [cmd, ...args] = command.split(' ');
            const child = spawn(cmd, args, {
                cwd,
                stdio: 'inherit',
                shell: true
            })
            let errorMsg = '';
            child.on('error', (err) => {
                errorMsg = err.message;
                reject(errorMsg);
            })
            child.on('close', (code) => {
                if (code === 0) {
                    console.log(`[工具调用] execute_command("${command}") 执行成功`);
                    const cwdInfo = workingDirectory ? `
                        \n\n重要提示: 命令在目录"${workingDirectory}"中执行成功。
                        如果需要在这个目录下继续执行命令，请使用 workingDirectory
                        "${workingDirectory}" 参数，不要使用 cd 命令
                    ` : '';
                    resolve(`命令执行成功: ${command} ${cwdInfo}`);
                } else {
                    if (errorMsg) {
                        console.error(`错误: ${errorMsg}`);
                    }
                    console.error(`[工具调用] execute_command("${command}") 执行失败，退出码: ${code}`);
                    reject(`命令执行失败: ${command}，退出码: ${code}`);
                }
            })
        })
    },
    {
        name: "execute_command",
        description: '执行系统命令，支持指定工作目录，实时显示输出',
        schema: z.object({
            command: z.string().describe('要执行的命令'),
            workingDirectory: z.string().optional().describe('指定工作目录，默认当前工作目录')
        })
    }
)

// 列出目录工具
const listDirectoryTool = tool(
    async({ directoryPath }) => {
        try {
            const files = await fs.readdir(directoryPath);
            console.log(`[工具调用] list_directory("${directoryPath}") 成功列出 ${files.length} 个文件`);
            return `目录内容: \n ${files.map(f => `- ${f}`).join('\n')}`;
        } catch(err) {
            console.error(`[工具调用] list_directory("${directoryPath}") 列出目录失败: ${err.message}`);
            return `列出目录失败: ${err.message}`;
        }
    },
    {
        name: "list_directory",
        description: '列出指定目录下的所有文件和文件夹',
        schema: z.object({
            directoryPath: z.string().describe('目录路径')
        })
    }
)

export {
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool
}