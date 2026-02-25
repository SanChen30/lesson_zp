import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// 将nestjs 像 express 一样拥有一些服务
// 告诉 TypeScript：这个 app 是基于 Express 的 Nest 应用
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'; // node 内置模块 处理路径 join方法

async function bootstrap() {
  // 底座是基于express
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.setGlobalPrefix('api'); // 给所有接口统一加一个前缀/api
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // 自动过滤 dto 未定义的属性，删除多余字段
    // forbidNonWhitelisted: true, // 遇到未定义的属性直接报错，多传字段直接报错
    transform: true,   // 自动将请求体转换为 dto 实例，自动类型转换
  }))
  // __dirname 是静态的，而 process.cwd() 是动态的。
  // __dirname：文件在哪里？ 当前执行的 JS 文件所在目录的绝对路径。
  // process.cwd()：你在哪里？ 在终端（Terminal/Command Prompt）输入启动命令时所在的目录。它取决于用户从哪个位置执行了 node 命令。
  // 搭建静态服务器
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads', // 访问路径前缀
  }); // 静态资源目录
  await app.listen(process.env.PORT ?? 3000);
} 
bootstrap();
