import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// 将nestjs 像 express 一样拥有一些服务
// 告诉 TypeScript：这个 app 是基于 Express 的 Nest 应用
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.setGlobalPrefix('api'); // 给所有接口统一加一个前缀/api
  // 启用全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // 自动过滤 dto 未定义的属性，删除多余字段
    forbidNonWhitelisted: true, // 遇到未定义的属性直接报错，多传字段直接报错
    transform: true,   // 自动将请求体转换为 dto 实例，自动类型转换
  }))
  await app.listen(process.env.PORT ?? 3000);
} 
bootstrap();
